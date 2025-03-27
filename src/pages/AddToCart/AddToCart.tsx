import React, { useEffect, useState } from "react";
import styles from "./AddToCart.module.css"; // Import CSS module
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { CartItem } from "../../Types/types";
import AddToCartSingle from "../../subcomponents/AddtoCartSingle/AddToCartSingle";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFetchCart } from "../../apiList/cartApi";
import { setCarts } from "../../slices/cart";
import Loading from "../../components/LoadingState/Loading";

// Define TypeScript interface for CartItem


// Sample Shopping Cart Data
// const initialCart: CartItem[] = [
//   {
//     _id: "1",
//     productImg:  "https://picsum.photos/200/300?random=1",
//     productTitle: "Wireless Headphones",
//     price: 59.99,
//     availableStocks: 10,
//     quantity: 1,
//   },
//   {
//     _id: "2",
//     productImg:  "https://picsum.photos/200/300?random=2",
//     productTitle: "Smartwatch",
//     price: 129.99,
//     availableStocks: 5,
//     quantity: 2,
//   },
//   {
//     _id: "3",
//     productImg:  "https://picsum.photos/200/300?random=3",
//     productTitle: "Gaming Mouse",
//     price: 39.99,
//     availableStocks: 15,
//     quantity: 1,
//   },
// ];

const AddToCart: React.FC = () => {
  // const [cart, setCart] = useState<CartItem[]>(initialCart);

  let reduxCart = useSelector((state: RootState) => state.cart.carts)
  let { data: cart, isLoading, isError, error } = useFetchCart()

  let dispatch = useDispatch<AppDispatch>()

  // useEffect(() => {
  //   console.log(cart)
  //   dispatch(setCarts(cart))
  // }, [cart, dispatch])


  // Calculate total price
  // const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = 3000


  if (isLoading) return <div className="mt-[70px] h-[100vh] w-[100vw] flex items-center justify-center"><Loading /></div>

  return (
    <main className={styles.container}>
      <div className={styles.heading}>
        <h1>Shopping Cart</h1>

      </div>
      <section>
        {cart && cart.length > 0 ? cart.map((item:CartItem, index:number) => {
          console.log(`Rendering item: ${index}, Class: ${styles.cartItem}`);
          console.log(item)
          return (
            <AddToCartSingle key={item._id}
              item={item}
            //  setCart={setCarts}
            />
          )
        }) :

          <section className="h-[50vh] w-[100vw] flex items-center justify-center">
            <p className="text-4xl">No cart Items added yet...</p>
          </section>

        }
      </section>

      {/* Total Section */}
      {reduxCart && reduxCart.length > 0 && <section className={styles.totalContainer}>
        <p>Total Price: <span>${total.toFixed(2)}</span> </p>
        <p>Total Items: <span>{cart && cart.length > 0 && cart.reduce((sum: number, item: any) => sum + item.quantity, 0)}</span> </p>
      </section>}
    </main>
  );
};

export default AddToCart;
