import React from 'react'
import style from './ProductsList.module.css'

import EastIcon from '@mui/icons-material/East';
import Products from '../../subcomponents/Products/Products';

import { Link } from 'react-router-dom';
import { ProductType } from '../../Types/types';

export type ProductsListProp = {
    products:ProductType[],
    width?: string,
}

const ProductsList:React.FC<ProductsListProp> = ({products, width="w-[100%]"}) => {

    return (
        <main className={`${style.maincontainer} ${width}`}>
           <Link to={'/allproducts'}>
           <div className={`${style.viewallcontainer}`}>
                <p>View all</p>
                <span><EastIcon /></span>
            </div>
            </Link>

            <section className={`${style.productslist}`}>
                <div className={`${style.innerDiv}`}>
                    {products.slice(0,8).map((product, i) =>
                        <Products key={i} product={product} />
                    )}
                 
                </div>
            </section>
        </main>
    )
}

export default ProductsList