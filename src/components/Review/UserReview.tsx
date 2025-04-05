import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import style from '../SingleProduct/SingleProduct.module.css'
import { Button, CircularProgress, TextField } from '@mui/material';
import { FaStar } from 'react-icons/fa';
import { useCreateReview, useDeleteReview, useEditReview } from '../../apiList/reviewApi';
import { ReviewType } from '../../Types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type reviewprouducts = {
    reviewername: (string | null),
    review: (string | null),
    email: (string | null),
    // stars: (number | null)
}

type UserReviewProps = {
    reviewItems: ReviewType[],
    currentProductId: string | undefined,
}


const UserReview = ({ reviewItems, currentProductId }: UserReviewProps) => {


    let user = useSelector((state: RootState) => state.user)
    // let user = { userId: "67e50bcd420994f6168c1020" }

    // console.log("redux user", user)

    const [review, setReview] = useState<reviewprouducts>({
        reviewername: null,
        review: null,
        email: null,
        // stars: null
    })

    const [selectedStars, setSelectedStars] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [currentReview, setCurrentReview] = useState<ReviewType>({
        userName: "",
        description: "",
        profileImg: "",
        stars: 0,
        userId: "",
        _id: ""
    });

    const [reviewCreated, setReviewCreated] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleStarClick = (star: number) => {
        setSelectedStars(star);
    };

    const handleReviewChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setReview(prev => {
            return { ...prev, [name]: value }
        })
    }

    let { mutate: createReviewMutate, isSuccess, isPending: createReviewPending, isError: createReviewIsError, error: createReviewError } = useCreateReview()
    let { mutate: editReviewMutate, isPending: editReviewPending, isError: editReviewIsError, error: editReviewError } = useEditReview()
    let { mutate: deleteReviewMutate, isPending: deleteReviewPending, isError: deleteReviewIsError, error: deleteReviewError } = useDeleteReview()

    // NEWLY ADDED
    let yourReview = useMemo(() => {
        if (!reviewItems) return null;
        return reviewItems.find(review => {
            // console.log(review.userId, "review.userId")
            // console.log(user.userId,"user.userId" )
            return review.userId === user.userId
        }
        )
    }, [reviewItems])


    const getCurrentReview = () => {
        // let review = reviewItems.find(review => {
        //     // console.log(review.userId, "review.userId")
        //     // console.log(user.userId,"user.userId" )
        //     return review.userId === user.userId
        // })
        console.log("is review avaible", review)
        if (yourReview) {
            setCurrentReview({
                description: yourReview?.description as string,
                userId: yourReview?.userId as string,
                stars: (yourReview?.stars || 0),
                profileImg: yourReview?.profileImg as string,
                userName: yourReview?.userName as string,
                _id: yourReview?._id
            })

            setReviewCreated(true)
        }
        else {
            setReviewCreated(false)
        }

    }


    const handleSubmit = () => {
        console.log("selectedStars", selectedStars)
        createReviewMutate({ productId: (currentProductId as string), description: review.review, star: selectedStars })
        if (isSuccess) {
            setReviewCreated(true)
        }
    }

    const handleDeleteReview = () => {
        deleteReviewMutate({ productId: (currentProductId as string), id: currentReview._id as string })
        setReviewCreated(false);
        setCurrentReview({
            userName: "",
            description: "",
            profileImg: "",
            stars: 0,
            userId: "",
            _id: ""
        });
        setReview({ reviewername: null, review: null, email: null });
        // setIsEditing(false)
    }

    const handleEditReview = () => {
        // console.log(currentReview)
        if (currentReview) {
            console.log("selectedStars in edit review update", selectedStars)
            editReviewMutate({
                productId: currentProductId as string,
                id: currentReview._id as string,
                description: review.review || currentReview.description,
                stars: selectedStars || currentReview.stars
            });

            setIsEditing(false);
            setReviewCreated(true);  // Ensure form appears

        }
    }

    const handleCancelUpdateReview = () => {
        console.log("getting called")
        setIsEditing(false)
        setReviewCreated(true)
        // setCurrentReview({
        //     userName: "",
        //     description: "",
        //     profileImg: "",
        //     stars: 0,
        //     userId: "",
        //     _id: ""
        // })
    }

    const handleEnableEditing = () => {
        setIsEditing(true);
        setReviewCreated(false);
        setReview({
            reviewername: yourReview?.userName || null,
            review: yourReview?.description || null,
            email: user.email || ""
        })
        setSelectedStars(yourReview?.stars || 0)
        // Ensure form appears
    }

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && event.target instanceof Node && !containerRef.current.contains(event.target)) {
                handleCancelUpdateReview();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleCancelUpdateReview]);


    useEffect(() => {
        getCurrentReview()
        // console.log(currentReview)
    }, [reviewItems, user.userId])
    return (
        <section ref={containerRef} className={`${style.reviewContainer}   !flex !justify-center !items-center`}>
            {/* <p className={`${style.reviewheading}`}>Review our product</p> */}

            {/* <span className={`${style.reviewStars}`}>
     {review.stars}
</span> */}

            {reviewCreated ?
                <div className={`${style.reviewDisplay}  w-full sm:w-[90%] flex flex-col justify-center items-center gap-5`}>
                    <p className={`${style.reviewheading}`}>Your Review</p>

                    <div className={`${style.reviewStars}`}>
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                size={24}
                                className={i < currentReview!.stars ? style.activeStar : style.inactiveStar}
                            />
                        ))}
                    </div>

                    <p className={` ${style.reviewText} text-lg  `}>{currentReview?.description}</p>
                    {/* <p className={`${style.reviewerName}`}><span className={`text-lg font-semibold`}>By:</span> {currentReview?.userName}</p> */}

                    <div className={`${style.buttonContainer} w-[40%] flex justify-center items-center gap-4`}>
                        <Button variant='contained' onClick={handleEnableEditing}
                        >Edit</Button>
                        <Button variant='contained' onClick={handleDeleteReview} color='error' sx={{
                            width: {
                                xs: "83px",
                                lg:"83px",
                            }

                        }}>
                            {deleteReviewPending ? <CircularProgress sx={{ color: "#fafafa" }} size={23} thickness={5} /> : "Delete"}
                        </Button>
                    </div>
                </div>
                :
                <>

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
                                onClick={() => {
                                    console.log("Star clicked:", star);
                                    handleStarClick(star);
                                }}
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

                        <TextField type="text" name="reviewername"
                            label="Name"
                            placeholder='Enter Name'
                            value={review.reviewername}
                            onChange={handleReviewChange}
                            className={`${style.reviewtextField}`}
                        />

                        <TextField type="email" name="email"
                            label="Email"
                            placeholder='Enter Email'

                            value={review.email}
                            onChange={handleReviewChange}
                            className={`${style.reviewtextField}`}

                            sx={{
                                marginTop: {
                                    xs: "5px",
                                    md: "10px",
                                    lg: "10px"
                                }
                            }}
                        />
                    </div>

                    <div className={`${style.submitContainer}`}>
                        {isEditing ? (
                            <div className='w-full flex flex-col-reverse sm:!flex-row !justify-center !gap-[10px] !items-center '>
                                {/* <Button variant='contained' color='error' className='!w-[20%] !py-0 !h-[40px] !text-lg' onClick={handleCancelUpdateReview}> */}
                                {/* <Button variant='contained' color='error' className='!w-[30%] sm:!w-[20%] md:!w-[30%] lg:!w-[20%] md:!text-[20px] sm:!text-[16px] sm:!h-[40px] !text-[16px] !h-[25px] sm:!text-2xl' onClick={handleCancelUpdateReview}>
                                    Cancel
                                </Button> */}

                                <Button variant='contained' className=' sm:!h-[40px] !text-[16px] !p-[10px] !h-[25px] lg:!text-[20px] md:!text-[16px]  text-nowrap' onClick={handleEditReview}>
                                    {/* POST */}
                                    {editReviewPending ? <CircularProgress sx={{ color: "#fafafa" }} size={25} thickness={5} /> : "POST"}

                                </Button>
                            </div>

                        ) : (
                            <Button variant='contained' onClick={handleSubmit}>
                                {createReviewPending ? <CircularProgress sx={{ color: "#fafafa" }} size={25} thickness={5} /> : "Submit"}
                            </Button>
                        )}
                    </div>
                </>
            }

        </section>
    )
}

export default UserReview