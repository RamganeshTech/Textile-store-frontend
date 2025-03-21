import React, { useState } from 'react'
import style from './ForgotPassword.module.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
const ForgotPassword = () => {

    const [isResetPassword, setIsResetPassword] = useState(false);

    const handleForgotPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsResetPassword(true);
    };

    const handleResetPasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle reset password logic here
    };


return (
    <div className={`${style.container}`}>
    {!isResetPassword ? (
        <div className={`${style.card}`}>
            {/* <h1 className={`${style.title}`}>BMB Fashion</h1> */}
            <h2 className={`${style.subtitle}`}>Forgot Password</h2>
            <p className={`${style.description}`}>
                Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleForgotPasswordSubmit}>
                <div className={`${style.inputGroup}`}>
                    <label htmlFor="email" className={`${style.label}`}>Your Email</label>
                    <input type="email" id="email" placeholder="BMB Fashion@mail.com" className={`${style.input}`} />
                </div>
                <button type="submit" className={`${style.button}`}>Send Reset Link</button>
            </form>
            <div className={`${style.backToLogin}`}>
            <Link to="/login" className={`${style.link}`}>Back to Login</Link>
            </div>
        </div>
    ) : (
        <div className={`${style.card}`}>
            {/* <h1 className={`${style.title}`}>BMB Fashion</h1> */}
            <h2 className={`${style.subtitle}`}>Reset Password</h2>
            <p className={`${style.description}`}>
                Enter your new password below.
            </p>
            <form onSubmit={handleResetPasswordSubmit}>
                <div className={`${style.inputGroup}`}>
                    <label htmlFor="password" className={`${style.label}`}>New Password</label>
                    <input type="password" id="password" placeholder="New Password" className={`${style.input}`} />
                </div>
                <div className={`${style.inputGroup}`}>
                    <label htmlFor="confirmPassword" className={`${style.label}`}>Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" className={`${style.input}`} />
                </div>
                <button type="submit" className={`${style.button}`}>Reset Password</button>
            </form>
        </div>
    )}
</div>
  )
}

export default ForgotPassword