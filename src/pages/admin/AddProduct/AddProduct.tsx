import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useCreateProduct, useEditProduct, useUploadImage } from "../../../apiList/productApi";
import styles from "./AddProduct.module.css";
import { CircularProgress, TextField } from "@mui/material";
import { Button } from "@mui/material";
import Loading from "../../../components/LoadingState/Loading";
import CreateProductSuccess from "../../../Shared/CreateProductSuccess/CreateProductSuccess";
// import { AddOutlined } from "@mui/icons-material";


const SizeVariantInput: React.FC<{
  index: number;
  control: any;
  setValue: any;
  register: any;
  removeSize: (index: number) => void;
}> = ({ index, control, register, setValue, removeSize }) => {
  const {
    fields: sizeColorFields,
    append: appendSizeColor,
    remove: removeSizeColor,
  } = useFieldArray({
    control,
    name: `sizeVariants.${index}.colors`,
  });

  const [imagecontainer, setImagecontainer] = useState<{ image: number, color: string }[]>([{ image: 1, color: "" }])

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    sizeIndex: number,
    colorIndex: number
  ) => {
    const files = Array.from(e.target.files || []);
    setValue(`sizeVariants.${sizeIndex}.colors.${colorIndex}.images`, files);
  };


  // const addImageContainer = ({ color }: { color: string }) => {
  //   setImagecontainer(prev => {
  //     let oldvalue = [...prev];
  //     let updatedColor = oldvalue.find(setvalue => setvalue.color === color)

  //     let newImageValue = updatedColor ? updatedColor.image + 1 : 1;

  //     return [...prev, { image: newImageValue, color }];
  //   }
  //   )
  // }

  return (
    <div className={styles.variantBox}>
      <div className={styles.row}>
        <label className={styles.subHeading}>Size:</label>
        <select {...register(`sizeVariants.${index}.size`)} className={styles.input}>
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <Button variant="contained" color="error" type="button" onClick={() => removeSize(index)} className={styles.removeButton}>
          Remove Size
        </Button>
      </div>
      <div className={styles.nestedBox}>
        <p className={styles.subHeading}>Colors & Available Stock</p>
        <section className={styles.imagecontainer}>
          {sizeColorFields.map((field, colorIndex) => (
            <div key={field.id} className={styles.row}>
              <TextField
                {...register(`sizeVariants.${index}.colors.${colorIndex}.color`)}
                placeholder="Color"
                className={styles.input}
              />
              <TextField
                type="number"
                {...register(`sizeVariants.${index}.colors.${colorIndex}.availableStock`, {
                  valueAsNumber: true,
                })}
                placeholder="Stock"
                className={styles.input}
              />
              {imagecontainer.map((image, i) =>
                <div key={i} className="w-[100%]  flex !items-center gap-[5px]">
                  {/* <TextField
              type="file"
              {...register(`sizeVariants.${index}.colors.${colorIndex}.images`)}
              placeholder={`image ${i+1}`}
              className={`${styles.input} w-[80%]`}
            /> */}

                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileSelect(e, index, colorIndex)}
                    className={`${styles.input}`}
                  />

                  {/* <IconButton className="!bg-[#0a0a0a10]" onClick={()=> addImageContainer({color: sizeColorFields.find(item=> item.id)})}>
              <AddOutlined />
            </IconButton> */}
                </div>
              )}

              <Button variant="contained" color="error" type="button" onClick={() => removeSizeColor(colorIndex)} className={styles.removeButton}>
                Remove Color
              </Button>
            </div>
          ))}
          <Button variant="contained"
            type="button"
            onClick={() => appendSizeColor({ color: "", availableStock: 0, images: [] })}
            className={styles.addButton}
          >
            + Add Color
          </Button>
        </section>
      </div>
    </div>
  );
};

type AddProductProp = {
  editProductId?: string,
  editFormData?: any,
  setEditProductId?: React.Dispatch<React.SetStateAction<string | null>>,
}

const AddProduct: React.FC<AddProductProp> = ({ editProductId, editFormData, setEditProductId }) => {

  const { register, control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      productName: "",
      price: 0,
      description: "",
      category: "",
      sizeVariants: [
        { size: "S", colors: [{ color: "blue", availableStock: 1, images: [] }] },
      ],
    },
  });

  // const { mutateAsync: createProductMutation } = useCreateProduct();
  const { mutate: createProduct, isPending: createProdloading, data: createddata, isSuccess } = useCreateProduct()
  const { mutateAsync: uploadImage, isPending: imageUploadLoading } = useUploadImage();
  let { mutate: editProduct, isPending: editProdPending, error: editProdError, isError: editProdIsError } = useEditProduct()


  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
    replace: replaceSize,
  } = useFieldArray({
    control,
    name: "sizeVariants",
  });

  useEffect(() => {
    if (editFormData && editProductId) {
      const transformedData = {
        ...editFormData,
        sizeVariants: editFormData.sizeVariants
      };
  
      reset(transformedData); // this updates the full form
      replaceSize(transformedData.sizeVariants || []); // this updates the sizeVariants field array
    }
  }, [editFormData, editProductId, reset, replaceSize]);
  

  const onSubmit = async (data: any) => {
    try {
      const sizeVariants = await Promise.all(
        data.sizeVariants.map(async (variant: any) => {
          const colors = await Promise.all(
            variant.colors.map(async (colorObj: any) => {
              const imageFiles: File[] = colorObj.images || [];
              // Upload all images one by one (in parallel)
              const uploadedImages = await uploadImage(imageFiles);
              return {
                ...colorObj,
                images: uploadedImages, // this will now have [{ url, public_id }, ...]
              };
            })
          );

          return {
            size: variant.size,
            colors,
          };
        })
      );

      const finalData = {
        ...data,
        sizeVariants,
      };

      if (editProductId && !editProdPending) {
        // In edit mode, call the editProduct mutation
        editProduct({ productData: finalData, productId: editProductId });
      } else {
        // Otherwise, create a new product
       if(!createProdloading){
        createProduct(finalData);
       }
      }
      // alert(editProductId ? "Product updated successfully" : "Product created successfully!");

      // alert("Product Created!");
    } catch (err) {
      console.error("Error uploading images or creating product:", err);
    }
  };


  return (
    <div className="w-[100vw] !p-[20px] !mt-[70px] bg-[#fafafa]">

      {isSuccess && <CreateProductSuccess message={"product Created Successfully"} />}

      {(createProdloading || imageUploadLoading || editProdPending) && <section className="fixed bg-[#0a0a0a18] z-[99] inset-0 flex items-center justify-center">
        <CircularProgress size={50} thickness={5} color="success" />
      </section>}

      <div className={styles.container}>
        <h2 className={styles.heading}>
          {editProductId ? "Edit Product" : "Create New Product"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.row}>
            <TextField
              {...register("productName")}
              placeholder="Product Name"
              className={styles.input}
            />
            <TextField
              {...register("price", { valueAsNumber: true })}
              placeholder="Price"
              className={styles.input}
              type="number"
            />
          </div>
          <textarea
            {...register("description")}
            placeholder="Description"
            className={styles.textarea}
          />
          <TextField
            {...register("category")}
            placeholder="Category"
            className={styles.input}
          />

          {/* Color Variants Section */}
          {/* <div className={styles.section}>
            <h3 className={styles.subHeading}>Color Variants</h3>
            {colorFields.map((item, index) => (
              <ColorVariantInput
                key={item.id}
                index={index}
                control={control}
                register={register}
                removeColor={removeColor}
              />
            ))}
            <button
              type="button"
              onClick={() => appendColor({ color: "", images: [""] })}
              className={styles.addButton}
            >
              + Add Color Variant
            </button>
          </div> */}

          {/* Size Variants Section */}
          <div className={styles.section}>
            <h3 className={styles.subHeading}>Size Variants</h3>
            {sizeFields.map((item, index) => (
              <SizeVariantInput
                key={item.id}
                index={index}
                // singleSizeVarient={item}
                control={control}
                register={register}
                removeSize={removeSize}
                setValue={setValue}
              />
            ))}
            <Button
              type="button"
              variant="contained"
              onClick={() =>
                appendSize({ size: "S", colors: [{ color: "blue", availableStock: 1, images: [] }] })
              }
              className={styles.addButton}
            >
              + Add Size Variant
            </Button>
          </div>

<div className="flex justify-center gap-[10px]">
<Button variant="contained" type="submit" className={styles.submitButton}>
            {editProductId ? "Save Changes" : "Create Product"}
          </Button>

          {editProductId && <Button variant="contained" color="error" type="button" onClick={()=> {
            if(setEditProductId){
              setEditProductId(null)
            }
            }} className={styles.submitButton}>
           cancel
          </Button>}
</div>
         
        </form>
      </div>
    </div>
  );
};

export default AddProduct;