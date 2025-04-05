import { useEffect, useMemo, useState } from 'react'
import style from './Products.module.css'

import { Button, CircularProgress, IconButton } from '@mui/material'

import img1 from '../../assets/subcarousel/S_BANNER_2.webp'

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { ProductType } from '../../Types/types';
import { Link, useLocation } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating';
import { useAddToCart, useFetchCart, useRemoveFromCart } from '../../apiList/cartApi';
import { useAddToFavourite, useFetchFavourite, useRemoveFavourite } from '../../apiList/favouriteApi';

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

    let { mutate: addCartmutate, isPending: addCartPending } = useAddToCart()

    let { mutate: removeFavourite, isPending: removeFavPending, isError: removeFavIsError, error: removeFavError, } = useRemoveFavourite()

    let { mutate: addFavourite, isPending: addFavPending, isError: addFavIsError, error: addFavError, } = useAddToFavourite()

    const { data: favourites, isLoading, isError } = useFetchFavourite();

    const handleFavourite = () => {

        const firstAvailable = product.sizeVariants.find(sizeVariant =>
            sizeVariant.colors.some(color => color.availableStock > 0)
        );

        const selectedSize = firstAvailable?.size || '';
        const selectedColor = firstAvailable?.colors.find(c => c.availableStock > 0)?.color || '';

        if (!selectedSize || !selectedColor) {
            console.warn("No available size/color found for this product.");
            return;
        }

        if (isFavourite) {
            removeFavourite({ productId: product._id, size: selectedSize, color: selectedColor });
        } else {
            addFavourite({ productId: product._id, size: selectedSize, color: selectedColor });
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
        return cartItems?.some((item: any) => item.productId._id === product._id) || false;
    }, [cartItems, product._id]);

    const isFavourite = useMemo(() => {
        return favourites?.items?.some((fav: any) => fav.productId._id === product._id) || false;
    }, [favourites, product._id]);

    const handleCart = () => {
        if (isInCart) {
            removeCartmutate({productId: product._id, size: firstSelectedSize, color:firstSelectedColor });
        } else {
            addCartmutate({ productId: product._id, quantity: 1, price: product.price, size: firstSelectedSize, color:firstSelectedColor });
        }
        // setIsInCart(!isInCart);
    };
    
    // useEffect(() => {
    //     if (cartItems) {
    //         const exists = cartItems.some((item: any) => {
    //             return item.productId._id === product._id
    //         });
    //         setIsInCart(exists);
    //     }
    // }, [cartItems, product._id]);


    // useEffect(() => {
    //     if (favourites && favourites.items) {
    //         const exists = favourites.items.some((fav: any) => {
    //             // console.log("favourites product Id",fav.productId)
    //             // console.log("product._id",product._id)
    //             return fav.productId._id === product._id
    //         });
    //         setIsFavourite(exists);
    //     }
    // }, [favourites, product._id]);

    return (
        <div className={`${style.mainProduct}`}>
            {/* <Link to={`/product/${product.id}`}> */}

            <section className={`${style.product}`}>
                <div className={`${style.imgcontainer}`}>
                    <Link to={`/product/${product._id}`} >
                        <img src={productImage ? productImage : notAvailableimage} alt="" style={{ pointerEvents: "none" }} />
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
                                {/* {renderStars(rating)} */}
                                <StarRating rating={rating} />
                            </span>
                        </div>
                    </Link>
                    {/* <Button variant='contained' className={`${style.addtocart}`}
                        onClick={() => addCartmutate({ productId: product._id, quantity: 1, price: product.price })}
                        sx={{
                            // height: "25%",
                            // width: "90%",
                            display: "flex",
                            margin: "5px auto",
                        }}
                    >Add to cart</Button> */}

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
            {/* </Link> */}
        </div>

    )
}

export default Products