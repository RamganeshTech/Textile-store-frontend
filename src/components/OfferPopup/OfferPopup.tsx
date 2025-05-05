import { useEffect, useState } from 'react';
import { useFetchOffer } from '../../apiList/offerPopupApi';
import styles from './OfferPopup.module.css'
import CloseIcon  from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

type SingleOfferType = {
    title:string,
    message:string,
    image:string,
}

function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  let { data: offerList, isLoading, isError, } = useFetchOffer()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {  // You can change 400 to whatever distance you want
        setHasScrolledEnough(true);
      }
    };

    if (!sessionStorage.getItem('offerPopupShown')) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hasScrolledEnough && !sessionStorage.getItem('offerPopupShown')) {
        if(offerList?.length > 0){
            setShowPopup(true);
            sessionStorage.setItem('offerPopupShown', 'true');
        }
    }
  }, [hasScrolledEnough, offerList]);

  const handleClose = ()=>{
    sessionStorage.setItem("offerPopupShown", "true")
    setShowPopup(false)
  }

  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? offerList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === offerList.length - 1 ? 0 : prev + 1));
  };

  let currentOffer:SingleOfferType | any;
  
  if(offerList && offerList.length){
    currentOffer = offerList[currentIndex];
  }

  if (!showPopup || isLoading || isError) return null;
  
  return (
  <div
  className={styles.backdrop}
  onClick={handleClose}
>
  <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
    
    <IconButton
      onClick={handleClose}
      className={styles.closeButton}
    >
      <CloseIcon sx={{width:{xs:"14px"}}} />
    </IconButton>

    {offerList.length > 1 && (
      <>
        <button onClick={handlePrev} className={styles.navButton + ' ' + styles.leftArrow}>‹</button>
        <button onClick={handleNext} className={styles.navButton + ' ' + styles.rightArrow}>›</button>
      </>
    )}

    {/* Offer Content */}
    <div className={styles.offerContent}>
      <img
        src={currentOffer.image}
        alt={currentOffer.title}
        className={styles.offerImage}
      />
      <div className={styles.textOverlay}>
        <h2 className={styles.title}>{currentOffer.title}</h2>
        <p className={styles.message}>{currentOffer.message}</p>
      </div>
    </div>

  </div>
</div>
  );
}

export default OfferPopup;