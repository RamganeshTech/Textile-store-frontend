import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import { lazy, Suspense } from 'react'
// import Loading from './components/LoadingState/Loading'

// Pages
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./components/Login/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword'));
const AddToCart = lazy(() => import('./pages/AddToCart/AddToCart'));
const Favourite = lazy(() => import('./pages/Favourite/Favourite'));
const AllProducts = lazy(() => import('./pages/AllProducts/AllProducts'));
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'));
const Payment = lazy(() => import('./pages/Payment/Payment'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin/AdminLogin'));
const AddProduct = lazy(() => import('./pages/admin/AddProduct/AddProduct'));
const ListProducts = lazy(() => import('./pages/admin/ListProducts/ListProducts'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

// Components
const Footer = lazy(() => import('./components/Footer/Footer'));
const SingleProduct = lazy(() => import('./components/SingleProduct/SingleProduct'));
const ChangePassword = lazy(() => import('./components/ChangePassword/ChangePassword'));
const MyOrders = lazy(() => import('./components/MyOrders/MyOrders'));
const VerifyPassword = lazy(() => import('./components/VerifyPassword/VerifyPassword'));
const EditAccountinfo = lazy(() => import('./components/EditAccountInfo/EditAccountinfo'));
const UpdateUserEmail = lazy(() => import('./components/UserDataEditComponents/UpdateUserEmail/UpdateUserEmail'));
const UpdateUserName = lazy(() => import('./components/UserDataEditComponents/UpdateUserName/UpdateUserName'));
const UpdateUserPhoneNo = lazy(() => import('./components/UserDataEditComponents/UpdateUserPhoneNo/UpdateUserPhoneNo'));
const EditAddress = lazy(() => import('./components/EditAddress/EditAddress'));
const PaymentSuccessfull = lazy(() => import('./components/PaymentStatus/PaymentSuccessfull'));
const PaymentFailure = lazy(() => import('./components/PaymentStatus/PaymentFailure'));


// Protected Routes
const ProtectedRoutes = lazy(() => import('./components/ProtectedRoutes/ProtectedRoutes'));
const ProtectedAdminRoutes = lazy(() => import('./components/ProtectedRoutes/ProtectedAdminRoutes'));

import useIsAuthenticated from './hooks/useIsAuthenticated';
import OfferPopup from './components/OfferPopup/OfferPopup'

const FooterSkeleton = lazy(() => import('./Loading/FooterSkeleton'))
const NavbarSkeleton = lazy(() => import('./Loading/NavbarSkeleton'))
const MainCarousel = lazy(() => import('./Loading/MainCarousel'))
const LoadingGrid = lazy(() => import('./Loading/LoadingGrid'))


function App() {
  const { userAuthLoading } = useIsAuthenticated()

  // if (userAuthLoading) {
  //   return <div className='w-[100vw] h-[80vh] flex justify-center items-center'><Loading /></div>
  // }


  if (userAuthLoading) {
    return <div className='w-[100vw] flex justify-center items-center flex-col'>
      <NavbarSkeleton />
      <MainCarousel />
      <LoadingGrid rows={2} columns={4} />
      <FooterSkeleton />
    </div>
  }

  return (
    <>
      <Suspense fallback={
        <div className='w-[100vw] flex justify-center items-center flex-col'>
        <NavbarSkeleton />
        <MainCarousel />
        <LoadingGrid rows={2} columns={4} />
        <FooterSkeleton />
      </div>
    }>
        <OfferPopup />
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
          <Route path='/payment' element={<ProtectedRoutes>
            <Payment />
          </ProtectedRoutes>} />
          <Route path='/redirect-url/paymentsuccess/:merchantTransactionId' element={<PaymentSuccessfull />} />
          <Route path='/redirect-url/paymentfailure/:merchantTransactionId' element={<PaymentFailure />} />

          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/admin/addproduct' element={
            <ProtectedAdminRoutes >
              <AddProduct />
            </ProtectedAdminRoutes>
          } />

          <Route path='/admin/listproducts' element={
            <ProtectedAdminRoutes >
              <ListProducts />
            </ProtectedAdminRoutes>
          } />

          <Route path='/userprofile' element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }>

            <Route path='verifypassword' element={<VerifyPassword />} />
            <Route path='editaddress' element={<EditAddress />} />
            <Route path='changepassword' element={<ChangePassword />} />
            <Route path='myorders' element={<MyOrders />} />
            <Route path='editaccountinfo' element={<EditAccountinfo />} />
            <Route path='editemail' element={<UpdateUserEmail />} />
            <Route path='editphonenumber' element={<UpdateUserPhoneNo />} />
            <Route path='editusername' element={<UpdateUserName />} />
            <Route path='myorders' element={<MyOrders />} />

          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>

    </>
  )
}

export default App
