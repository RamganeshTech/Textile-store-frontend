import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import SingleProduct from './components/SingleProduct/SingleProduct'
import AddToCart from './pages/AddToCart/AddToCart'
import Favourite from './pages/Favourite/Favourite'
import AllProducts from './pages/AllProducts/AllProducts'

function App() {

  return (
    <>
      <Navbar />
     


        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<AddToCart />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/allproducts' element={<AllProducts />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
