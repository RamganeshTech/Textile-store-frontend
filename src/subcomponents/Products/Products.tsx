import { useMemo, useState } from 'react'
import style from './Products.module.css'

import { Button, CircularProgress, IconButton } from '@mui/material'


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { ProductType } from '../../Types/types';
import { Link, useLocation } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating';
import { useAddToCart, useFetchCart, useRemoveFromCart } from '../../apiList/cartApi';
import { useAddToFavourite, useFetchFavourite, useRemoveFavourite } from '../../apiList/favouriteApi';
import ErrorComponent from '../../Shared/ErrorComponent/ErrorComponent';
import { AxiosError } from 'axios';

type singleProductprop = {
    product: ProductType
}

const Products: React.FC<singleProductprop> = ({ product }) => {

    let location = useLocation()
    const notAvailableimage = "https://th.bing.com/th/id/OIP.Skr-oJ6BWg_K65k5uDiMdgHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"

    // const [isFavourite, setIsFavourite] = useState<boolean>(false)
    // const [isInCart, setIsInCart] = useState(false);

    const [rating, setRating] = useState<number>(product.reviewStar);

    const { data: cartItems } = useFetchCart();
    const { mutate: removeCartmutate, isPending: removeCartPending } = useRemoveFromCart();

    let { mutate: addCartmutate, isPending: addCartPending, isError: addCartIsError, error: addCartError , reset:addcartResetError} = useAddToCart()

    let { mutate: removeFavourite, isPending: removeFavPending, isError: removeFavIsError, error: removeFavError, reset:removeFavResetError } = useRemoveFavourite()

    let { mutate: addFavourite, isPending: addFavPending, isError: addFavIsError, error: addFavError, reset:addFavResetError  } = useAddToFavourite()

    const { data: favourites, isLoading, isError } = useFetchFavourite();

    const handleFavourite = () => {

        // const firstAvailable = product.sizeVariants.map(sizeVariant =>
        //     sizeVariant.colors.find(color => color.availableStock > 0)
        // );

        // product.colorVariants.find(colors=> colors.color === firstAvailable?.colors.)

        // const selectedSize = firstAvailable?.size || '';
        // const selectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

        // if (!selectedSize || !selectedColor) {
        //     console.warn("No available size/color found for this product.");
        //     return;
        // }

        if (isFavourite) {
            removeFavourite({ productId: product._id, });
        } else {
            addFavourite({ productId: product._id,});
        }
        // setIsFavourite(!isFavourite);
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
        return product.colorVariants.find(cv => cv.color === firstSelectedColor)?.images?.[0] || '';
    }, [product.colorVariants, firstSelectedColor]);

    const isInCart = useMemo(() => {
        return cartItems?.some((item: any) => item?.productId?._id === product._id) || false;
    }, [cartItems, product._id]);

    const isFavourite = useMemo(() => {
        return favourites?.items?.some((fav: any) => fav?.productId?._id === product._id) || false;
    }, [favourites, product._id]);

    const handleCart = () => {
        console.log("addCartPending", addCartPending)
        if (isInCart && !removeCartPending) {
            removeCartmutate({productId: product._id, size: firstSelectedSize, color:firstSelectedColor });
        } else if(!addCartPending) {
            addCartmutate({ productId: product._id, quantity: 1, price: product.price, size: firstSelectedSize, color:firstSelectedColor });
        }
        // setIsInCart(!isInCart);
    };

    // console.log(addCartError && (AxiosError(addCartError))?.status)
    // console.log(addCartError)
    return (
        <div className={`${style.mainProduct}`}>

             {addCartIsError &&   [401, 403].includes((addCartError as any)?.response?.status)  && 
             <ErrorComponent message={(addCartError as any)?.response?.data?.message || addCartError?.message as string} 
             showLoginButton={true} onClose={()=> { 
              addcartResetError()
             }
            }/>}

           {addFavIsError && [401, 403].includes((addFavError as any)?.response?.status) && <ErrorComponent 
           message={(addFavError as any)?.response?.data?.message || addFavError?.message as string}
           showLoginButton={true}
           onClose={()=> { 
              addFavResetError()
             }
            } />}


            {removeFavIsError && [401, 403].includes((removeFavError as any)?.response?.status) && <ErrorComponent 
            message={(removeFavError as any)?.response?.data?.message || removeFavError?.message as string}
            showLoginButton={true} 
            onClose={()=> { 
                removeFavResetError()
               }
              } 
            />}

            <section className={`${style.product}`}>
                <div className={`${style.imgcontainer}`}>
                    <Link to={`/product/${product._id}`} >
                        <img loading={location.pathname.includes('allproducts') ? 'lazy' : "eager"} 
                        src={productImage ? productImage : notAvailableimage} alt="" style={{ pointerEvents: "none" }} />
                    </Link>
                    <IconButton
                        sx={{ backgroundColor: "fff" }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFavourite()
                        }}>
                        {isFavourite ? (<FavoriteIcon sx={{
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
                        <p>M.R.P <span>₹</span><span>{product.price}</span></p>

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