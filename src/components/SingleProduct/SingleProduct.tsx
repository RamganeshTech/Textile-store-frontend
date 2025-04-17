import { useEffect, useMemo, useState } from 'react'
import style from './SingleProduct.module.css'
import { Button, CircularProgress, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'


import { CartItem, ProductType } from '../../Types/types';

// import products from '../../Utils/product';
import { Link, useNavigate, useParams } from 'react-router-dom';

import StarRating from '../StarRating/StarRating';
import { AppDispatch } from '../../store/store';
import { useAddToCart, useFetchCart, useRemoveFromCart, useRemoveQuantityFromCart } from '../../apiList/cartApi';
import { useAddToFavourite, useFetchFavourite, useRemoveFavourite } from '../../apiList/favouriteApi';
import { useFetchProducts } from '../../apiList/productApi';
import UserReview from '../Review/UserReview';
import OthersReview from '../Review/OthersReview';
import { useFetchReview } from '../../apiList/reviewApi';
import { clearItems, setItems } from '../../slices/buyItems';
import { useDispatch } from 'react-redux';
import Loading from '../LoadingState/Loading';
import ErrorComponent from '../../Shared/ErrorComponent/ErrorComponent';
import RelatedItem from '../RelatedItem/RelatedItem';


const SingleProduct = () => {
    let { id: paramsid } = useParams()
    let navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const { data: products, isLoading: singleProductLoading } = useFetchProducts();

    let { data: cartItems } = useFetchCart()

    let { data: reviewItems, isLoading: reviewIsLoading, isError: reviewIsError, error: reviewError } = useFetchReview(paramsid as string)

    // let products = useSelector((state: RootState) => state.products.products)

    const [product, setProduct] = useState<ProductType | null>(null)

    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);
    const [customLoading, setCustomLoading] = useState<boolean>(false)

    const [selectedImage, setSelectedImage] = useState<string | null>(null);




    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");


    // const [selectedStars, setSelectedStars] = useState(0);
    // const [hoveredStars, setHoveredStars] = useState(0);

    const [showUsersReview, setshowUserReview] = useState<boolean>(true);
    const [activeReview, setactiveReview] = useState<boolean>(true);

    const [relatedItems, setRelatedItems] = useState<[]>([]);



    let { mutate: addCartmutate, isPending: addCartPending, isError: addCartIsError, error: addCartError, reset: addcartResetError } = useAddToCart()
    const { mutate: removeFromCartMutation, isPending: removeCartPending } = useRemoveFromCart();
    const { mutate: removeSingleQuantity, isPending: removeQuantiytyPending, error: removeQuantityError, isError: isRemoveQuanError, reset: removeFavQuanReset } = useRemoveQuantityFromCart()

    const { data: favourites, } = useFetchFavourite();
    let { mutate: addFavourite, isError: addFavIsError, error: addFavError, reset: addFavResetError } = useAddToFavourite()
    let { mutate: removeFavourite, isError: removeFavIsError, error: removeFavError, reset: removeFavResetError } = useRemoveFavourite()

    useEffect(() => {
        setCustomLoading(true)
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
            setCustomLoading(false)

        }


    }, [products, paramsid]);


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



    const availableStock = useMemo(() => product?.sizeVariants.find(sv => sv.size === selectedSize)
        ?.colors.find(c => c.color === selectedColor)?.availableStock || 0, [product, selectedSize, selectedColor])

    const selectedColorImages = useMemo(() => product?.colorVariants.find(cv => cv.color === selectedColor)?.images || [], [product, selectedSize, selectedColor])

    let isFavourite = useMemo(() => {
        if (favourites && favourites.items && product) {
            return favourites?.items.some(
                (fav: any) => {
                    return fav?.productId?._id === product._id
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
        if (isFavourite) {

            if (product)
                removeFavourite({ productId: product._id });
        } else {
            if (product)
                addFavourite({ productId: product._id });
            // setIsFavourite(!isFavourite);
        }
    };

    const handleQuantity = (id: string, action: "increment" | "decrement") => {
        // const maxStock = product?.availableStocks || 0;

        if (!product) return;

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
            dispatch(clearItems())
            dispatch(setItems({ itemId: product._id, productImg: selectedImage, productName: product.productName, singleQuantityPrice: product.price, quantity: currentQuantity, size: selectedSize, color: selectedColor }));
        }
        navigate('/payment')
    }

    // selected image
    useEffect(() => {
        if (selectedColorImages.length > 0) {
            setSelectedImage(selectedColorImages[0]);
        }
    }, [selectedColorImages]);

    useEffect(() => {
        if (product)
            setRelatedItems(() => {
                let filteredItems = products.filter((prod: ProductType) => {
                    return product.category === prod.category
                })

                return filteredItems || []
            })
    }, [product])

    if (singleProductLoading || customLoading) {
        return <div className='mt-[70px] w-[100vw] h-[100vh]  flex items-center justify-center'>
            <Loading />
        </div>
    }

    if (!product) return;

    return (
        <>
            <main className={`${style.maincontainer}`}>

                {addCartIsError && [401, 403].includes((addCartError as any)?.response?.status) &&
                    <ErrorComponent message={(addCartError as any)?.response?.data?.message || addCartError?.message as string}
                        showLoginButton={true} onClose={() => {
                            addcartResetError()
                        }
                        } />}

                {isRemoveQuanError && [401, 403].includes((removeQuantityError as any)?.response?.status) &&
                    <ErrorComponent message={(removeQuantityError as any)?.response?.data?.message || removeQuantityError?.message as string}
                        showLoginButton={true} onClose={() => {
                            removeFavQuanReset()
                        }
                        } />}

                {addFavIsError && [401, 403].includes((addFavError as any)?.response?.status) &&
                    <ErrorComponent
                        message={(addFavError as any)?.response?.data?.message || addFavError?.message as string}
                        showLoginButton={true}
                        onClose={() => {
                            addFavResetError()
                        }
                        } />}


                {removeFavIsError && [401, 403].includes((removeFavError as any)?.response?.status) &&
                    <ErrorComponent
                        message={(removeFavError as any)?.response?.data?.message || removeFavError?.message as string}
                        showLoginButton={true}
                        onClose={() => {
                            removeFavResetError()
                        }
                        }
                    />}

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
                                <div key={i} className={`${style.singleSideImg}`}
                                    onClick={() => setSelectedImage(image)}
                                    style={{ border: selectedImage === image ? '2px solid black' : 'none' }}
                                    tabIndex={0}>
                                    <img src={image} alt={`Side image ${i}`} />
                                </div>
                            ))}
                        </aside>

                        <div className={`${style.mainImgContainer}`}>
                            {selectedImage ? <img src={selectedImage} alt="Selected" /> : selectedColorImages.length > 0 ? (
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
                                    // const colorDetails = product.colorVariants.find(cv => cv.color === colorObj.color);

                                    return (
                                        <button
                                            key={colorObj.color}
                                            className={`${style.colors} ${selectedColor === colorObj.color ? "selected" : ""}`}
                                            style={{
                                                backgroundColor: colorObj.color,
                                                border: "1px solid #0a0a0a",
                                                // outline: selectedColor === colorObj.color ? "3px solid #fafafa18" : "none",
                                                boxShadow: selectedColor === colorObj.color ? "0 0 5px rgba(0, 0, 0, 1)" : "none",
                                                padding: selectedColor === colorObj.color ? "5px !important" : "0",
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
                        <UserReview currentProductId={paramsid} reviewItems={reviewIsError ? (reviewError as any).response.data.data : reviewItems} />
                        :
                        <OthersReview reviewItems={reviewItems} reviewIsError={reviewIsError} reviewIsLoading={reviewIsLoading} reviewError={reviewError} />
                    }
                </div>


                <div className={style.relatedcontainer}>
                    <div className={style.relatedinnerdiv}>
                        <h1 className={style.relatedHeading}>People also searched for</h1>
                        <div className={style.relatedlist}>
                            {relatedItems.map((item: ProductType) => {

                                return (
                                <>
                                <Link className='w-[15%] h-[100%]' to={`/product/${item._id}`} key={item._id}>
                                <RelatedItem item={item} product={product} />
                                </Link>
                                {/* <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                <RelatedItem item={item} product={product} />
                                 */}
                                </>
                            )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SingleProduct