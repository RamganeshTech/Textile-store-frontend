import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import style from './SingleProduct.module.css'
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'


import { CartItem, ProductType } from '../../Types/types';

// import products from '../../Utils/product';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FaStar } from "react-icons/fa";
import StarRating from '../StarRating/StarRating';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useAddToCart, useFetchCart, useRemoveFromCart, useRemoveQuantityFromCart } from '../../apiList/cartApi';
import { useAddToFavourite, useFetchFavourite, useRemoveFavourite } from '../../apiList/favouriteApi';
import { useFetchProducts } from '../../apiList/productApi';
import UserReview from '../Review/UserReview';
import OthersReview from '../Review/OthersReview';
import { useFetchReview } from '../../apiList/reviewApi';
import { setItems } from '../../slices/buyItems';
import { useDispatch } from 'react-redux';

type reviewprouducts = {
    reviewername: (string | null),
    review: (string | null),
    email: (string | null),
    stars: (number | null)
}

const SingleProduct = () => {
    let { id: paramsid } = useParams()
    let navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const { data: products, isLoading, error } = useFetchProducts();

    let { data: cartItems, isLoading: cartLoading, isError: cartIsError, error: cartError } = useFetchCart()

    let { data: reviewItems, isLoading: reviewIsLoading, isError: reviewIsError, error: reviewError } = useFetchReview(paramsid as string)

    // let products = useSelector((state: RootState) => state.products.products)

    const [product, setProduct] = useState<ProductType | null>(null)

    // const [tempQuantity, setTempQuantity] = useState<number>(1)
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);


    // const [isFavourite, setIsFavourite] = useState<boolean>(false)
    // const [review, setReview] = useState<reviewprouducts>({
    //     reviewername: null,
    //     review: null,
    //     email: null,
    //     stars: null
    // })
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");


    // const [selectedStars, setSelectedStars] = useState(0);
    // const [hoveredStars, setHoveredStars] = useState(0);

    const [showUsersReview, setshowUserReview] = useState<boolean>(true);
    const [activeReview, setactiveReview] = useState<boolean>(true);


    let { mutate: addCartmutate, isPending: addCartPending } = useAddToCart()
    const { mutate: removeFromCartMutation, isPending: removeCartPending } = useRemoveFromCart();
    const { mutate: removeSingleQuantity, isPending: removeQuantiytyPending } = useRemoveQuantityFromCart()

    const { data: favourites, isLoading: favLoading, isError: favIsError } = useFetchFavourite();
    let { mutate: addFavourite, isPending: addFavPending, isError: addFavIsError, error: addFavError, } = useAddToFavourite()
    let { mutate: removeFavourite, isPending: removeFavPending, isError: removeFavIsError, error: removeFavError, } = useRemoveFavourite()

    // useEffect(() => {
    //     setProduct(() => {
    //         // console.log(products)
    //         let product = products?.find(({ _id }: { _id: string }) => _id === paramsid)
    //         // console.log(product)
    //         if (!product) {
    //             return null
    //         }
    //         return product
    //     }
    //     )
    // }, [])



    // useEffect(() => {
    //     if (cartItems && Array.isArray(cartItems)) {
    //         const foundItem = cartItems.find((item: CartItem) => {
    //             // console.log(item)
    //             return item.productId._id === product?._id
    //         });

    //         // console.log("foundItem", foundItem)
    //         // console.log("caling addtocat btn change functionity useeffect")
    //         if (foundItem) {
    //             setIsInCart(true);
    //             // setTempQuantity(foundItem.quantity);
    //             setCurrentQuantity(foundItem.quantity)
    //         } else {
    //             setIsInCart(false);
    //             // setTempQuantity(1);
    //             setCurrentQuantity(1);
    //         }
    //     }
    // }, [cartItems, product]);

    // useEffect(() => {
    //     if (favourites && favourites.items && product) {
    //         const exists = favourites.items.some((fav: any) => {
    //             // console.log("favourites product Id",fav.productId)
    //             // console.log("product._id",product._id)
    //             return fav.productId._id === product._id
    //         });
    //         setIsFavourite(exists);
    //     }
    // }, [favourites, product?._id]);


    useEffect(() => {
        if (products) {
            const found = products.find(({ _id }: { _id: string }) => _id === paramsid);
            if (found) {
                setProduct(found);
                // Set defaults from nested structure
                if (found.colorVariants.length > 0) {
                    setSelectedColor(found.colorVariants[0].color);
                }
                if (found.sizeVariants.length > 0) {
                    setSelectedSize(found.sizeVariants[0].size);
                }
            } else {
                setProduct(null);
            }
            console.log("singleProduct", product)
        }


    }, [products, paramsid]);

    // console.log("singleProduct", product)
    console.log("favourites", favourites)


    useEffect(() => {
        if (cartItems && product) {
            const foundItem = cartItems.find((item: CartItem) =>
                item.productId._id === product._id &&
                item.size === selectedSize &&
                item.color === selectedColor
            );
            if (foundItem) {
                setIsInCart(true);
                // setTempQuantity(foundItem.quantity);
                setCurrentQuantity(foundItem.quantity);
            } else {
                setIsInCart(false);
                // setTempQuantity(1);
                setCurrentQuantity(1);
            }
        }
    }, [cartItems, product, selectedSize, selectedColor]);


    // Update favourite state based on favourites data
    // useEffect(() => {
    //     if (favourites && favourites.items && product) {
    //         const exists = favourites.items.some((fav: any) => fav.productId._id === product._id && fav.color === selectedColor && fav.size === selectedSize);
    //         isFavourite = exists
    //     }
    // }, [favourites, product?._id]);


    
    
      

    const availableStock = useMemo(() => product?.sizeVariants.find(sv => sv.size === selectedSize)
        ?.colors.find(c => c.color === selectedColor)?.availableStock || 0, [product, selectedSize, selectedColor])

    const selectedColorImages = useMemo(() => product?.colorVariants.find(cv => cv.color === selectedColor)?.images || [], [product, selectedColor])

    let isFavourite = useMemo(() => {
        if(favourites && favourites.items && product){
            return favourites?.items.some(
              (fav:any) =>{
                console.log("favourites", fav.productId)
                return fav.productId._id === product._id &&
                fav.size === selectedSize &&
                fav.color === selectedColor
              }

            );
        }
    }, [favourites, product, selectedSize, selectedColor]);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size)
    }

    const handleFavourite = () => {
        // console.log("size from favourties", selectedSize)
        // console.log("colors from favourties", selectedColor)
        if (isFavourite) {

            if (product)
                removeFavourite({ productId: product._id, size: selectedSize, color: selectedColor });
        } else {
            if (product)
                addFavourite({ productId: product._id, size: selectedSize, color: selectedColor });
            // setIsFavourite(!isFavourite);
        }
    };

    const handleQuantity = (id: string, action: "increment" | "decrement") => {
        // const maxStock = product?.availableStocks || 0;

        if (!product) return;

        // console.log(maxStock)
        if (action === "increment" && currentQuantity < availableStock) {
            setCurrentQuantity(p => Math.min((p as number) + 1, availableStock))
            addCartmutate({ productId: id, quantity: 1, price: product?.price, color: selectedColor, size: selectedSize }); // Send only the increment change
        }
        else if (action === "decrement" && currentQuantity > 1) {
            setCurrentQuantity(p => Math.max((p as number) - 1, 1))
            removeSingleQuantity({ id, quantity: 1, color: selectedColor, size: selectedSize }); // Send only the decrement change
        }
    }

    const handleBuyItem = () => {
        if (product) {
            dispatch(setItems({ itemId: product._id, singleQuantityPrice: product.price, quantity: currentQuantity, size: selectedSize, color: selectedColor }));
        }
        navigate('/payment')
    }


    if (!product) return;

    return (
        <>
            <main className={`${style.maincontainer}`}>
                <div className={`${style.navigationcontiner}`}>
                    <Link to={'/'}>
                        Home
                    </Link>
                    {'>'}
                    <span>{product?.productName} chudidhar with some professional</span>
                </div>

                <section className={`${style.productMainInfo}`}>
                    <section className={`${style.imagecontainer}`}>

                        <aside className={`${style.sideimgContainer}`}>
                            {/* {product.images.map((image: string, i: number) =>
                                <div key={i} className={`${style.singleSideImg}`} tabIndex={0}>
                                    <img src={image} alt="image 1" />
                                </div>
                            )} */}

                            {selectedColorImages.map((image: string, i: number) => (
                                <div key={i} className={`${style.singleSideImg}`} tabIndex={0}>
                                    <img src={image} alt={`Side image ${i}`} />
                                </div>
                            ))}
                        </aside>

                        <div className={`${style.mainImgContainer}`}>
                            {/* <img src={product.images[0]} alt="Selected Image" /> */}
                            {selectedColorImages.length > 0 ? (
                                <img src={selectedColorImages[0]} alt="Selected" />
                            ) : (
                                <div>No image available</div>
                            )}
                        </div>
                    </section>

                    <section className={`${style.productInfoContainer}`}>
                        <div className={`${style.productNameCont}`}>
                            <p>{product?.productName}</p>
                        </div>

                        <div className={`${style.ratingContainer}`}>
                            {/* <p>{product.reviewStar}</p> */}
                            <p>Rating</p><span><StarRating rating={product.reviewStar} /></span>
                        </div>

                        <div className={`${style.priceContainer}`}>
                            <p>₹{product.price}</p>
                        </div>

                        <div className={`${style.selectedSize}`}>
                            <p>Selected Size: <span>{selectedSize}</span></p>
                        </div>

                        <div className={`${style.sizeContainer}`}>
                            {/* {product.availableSizes.map((size, i) =>
                                <button key={i} onClick={() => handleSizeSelect(size)}>
                                    <p>{size}</p>
                                </button>
                            )} */}

                            {product.sizeVariants.map((variant, i) => (
                                <button className={`${selectedSize === variant.size ? "bg-black text-white" : "bg-white text-black"}`} key={i} onClick={() => handleSizeSelect(variant.size)}>
                                    <p>{variant.size}</p>
                                </button>
                            ))}
                        </div>

                        <div className={`${style.selectedColor}`}>
                            {/* <p>{product.color}</p> */}
                            {/* <p>Selected Color: <span>{selectedColor}</span></p> */}
                        </div>

                        <div className={`${style.colorsContainer}`}>
                            {/* {product.availableColors.map(color =>
                                // <button className={`${style.colors} bg-[${color}] `}></button>
                                <button
                                    className={`${style.colors} ${selectedColor === color ? "selected" : ""}`}
                                    style={{
                                        backgroundColor: color,
                                        border: "1px solid #0a0a0a",
                                        outline: selectedColor === color ? "3px solid white" : "none",
                                        boxShadow: selectedColor === color ? "0 0 5px rgba(0, 0, 0, 1)" : "none",
                                        // border: selectedColor === color ? "2px solid black" : "none",

                                        // width: "30px",
                                        // height: "30px",
                                        // borderRadius: "50%",
                                        // cursor: "pointer",
                                    }}
                                    onClick={() => handleColorSelect(color)}
                                ></button>
                            )} */}
                            {product.sizeVariants
                                .find(variant => variant.size === selectedSize)
                                ?.colors.map(colorObj => {
                                    const colorDetails = product.colorVariants.find(cv => cv.color === colorObj.color);

                                    return (
                                        <button
                                            key={colorObj.color}
                                            className={`${style.colors} ${selectedColor === colorObj.color ? "selected" : ""}`}
                                            style={{
                                                backgroundColor: colorObj.color,
                                                border: "1px solid #0a0a0a",
                                                outline: selectedColor === colorObj.color ? "3px solid white" : "none",
                                                boxShadow: selectedColor === colorObj.color ? "0 0 5px rgba(0, 0, 0, 1)" : "none",
                                            }}
                                            onClick={() => handleColorSelect(colorObj.color)}
                                        ></button>
                                    );
                                })}

                        </div>

                        <div className={`${style.quantityContainer}`}>
                            <p>Quantity</p>
                            <div className={`${style.quantityBtns}`}>
                                <IconButton
                                    disabled={currentQuantity <= 1}
                                    onClick={() => handleQuantity(product._id, "decrement")}>
                                    <RemoveIcon />
                                </IconButton>

                                <div style={{
                                    width: "20%",  // Set fixed width so the layout doesn’t shift
                                    height: "20%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // border:"2px solid red"
                                }}>
                                    {removeQuantiytyPending || addCartPending ? (
                                        <CircularProgress size={15} thickness={4} sx={{ color: "#000" }} />
                                    ) : (
                                        currentQuantity
                                    )}
                                </div>
                                <IconButton
                                    disabled={currentQuantity >= availableStock}
                                    onClick={() => handleQuantity(product._id, "increment")}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </div>

                        <section className={`${style.transactionBtns}`}>
                            <div>
                                {!isInCart ? <Button variant='contained'
                                    className={`${style.addToCartBtn}`}
                                    onClick={() => addCartmutate({ productId: product._id, quantity: currentQuantity, price: product.price, size: selectedSize, color: selectedColor })}
                                >
                                    {addCartPending ? <CircularProgress size={19} thickness={5} sx={{ color: "#fafafa" }} /> : "Add to Cart"}
                                </Button>
                                    :
                                    <Button variant='contained'
                                        className={`${style.addToCartBtn}`}
                                        onClick={() => removeFromCartMutation({ productId: product._id, size: selectedSize, color: selectedColor })}
                                    >
                                        {removeCartPending ? <CircularProgress size={19} thickness={5} sx={{ color: "#fafafa" }} /> : "Remove From Cart"}
                                    </Button>
                                }

                                <IconButton
                                    sx={{ backgroundColor: "fff" }}
                                    onClick={() => handleFavourite()}>
                                    {isFavourite ? (<FavoriteIcon sx={{
                                        fill: `red`,

                                    }} />) :
                                        <FavoriteBorderIcon sx={{
                                            fill: `#0a0a0a`,

                                        }} />}
                                </IconButton>
                            </div>

                            <Button variant='contained' className={`${style.buynowBtn}`} onClick={() => handleBuyItem()}>
                                Buy Now
                            </Button>
                        </section>

                    </section >
                </section>


                <section className={`${style.descriptionContainer}`}>
                    <p>Description</p>

                    <div>
                        <p>{product.description}</p>
                    </div>
                </section>

                <div className={`${style.reviewMainContainer}`}>

                    <nav className={`${style.reviewNavbar}`}>
                        <div
                            onClick={() => {
                                setshowUserReview(false)
                                setactiveReview(false)
                            }}
                            className={`${activeReview ? "" : style.activeReviewComponent}`}
                            tabIndex={0}>
                            <p
                                className={`${!activeReview ? `text-[#1976d2]` : ""}`}
                            >Review Our Product</p>
                        </div>
                        <div onClick={() => {
                            setactiveReview(true)
                            setshowUserReview(true)
                        }}
                            className={`${activeReview ? style.activeReviewComponent : ""}`}
                            tabIndex={0}>
                            <p
                                className={`${activeReview ? `text-[#1976d2]` : ""}`}
                            > See Others Review</p>
                        </div>
                    </nav>

                    {!showUsersReview ?
                        <UserReview currentProductId={paramsid} reviewItems={reviewItems} />
                        :
                        <OthersReview reviewItems={reviewItems} product={product} />
                    }
                </div>
            </main>
        </>
    )
}

export default SingleProduct