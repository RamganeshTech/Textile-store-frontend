import React from 'react';
import style from './ProductsFullList.module.css';

import {ProductType} from '../../Types/types'
import Products from '../../subcomponents/Products/Products';

interface ProductsDisplayProps {
  productsList: ProductType[] | undefined;
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ productsList }) => {
  return (
    <>
    {productsList && productsList.length > 0 ? (
      <div className={style.productsGrid}>
      {productsList.map((product) => (
          <Products key={product._id} product={product} />
      ))}
        </div>
    ) : (
      <section className="h-[100vh] w-[100%] flex items-start justify-center !mt-8 ">
        <p className="text-2xl lg:text-4xl sm:text-2xl">No Products Found</p>
      </section>
    )}
    </>
)
};

export default ProductsDisplay;
