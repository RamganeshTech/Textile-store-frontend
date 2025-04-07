import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import SingleProduct from './components/SingleProduct/SingleProduct'
import AddToCart from './pages/AddToCart/AddToCart'
import Favourite from './pages/Favourite/Favourite'
import AllProducts from './pages/AllProducts/AllProducts'
import UserProfile from './pages/UserProfile/UserProfile'
import ChangePassword from './components/ChangePassword/ChangePassword'
import MyOrders from './components/MyOrders/MyOrders'
import VerifyPassword from './components/VerifyPassword/VerifyPassword'
import EditAccountinfo from './components/EditAccountInfo/EditAccountinfo'
import UpdateUserEmail from './components/UserDataEditComponents/UpdateUserEmail/UpdateUserEmail'
import UpdateUserName from './components/UserDataEditComponents/UpdateUserName/UpdateUserName'
import UpdateUserPhoneNo from './components/UserDataEditComponents/UpdateUserPhoneNo/UpdateUserPhoneNo'
import Payment from './pages/Payment/Payment'
import useIsAuthenticated from './hooks/useIsAuthenticated'
import EditAddress from './components/EditAddress/EditAddress'

function App() {
  useIsAuthenticated()
  return (
    <>
      <Navbar />
     


        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ForgotPassword />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<AddToCart />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/payment' element={<Payment />} />

          <Route path='/userprofile' element={<UserProfile />}>

          <Route path='verifypassword' element={<VerifyPassword />} />
          <Route path='editaddress' element={<EditAddress />} />
          <Route path='changepassword' element={<ChangePassword />} />
          <Route path='myorders' element={<MyOrders />} />
          <Route path='editaccountinfo' element={<EditAccountinfo />} />
          <Route path='editemail' element={<UpdateUserEmail />} />
          <Route path='editphonenumber' element={<UpdateUserPhoneNo />} />
          <Route path='editusername' element={<UpdateUserName />} />
         
          </Route>
          

        </Routes>
        <Footer />
    </>
  )
}

export default App
