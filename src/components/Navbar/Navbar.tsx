import React, { useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import userlogo from '../../assets/userlogo.webp'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const Navbar: React.FC = () => {

  const isAuthenticated = useSelector((state:RootState)=> state.user.isAuthenticated)

  const [isDropdownVisible, setDropdownVisible] = useState<Boolean>(false);
  const [ismainMenuVisble, setIsmainMenuVisble] = useState<Boolean>(false);

  

  const sidebarRef = useRef<HTMLDivElement>(null);

  let navigate = useNavigate()

  const handleNavbarNavigate = ()=>{
    if(isAuthenticated){
      navigate('userprofile')
    }
    else{
      navigate('login')
    }
  }


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
              <button className={`${style.navbar_toggle}`} onClick={() => setIsmainMenuVisble(!ismainMenuVisble)}>
                <span className={`${style.icon_bar} ${style.one}`}></span>
                <span className={`${style.icon_bar} ${ismainMenuVisble ? style.active : ""} ${style.two}`}></span>
                <span className={`${style.icon_bar}  ${ismainMenuVisble ? style.active : ""} ${style.three}`}></span>
              </button>
            </div>
            <img src={userlogo} alt="User" className={`${style.hideMobile} w-5 h-5`} onClick={handleNavbarNavigate} />
            <p className={`${style.hideMobile} text-nowrap`} onClick={handleNavbarNavigate}>{isAuthenticated ? 'My Profile': "Login"}</p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <img src="./src/assets/logo/build my business.png" alt="" className='w-[20%] h-[10%] md:w-[10%] md:h-[5%]' />
            <h4 className={`${style.companyheading} text-nowrap text-[#3182ce] font-semibold`}>BMB Fashion</h4>
          </div>
          <div className="flex gap-4">
            {/* <SearchIcon /> */}
            <Link to={'/cart'}>
              <ShoppingCartOutlinedIcon className={`${style.hideMobile}`} />
            </Link>

            <Link to={'/favourite'}>
              <FavoriteBorderOutlinedIcon className={`${style.hideMobile}`} />
            </Link>
          </div>
        </div>
      </nav>

      <div id="sidebar" ref={sidebarRef} className={`${style.sidebar} ${ismainMenuVisble ? style.show : ''}`}>
       <div className='flex items-center justify-between'>
        <p className='font-semibold text-lg'>BMB Fashion</p>
       <IconButton className={style.closeBtn} onClick={() => setIsmainMenuVisble(false)}>
          <CloseIcon />
        </IconButton>
       </div>
        <ul>
          <li>Profile</li>
          <li><Link to="/cart">My Cart</Link></li>
          {isAuthenticated ? <li><Link to="/login">My Profile</Link></li> : <li><Link to="/login">Login</Link></li>}
          <li><Link to="/favourite">My Favourites</Link></li>
          <li>Logout</li>
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