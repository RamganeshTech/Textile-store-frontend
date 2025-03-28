import React from 'react'
import style from '../SingleProduct/SingleProduct.module.css'
import { ProductType, ReviewType } from '../../Types/types'
import StarRating from '../StarRating/StarRating'
import { useFetchReview } from '../../apiList/reviewApi'

type OthersReviewProps ={
    product:ProductType,
    reviewItems: ReviewType[]
}

interface SingleReviewType {
    _id?: string
    userName: string,
    stars: number,
    description: string,
    userId:string
    profileImg:string,
}

const OthersReview = ({product, reviewItems}:OthersReviewProps) => {

    
  return (
    <section className={`${style.othersMainReview}`}>
    {/* <p> See Others Review</p> */}


    <div className={`${style.innerReviewDiv}`}>
        {reviewItems && reviewItems?.length>0 && reviewItems?.map((singleReview:SingleReviewType) =>
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