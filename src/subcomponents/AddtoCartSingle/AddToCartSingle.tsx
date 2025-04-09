import React, { ReactNode, useMemo, useState } from 'react'
// import styles from '../../components/AddToCart/AddToCart.module.css'
import styles from '../../pages/AddToCart/AddToCart.module.css'
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { CartItem } from '../../Types/types';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useAddToCart, useRemoveFromCart, useRemoveQuantityFromCart } from '../../apiList/cartApi';


type AddToCartSingleProps = {
  item: CartItem,
  // setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

const AddToCartSingle = ({ item } : AddToCartSingleProps) => {
  
  let dispatch = useDispatch<AppDispatch>()

  const [tempQuantity, setTempQuantity] = useState<number>(item.quantity)


  const { mutate: handleDelete, isPending:deleteCartPending } = useRemoveFromCart(); 

  let {mutate:addCartmutate ,isPending:addcartPending} = useAddToCart()
  let {mutate:removeQuantitymutate, isPending:removecartPending} = useRemoveQuantityFromCart()
  
  const availableStock = useMemo(() => item.productId?.sizeVariants.find(sv => sv.size === item.size)
          ?.colors.find(c => c.color === item.color)?.availableStock || 0, [item, item.size, item.color])
  

  // Function to handle quantity changes
  const handleQuantity = (id: string, action: "increment" | "decrement") => {
    const currentQuantity = item.quantity;
    // const maxStock = item.productId.availableStocks;
  
    // console.log(maxStock)
    if (action === "increment" && tempQuantity < availableStock) {
      setTempQuantity(p=> Math.min((p as number)+1, availableStock))
      // addCartmutate({ productId: id, quantity: 1, price: item.price }); // Send only the increment change
      addCartmutate({ productId: id, quantity: 1, price: item?.price , color:item.color, size:item.size }); // Send only the increment change

    } 
    else if (action === "decrement" && currentQuantity > 1 && tempQuantity > 1) {
      setTempQuantity(p=> Math.max((p as number)-1, 1))
      // removeQuantitymutate({ id, quantity: 1 }); // Send only the decrement change
      removeQuantitymutate({ id, quantity: 1, color:item.color, size:item.size  }); // Send only the decrement change

    }  
  }

    return (
      <div key={item._id} className={styles.cartItem}>
        <img src={item.image} alt={item.productId.productName} />

        <div className={styles.itemDetails}>
          <h2>{item.productId.productName}</h2>
          <p>Price: <span>${item.price.toFixed(2)}</span></p>
        <div className='flex gap-[5px] items-center'>
        <p>size: <span className=' !font-semibold !text-[16px] sm:!text-[18px] md:!text-[20px]'>{item.size}</span></p>
        {/* {" "} */}
        <p>color: <span className=' !font-semibold  !text-[16px] sm:!text-[18px] md:!text-[20px]'>{item.color}</span></p>
        </div>


          <div className={styles.quantityContainer}>
            <IconButton className={styles.iconBtn} 
            // disabled={item.quantity === 1} 
            disabled={tempQuantity <= 1}
            onClick={() => handleQuantity(item.productId._id, "decrement")}>
              <RemoveIcon />
            </IconButton>
            {/* {item.quantity} */}

            {removecartPending || addcartPending ? (
                                        <CircularProgress size={15} thickness={4} sx={{ color: "#000" }} />
                                    ) : (
                                      (item.quantity)
                                    )}
            <IconButton className={styles.iconBtn} 
              // disabled={item.quantity >= item.productId.availableStocks} // Disable if stock limit is reached
              disabled={tempQuantity >= availableStock}  // Prevents exceeding stock
            onClick={() => handleQuantity(item.productId._id, "increment")}>
              <AddIcon />
            </IconButton>
          </div>

          {/* Delete Button */}
          <Button variant="contained" disabled={deleteCartPending} className={styles.deleteBtn} onClick={() => handleDelete({productId:item.productId._id, size:item.size, color:item.color})}
               sx={{
                backgroundColor: "#ff4d4d !important", // Ensures same background even when disabled
                color: "white",
                "&.Mui-disabled": {
                  backgroundColor: "#ff4d4d", // Same color when disabled
                  opacity: 0.9, // Optional: Adjust opacity
                },
              }}
            >
            {deleteCartPending ? <CircularProgress size={24} thickness={4} sx={{color: "#fafafa"}} /> : "delete" }
          </Button>
        </div>
      </div>
    )
  }


  export default AddToCartSingle;