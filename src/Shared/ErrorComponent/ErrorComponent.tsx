import { Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorDisplayProps {
  message: string;
  showLoginButton?: boolean; // optional
//   isError:boolean
    onClose:()=> void;
}

const ErrorComponent: React.FC<ErrorDisplayProps> = ({ message="no token provided, please login", showLoginButton = false, onClose }) => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

const errorComponenetRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const handleCloseComponentByOutside = (e:MouseEvent)=>{
        if(errorComponenetRef.current && !errorComponenetRef.current.contains(e.target as Node)){
            onClose();
        }
    }

    document.addEventListener("mousedown", handleCloseComponentByOutside)
    return ()=> document.removeEventListener('mousedown', handleCloseComponentByOutside)
  }, [onClose])

  return (
    <section  className="fixed inset-0 bg-[#0a0a0a10] z-[1099] flex items-center justify-center px-4">
      <div ref={errorComponenetRef} className="bg-white text-gray-800 rounded-2xl w-[80%] shadow-lg !p-6 sm:!p-8 max-w-lg sm:w-full text-center animate-fade-in !space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0763ed]">Oops!</h2>
        <p className="text-base sm:text-lg lg:text-[20px]">{message[0].toUpperCase() + message.slice(1)}</p>

        {showLoginButton && (
          <Button
          variant='contained'
            onClick={handleGoToLogin}
            className="mt-4 px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
          >
            Go to Login
          </Button>
        )}
      </div>
    </section>
  );
};

export default ErrorComponent;
