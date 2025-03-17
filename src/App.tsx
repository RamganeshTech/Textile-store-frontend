import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'

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
        </Routes>
    </>
  )
}

export default App
