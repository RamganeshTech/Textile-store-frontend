import React, { useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import userlogo from '../../assets/userlogo.webp'
import { data, Link, Navigate, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { setUser } from '../../slices/user';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../apiList/userauthApi';
import { CgPlayButtonO } from 'react-icons/cg';
import { adminLogout, useAdminLogout } from '../../apiList/adminApi';
import { ListAltOutlined, Logout } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { setAdminLogin } from '../../slices/admin';

const Navbar: React.FC = () => {

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)

  const [isDropdownVisible, setDropdownVisible] = useState<Boolean>(false);
  const [ismainMenuVisble, setIsmainMenuVisble] = useState<Boolean>(false);
  const [isAdminPage, setIsAdminPage] = useState<Boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<Boolean>(false);



  const dispatch = useDispatch<AppDispatch>()


  const sidebarRef = useRef<HTMLDivElement>(null);

  let navigate = useNavigate()

  const handleNavbarNavigate = () => {
    if (isAuthenticated) {
      navigate('userprofile')
    }
    else {
      navigate('login')
    }
  }

  const handleCloseSideBar = () => {
    setIsmainMenuVisble(false)
  }

  let { mutate: handleLogout, isPending: logoutpending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: data => {
      if (data.ok) {
        // console.log("getting called")
        dispatch(setUser({ isAuthenticated: false, userId: null, email: null, userName: null, address: null, phoneNumber: null }))
        setIsmainMenuVisble(false)
        navigate('/')
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  let { mutate: handleAdminLogout, isPending: adminLogoutPending } = useAdminLogout()

  const handleLogoutPrevAdmin = () => {
    handleAdminLogout(undefined, {
      onSuccess: (data) => {
        // console.log(data)
        dispatch(setAdminLogin({ email: null, isAuthenticated: data.isAuthenticated }))
        navigate('/')
      }
    })
  }

  useEffect(() => {
    // console.log("location from nav", window.location.pathname)
    let pathName = window.location.pathname
    setIsAdminPage(pathName.includes("admin") ? true : false)

    setIsAdminLoggedIn(() => {
      let pathArray = pathName.split('/')
      // console.log(pathArray)
      if (pathArray[1] === "admin") {
        return true;
      }
      return false;
    })

  }, [window.location.pathname])

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

  // console.log("isAuthenticated", isAuthenticated)


  return (
    <>
      <nav className="w-full  flex flex-col items-center justify-center fixed top-0 left-0 z-[999] bg-white shadow-lg">
        <div className={`w-[95%] h-[70px] flex items-center justify-between ${isAdminPage ? "!!justify-center" : ""}`}>
          <div className={`flex items-center gap-2 cursor-pointer ${isAdminPage ? "!w-[70px]" : ""} `}>
            {/* <span onClick={()=> setIsmainMenuVisble(!ismainMenuVisble)}>
             <MenuIcon />
            </span> */}
                <div className={`${style.menuicon} `}>
                  <button className={`${style.navbar_toggle}`} onClick={() => setIsmainMenuVisble(!ismainMenuVisble)}>
                    <span className={`${style.icon_bar} ${style.one}`}></span>
                    <span className={`${style.icon_bar} ${ismainMenuVisble ? style.active : ""} ${style.two}`}></span>
                    <span className={`${style.icon_bar}  ${ismainMenuVisble ? style.active : ""} ${style.three}`}></span>
                  </button>
                </div>
            {!isAdminPage &&
              <>
                <img src={userlogo} alt="User" className={`${style.hideMobile} w-5 h-5 max-w-none`} onClick={handleNavbarNavigate} />
                <p className={`${style.hideMobile} text-nowrap `} onClick={handleNavbarNavigate}>{isAuthenticated ? 'My Profile' : "Login"}</p>
              </>
             } 
          </div>

          <div className="flex gap-2 items-center justify-center">
            <img src="./src/assets/logo/build my business.png" alt="" className='w-[20%] h-[10%] md:w-[10%] md:h-[5%]' />
            <Link to={'/'} className='outline-none'>
              <h4 className={`${style.companyheading} text-nowrap text-[#3182ce] font-semibold`}>BMB Fashion</h4>
            </Link>
          </div>

          {!isAdminPage && <div className="flex gap-4">
            {/* <SearchIcon /> */}
            <Link to={'/admin/addproduct'}>
              <AddIcon className={`${style.hideMobile}`} />
            </Link>
            <Link to={'/cart'}>
              <ShoppingCartOutlinedIcon className={`${style.hideMobile}`} />
            </Link>

            <Link to={'/favourite'}>
              <FavoriteBorderOutlinedIcon className={`${style.hideMobile}`} />
            </Link>
          </div>}

          {
            isAdminPage && isAdminLoggedIn && <div className={`${style.hideMobile} flex justify-between items-center w-[180px]`}>

              <IconButton onClick={() => navigate('/admin/listproducts')}
                sx={{ width: "2 0%", height: "100%", }}
              >
                <ListAltOutlined />
              </IconButton>

              &nbsp;

              <IconButton onClick={() => handleLogoutPrevAdmin()}
                sx={{ background: "red", borderRadius: "5px", color: "white", height: "60%", ":hover": { background: "red !important" } }} >
                {adminLogoutPending ? <CircularProgress size={25} thickness={5} sx={{ color: "#fafafa" }} /> : (
                  <>
                    Logout&nbsp;<Logout />
                  </>
                )}
              </IconButton>
            </div>
          }
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
          {!isAdminPage && <>
            <li onClick={handleCloseSideBar}><Link to="/cart">My Cart</Link></li>
            {isAuthenticated ? <li onClick={handleCloseSideBar}><Link to="/userprofile">My Profile</Link></li> : <li onClick={handleCloseSideBar}><Link to="/login">Login</Link></li>}
            <li onClick={handleCloseSideBar}><Link to="/favourite">My Favourites</Link></li>
          </>}

          {isAdminPage && isAdminLoggedIn && <li onClick={() => navigate('/admin/listproducts')}>List Products</li>}
          {isAdminPage && isAdminLoggedIn && <li onClick={() => navigate('/admin/addproduct')}>Add Products</li>}

          <li onClick={() => { isAdminPage ? handleLogoutPrevAdmin() : handleLogout() }}>
            {logoutpending || adminLogoutPending ? <CircularProgress size={25} thickness={5} sx={{ color: "#222220", margin: "0px auto", width: "100%", display: "block" }} /> : "Logout"}
          </li>
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