import React, { useState } from 'react'
import style from './ForgotPassword.module.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, CircularProgress, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box } from '@mui/material';
import SuccessAlert from '../../Shared/SuccessAlert/SuccessAlert'
const ForgotPassword = () => {

    let navigate = useNavigate()

    const [isResetPassword, setIsResetPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertContext, setAlertContext] = useState<"email" | "reset" | null>(null);

    const [emailLoading, setEmailLoading] = useState<boolean>(false);
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
    // const [isPasswordError, setIsPasswordError] = useState<boolean>(false);


    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");


    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailLoading(true)
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
                // alert("✅ Password reset link sent to your email.");
                setAlertMessage("✅ Password reset link sent to your email.")
                setShowAlert(true)
                setAlertContext('email')
                setIsResetPassword(true); // Show reset password form
            } else {
                setAlertContext('email')
                setAlertMessage(`❌ ${data.message}`)
                setShowAlert(true)
                // alert(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Forgot Password Error:", error);
            if (error instanceof Error) {
                setAlertContext('email')
                setShowAlert(true)
                let message =  (error as any)?.response?.data?.message ||  error?.message || "Something went wrong. Please try again."
                setAlertMessage(`❌ ${message}`)
            }
            // alert("❌ Something went wrong. Please try again.");
        }
        finally {
            setEmailLoading(false)
        }
    };

    const handleResetPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordLoading(true)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (!token) {
            alert("Invalid password reset link.");
            return;
        }

        const password = (e.target as HTMLFormElement).password.value;
        const confirmPassword = (e.target as HTMLFormElement).confirmPassword.value;

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



        try {

            if (!strongPasswordRegex.test(password)) {
                throw new Error(
                    "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
                );
            }

            if (!password || password !== confirmPassword) {
                throw new Error("Passwords do not match")
            }

            const response = await fetch("http://localhost:3000/api/auth/resetforgotpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            console.log("data", data)
            if (response?.ok) {
                // setIsPasswordError(false)
                // alert("✅ Password reset successful! Redirecting Please click ok to redirect to login page");
                setAlertContext('reset')
                setAlertMessage(`✅ Password reset successful! 
                    Redirecting Please click ok to redirect to login page`)
                setShowAlert(true)
                setIsResetPassword(true);
                window.location.href = "/login"; // Redirect to login page
            } else {
                // setIsPasswordError(true)
                setAlertContext('reset')
                setAlertMessage(`❌ ${data.message}`)
                setShowAlert(true)
                // alert(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Reset Password Error:", error);
            // setIsPasswordError(true)
            if (error instanceof Error) {
                console.log("custome error", error.message)
                setAlertContext('reset')
                // setAlertMessage(`❌ ${error.message}` || "❌ Something went wrong. Please try again.")
                setShowAlert(true)

                let message =  (error as any)?.response?.data?.message ||  error?.message || "Something went wrong. Please try again."

                setAlertMessage(`❌ ${message}`)
            }
            // alert("❌ Something went wrong. Please try again.");
        }
        finally {
            setPasswordLoading(false)
        }
    };

    // Handle reset password logic here



    return (
        <div className={`${style.container}`}>
            {showAlert && alertContext === "reset" && token && (
                <SuccessAlert
                    message={alertMessage}
                    onConfirm={() => {
                        setShowAlert(false);
                        setAlertContext(null);
                        if(!alertMessage.includes("❌")){
                            navigate("/login");
                        }
                    }}
                />
            )}

            {showAlert && alertContext === "email" && !token && (
                <SuccessAlert
                    message={alertMessage}
                    onConfirm={() => {
                        setShowAlert(false);
                        setAlertContext(null);
                    }}
                />
            )}
            {!token ? (
                <div className={`${style.card}`}>
                    {/* <h1 className={`${style.title}`}>BMB Fashion</h1> */}
                    <h2 className={`${style.subtitle}`}>Forgot Password</h2>
                    <p className={`${style.description}`}>
                        we'll send you a link to reset your password to this email.
                    </p>
                    <form onSubmit={handleForgotPasswordSubmit}>
                        <div className={`${style.inputGroup}`}>
                            <label htmlFor="email" className={`${style.label}`}>Your Email</label>
                            <input type="email" id="email" placeholder="BMB Fashion@mail.com" className={`${style.input}`} />
                        </div>
                        {/* <Button variant='contained' type="submit" className={`${style.button}`}>Send Reset Link</Button> */}
                        <Button variant='contained' type="submit" className={`${style.button}`}>
                            {emailLoading ? <CircularProgress sx={{ color: "#fafafa" }} size={25} /> : "Send Reset Link"}
                        </Button>
                    </form>
                    <div className={`${style.backToLogin}`}>
                        <Link to="/login" className={`${style.link}`}>Back to Login</Link>
                    </div>
                </div>
            ) : (
                <div className={`${style.card}`}>
                    {/* <h1 className={`${style.title}`}>BMB Fashion</h1> */}
                    <h2 className={`${style.subtitle}`}>Reset Password</h2>
                    {/* <p className={`${style.description}`}>
                        Enter your new password below.
                    </p> */}
                    <form onSubmit={handleResetPasswordSubmit}>
                        <div className={`${style.inputGroup}`}>
                            <label htmlFor="password" className={`${style.label}`}>New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password" placeholder="New Password" className={`${style.input}`} />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '70%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // border: "2px solid red",
                                    // height:"100%"
                                }}
                            >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff sx={{
                                        height: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px"
                                        },
                                        width: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px",
                                        }
                                    }} /> : <Visibility sx={{
                                        height: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px"
                                        },
                                        width: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px",
                                        }
                                    }} />}
                                </IconButton>
                            </Box>
                        </div>
                        <div className={`${style.inputGroup}`}>
                            <label htmlFor="confirmPassword" className={`${style.label}`}>Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword" placeholder="Confirm Password" className={`${style.input}`} />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '70%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // border: "2px solid red",
                                    // height:"100%"
                                }}
                            >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <VisibilityOff sx={{
                                        height: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px"
                                        },
                                        width: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px",
                                        }
                                    }} /> : <Visibility sx={{
                                        height: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px"
                                        },
                                        width: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "25px",
                                        }
                                    }} />}
                                </IconButton>
                            </Box>
                        </div>
                        <Button variant='contained' type="submit" className={`${style.button}`}>
                            {passwordLoading ? <CircularProgress sx={{ color: "#fafafa" }} size={25} /> : "Reset Password"}
                        </Button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword