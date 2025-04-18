import { useEffect, useState } from 'react'

import Banner1 from '../../assets/subcarousel/S_BANNER_2.webp'
import Banner2 from '../../assets/subcarousel/S_BANNER_3.webp'
import Banner3 from '../../assets/subcarousel/S_BANNER_4.webp'
import Banner4 from '../../assets/subcarousel/subbanner1.webp'

const images: string[] = [
    Banner1, Banner2, Banner3, Banner4, Banner2, Banner4, Banner2, Banner4, Banner2
]

const SubCarousel = () => {

    const [imgCarouselIndex, setimgCarouselIndex] = useState<number>(0)

    useEffect(() => {
        if (imgCarouselIndex === images.length - 1) {
            setimgCarouselIndex(0)
        }
        else {
            setimgCarouselIndex(prev => prev + 1 % images.length)
        }
    }, [])

    // const prevSlide = () => {
    //     setimgCarouselIndex(prev => (prev - 1 + images.length) % images.length)
    // }

    // const nextSlide = () => {
    //     setimgCarouselIndex(prev => prev + 1 % images.length)
    // }

    return (
        // <main className={`${style.subcarousel_main}`}>
        //     <div className={`${style.innerDiv}`}>

        //         {images.map(image =>
        //             <div className={`${style.imageDiv}`}>
        //                 <img src={image} alt="image for collection" className={`${style.imageContent}`} />
        //             </div>
        //         )}
        //     </div>

        //     <button onClick={() => prevSlide()}>
        //         <ArrowBackIosNewIcon />
        //     </button>
        //     <button onClick={() => nextSlide()}>
        //         <ArrowForwardIosIcon />
        //     </button>
        // </main>

        // THE SEOND VERSION
    //     <main className={`${style.subcarousel_main}`}>
    //         <Swiper
    //     modules={[Navigation, Pagination]}
    //     slidesPerView={3} // Show 3 images at a time
    //     spaceBetween={20} // Adjust spacing between images
    //     navigation // Enable next/prev buttons
    //     pagination={{ clickable: true }} // Enable pagination dots
    //     loop={true} // Infinite scrolling effect
    //     style={{ width: "100vw", height: "450px" }} 
    // >
    //     {images.map((img, index) => (
    //         <SwiperSlide key={index}>
    //             <img src={img} alt={`Slide ${index}`} className="imageContent" />
    //         </SwiperSlide>
    //     ))}
    // </Swiper>
    //     </main>
        
    // THE THIRD VERSION
  //   <div className={`${style.carouselContainer}`}>
  //   <Swiper
  //     slidesPerView={3} // Always shows 3 images
  //     spaceBetween={30} // Space between images
  //     navigation={true} // Left & right arrows
  //     pagination={{ clickable: true }} // Dots below the images
  //     loop={true} // Infinite scrolling
  //     modules={[Navigation, Pagination]}
  //     className={`${style.swiperContainer}`}
  //   >
  //     {images.map((image, index) => (
  //       <SwiperSlide key={index} className={`${style.swiperSlide}`}>
  //         <img src={image} alt={`Slide ${index}`} className={`${style.carouselImage}`} />
  //       </SwiperSlide>
  //     ))}
  //   </Swiper>
  // </div>

  <div>
    
  </div>
    )
}

export default SubCarousel