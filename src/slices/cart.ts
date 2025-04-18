import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../Types/types";

interface CartTypeStore {
    carts:CartItem[]
}


const initialState:CartTypeStore= {
    carts:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setCarts: (state, action: PayloadAction<CartItem[]>) => {
            state.carts = action.payload;
          },
      
          // ✅ Add new item or update quantity if exists
          // addToCart: (state, action: PayloadAction<{ _id: string; quantity: number; price: number,  productTitle: string; productImg: string; availableStocks: number }>) => {
          //   // const existingItem = state.carts.find(item => item._id === action.payload._id);
      
          //   // if (existingItem) {
          //   // //   existingItem.quantity += action.payload.quantity;
          //   //   existingItem.quantity = Math.min(existingItem.quantity + action.payload.quantity, existingItem.availableStocks);

          //   // } else {
          //   //     state.carts.push({
          //   //         _id: action.payload._id,
          //   //         productImg: action.payload.productImg,
          //   //         productTitle: action.payload.productTitle,
          //   //         price: action.payload.price,
          //   //         availableStocks: action.payload.availableStocks,
          //   //         quantity: action.payload.quantity,
          //   //       });
          //   // }
          // },
      
          // ✅ Remove item from cart
          removeFromCart: (state, action: PayloadAction<string>) => {
            state.carts = state.carts.filter(item => item._id !== action.payload);
          },
      
          // ✅ Update quantity of a specific item
          // updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
          //   const item = state.carts.find(item => item._id === action.payload._id);
          //   console.log("item form redux in updation", item)
          //   if (item) {
          //     item.quantity = Math.min(action.payload.quantity, item.availableStocks); // Prevent exceeding stock
          //   }
          // },
    }
})


export const { setCarts, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;