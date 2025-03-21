import React, { useState } from "react";
import styles from "./AddToCart.module.css"; // Import CSS module
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { CartItem } from "../../Types/types";
import AddToCartSingle from "../../subcomponents/AddtoCartSingle/AddToCartSingle";

// Define TypeScript interface for CartItem


// Sample Shopping Cart Data
const initialCart: CartItem[] = [
  {
    id: 1,
    productImg:  "https://picsum.photos/200/300?random=1",
    productTitle: "Wireless Headphones",
    price: 59.99,
    availableStocks: 10,
    quantity: 1,
  },
  {
    id: 2,
    productImg:  "https://picsum.photos/200/300?random=2",
    productTitle: "Smartwatch",
    price: 129.99,
    availableStocks: 5,
    quantity: 2,
  },
  {
    id: 3,
    productImg:  "https://picsum.photos/200/300?random=3",
    productTitle: "Gaming Mouse",
    price: 39.99,
    availableStocks: 15,
    quantity: 1,
  },
];

const AddToCart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className={styles.container}>
      <div className={styles.heading}>
      <h1>Shopping Cart</h1>

      </div>
      <section>
        {cart.map((item, index) => {
             console.log(`Rendering item: ${index}, Class: ${styles.cartItem}`);
            return (
          // <div key={item.id} className={styles.cartItem}>
          //   <img src={item.productImg} alt={item.productTitle} />

          //   <div className={styles.itemDetails}>
          //     <h2>{item.productTitle} watcheswa tcheswatches watcheswatcheswatcheswatches watcheswatches  watcheswatches watches</h2>
          //     <p>Price: <span>${item.price.toFixed(2)}</span></p>

             
          //     <div className={styles.quantityContainer}>
          //       <IconButton className={styles.iconBtn} onClick={() => handleQuantity(item.id, "decrement")}>
          //         <RemoveIcon />
          //       </IconButton>
          //       {item.quantity}
          //       <IconButton className={styles.iconBtn} onClick={() => handleQuantity(item.id, "increment")}>
          //         <AddIcon />
          //       </IconButton>
          //     </div>

          //     {/* Delete Button */}
          //     <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
          //       Delete
          //     </button>
          //   </div>
          // </div>
              <AddToCartSingle key={item.id} item={item} setCart={setCart} />
        )})}
      </section>

      {/* Total Section */}
      <section className={styles.totalContainer}>
        <p>Total Price: <span>${total.toFixed(2)}</span> </p>
        <p>Total Items: <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span> </p>
      </section>
    </main>
  );
};

export default AddToCart;
