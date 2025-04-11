import { configureStore } from '@reduxjs/toolkit';

// import authReducer from '../slices/auth'
// import themeReducer from '../slices/theme'
import productReducer from '../slices/products'
import cartReducer from '../slices/cart'
import favouriteReducer from '../slices/favourite'
import userReducer from '../slices/user'
import adminReducer from '../slices/admin'

const store = configureStore({
    reducer:{
        // auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        favourite:favouriteReducer,
        user:userReducer,
        admin: adminReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;