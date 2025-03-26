import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/auth'
// import themeReducer from '../slices/theme'
import products from '../slices/products'

const store = configureStore({
    reducer:{
        auth: authReducer,
        products: products,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;