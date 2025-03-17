import { useEffect, useRef, useState } from "react";
import style from './Carousel.module.css'

import Banner1 from '../../assets/maincarousel/BANNER-1.webp'
import Banner2 from '../../assets/maincarousel/BANNER-13.webp'
import Banner3 from '../../assets/maincarousel/BANNER-10.webp'
import Banner4 from '../../assets/maincarousel/BANNER-14.webp'
import Banner5 from '../../assets/maincarousel/BANNER-15.webp'

const images: string[] = [
  Banner1, Banner2, Banner3, Banner4, Banner5
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };


  useEffect(() => {
    // Set up interval using setTimeout for smoother auto-scroll
    const scrollImage = () => {
      if (currentIndex === images.length - 1) {
        setTimeout(() => {
          setCurrentIndex(0);
        }, 1000);
      }
      else {

        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    };

    // Scroll every 3 seconds
    const interval = setTimeout(() => {
      scrollImage();
    }, 3000); // Delay of 3 seconds before the next slide

    return () => clearTimeout(interval); // Clear the timeout when component unmounts
  }, [currentIndex]); // Dependency on currentIndex so it triggers each time it updates


  useEffect(() => {
    if (carouselRef.current) {
      const navbarHeight = document.querySelector("nav")
        ? (document.querySelector("nav") as HTMLElement).offsetHeight
        : 70; // Default value

      const calculatedHeight = `calc(100vh - ${navbarHeight}px)`; // Correct height calculation
      carouselRef.current.style.height = calculatedHeight;
      console.log("Calculated Height: ", calculatedHeight);
    }
  }, []);




  return (
    <div ref={carouselRef} className={`${style.carousel}`}>
      <div
        className={`${style.carouselInner}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.8s ease-in-out", // Smooth transition effect
        }}
      >

        {images.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index + 1}`} className={`${style.image}`} />
        ))}

      </div>

      {/* Button for navigation */}
   
     <button
        className={`${style.carouselButton} ${style.prevButton}`}
        onClick={prevSlide}
      >
        PREV
        {/* &#10094; */}
      </button>
    

      <button
        className={`${style.carouselButton} ${style.nextButton}`}
        onClick={nextSlide}
      >
        NEXT
        <span></span>
        {/* &#10095; */}
      </button>
    </div>
  );
};

export default Carousel;