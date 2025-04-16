import React, { useEffect, useMemo } from "react";
import styles from "./AddToCart.module.css"; // Import CSS module
// import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import { CartItem } from "../../Types/types";
import AddToCartSingle from "../../subcomponents/AddtoCartSingle/AddToCartSingle";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFetchCart } from "../../apiList/cartApi";
import Loading from "../../components/LoadingState/Loading";
import { clearItems, setItems } from "../../slices/buyItems";
import { Link, useNavigate } from "react-router-dom";

const AddToCart: React.FC = () => {
  // const [cart, setCart] = useState<CartItem[]>(initialCart);

  // let reduxCart = useSelector((state: RootState) => state.cart.carts)
  let { data: cart, isLoading, isError, error } = useFetchCart()
  let navigate = useNavigate()

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

   const handleBuyItem = () => {
          if (cart.length) {
              dispatch(clearItems())

              // let carts = {
              //   itemId:null,
              //   singleQuantityPrice:null,
              //   quantity:null,
              //   size:null,
              //   color:null,
              // }


              let cartsArray = cart.map((item:any)=>({
                itemId : item.productId._id,
                productName: item.productId.productName,
                productImg: item.image,
                singleQuantityPrice : item.price,
                quantity : item.quantity,
                color : item.color,
                size : item.size,
              }))

              // dispatch(setItems({ itemId: product._id, singleQuantityPrice: product.price, quantity: currentQuantity, size: selectedSize, color: selectedColor }));
              dispatch(setItems(cartsArray));
          }
          navigate('/payment')
      }


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
          <Link to={`/product/${item.productId._id}`}>
            <AddToCartSingle key={item._id} item={item} />
</Link>
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
          onClick={handleBuyItem}
        >
          Add to checkout
        </Button>
      </section>}
    </main>
  );
};

export default AddToCart;
