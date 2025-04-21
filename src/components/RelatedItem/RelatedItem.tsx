import React, { useMemo, useState } from 'react'
import style from './RelatedItem.module.css'
import { ProductType } from '../../Types/types'
import StarRating from '../StarRating/StarRating'

type RelatedItemProp = {
    item: ProductType,
    product: ProductType
}
const notAvailableimage = "https://th.bing.com/th/id/OIP.Skr-oJ6BWg_K65k5uDiMdgHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"

const RelatedItem: React.FC<RelatedItemProp> = ({ item, product }) => {

    // console.log("item", item)
    const [imgLoading, setImgLoading] = useState<boolean>(true);

    const firstAvailable = useMemo(() => {

        return item.sizeVariants.find(sizeVariant =>
            sizeVariant.colors.some(color => color.availableStock > 0)
        );
    }, [item._id]);

    const firstSelectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

    // Get the image for that color
    // const productImage = useMemo(() => {
    //     return item.colorVariants.find(cv => cv.color === firstSelectedColor)?.images?.[0] || '';
    // }, [product.colorVariants, firstSelectedColor]);

    const productImage = useMemo(() => {
        // Find the image based on the selected color variant
        const image = item.colorVariants.find(cv => cv.color === firstSelectedColor)?.images?.[0] || '';
        
        // Once the image is determined, set loading to false
        if (image) setImgLoading(false);
    
        return image;
    }, [item.colorVariants, firstSelectedColor]);

    const getBlurredCloudinaryUrl = (originalUrl: string) => {
        // console.log("originalUrl", originalUrl)
        if (!originalUrl.includes('/upload/')) return originalUrl;
        return originalUrl.replace('/upload/', '/upload/e_blur:1000,q_10/');
    };

    
const blurredImage = useMemo(() => {
    return productImage ? getBlurredCloudinaryUrl(productImage) : '';
  }, [productImage]);
  

    const imageToShow = imgLoading ? notAvailableimage : getBlurredCloudinaryUrl(productImage);


    return (
        <div className={style.relateditem}>
            <div className={style.relatedImgWrapper}>
                <img src={productImage} alt="image" loading='lazy' />
                {/* {productImage ? (
      <img
        src={blurredImage}
        data-src={productImage}
        alt={item.productName}
        className={style.lazy_blur}
        loading="lazy"
        style={{ width: '100%', transition: 'filter 0.4s ease' }}
        onLoad={(e) => {
          const img = e.currentTarget;

          if (img.src.includes('/e_blur:1000,q_10/')) {
            img.src = productImage;
          } else {
            img.classList.remove(style.lazy_blur);
            img.removeAttribute('data-src');
          }
        }}
      />
    ) : (
      <img src={notAvailableimage} alt="Image not available" style={{ width: '100%' }} />
    )} */}
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