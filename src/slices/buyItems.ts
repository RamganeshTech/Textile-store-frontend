import { createSlice } from "@reduxjs/toolkit";

export interface Item {
    itemId: string;
    quantity: number,
    size:string;
    color: string;
    singleQuantityPrice:number;
  }
  
  export interface BuyItems {
    items: Item[];
  }
  
  const initialState: BuyItems = {
    items: [
      {
        itemId: "", 
        quantity:0,
        size:"",
        color:"",
        singleQuantityPrice:0,
      },
    ],
  };

const buyItems = createSlice({
    name:"buyitems",
    initialState,
    reducers:{
        setItems:(state, action)=>{
            state.items.push(action.payload)
        }   
    }
})

export const {setItems} = buyItems.actions;
export default buyItems.reducer;