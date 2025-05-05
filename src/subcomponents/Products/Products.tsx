import { useMemo, useOptimistic, useState, startTransition, useRef } from 'react'
import style from './Products.module.css'

import { Button, CircularProgress, IconButton } from '@mui/material'


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { ProductType } from '../../Types/types';
import { Link } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating';
import { useAddToCart, useFetchCart, useRemoveFromCart } from '../../apiList/cartApi';
import { useAddToFavourite, useFetchFavourite, useRemoveFavourite } from '../../apiList/favouriteApi';
import ErrorComponent from '../../Shared/ErrorComponent/ErrorComponent';

type singleProductprop = {
    product: ProductType
}
const notAvailableimage = "https://th.bing.com/th/id/OIP.Skr-oJ6BWg_K65k5uDiMdgHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"

const Products: React.FC<singleProductprop> = ({ product }) => {

    // let location = useLocation()

    // const [isFavourite, setIsFavourite] = useState<boolean>(false)
    // const [isInCart, setIsInCart] = useState(false);

    const [rating] = useState<number>(product.reviewStar);

    const { data: cartItems } = useFetchCart();
    const { mutate: removeCartmutate, isPending: removeCartPending } = useRemoveFromCart();

    let { mutate: addCartmutate, isPending: addCartPending, isError: addCartIsError, error: addCartError, reset: addcartResetError } = useAddToCart()

    let { mutate: removeFavourite, isPending: removeFavPending, isError: removeFavIsError, error: removeFavError, reset: removeFavResetError } = useRemoveFavourite()

    let { mutate: addFavourite, isPending: addFavPending, isError: addFavIsError, error: addFavError, reset: addFavResetError } = useAddToFavourite()

    const { data: favourites } = useFetchFavourite();

    const [imgLoading, setImgLoading] = useState<boolean>(true)



    const handleFavourite = () => {

        const newFavValue = !isFavourite;

        // startTransition(() => {
        //     setOptimisticFav(newFavValue);
        // })

        setImdFavState(newFavValue)
        // const firstAvailable = product.sizeVariants.map(sizeVariant =>
        //     sizeVariant.colors.find(color => color.availableStock > 0)
        // );

        // product.colorVariants.find(colors=> colors.color === firstAvailable?.colors.)

        // const selectedSize = firstAvailable?.size || '';
        // const selectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

        // if (!selectedSize || !selectedColor) {
        //     return;
        // }
        
        try {

            if (isFavourite && !removeFavPending) {
                removeFavourite({ productId: product._id, });
            } else {
                if (!addFavPending) {
                    addFavourite({ productId: product._id, });
                }
            }
        }
        catch (error) {
            // startTransition(() => {
            //     setOptimisticFav(!newFavValue);
            // })
            setImdFavState(isFavourite)
        }

    };

    // Get first available size and color with stock
    const firstAvailable = useMemo(() => {
        return product.sizeVariants.find(sizeVariant =>
            sizeVariant.colors.some(color => color.availableStock > 0)
        );
    }, [product]);

    const firstSelectedSize = firstAvailable?.size || '';
    const firstSelectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

    // Get the image for that color
    const productImage = useMemo(() => {

        let productImg = product.colorVariants.find(cv => cv.color === firstSelectedColor)?.images?.[0] || '';
        // setImgLoading(false)
        return productImg
    }, [product.colorVariants, firstSelectedColor]);

    const isInCart = useMemo(() => {
        return cartItems?.some((item: any) => item?.productId?._id === product._id) || false;
    }, [cartItems, product._id]);

    const memoRunCountRef = useRef(0);
    
    const isFavourite = useMemo(() => {
        return favourites?.items?.some((fav: any) => fav?.productId?._id === product._id) || false;        
    }, [favourites, product._id]);

    const [immdFavState, setImdFavState] = useState<boolean>(isFavourite)



    // const [optimisticFav, setOptimisticFav] = useOptimistic(isFavourite, (_, newVal) => {
    //     console.log("newVal", newVal)
    //     return newVal
    // } )


    const handleCart = () => {
        if (isInCart && !removeCartPending) {
            removeCartmutate({ productId: product._id, size: firstSelectedSize, color: firstSelectedColor });
        } else if (!addCartPending) {
            addCartmutate({ productId: product._id, quantity: 1, price: product.price, size: firstSelectedSize, color: firstSelectedColor });
        }
        // setIsInCart(!isInCart);
    };

    const getBlurredCloudinaryUrl = (originalUrl: string) => {
        if (!originalUrl.includes('/upload/')) return originalUrl;
        return originalUrl.replace('/upload/', '/upload/e_blur:1000,q_10/');
    };

    // const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //     const img = e.target as HTMLImageElement;

    //     // Check if the image source is different from the blurred one
    //     if (img.src !== img.dataset.src) {
    //       console.log('Image loaded:', img.src);
    //       img.src = img.dataset.src!; // Set the actual image URL from data-src
    //       img.removeAttribute('data-src'); // Clean up the data-src attribute
    //       img.classList.remove(style.lazy_blur); // Remove the blur class
    //     }
    //   };


    return (
        <div className={`${style.mainProduct}`}>

            {addCartIsError && [401, 403].includes((addCartError as any)?.response?.status) &&
                <ErrorComponent message={(addCartError as any)?.response?.data?.message || addCartError?.message as string}
                    showLoginButton={true} onClose={() => {
                        addcartResetError()
                    }
                    } />}

            {addFavIsError && [401, 403].includes((addFavError as any)?.response?.status) && <ErrorComponent
                message={(addFavError as any)?.response?.data?.message || addFavError?.message as string}
                showLoginButton={true}
                onClose={() => {
                    addFavResetError()
                }
                } />}


            {removeFavIsError && [401, 403].includes((removeFavError as any)?.response?.status) && <ErrorComponent
                message={(removeFavError as any)?.response?.data?.message || removeFavError?.message as string}
                showLoginButton={true}
                onClose={() => {
                    removeFavResetError()
                }
                }
            />}

            <section className={`${style.product}`}>
                <div className={`${style.imgcontainer}`}>
                    <Link to={`/product/${product._id}`} >

                        {/* <img
                         loading={location.pathname.includes('allproducts') ? 'lazy' : "eager"} 
                        src={productImage ? productImage : notAvailableimage}
                         alt="" 
                         style={{ pointerEvents: "none" }} /> */}


                        {/* CLOUDINARY VERSION */}
                        {/* <img
                            src={getBlurredCloudinaryUrl(productImage) || notAvailableimage} // Show blurred version by default
                            data-src={productImage} // Actual image will be loaded when in view
                            alt={product.productName}
                            className={style.lazy_blur}
                            loading="lazy" // Native lazy loading support
                            style={{
                                width: '100%',
                                // height: 'auto',
                                transition: 'filter 0.4s ease',
                            }}
                            onLoad={(e) => {
                                const img = e.currentTarget;
                            
                                // If we're still on the blurred URL, swap to the real one:
                                if (img.src.includes('/e_blur:1000,q_10/')) {
                                  img.src = productImage;      // 2) load the real image
                                } else {
                                  // Otherwise, we just loaded the real image → remove the blur class
                                  img.classList.remove(style.lazy_blur);
                                  img.removeAttribute('data-src');
                                }
                              }}
                            /> */}

                        <img
                            src={productImage} // Show blurred version by default
                            alt={product.productName}
                            className={`${style.lazy_blur} transition-blur duration-500 ease-in-out ${imgLoading ? '!blur-md' : 'blur-0'} `}
                            loading="lazy" // Native lazy loading support
                            style={{
                                width: '100%',
                                // height: 'auto',
                                transition: 'filter 0.4s ease',
                            }}

                            onLoad={(e) => {
                                let img = e.currentTarget
                                // img.removeAttribute(style.lazy_blur)
                                setImgLoading(false)
                            }}
                        />

                    </Link>
                    <IconButton
                        sx={{ backgroundColor: "fff" }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFavourite()
                        }}>
                        {immdFavState ? (<FavoriteIcon sx={{
                            fill: `red`
                        }} />) :
                            <FavoriteBorderIcon sx={{
                                fill: `#0a0a0a`
                            }} />}
                    </IconButton>
                </div>

                <div className={`${style.descriptioncontainer}`}>
                    <Link to={`/product/${product._id}`} className='pt-[10px] pb-[10px] flex h-full flex-col justify-between '>
                        <p>{product.productName}</p>
                        <p>Price <span>₹</span><span>{product.price}</span></p>

                        <div className={`${style.rating}`}>
                            <span>Rating: </span>
                            <span>
                                <StarRating rating={rating} />
                            </span>
                        </div>
                    </Link>

                    <Button
                        variant="contained"
                        className={style.addtocart}
                        onClick={handleCart}
                        sx={{ display: "flex", margin: "5px auto" }}
                    >
                        {isInCart ? (
                            removeCartPending ? (
                                <CircularProgress size={24} sx={{ color: "#fafafa" }} />
                            ) : (
                                "Remove from Cart"
                            )
                        ) : addCartPending ? (
                            <CircularProgress size={24} sx={{ color: "#fafafa" }} />
                        ) : (
                            "Add to Cart"
                        )}

                    </Button>
                </div>
            </section>
        </div>

    )
}

export default Products