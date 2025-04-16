import React, { useEffect, useState } from 'react'
import style from './PaymentFailure.module.css'
import { useParams, useSearchParams } from 'react-router-dom';
const PaymentFailure = () => {
    const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('');
  const { merchantTransactionId } = useParams();

  useEffect(() => {
    const status = searchParams.get('status'); // Get the payment status from query params
    
    if (status === 'failure') {
      setPaymentStatus('Payment Failed. Please try again.');
    } else {
      setPaymentStatus('An error occurred. Please try again later.');
    }
  }, [searchParams]);

    return (
        <div className={style.failedWrapper}>
          <div className={style.crossmarkCircle}>
            <div className={style.crossmark}>✖</div>
          </div>
          <h2 className={style.heading}>Payment Failed</h2>
          <p>Transaction ID: {merchantTransactionId}</p>
          <p className={style.message}>Something went wrong. Please try again.</p>
        </div>
      );
}

export default PaymentFailure