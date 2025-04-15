import { createSlice } from "@reduxjs/toolkit";

export interface Item {
    itemId: string;
    productName:string,
    quantity: number,
    size:string;
    color: string;
    singleQuantityPrice:number;
  }
  
  export interface BuyItems {
    items: Item[];
  }
  
  const initialState: BuyItems = {
    items: [],
  };

const buyItems = createSlice({
    name:"buyitems",
    initialState,
    reducers:{
        setItems:(state, action)=>{
          if(Array.isArray(action.payload)){
            state.items = action.payload
          }
          else{
            state.items = [action.payload]
          }
        },
        clearItems:(state)=>{
            state.items= []
        }
    }
})

export const {setItems, clearItems} = buyItems.actions;
export default buyItems.reducer;