import { ChangeEvent, useEffect, useState } from 'react'
import style from './SingleProduct.module.css'
import { Button, IconButton, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'


import { CartItem, ProductType } from '../../Types/types';

// import products from '../../Utils/product';
import { Link, useParams } from 'react-router-dom';

import { FaStar } from "react-icons/fa";
import StarRating from '../StarRating/StarRating';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAddToCart, useFetchCart, useRemoveFromCart, useRemoveQuantityFromCart } from '../../apiList/cartApi';
import { useAddToFavourite, useFetchFavourite, useRemoveFavourite } from '../../apiList/favouriteApi';
import { useFetchProducts } from '../../apiList/productApi';
import UserReview from '../Review/UserReview';
import OthersReview from '../Review/OthersReview';
import { useFetchReview } from '../../apiList/reviewApi';

type reviewprouducts = {
    reviewername: (string | null),
    review: (string | null),
    email: (string | null),
    stars: (number | null)
}

const SingleProduct = () => {
    let { id: paramsid } = useParams()

    const { data: products, isLoading, error } = useFetchProducts();

    let { data: cartItems, isLoading: cartLoading, isError: cartIsError, error: cartError } = useFetchCart()

    let {data:reviewItems, isLoading:reviewIsLoading,isError:reviewIsError, error:reviewError} = useFetchReview(paramsid as string)


    // let products = useSelector((state: RootState) => state.products.products)

    const [product, setProduct] = useState<ProductType | null>(null)

    const [tempQuantity, setTempQuantity] = useState<number>(1)
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);


    const [isFavourite, setIsFavourite] = useState<boolean>(false)
    // const [review, setReview] = useState<reviewprouducts>({
    //     reviewername: null,
    //     review: null,
    //     email: null,
    //     stars: null
    // })
    const [selectedColor, setSelectedColor] = useState(product?.availableColors[0]); // Default to first color
    const [selectedSize, setSelectedSize] = useState(product?.availableSizes[0]);

    // const [selectedStars, setSelectedStars] = useState(0);
    // const [hoveredStars, setHoveredStars] = useState(0);

    const [showUsersReview, setshowUserReview] = useState<boolean>(true);
    const [activeReview, setactiveReview] = useState<boolean>(true);


    // const handleReviewChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = event.target;
    //     setReview(prev => {
    //         return { ...prev, [name]: value }
    //     })
    // }


    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size)
    }

    // const handleStarClick = (star: number) => {
    //     setSelectedStars(star);
    // };

    let { mutate: addCartmutate } = useAddToCart()
    const { mutate: removeFromCartMutation } = useRemoveFromCart();
    const { mutate: removeSingleQuantity } = useRemoveQuantityFromCart()

    let { mutate: removeFavourite, isPending: removeFavPending, isError: removeFavIsError, error: removeFavError, } = useRemoveFavourite()

    let { mutate: addFavourite, isPending: addFavPending, isError: addFavIsError, error: addFavError, } = useAddToFavourite()

    const { data: favourites, isLoading: favLoading, isError: favIsError } = useFetchFavourite();

    const handleFavourite = () => {
        // console.log("size from favourties", product.size)
        // console.log("colors from favourties", product.color)
        if (isFavourite) {

            if (product)
                removeFavourite({ productId: product._id, size: product.size, color: product.color });
        } else {
            if (product)
                addFavourite({ productId: product._id, size: product.size, color: product.color });
        }
        setIsFavourite(!isFavourite);
    };

    const handleQuantity = (id: string, action: "increment" | "decrement") => {
        const maxStock = product?.availableStocks || 0;

        // console.log(maxStock)
        if (action === "increment" && currentQuantity < maxStock) {
            setCurrentQuantity(p => Math.min((p as number) + 1, maxStock))
            addCartmutate({ productId: id, quantity: 1, price: product?.price }); // Send only the increment change
        }
        else if (action === "decrement" && currentQuantity > 1) {
            setCurrentQuantity(p => Math.max((p as number) - 1, 1))
            removeSingleQuantity({ id, quantity: 1 }); // Send only the decrement change
        }
    }


    useEffect(() => {
        setProduct(() => {
            // console.log(products)
            let product = products?.find(({ _id }: { _id: string }) => _id === paramsid)
            // console.log(product)
            if (!product) {
                return null
            }
            return product
        }

        )
    }, [])


    useEffect(() => {
        if (cartItems && Array.isArray(cartItems)) {
            const foundItem = cartItems.find((item: CartItem) => {
                // console.log(item)
                return item.productId._id === product?._id
            });

            // console.log("foundItem", foundItem)
            // console.log("caling addtocat btn change functionity useeffect")
            if (foundItem) {
                setIsInCart(true);
                setTempQuantity(foundItem.quantity);
                setCurrentQuantity(foundItem.quantity)
            } else {
                setIsInCart(false);
                setTempQuantity(1);
                setCurrentQuantity(1);
            }
        }
    }, [cartItems, product]);


    useEffect(() => {
        if (favourites && favourites.items && product) {
            const exists = favourites.items.some((fav: any) => {
                // console.log("favourites product Id",fav.productId)
                // console.log("product._id",product._id)
                return fav.productId._id === product._id
            });
            setIsFavourite(exists);
        }
    }, [favourites, product?._id]);

    if (!product) return;

    return (
        <>
            <main className={`${style.maincontainer}`}>


                <div className={`${style.navigationcontiner}`}>
                    <Link to={'/'}>
                        Home
                    </Link>
                    {'>'}
                    <span>{product?.productName} lovelovelove</span>
                </div>

                <section className={`${style.productMainInfo}`}>

                    <section className={`${style.imagecontainer}`}>

                        <aside className={`${style.sideimgContainer}`}>
                            {product.images.map((image: string, i: number) =>
                                <div key={i} className={`${style.singleSideImg}`} tabIndex={0}>
                                    <img src={image} alt="image 1" />
                                </div>
                            )}
                        </aside>

                        <div className={`${style.mainImgContainer}`}>
                            <img src={product.images[0]} alt="Selected Image" />
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
                            {product.availableSizes.map((size, i) =>
                                <button key={i} onClick={() => handleSizeSelect(size)}>
                                    <p>{size}</p>
                                </button>
                            )}
                        </div>

                        <div className={`${style.selectedColor}`}>
                            {/* <p>{product.color}</p> */}
                        </div>

                        <div className={`${style.colorsContainer}`}>
                            {product.availableColors.map(color =>
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
                            )}
                        </div>

                        <div className={`${style.quantityContainer}`}>
                            <p>Quantity</p>
                            <div className={`${style.quantityBtns}`}>

                                <IconButton
                                    disabled={currentQuantity <= 1}
                                    onClick={() => handleQuantity(product._id, "decrement")}>
                                    <RemoveIcon />
                                </IconButton>
                                {currentQuantity}
                                <IconButton
                                    disabled={currentQuantity >= product.availableStocks}
                                    onClick={() => handleQuantity(product._id, "increment")}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </div>


                        <section className={`${style.transactionBtns}`}>
                            <div>
                                {!isInCart ? <Button variant='contained'
                                    className={`${style.addToCartBtn}`}
                                    onClick={() => addCartmutate({ productId: product._id, quantity: 1, price: product.price })}

                                >
                                    Add to Cart
                                </Button>
                                    :
                                    <Button variant='contained'
                                        className={`${style.addToCartBtn}`}
                                        onClick={() => removeFromCartMutation(product._id)}

                                    >
                                        Remove from Cart
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

                            <Button variant='contained' className={`${style.buynowBtn}`}>
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
                    // (<section className={`${style.reviewContainer}`}>
                    //     {/* <p className={`${style.reviewheading}`}>Review our product</p> */}

                    //     {/* <span className={`${style.reviewStars}`}>
                    //      {review.stars}
                    // </span> */}


                    //     <div className={`${style.reviewStars}`}>
                    //         {[1, 2, 3, 4, 5].map((star) => (
                    //             <FaStar
                    //                 key={star}
                    //                 size={24}
                    //                 // className={selectedStars >= star ? style.activeStar : style.inactiveStar}
                    //                 className={`
                    //                     ${star <= (hoveredStars || selectedStars) ? style.activeStar : style.inactiveStar}
                    //                     ${style.reviewstars}
                    //                 `}
                    //                 onMouseEnter={() => setHoveredStars(star)} // Hover effect
                    //                 onMouseLeave={() => setHoveredStars(0)} // Reset hover
                    //                 onClick={() => handleStarClick(star)}
                    //             />
                    //         ))}
                    //     </div>

                    //     <div className={`${style.reiviewDescription}`}>
                    //         <textarea name="review" id="" placeholder='Write a Review' rows={1}
                    //             value={review.review as string}
                    //             onChange={handleReviewChange}
                    //         >
                    //         </textarea>
                    //     </div>

                    //     <div className={`${style.reviewerAccountInfo}`}>

                    //         {/* <label htmlFor="">Name</label> */}
                    //         <TextField type="text" name="reviewerName"
                    //             placeholder='Enter Name'

                    //             value={review.reviewername}
                    //             onChange={handleReviewChange}
                    //             className={`${style.reviewtextField}`}
                    //         />




                    //         {/* <label htmlFor="">Email</label> */}
                    //         <TextField type="email" name="email"
                    //             placeholder='Enter Email'
                    //             value={review.email}
                    //             onChange={handleReviewChange}
                    //             className={`${style.reviewtextField}`}


                    //         />
                    //     </div>

                    //     <div className={`${style.submitContainer}`}>
                    //         <Button variant='contained'>
                    //             Submit
                    //         </Button>
                    //     </div>
                    // </section>)
                    <UserReview currentProductId={paramsid} reviewItems={reviewItems} />
                        :
                        // <section className={`${style.othersMainReview}`}>
                        //     {/* <p> See Others Review</p> */}


                        //     <div className={`${style.innerReviewDiv}`}>
                        //         {product.reviews.map(singleReview =>
                        //             <div className={`${style.singleReviewContainer}`}>
                        //                 <div>
                        //                     <StarRating rating={singleReview.stars} />
                        //                 </div>
                        //                 <div className={`${style.userinfoContainer}`}>
                        //                     <img src={singleReview.profileImg} alt="" />
                        //                     <p>{singleReview.ownerName}</p>
                        //                 </div>

                        //                 <div>
                        //                     <p>{singleReview.description}</p>
                        //                 </div>
                        //             </div>
                        //         )}
                        //     </div>


                        // </section>
                        <OthersReview reviewItems={reviewItems} product={product} />

                    }
                </div>

            </main>
        </>
    )
}

export default SingleProduct