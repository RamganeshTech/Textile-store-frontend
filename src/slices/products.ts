import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ProductType} from '../Types/types'

interface ProductTypeArray {
    products:ProductType[]
}

const initialState:ProductTypeArray = {
    products:[]
}


const productSlice = createSlice({

    name:"products",
    initialState,
    reducers:{
        setProducts: (state, action:PayloadAction<ProductType[]>)=>{
            state.products = action.payload
        }
    }
})


export const {setProducts} = productSlice.actions

export default productSlice.reducer