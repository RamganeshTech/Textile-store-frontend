import React, { useState } from 'react'
import style from './ForgotPassword.module.css'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@mui/material'
const ForgotPassword = () => {

    const [isResetPassword, setIsResetPassword] = useState(false);


    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const emailInput = (e.target as HTMLFormElement).email.value;
        if (!emailInput) return;
    
        try {
            const response = await fetch("http://localhost:3000/api/auth/forgotpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailInput }),
            });

            console.log(response)
    
            const data = await response.json();
            if (response.ok) {
                alert("✅ Password reset link sent to your email.");
                setIsResetPassword(true); // Show reset password form
            } else {
                alert(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Forgot Password Error:", error);
            alert("❌ Something went wrong. Please try again.");
        }
    };

    const handleResetPasswordSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
        
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            if (!token) {
                alert("Invalid password reset link.");
                return;
            }
        
            const password = (e.target as HTMLFormElement).password.value;
            const confirmPassword = (e.target as HTMLFormElement).confirmPassword.value;
        
            if (!password || password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
        
            try {
                const response = await fetch("http://localhost:3000/api/auth/resetforgotpassword", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, password }),
                });
        
                const data = await response.json();
                if (response.ok) {
                    alert("✅ Password reset successful! Redirecting to login...");
                    window.location.href = "/login"; // Redirect to login page
                } else {
                    alert(`❌ ${data.message}`);
                }
            } catch (error) {
                console.error("Reset Password Error:", error);
                alert("❌ Something went wrong. Please try again.");
            }
        };
        
        // Handle reset password logic here
    


return (
    <div className={`${style.container}`}>
    {!token ? (
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