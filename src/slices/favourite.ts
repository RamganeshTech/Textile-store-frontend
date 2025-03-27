import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavouriteItem } from "../Types/types";


interface FavouriteStoreType {
    favourites: FavouriteItem[]
}


const initialState:FavouriteStoreType= {
    favourites:[]
}

const favouriteSlice = createSlice({
    name:"favourite",
    initialState,
    reducers:{
        setFavourite:(state, action:PayloadAction<FavouriteItem[]>)=>{
            state.favourites= action.payload
        }
    }
})


export const {setFavourite} = favouriteSlice.actions
export default favouriteSlice.reducer;