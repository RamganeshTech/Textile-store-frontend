import React, { useEffect, useMemo, useState } from 'react'
import styles from '../../pages/Favourite/Favourite.module.css'
import { FavouriteItem, ProductType } from '../../Types/types'
import { Button, CircularProgress, IconButton } from '@mui/material'
import StarRating from '../../components/StarRating/StarRating'
import { DeleteOutline } from '@mui/icons-material'
import { useRemoveFavourite } from '../../apiList/favouriteApi'
import { useAddToCart, useFetchCart, useRemoveFromCart } from '../../apiList/cartApi'
import { Link, useNavigate } from 'react-router-dom'

type FavouriteSingleProps = {
    item: FavouriteItem,
    // setFavourites: React.Dispatch<React.SetStateAction<FavouriteItem[]>>,
    products: ProductType[]
}

// if (isFavourite) {
//     removeFavourite({ productId: product._id, size: selectedSize, color: selectedColor });
// } else {
//     addFavourite({ productId: product._id, size: selectedSize, color: selectedColor });
// }

const FavouriteSingle = ({ item, products }: FavouriteSingleProps) => {

    // const [isInCart, setIsInCart] = useState(false);
    // console.log("favourite current item", item, )

    let navigate = useNavigate()

    const product = useMemo(() => {
        return products.find((product: ProductType) => product._id === item.productId._id)
    }, [products, item.productId._id])

    const { data: cartItems } = useFetchCart();

    let { mutate: removeFavourite, isPending: removefavpending, isError, error, } = useRemoveFavourite()
    let { mutate: addCartmutate, isPending: addcartPending } = useAddToCart()
    const { mutate: removeCartmutate, isPending: removeCartPending } = useRemoveFromCart();

    const isInCart = useMemo(() => {
        return cartItems?.some((cartitem: any) => cartitem.productId._id === item.productId._id) || false;
    }, [cartItems, item._id]);

    // const isInCart = cartItems?.some((cartitem: any) =>{
    //     // console.log("usememo cartItem", cartitem.productId)
    //     // console.log("usememo favourite indiviitem", item.productId)
    //     return cartitem.productId._id === item.productId._id && cartitem.size === item.size && cartitem.color === item.color
    // } )

    const handleRemove = (id: string) => {
        // setFavourites(prev => prev.filter(item => item._id !== id));
        // console.log("favourite items id", id)
        removeFavourite({ productId: id, })

    };

    const handleCart = () => {
        console.log("isInCart", isInCart)
        let firstAvailable: { size: (string | null), color: (string | null) } = {
            size: null,
            color: null
        };
        if (product) {
            product?.sizeVariants?.some(size => {
                return size?.colors?.some(color => {
                    console.log("size in firstavailable", size)
                    console.log("color in firstavailable", color)
                    console.log("availability in firstavailable", color?.availableStock)
                    if (color.availableStock > 0) {
                        firstAvailable.size = size.size;
                        firstAvailable.color = color.color;
                        return true; // Stop inner loop
                    }
                    return false;
                });
            });

            if (isInCart) {
                removeCartmutate({ productId: item.productId._id, size: firstAvailable.size, color: firstAvailable.color });
            } else {
                addCartmutate({ productId: item.productId._id, quantity: 1, price: item.productId.price, size: firstAvailable.size, color: firstAvailable.color })
            }
        }

        // setIsInCart(!isInCart);
    };

    console.log(isInCart)

    return (
        <div key={item?._id} className={styles.favouriteItem}>
            {/* <Link to={`/product/${item.productId._id}`}> */}
            <img src={item?.image} alt={item?.productId.productName} className={styles.image} onClick={() => navigate(`/product/${item.productId._id}`)} />
            {/* </Link> */}

            <div className={styles.itemDetails}>
                <Link to={`/product/${item.productId._id}`}>

                    <h2>{item.productId.productName} watcheswatches watches  watcheswatches watches  watcheswatches watches  watches watches Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat nostrum dolore vitae ipsa, totam voluptatem sit mollitia ad earum dicta.</h2>
                    <p>Price: <span>${item?.productId.price?.toFixed(2)}</span></p>
                    <div className='flex gap-[5px] items-center'>
                        {/* <p>size: <span className=' !font-semibold !text-[16px] sm:!text-[18px] md:!text-[20px]'>{item.size}</span></p> */}
                        {/* {" "} */}
                        {/* <p>color: <span className=' !font-semibold  !text-[16px] sm:!text-[18px] md:!text-[20px]'>{item.color}</span></p> */}
                    </div>
                    <p><StarRating rating={item?.productId.reviewStar ?? 0} /></p>
                </Link>

                <div className={`${styles.btncontainer}`}>
                    <Button variant="contained" className={styles.addtoCartBtn} onClick={handleCart}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "190px",
                                md: "190px",
                                lg: "190px",
                                xl: "143px !important"
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
                            <CircularProgress size={24} sx={{ color: "#fafafa", width: "100%" }} />
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