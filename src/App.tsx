import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'

function App() {

  return (
    <>
      <Navbar />
      {/* <div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At, aperiam!</div>
      </div> */}


        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
