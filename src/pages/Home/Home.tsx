// import React from 'react'
import { useState, useEffect, useRef } from "react";
import style from './Home.module.css'
import Carousel from "../../components/Carousel/Carousel";
import SubCarousel from "../../components/Subcarousel/SubCarousel";
import ProductsList from "../../components/ProductsList/ProductsList";

// import products from '../../Utils/product';


import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../slices/products";
import { useFetchProducts } from "../../apiList/apiList";
import { AppDispatch, RootState } from "../../store/store";


const Home = () => {
  
    // const [navbarHeight, setNavbarHeight] = useState(0);

    // useEffect(() => {
    //   const navbar = document.querySelector("nav"); // Select the navbar element
    //   if (navbar) {
    //     console.log(navbar.getBoundingClientRect().height)
    //     setNavbarHeight(navbar.getBoundingClientRect().height || 70);
    //   }
    // }, []);


    const dispatch = useDispatch<AppDispatch>();
    const { data: products, isLoading, error } = useFetchProducts();
    const reduxProducts = useSelector((state: RootState) => state.products.products);

    // Sync React Query data to Redux
    useEffect(() => {
        if (products) {
            dispatch(setProducts(products));
        }
    }, [products, dispatch]);

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error: {(error as any).message}</p>;

console.log(products)

  
  return (
    <div className={`mt-[70px] ${style.maincontainer}`}>
        <Carousel />
        <SubCarousel />
        <ProductsList products={reduxProducts}/>
    </div>
  )
}

export default Home;


