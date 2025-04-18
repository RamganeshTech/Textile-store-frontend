import React, { useEffect, useState } from 'react';
import style from './CreateProdSuccess.module.css'; // for animation styles

interface Props {
  message: string;
  duration?: number; // in ms
}

const CreateProductSuccess: React.FC<Props> = ({ message, duration = 3000 }) => {
    const [hide, setHide] = useState(false);
    const [show, setShow] = useState(true);
  
    useEffect(() => {
      // Start hiding a bit before unmount to allow animation
      const hideTimer = setTimeout(() => {
        setHide(true);
      }, duration - 400); // 400ms = duration of exit animation
  
      // Unmount only after the exit animation is done
      const unmountTimer = setTimeout(() => {
        setShow(false);
      }, duration);
  
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(unmountTimer);
      };
    }, [duration]);
  
    if (!show) return null;
  return (
    <div className={`${style.success_message} ${hide ? 'hide' : ''}`}>
      {message}
    </div>
  );
};

export default CreateProductSuccess;
