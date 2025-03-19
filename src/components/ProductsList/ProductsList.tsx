import React, { useState } from 'react'
import style from './ProductsList.module.css'



import EastIcon from '@mui/icons-material/East';
import Products from '../../subcomponents/Products/Products';

const ProductsList: React.FC = () => {


   
    return (
        <main className={`${style.maincontainer}`}>
            <div className={`${style.viewallcontainer}`}>
                <p>View all</p>
                <span><EastIcon /></span>
            </div>

            <section className={`${style.productslist}`}>
                <div className={`${style.innerDiv}`}>
                  <Products />
                  <Products />
                  <Products />
                  <Products />
                  <Products />
                  <Products />
                  <Products />
                  <Products />
                  <Products />
                  <Products />
                </div>
            </section>
        </main>
    )
}

export default ProductsList