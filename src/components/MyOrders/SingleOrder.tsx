import React, { useEffect, useMemo, useState } from 'react'
import style from './SingleOrder.module.css'
import { OrderType } from '../../Types/types'
import StarRating from '../StarRating/StarRating'
import { Link } from 'react-router-dom'


type SingleOrderProp = {
    order: OrderType
}

const notAvailableimage = "https://th.bing.com/th/id/OIP.Skr-oJ6BWg_K65k5uDiMdgHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"


const SingleOrder: React.FC<SingleOrderProp> = ({ order }) => {

    const [imgLoading, setImgLoading] = useState<boolean>(true)

    const firstAvailable = useMemo(() => {
        return order.productId.sizeVariants.find(sizeVariant =>
            sizeVariant.colors.some(color => color.availableStock > 0)
        );
    }, [order.productId]);

    // const firstSelectedSize = firstAvailable?.size || '';
    const firstSelectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

    // Get the image for that color
    const productImage = useMemo(() => {

        let productImg = order.productId.colorVariants.find(cv => cv.color === firstSelectedColor)?.images?.[0] || '';
        // setImgLoading(false)
        return productImg
    }, [order.productId.colorVariants, firstSelectedColor]);

    return (
        <div className={style.singleOrderWrapper}>
            <Link to={`/product/${order.productId._id}`}  className={style.singleOrderCard}>

                <div className={style.imgContainer}>
                    <img
                        src={productImage || notAvailableimage} // Show blurred version by default
                        alt={order.productId.productName}
                        // className={`${style.lazy_blur} transition-blur duration-500 ease-in-out ${imgLoading ? '!blur-md' : 'blur-0'} `}
                        className={`${style.productImage} ${imgLoading ? style.blur : style.noBlur}`}
                        loading="lazy" // Native lazy loading support
                        // style={{
                        //     width: '100%',
                        //     transition: 'filter 0.4s ease',
                        // }}

                        onLoad={(e) => {
                            let img = e.currentTarget
                            // img.removeAttribute(style.lazy_blur)
                            setImgLoading(false)
                        }}
                    />
                </div>

                <div className={style.itemDetails}>
                    <h2>{order.productId.productName}</h2>
                    <p>Price: <span>${order?.productId.price?.toFixed(2)}</span></p>
                    <p><StarRating rating={order?.productId.reviewStar ?? 0} /></p>
                    <p>Size <span>{order.size}</span></p>
                    <p>Color <span>{order.color}</span></p>

                </div>
            </Link>

        </div>

    )
}

export default SingleOrder