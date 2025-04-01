import { useEffect, useState } from 'react'
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

    const [isFavourite, setIsFavourite] = useState<boolean>(false)
    const [isInCart, setIsInCart] = useState(false);

    const [rating, setRating] = useState<number>(product.reviewStar);

    // Function to render stars dynamically
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<StarIcon key={i} className={`${style.staricon}`} sx={{
                    fill: "gold",
                    // fontSize: "clamp(16px, 2vw, 24px)" 
                }} />);
            } else if (i - 0.5 === rating) {
                stars.push(<StarIcon key={i} className={`${style.staricon}`} sx={{
                    fill: "gold", opacity: 0.5,
                    // fontSize: "clamp(16px, 2vw, 24px)" 
                }} />);
            } else {
                stars.push(<StarBorderIcon key={i} className={`${style.staricon}`} sx={{
                    fill: "gray",
                    // fontSize: "clamp(16px, 2vw, 24px)" 
                }} />);
            }
        }
        return stars;
    };

    const { data: cartItems } = useFetchCart();
    const { mutate: removeCartmutate, isPending: removeCartPending } = useRemoveFromCart();

    let { mutate: addCartmutate, isPending: addCartPending } = useAddToCart()

    let { mutate: removeFavourite, isPending: removeFavPending, isError: removeFavIsError, error: removeFavError, } = useRemoveFavourite()

    let { mutate: addFavourite, isPending: addFavPending, isError: addFavIsError, error: addFavError, } = useAddToFavourite()

    const { data: favourites, isLoading, isError } = useFetchFavourite();

    const handleFavourite = () => {
        if (isFavourite) {
            removeFavourite({ productId: product._id, size: product.size, color: product.color });
        } else {
            addFavourite({ productId: product._id, size: product.size, color: product.color });
        }
        setIsFavourite(!isFavourite);
    };


    const handleCart = () => {
        if (isInCart) {
            removeCartmutate(product._id);
        } else {
            addCartmutate({ productId: product._id, quantity: 1, price: product.price });
        }
        setIsInCart(!isInCart);
    };



    useEffect(() => {
        if (cartItems) {
            const exists = cartItems.some((item: any) => {
                return item.productId._id === product._id
            });
            setIsInCart(exists);
        }
    }, [cartItems, product._id]);


    useEffect(() => {
        if (favourites && favourites.items) {
            const exists = favourites.items.some((fav: any) => {
                // console.log("favourites product Id",fav.productId)
                // console.log("product._id",product._id)
                return fav.productId._id === product._id
            });
            setIsFavourite(exists);
        }
    }, [favourites, product._id]);

    return (
        <div className={`${style.mainProduct}`}>
            {/* <Link to={`/product/${product.id}`}> */}

            <section className={`${style.product}`}>
                <div className={`${style.imgcontainer}`}>
                    <Link to={`/product/${product._id}`} >
                        <img src={product.images[0]} alt="" style={{ pointerEvents: "none" }} />
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
                        sx={{ display: "flex", margin: "5px auto"}}
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