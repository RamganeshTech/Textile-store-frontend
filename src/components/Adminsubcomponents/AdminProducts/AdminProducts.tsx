import React, { useMemo } from 'react'
import { ProductType } from '../../../Types/types'
import style from './AdminProducts.module.css'
import { Button } from '@mui/material'
import { useDeleteProduct } from '../../../apiList/productApi'
import ErrorComponent from '../../../Shared/ErrorComponent/ErrorComponent'

type AdminProductsProp = {
    product:ProductType
    setFormData:React.Dispatch<React.SetStateAction<any>>,
    setEditProductId: React.Dispatch<React.SetStateAction<string | null>>
}
const notAvailableImage = "https://th.bing.com/th/id/OIP.Skr-oJ6BWg_K65k5uDiMdgHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"

const AdminProducts:React.FC<AdminProductsProp> = ({product, setFormData, setEditProductId}) => {

  let colorsAvailable = useMemo(()=>{
    return product.sizeVariants.flatMap(size=>{
      return size.colors.map(color=> color.color)
    })
  }, [product])

  let firstImageAvailable = useMemo(()=>{
   let firstimgAvailable;

   for(let colors of product.colorVariants){
    let flag = false
    for(let imageString of  colors.images){
      if(imageString){
        firstimgAvailable = imageString
        flag= true;
        break
      }
    }
    if(flag) break;
   }

   return firstimgAvailable;

  }, [product])


  let {mutate:deleteProduct , isPending:deleteProdPending, error:deleteProdError, isError:deleteProdIsError, reset:resetDeleteError} = useDeleteProduct()
  
  const handleDeleteProduct = ()=>{
    if(!deleteProdPending){
      deleteProduct({productId:product._id})
    }
  }

  const handleEditEnable = ()=>{
    setFormData((prev:any)=>{
      return {...prev, 
        productName:product.productName,
    price:      product.price,
    category: product.category,
    description: product.description,
    sizeVariants: product.sizeVariants.map((variant: any) => ({
      ...variant,
      colors: variant.colors.map((color: any) => ({
        ...color,
        images: color.images ? color.images : []  // Ensure images exists
      }))
    }))
      }
    })
    setEditProductId(product._id)
  }

  return (
<div className={style.cardContainer}>

{!deleteProdPending && deleteProdIsError && <ErrorComponent 
message={(deleteProdError as any).response.data.message || (deleteProdError as any).message || "Something went wrong" } 
onClose={()=> resetDeleteError()}  />}

<div className={style.imageWrapper}>
  <img
    src={firstImageAvailable || notAvailableImage}
    alt={product.productName}
    className={style.productImage}
  />
</div>
<div className={style.details}>
  <h2 className={style.title}>{product.productName}   
  </h2>
  <p className={style.price}>₹{product.price}</p>
  <p className={style.sizes}>
    <strong>Sizes:</strong>{" "}
    {product.sizeVariants.map((size) => (
      <span key={size.size}>{size.size}, </span>
    ))}
  </p>
  <p className={style.colors}>
    <strong>Colors:</strong>{" "}
    {colorsAvailable.map((color, idx) => (
      <span key={idx}>{color}, </span>
    ))}
  </p>

 <div className='flex items-center gap-[10px]'>
 <Button variant="contained" onClick={handleEditEnable} sx={{
  width:{
    xs:"5%",
  lg:"10%"
 },
 fontSize:{
  xs:"12px",
  sm:"14px",
  md:"16px",
 },
 padding:{
  xs:"3px"
 }
}} >
    Edit
  </Button>

  <Button variant="contained" onClick={handleDeleteProduct} sx={{
  width:{
    xs:"5%",
  lg:"10%"
 },
 fontSize:{
  xs:"12px",
  sm:"14px",
  md:"16px",
 },
 padding:{
  xs:"3px"
 }
}} color='error'>
    Delete
  </Button>
 </div>
</div>


</div>
  )
}

export default AdminProducts