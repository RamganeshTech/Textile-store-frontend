import React from 'react'
import style from './Footer.module.css'
const Footer = () => {
  return (
   <footer className={`${style.footmain}`}>
    <div className={`${style.footinner}`}>

    <section className={`${style.sections}`}>
         <p className={`${style.companyheading}`}>HOUSE OF RAM</p>
        </section>
       
        <section className={`${style.sections}`}>
            <p className={`${style.subHeading}`}>Company</p>
            <ul>
                <li>About us</li>
                <li>Privacy policy</li>
                <li>Terms & conditions</li>
            </ul>
        </section>
      
        <section className={`${style.sections}`}>
            <p className={`${style.subHeading}`}>Follow us on</p>
            <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>X</li>
            </ul>
        </section>
    </div>
        

    <section className={`${style.copyrightDiv}`}>
   <p className={`${style.copyrights}`}> © {new Date().getFullYear()} All Rights Reserved</p>
    </section>
   </footer>
  )
}

export default Footer