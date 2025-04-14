import React from 'react'
import style from '../SingleProduct/SingleProduct.module.css'
import { ProductType, ReviewType } from '../../Types/types'
import StarRating from '../StarRating/StarRating'
import { useFetchReview } from '../../apiList/reviewApi'
import { CircularProgress } from '@mui/material'

type OthersReviewProps = {
    product: ProductType,
    reviewItems: ReviewType[],
    reviewIsError: boolean,
    reviewIsLoading: boolean,
    reviewError: any
}

interface SingleReviewType {
    _id?: string
    userName: string,
    stars: number,
    description: string,
    userId: string
    profileImg: string,
}

const OthersReview = ({ product, reviewItems, reviewError, reviewIsError, reviewIsLoading }: OthersReviewProps) => {

console.log(reviewItems)
console.log(reviewError)
console.log(reviewIsError)
    return (
        <section className={`${style.othersMainReview}`}>
            {/* <p> See Others Review</p> */}


            <div className={`${style.innerReviewDiv}`}>

                {reviewIsLoading && (<div className='h-[30vh] flex justify-center items-center'>
                    <CircularProgress sx={{ color: "#000000" }} size={25} thickness={5} /></div>)}

                {!reviewIsLoading && reviewIsError && (<div className='h-[30vh] text-[20px] sm:text-[26px] flex justify-center items-center'>
                    <p>{reviewError?.response?.data?.message || reviewError.message || "something went wrong"}</p>
                </div>)}

                {!reviewIsLoading && !reviewIsError && reviewItems && reviewItems?.length > 0 && reviewItems?.map((singleReview: SingleReviewType) =>
                    <div key={singleReview._id} className={`${style.singleReviewContainer}`}>
                        <div>
                            <StarRating rating={singleReview.stars} />
                        </div>
                        <div className={`${style.userinfoContainer}`}>
                            <img src={singleReview.profileImg} alt="" />
                            <p>{singleReview.userName}</p>
                        </div>

                        <div>
                            <p>{singleReview.description}</p>
                        </div>
                    </div>
                )}
            </div>


        </section>
    )
}

export default OthersReview