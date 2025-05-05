import React, { useEffect, useState, useCallback } from 'react';

interface RazorpayButtonProps {
  amount: number; // in paise (e.g., 49900 for ₹499)
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ amount }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // 1. Load Razorpay script only when component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => alert('❌ Razorpay SDK failed to load');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // cleanup
    };
  }, []);

  // 2. Handle payment
  const handlePayment = useCallback(async () => {
    if (!scriptLoaded) {
      alert('Please wait, Razorpay is still loading...');
      return;
    }

    // a. Create order from backend
    const res = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    const { id: order_id, currency } = data;

    // b. Configure Razorpay options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID!, // public test/live key
      amount,
      currency,
      order_id,
      name: 'My Clothing Store',
      description: 'Order Payment',
      handler: async (response: any) => {
        // c. Verify payment on backend
        const verify = await fetch('/api/payment/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        });
        const result = await verify.json();

        if (result.status === 'ok') {
          alert('✅ Payment Successful & Verified!');
        } else {
          alert('❌ Payment Verification Failed!');
        }
      },
      prefill: {
        name: 'Test User',
        email: 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#000',
      },
    };

    // d. Open Razorpay popup
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }, [scriptLoaded, amount]);

  return (
    <button onClick={handlePayment} disabled={!scriptLoaded}>
      {scriptLoaded ? `Pay ₹${(amount / 100).toFixed(2)}` : 'Loading...'}
    </button>
  );
};

export default RazorpayButton;
