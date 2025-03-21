import React from 'react'
// import styles from '../../components/AddToCart/AddToCart.module.css'
import styles from '../../pages/AddToCart/AddToCart.module.css'
import  RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import { CartItem } from '../../Types/types';
import  AddIcon  from '@mui/icons-material/Add';

type AddToCartSingleProps = {
    item: CartItem,
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

const AddToCartSingle = ({item, setCart}: AddToCartSingleProps) => {

    // Function to handle quantity changes
    const handleQuantity = (id: number, action: "increment" | "decrement") => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    action === "increment"
                      ? Math.min(item.quantity + 1, item.availableStocks)
                      : Math.max(item.quantity - 1, 1),
                }
              : item
          )
        );
      };
    
      // Function to remove an item from the cart
      const handleDelete = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      };

  return (
   <div key={item.id} className={styles.cartItem}>
              <img src={item.productImg} alt={item.productTitle} />
  
              <div className={styles.itemDetails}>
                <h2>{item.productTitle} watcheswa tcheswatches watcheswatcheswatcheswatches watcheswatches  watcheswatches watches</h2>
                <p>Price: <span>${item.price.toFixed(2)}</span></p>
  
               
                <div className={styles.quantityContainer}>
                  <IconButton className={styles.iconBtn} onClick={() => handleQuantity(item.id, "decrement")}>
                    <RemoveIcon />
                  </IconButton>
                  {item.quantity}
                  <IconButton className={styles.iconBtn} onClick={() => handleQuantity(item.id, "increment")}>
                    <AddIcon />
                  </IconButton>
                </div>
  
                {/* Delete Button */}
                <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
  )
}

export default AddToCartSingle