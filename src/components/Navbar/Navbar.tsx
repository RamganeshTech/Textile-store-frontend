import React, { useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import userlogo from '../../assets/userlogo.webp'
import { Navigate, useNavigate } from 'react-router-dom';
import CloseIcon  from '@mui/icons-material/Close';

const Navbar: React.FC = () => {

  const [isDropdownVisible, setDropdownVisible] = useState<Boolean>(false);
  const [ismainMenuVisble, setIsmainMenuVisble] = useState<Boolean>(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  let navigate = useNavigate()


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsmainMenuVisble(false);
      }
    }

    if (ismainMenuVisble) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ismainMenuVisble]);


  return (
    <>
      <nav className="w-full  flex flex-col items-center justify-center fixed top-0 left-0 z-[999] bg-white shadow-lg">
        <div className="w-[95%] h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            {/* <span onClick={()=> setIsmainMenuVisble(!ismainMenuVisble)}>
             <MenuIcon />
            </span> */}
            <div className={`${style.menuicon}`}>
          <button className={`${style.navbar_toggle}`} onClick={()=> setIsmainMenuVisble(!ismainMenuVisble)}>
            <span className={`${style.icon_bar} ${style.one}`}></span>
            <span className={`${style.icon_bar} ${ismainMenuVisble ? style.active : ""} ${style.two}`}></span>
            <span className={`${style.icon_bar}  ${ismainMenuVisble ? style.active : ""} ${style.three}`}></span>                       
          </button>
            </div>
            {/* <img src={userlogo} alt="User" className="w-5 h-5" onClick={()=> navigate('login')} />
            <p>Login</p> */}
            <img src={userlogo} alt="User" className={`${style.hideMobile} w-5 h-5`} onClick={() => navigate('login')} />
            <p className={`${style.hideMobile}`} onClick={() => navigate('login')}>Login</p>
          </div>
          <h1 className={`${style.companyheading}  text-[#3182ce] font-semibold`}>BMB Fashion</h1>
          <div className="flex gap-4">
            {/* <SearchIcon /> */}
            <ShoppingCartOutlinedIcon className={`${style.hideMobile}`} />
            <FavoriteBorderOutlinedIcon className={`${style.hideMobile}`} />
          </div>
        </div>
      {/* {ismainMenuVisble && <section className='h-[25px] flex items-center justify-center w-full  bg-[#ffdee8]'>
          <ul className='flex items-center justify-center gap-1  '>
            <li className='hover:bg-[#ef0650] px-4 cursor-pointer'>Kurta</li>
            <li className='hover:bg-[#ef0650] px-4 cursor-pointer'>Kurta Set</li>
            <li className='hover:bg-[#ef0650] px-4 cursor-pointer'>New Collection</li>
            <li className='hover:bg-[#ef0650] px-4 cursor-pointer'>Suit Set</li>
            <li className='hover:bg-[#ef0650] px-4 cursor-pointer'>Ethnic Wear</li>
            <li
        className="relative hover:bg-[#ef0650] px-4 cursor-pointer"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        Men's
        {isDropdownVisible && (
          <select className="absolute left-0 mt-[25px] w-[100px] border p-1 bg-white">
            <option value="Shirt">Shirt</option>
          </select>
        )}
      </li>
            
       
        <li  className=" hover:bg-[#ef0650] px-4 cursor-pointer"  > All Categories </li>
          </ul>
        </section>} */}
      </nav>

      {/* {ismainMenuVisble && (
        <div className={style.overlay}>
          <div ref={sidebarRef} className={`${style.sidebar} ${ismainMenuVisble ? style.show : ""}`}>
            <button className={style.closeBtn} onClick={() => setIsmainMenuVisble(false)}>
            <CloseIcon />
            </button>
          
            <ul>
              <li>Kurta</li>
              <li>Kurta Set</li>
              <li>New Collection</li>
              <li>Suit Set</li>
              <li>Ethnic Wear</li>
              <li>Men's</li>
              <li>All Categories</li>
            </ul>
          </div>
        </div>
      )} */}

  <div id="sidebar" ref={sidebarRef} className={`${style.sidebar} ${ismainMenuVisble ? style.show : ''}`}>
        <button className={style.closeBtn} onClick={() => setIsmainMenuVisble(false)}>
          <CloseIcon />
        </button>
        <ul>
          <li>Profile</li>
          <li>My Cart</li>
          <li>Register</li>
          <li>My Favourites</li>
        </ul>
      </div>

      {/* Overlay: Always Rendered */}
      <div
        className={`${style.overlay} ${ismainMenuVisble ? style.overlayShow : ''}`}
        onClick={() => setIsmainMenuVisble(false)}
      ></div>

    </>

  )
}

export default Navbar