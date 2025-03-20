import { ChangeEvent, useEffect, useState } from 'react'
import style from './SingleProduct.module.css'
import { Button, IconButton, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'


import { ProductType } from '../../Types/types';

import products from '../../Utils/product';
import { Link, useParams } from 'react-router-dom';

import { FaStar, FaRegStar } from "react-icons/fa";

type RatingProps = {
    rating: number; // Expects a number between 0-5
};

const StarRating: React.FC<RatingProps> = ({ rating }) => {
    return (
        <div style={{ display: "flex", gap: "5px" }}>
            {Array.from({ length: 5 }, (_, index) =>
                index < rating ? (
                    <FaStar key={index} color="gold" size={20} /> // Filled star
                ) : (
                    <FaRegStar key={index} color="gray" size={20} /> // Empty star
                )
            )}
        </div>
    );
};


type reviewprouducts = {
    reviewername: (string | null),
    review: (string | null),
    email: (string | null),
    stars: (number | null)
}

const SingleProduct = () => {
    let { id: paramsid } = useParams()

    const [product, setProduct] = useState<ProductType | null>(null)

    const [quantity, setQuantity] = useState<number>(1)
    const [toFavourites, setToFavourites] = useState<boolean>(false)
    const [review, setReview] = useState<reviewprouducts>({
        reviewername: null,
        review: null,
        email: null,
        stars: null
    })
    const [selectedColor, setSelectedColor] = useState(product?.availableColors[0]); // Default to first color
    const [selectedSize, setSelectedSize] = useState(product?.availableSizes[0]);

    const [selectedStars, setSelectedStars] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);

    const [showUsersReview, setshowUserReview] = useState<boolean>(true);
    const [activeReview, setactiveReview] = useState<boolean>(true);


    const handleReviewChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setReview(prev => {
            return { ...prev, [name]: value }
        })
    }


    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size)
    }

    const handleStarClick = (star: number) => {
        setSelectedStars(star);
    };

    const handleQuantity = (action: string) => {

        if (!product) return;

        if (action === "increment") {
            setQuantity(p => {

                if (p >= product.availableStocks) {
                    return p
                }

                return p + 1
            })
        }

        if (action === "decrement") {
            setQuantity(p => {

                if (p <= 1) {
                    return 1
                }

                return p - 1
            })
        }
    }


    useEffect(() => {
        setProduct(() => {
            let product = products.find(({ id }) => id === Number(paramsid))
            if (!product) {
                return null
            }
            return product
        }

        )
    }, [])

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
                            {product.images.map((image: string) =>
                                <div className={`${style.singleSideImg}`} tabIndex={0}>
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
                            {product.availableSizes.map(size =>
                                <button onClick={() => handleSizeSelect(size)}>
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
                                        border:"1px solid #0a0a0a",
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
                                <IconButton onClick={() => handleQuantity("increment")}>
                                    <AddIcon />
                                </IconButton>
                                {quantity}
                                <IconButton onClick={() => handleQuantity("decrement")}>
                                    <RemoveIcon />
                                </IconButton>
                            </div>
                        </div>


                        <section className={`${style.transactionBtns}`}>
                            <div>
                                <Button variant='contained'
                                    className={`${style.addToCartBtn}`}
                                >
                                    Add to Cart
                                </Button>

                                <IconButton
                                    sx={{ backgroundColor: "fff" }}
                                    onClick={() => setToFavourites(!toFavourites)}>
                                    {toFavourites ? (<FavoriteIcon sx={{
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
                        onClick={()=> {
                            setshowUserReview(false)
                            setactiveReview(false)
                        }}
                        className={`${activeReview ? "" : style.activeReviewComponent }`}
                        tabIndex={0}>
                            <p
                            className={`${!activeReview ? `text-[#1976d2]` : ""}`}
                            >Review Our Product</p>
                        </div>
                        <div onClick={()=> {
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

                    {!showUsersReview ? <section className={`${style.reviewContainer}`}>
                        {/* <p className={`${style.reviewheading}`}>Review our product</p> */}

                        {/* <span className={`${style.reviewStars}`}>
                         {review.stars}
                    </span> */}


                        <div className={`${style.reviewStars}`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    size={24}
                                    // className={selectedStars >= star ? style.activeStar : style.inactiveStar}
                                    className={`
                                        ${star <= (hoveredStars || selectedStars) ? style.activeStar : style.inactiveStar}
                                        ${style.reviewstars}
                                    `}
                                    onMouseEnter={() => setHoveredStars(star)} // Hover effect
                                    onMouseLeave={() => setHoveredStars(0)} // Reset hover
                                    onClick={() => handleStarClick(star)}
                                />
                            ))}
                        </div>

                        <div className={`${style.reiviewDescription}`}>
                            <textarea name="review" id="" placeholder='Write a Review' rows={1}
                                value={review.review as string}
                                onChange={handleReviewChange}
                            >
                            </textarea>
                        </div>

                        <div className={`${style.reviewerAccountInfo}`}>

                            {/* <label htmlFor="">Name</label> */}
                            <TextField type="text" name="reviewerName"
                                placeholder='Enter Name'

                                value={review.reviewername}
                                onChange={handleReviewChange}
                                className={`${style.reviewtextField}`}
                            />




                            {/* <label htmlFor="">Email</label> */}
                            <TextField type="email" name="email"
                                placeholder='Enter Email'
                                value={review.email}
                                onChange={handleReviewChange}
                                className={`${style.reviewtextField}`}


                            />
                        </div>

                        <div className={`${style.submitContainer}`}>
                            <Button variant='contained'>
                                Submit
                            </Button>
                        </div>
                    </section>
                        :
                        <section className={`${style.othersMainReview}`}>
                            {/* <p> See Others Review</p> */}


                            <div className={`${style.innerReviewDiv}`}>
                                {product.reviews.map(singleReview =>
                                    <div className={`${style.singleReviewContainer}`}>
                                        <div>
                                        <StarRating rating={singleReview.stars} />
                                        </div>
                                        <div  className={`${style.userinfoContainer}`}>
                                            <img src={singleReview.profileImg} alt="" />
                                            <p>{singleReview.ownerName}</p>
                                        </div>

                                        <div>
                                          <p>{singleReview.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>


                        </section>}
                </div>

            </main>
        </>
    )
}

export default SingleProduct