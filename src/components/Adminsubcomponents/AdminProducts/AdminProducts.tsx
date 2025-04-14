import React, { useEffect, useMemo, useState } from 'react'
import { ProductType } from '../../../Types/types'
import style from './AdminProducts.module.css'
import { Button } from '@mui/material'
import { useDeleteProduct, useEditProduct } from '../../../apiList/productApi'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

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


  let {mutate:deleteProduct , isPending:deleteProdPending, error:deleteProdError, isError:deleteProdIsError} = useDeleteProduct()
  
  const handleDeleteProduct = ()=>{
    if(deleteProdPending){
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
  
  // const [formData, setFormData] = useState<Partial<ProductType>>({
  //   productName:product.productName,
  //   price:      product.price,
  //   sizeVariants:  product.sizeVariants,
  //   category: product.category,
  //   description: product.description
  // });

  return (
<div className={style.cardContainer}>
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

  <Button variant="contained" onClick={handleEditEnable} sx={{width:"10%", marginBottom:"10px"}} >
    Edit
  </Button>

  <Button variant="contained" onClick={handleDeleteProduct} sx={{width:"10%"}} color='error'>
    Delete
  </Button>
</div>


</div>
  )
}

export default AdminProducts