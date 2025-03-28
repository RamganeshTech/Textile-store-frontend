import React, { ReactNode, useState } from 'react'
// import styles from '../../components/AddToCart/AddToCart.module.css'
import styles from '../../pages/AddToCart/AddToCart.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import { CartItem } from '../../Types/types';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setCarts, updateQuantity } from '../../slices/cart';
import { addToCart, removeCartItems, useAddToCart, useRemoveFromCart, useRemoveQuantityFromCart } from '../../apiList/cartApi';
import { useMutation } from '@tanstack/react-query';




type AddToCartSingleProps = {
  item: CartItem,
  // setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

const AddToCartSingle = ({ item } : AddToCartSingleProps) => {
  
  let dispatch = useDispatch<AppDispatch>()

  const [tempQuantity, setTempQuantity] = useState<number>(item.quantity)


  const { mutate: handleDelete } = useRemoveFromCart(); 

  let {mutate:addCartmutate} = useAddToCart()
  let {mutate:removeQuantitymutate} = useRemoveQuantityFromCart()
  

  // Function to handle quantity changes
  const handleQuantity = (id: string, action: "increment" | "decrement") => {
    const currentQuantity = item.quantity;
    const maxStock = item.productId.availableStocks;
  
    // console.log(maxStock)
    if (action === "increment" && tempQuantity < maxStock) {
      setTempQuantity(p=> Math.min((p as number)+1, maxStock))
      addCartmutate({ productId: id, quantity: 1, price: item.price }); // Send only the increment change
    } 
    else if (action === "decrement" && currentQuantity > 1 && tempQuantity > 1) {
      setTempQuantity(p=> Math.max((p as number)-1, 1))
      removeQuantitymutate({ id, quantity: 1 }); // Send only the decrement change
    }  
  }

    return (
      <div key={item._id} className={styles.cartItem}>
        <img src={item.productId.images[0]} alt={item.productId.productName} />

        <div className={styles.itemDetails}>
          <h2>{item.productId.productName}</h2>
          <p>Price: <span>${item.price.toFixed(2)}</span></p>


          <div className={styles.quantityContainer}>
            <IconButton className={styles.iconBtn} 
            // disabled={item.quantity === 1} 
            disabled={tempQuantity <= 1}
            onClick={() => handleQuantity(item.productId._id, "decrement")}>
              <RemoveIcon />
            </IconButton>
            {item.quantity}
            <IconButton className={styles.iconBtn} 
              // disabled={item.quantity >= item.productId.availableStocks} // Disable if stock limit is reached
              disabled={tempQuantity >= item.productId.availableStocks}  // Prevents exceeding stock
            onClick={() => handleQuantity(item.productId._id, "increment")}>
              <AddIcon />
            </IconButton>
          </div>

          {/* Delete Button */}
          <button className={styles.deleteBtn} onClick={() => handleDelete(item.productId._id)}>
            Delete
          </button>
        </div>
      </div>
    )
  }


  export default AddToCartSingle;