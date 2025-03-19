// import React from 'react'
import { useState, useEffect, useRef } from "react";
import style from './Home.module.css'
import Carousel from "../../components/Carousel/Carousel";
import SubCarousel from "../../components/Subcarousel/SubCarousel";
import ProductsList from "../../components/ProductsList/ProductsList";
const Home = () => {
  
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
      const navbar = document.querySelector("nav"); // Select the navbar element
      if (navbar) {
        console.log(navbar.getBoundingClientRect().height)
        setNavbarHeight(navbar.getBoundingClientRect().height || 70);
      }
    }, []);
  
  return (
    <div className={`mt-[70px] ${style.maincontainer}`}>
        <Carousel />
        <SubCarousel />
        <ProductsList />
    </div>
  )
}

export default Home;


