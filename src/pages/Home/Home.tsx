// import React from 'react'
import { useState, useEffect, useRef } from "react";
import style from './Home.module.css'
import Carousel from "../../components/Carousel/Carousel";
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
    <div className={`mt-[${navbarHeight}px]`}>
        <Carousel />
    </div>
  )
}

export default Home;


