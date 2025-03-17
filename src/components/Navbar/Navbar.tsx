import React, { useState } from 'react'
import style from './Navbar.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import userlogo from '../../assets/userlogo.webp'

const Navbar: React.FC = () => {

  const [isDropdownVisible, setDropdownVisible] = useState<Boolean>(false);
  const [ismainMenuVisble, setIsmainMenuVisble] = useState<Boolean>(false);

  return (
    <>
      <nav className="w-full  flex flex-col items-center justify-center fixed top-0 left-0 z-[999] bg-white">
        <div className="w-[95%] h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <span onClick={()=> setIsmainMenuVisble(!ismainMenuVisble)}>
             <MenuIcon />
            </span> */}
            <div>
          <button className={`${style.navbar_toggle}`} onClick={()=> setIsmainMenuVisble(!ismainMenuVisble)}>
            <span className={`${style.icon_bar} ${style.one}`}></span>
            <span className={`${style.icon_bar} ${ismainMenuVisble ? style.active : ""} ${style.two}`}></span>
            <span className={`${style.icon_bar}  ${ismainMenuVisble ? style.active : ""} ${style.three}`}></span>                       
          </button>
            </div>
            <img src={userlogo} alt="User" className="w-5 h-5" />
            <p>Login</p>
          </div>
          <h1 className="text-xl text-pink-500">BMB Fashion</h1>
          <div className="flex gap-4">
            <SearchIcon />
            <ShoppingCartOutlinedIcon />
            <FavoriteBorderOutlinedIcon />
          </div>
        </div>
      {ismainMenuVisble && <section className='h-[25px] flex items-center justify-center w-full  bg-[#ffdee8]'>
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
        </section>}
      </nav>

    </>

  )
}

export default Navbar