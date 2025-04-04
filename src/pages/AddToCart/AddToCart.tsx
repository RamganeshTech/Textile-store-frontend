import React, { useEffect, useMemo, useState } from "react";
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


console.log("cart Items", cart)


const totalAmount = useMemo(() => {
  if (!cart) return 0;

  return cart.reduce((sum: number, item: any) => {
    return sum + (item.productId.price * item.quantity);
  }, 0);
}, [cart]);

const totalQuantity = useMemo(() => {
  if (!cart) return 0;

  return cart.reduce((sum: number, item: any) => {
    return sum + item.quantity;
  }, 0);
}, [cart]);


  return (
    <main className={styles.container}>
      <div className={styles.heading}>
        <h1>Shopping Cart</h1>
      </div>

      {/* {!isLoading && isError &&  <div className="h-[45vh] sm:h-[80vh] xs:w-[100vw] flex justify-center items-center">
          <p className="text-xl sm:text-2xl lg:text-4xl">{error ? (error as unknown as Error).message : "Something went wrong"}</p>
          </div>} */}

      <section>
      {!isLoading ? (
  cart && cart.length > 0 ? (
    cart.map((item: CartItem) => (
      <AddToCartSingle key={item._id} item={item} />
    ))
  ) : (
    <section className="h-[50vh] w-[100vw] flex items-center justify-center">
      <p className="text-4xl">No cart items added yet...</p>
    </section>
  )
) : <div className="mt-[70px] h-[50vh] w-[100vw] flex justify-center items-center">
<Loading />
</div>} 
      </section>


      {/* Total Section */}
      {cart && cart.length > 0 && <section className={styles.totalContainer}>
        <p>Total Price: <span>${totalAmount.toFixed(2)}</span> </p>
        <p>Total Items: <span>{totalQuantity}</span> </p>
      </section>}
    </main>
  );
};

export default AddToCart;
