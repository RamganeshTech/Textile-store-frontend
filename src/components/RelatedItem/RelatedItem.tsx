import React, { useMemo } from 'react'
import style from './RelatedItem.module.css'
import { ProductType } from '../../Types/types'
import StarRating from '../StarRating/StarRating'

type RelatedItemProp = {
    item: ProductType,
    product: ProductType
}

const RelatedItem: React.FC<RelatedItemProp> = ({ item, product }) => {

    console.log("item", item)

    const firstAvailable = useMemo(() => {

        return item.sizeVariants.find(sizeVariant =>
            sizeVariant.colors.some(color => color.availableStock > 0)
        );
    }, [ item._id]);

    // const firstAvailable = item.sizeVariants.find(sizeVariant =>
    //     sizeVariant.colors.some(color => color.availableStock > 0)
    // );

// console.log("firstAvailable", firstAvailable)
    const firstSelectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

    // Get the image for that color
    const productImage = useMemo(() => {
        return item.colorVariants.find(cv => cv.color === firstSelectedColor)?.images?.[0] || '';
    }, [product.colorVariants, firstSelectedColor]);

    return (
        <div className={style.relateditem}>
            <div className={style.relatedImgWrapper}>
                <img src={productImage} alt="image" loading='lazy' />
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