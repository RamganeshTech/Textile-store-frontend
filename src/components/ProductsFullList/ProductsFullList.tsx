import React from 'react';
import style from './ProductsFullList.module.css';

import {ProductType} from '../../Types/types'
import Products from '../../subcomponents/Products/Products';

interface ProductsDisplayProps {
  productsList: ProductType[];
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ productsList }) => {
  return (
    <div className={style.productsGrid}>
      {productsList.length > 0 ? (
        productsList.map((product) => (
        <Products key={product.id} product={product}  />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductsDisplay;
