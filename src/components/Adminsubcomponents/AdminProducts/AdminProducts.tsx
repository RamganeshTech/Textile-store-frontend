import React, { useMemo } from 'react'
import { ProductType } from '../../../Types/types'
import style from './AdminProducts.module.css'

type AdminProductsProp = {
    product:ProductType
}

const AdminProducts:React.FC<AdminProductsProp> = ({product}) => {

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

  const notAvailableImage = "https://th.bing.com/th/id/OIP.Skr-oJ6BWg_K65k5uDiMdgHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"

  return (
//     <div className={style.singlecontainer}> 
//     <img src={firstImageAvaiable || notAvailableimage} alt="" className={style.productImage} />

//     <div className={style.description}>
//         <p className={style.descriptiondetail}>Title : <span className={style.descriptionanswer}>{product.productName}</span></p>
//         <p className={style.descriptiondetail}>Price : <span className={style.descriptionanswer}>₹{product.price}</span></p>
//         <p className={style.descriptiondetail}>Available Sizes <span className={style.descriptionanswer}>{product.sizeVariants.map((size)=> <span>{size.size},&nbsp;</span> )}</span></p>
//         <p className={style.descriptiondetail}>Available colors <span className={style.descriptionanswer}>{colorsAvailable.map(colors=> <span>{colors},&nbsp;</span> )}</span></p>
//     </div>
// </div>
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
</div>
</div>
  )
}

export default AdminProducts