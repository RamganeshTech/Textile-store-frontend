import { configureStore } from '@reduxjs/toolkit';

// import authReducer from '../slices/auth'
// import themeReducer from '../slices/theme'
import productReducer from '../slices/products'
import cartReducer from '../slices/cart'
import favouriteReducer from '../slices/favourite'
import userReducer from '../slices/user'

const store = configureStore({
    reducer:{
        // auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        favourite:favouriteReducer,
        user:userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;