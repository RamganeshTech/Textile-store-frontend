import { useEffect, useState } from 'react'
import style from './PaymentSuccess.module.css'
import { useParams, useSearchParams } from 'react-router-dom';

const PaymentSuccessfull = () => {
    const [searchParams] = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState('');
    const { merchantTransactionId } = useParams();

  
    useEffect(() => {
      const status = searchParams.get('status'); // Get the payment status from query params
      
      if (status === 'failure') {
        setPaymentStatus('Payment Failed. Please try again.');
      } else {
        setPaymentStatus('Payment Successful! Thank you for your purchase.');
      }
    }, [searchParams]);
    return (
        <div className={style.successWrapper}>
          <div className={style.checkmarkCircle}>
            <div className={style.checkmark}>✓</div>
          </div>
          <h2 className={style.heading}>Payment Successful</h2>
          <p>Transaction ID: {merchantTransactionId}</p>
          <p className={style.message}>{paymentStatus || "Thank you for your purchase!" }</p>
        </div>
      );
}

export default PaymentSuccessfull