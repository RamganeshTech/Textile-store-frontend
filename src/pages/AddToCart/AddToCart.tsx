import React, { useEffect, useMemo, useState } from "react";
import styles from "./AddToCart.module.css"; // Import CSS module
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

import { CartItem } from "../../Types/types";
import AddToCartSingle from "../../subcomponents/AddtoCartSingle/AddToCartSingle";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFetchCart } from "../../apiList/cartApi";
import { setCarts } from "../../slices/cart";
import Loading from "../../components/LoadingState/Loading";
import { setItems } from "../../slices/buyItems";

const AddToCart: React.FC = () => {
  // const [cart, setCart] = useState<CartItem[]>(initialCart);

  let reduxCart = useSelector((state: RootState) => state.cart.carts)
  let { data: cart, isLoading, isError, error } = useFetchCart()

  let dispatch = useDispatch<AppDispatch>()

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

  
  useEffect(() => {
    if (cart && cart.length > 0) {
      cart.forEach((item: any) => {
        dispatch(setItems({ itemId: item.productId._id, singleQuantityPrice:item.price,  quantity: item.quantity, size: null, color: null }));
      //   dispatch(setItems({ itemId: product._id, quantity: currentQuantity, size: selectedSize, color:selectedColor }));
      });
    }
  }, [cart, dispatch]);


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
        <Button variant="contained" className={styles.addtoCartBtn}
          sx={{
            width: {
              xs: "100%",
              sm: "190px",
              md: "190px",
              lg: "190px",
              xl: "143px !important"
            }
          }}
        >
          Add to checkout
        </Button>
      </section>}
    </main>
  );
};

export default AddToCart;
