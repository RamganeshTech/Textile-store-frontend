import { useState } from 'react'
import style from './Products.module.css'

import { Button, IconButton } from '@mui/material'

import img1 from '../../assets/subcarousel/S_BANNER_2.webp'

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { ProductType } from '../../Types/types';
import { Link } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating';

type singleProductprop = {
    product: ProductType
}

const Products: React.FC<singleProductprop> = ({ product }) => {

    const [toFavourites, setToFavourites] = useState<boolean>(false)

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

    // console.log(product)

    return (
        <div className={`${style.mainProduct}`}>
            {/* <Link to={`/product/${product.id}`}> */}
           
            <section className={`${style.product}`}>
                <div className={`${style.imgcontainer}`}>
                <Link to={`/product/${product._id}`} >
                    <img src={product.images[0]} alt=""  style={{ pointerEvents: "none" }} />
                </Link>
                    <IconButton
                        sx={{ backgroundColor: "fff" }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();  
                            setToFavourites(!toFavourites)}}>
                        {toFavourites ? (<FavoriteIcon sx={{
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
                            <StarRating rating={rating}  />
                        </span>
                    </div>
                    </Link>
                    <Button variant='contained' className={`${style.addtocart}`}
                        sx={{
                            // height: "25%",
                            // width: "90%",
                            display: "flex",
                            margin: "5px auto",
                        }}
                    >Add to cart</Button>
                </div>
            </section>
            {/* </Link> */}
        </div>

    )
}

export default Products