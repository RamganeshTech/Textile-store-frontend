import React, { useEffect, useState } from 'react'
import styles from '../../pages/Favourite/Favourite.module.css'
import { FavouriteItem } from '../../Types/types'
import { Button, CircularProgress, IconButton } from '@mui/material'
import StarRating from '../../components/StarRating/StarRating'
import { DeleteOutline } from '@mui/icons-material'
import { useRemoveFavourite } from '../../apiList/favouriteApi'
import { useAddToCart, useFetchCart, useRemoveFromCart } from '../../apiList/cartApi'

type FavouriteSingleProps = {
    item: FavouriteItem,
    // setFavourites: React.Dispatch<React.SetStateAction<FavouriteItem[]>>,
}

const FavouriteSingle = ({ item, }: FavouriteSingleProps) => {

    const [isInCart, setIsInCart] = useState(false);

    const { data: cartItems } = useFetchCart();

    let { mutate: removeFavourite, isPending: removefavpending, isError, error, } = useRemoveFavourite()
    let { mutate: addCartmutate, isPending: addcartPending } = useAddToCart()
    const { mutate: removeCartmutate, isPending: removeCartPending } = useRemoveFromCart();

    const handleRemove = (id: string) => {
        // setFavourites(prev => prev.filter(item => item._id !== id));
        console.log("favourite items id", id)
        removeFavourite({ productId: id, size: item.size, color: item.color })

    };

    const handleCart = () => {
        if (isInCart) {
            removeCartmutate(item.productId._id);
        } else {
            addCartmutate({ productId: item.productId._id, quantity: 1, price: item.productId.price })
        }
        setIsInCart(!isInCart);
    };


    useEffect(() => {
        console.log(cartItems)
        if (cartItems) {
            const exists = cartItems.some((cartitem: any) => {
                return cartitem.productId._id === item.productId._id
            });
            setIsInCart(exists);
        }
    }, [cartItems, item._id]);

    return (
        <div key={item?._id} className={styles.favouriteItem}>
            <img src={item?.productId.images[0]} alt={item?.productId.productName} className={styles.image} />

            <div className={styles.itemDetails}>
                <h2>{item.productId.productName} watcheswatches watches  watcheswatches watches  watcheswatches watches  watches watches Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat nostrum dolore vitae ipsa, totam voluptatem sit mollitia ad earum dicta.</h2>
                <p>Price: <span>${item?.productId.price?.toFixed(2)}</span></p>
                {/* <p>Rating: ⭐{item.rating}</p> */}
                <p><StarRating rating={item?.productId.reviewStar ?? 0} /></p>

                <div className={`${styles.btncontainer}`}>
                    <Button variant="contained" className={styles.addtoCartBtn} onClick={handleCart}
                    sx={{
                        width:{
                            xs:"100%",
                            sm:"190px",
                            md:"190px",
                            lg:"190px",
                            xl:"143px !important"
                        }
                    }}
                    >
                        {/* Add To Cart */}

                        {isInCart ? (
                            removeCartPending ? (
                                <CircularProgress size={24} thickness={4} sx={{ color: "#fafafa" }} />
                            ) : (
                                "Remove from Cart"
                            )
                        ) : addcartPending ? (
                            <CircularProgress size={24} sx={{ color: "#fafafa", width:"100%" }} />
                        ) : (
                            "Add to Cart"
                        )}
                    </Button>

                    <IconButton disabled={removefavpending} className={styles.deleteBtn} onClick={() => handleRemove(item.productId._id)}>
                        {removefavpending ? <CircularProgress size={24} thickness={4} sx={{ color: "#fafafa" }} /> : <DeleteOutline />}


                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default FavouriteSingle