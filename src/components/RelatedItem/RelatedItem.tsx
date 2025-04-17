import React, { useMemo } from 'react'
import style from './RelatedItem.module.css'
import { ProductType } from '../../Types/types'
import StarRating from '../StarRating/StarRating'

type RelatedItemProp={
    item:ProductType,
    product:ProductType
}

const RelatedItem:React.FC<RelatedItemProp> = ({item, product}) => {
    const firstAvailable = useMemo(() => {
        return product.sizeVariants.find(sizeVariant =>
            sizeVariant.colors.some(color => color.availableStock > 0)
        );
    }, [product]);

    const firstSelectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

    // Get the image for that color
    const productImage = useMemo(() => {
        return product.colorVariants.find(cv => cv.color === firstSelectedColor)?.images?.[0] || '';
    }, [product.colorVariants, firstSelectedColor]);

  return (
    <div className={style.relateditem}>
    <div className={style.relatedImgWrapper}>
        <img src={productImage} alt="" />
    </div>

    <div className={style.relateddescription}>
        <p>{item.productName}</p>
        <div>
            <StarRating rating={item.reviewStar} />
        </div>
        <p>₹{item.price}</p>
    </div>
</div>
  )
}

export default RelatedItem