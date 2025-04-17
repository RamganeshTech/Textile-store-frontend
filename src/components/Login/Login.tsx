import React, { useState } from 'react';
import styles from './Login.module.css';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../Utils/firebase';
// import GoogleLogo from '../../assets/Google Logo.png'


import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { validateRegister } from '../../Utils/validation';
import { loginUser, registerUser } from '../../apiList/userauthApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/user';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { setUser } from '../../slices/auth';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [address,] = useState('');
  const [pincode] = useState('');
  const [indianState] = useState('');
  const [phoneNumber] = useState('');

  // const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const dispatch = useDispatch()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(null);


    setLoading(true)
    try {
      const data = await loginUser(email, password);

      if (!data.user || !data.user.userId) {
        throw new Error("Invalid response: Missing userId");
      }

      setEmail("")
      setPassword("")
      dispatch(setUser({ userId: data.user.userId, userName: data.user.userName, email: data.user.email, isAuthenticated: true, address: data.user.address, phoneNumber: data.user.phoneNumber }));
      navigate('/')
      setError("")

    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Something went wrong please try again";
      // dispatch(setUser({ userId: null, userName:null, email: null, isAuthenticated:false }));
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // const googleLogin = ()=>{
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider).then(async (result)=>{
  //     console.log(result)

  //     if(result.user){
  //       console.log(result.user)
  //     }
  //   })
  // }


  // use the below one 

  //   const googleLogin = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then(async (result) => {
  //       const user = result.user;
  //       const idToken = await user.getIdToken(); // Get Firebase ID token

  //       console.log("idToken from googlelogin", idToken);

  //       const response = await fetch("http://localhost:3000/api/googlelogin", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ idToken }),
  //       });

  //       const data = await response.json();
  //       console.log("data from googlelogin", data);
  //     })
  //     .catch((error) => {
  //       console.error("Google login error:", error);
  //     });
  // };

  // const googleLogin = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, provider);

  //     if (result.user) {
  //       const idToken = await result.user.getIdToken(); // Get Google ID Token

  //       // Send token to backend
  //       const response = await fetch("http://localhost:3000/api/googlelogin", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ idToken }),
  //       });

  //       const data = await response.json();
  //       if (response.ok) {
  //         localStorage.setItem("token", data.token); // Store JWT token
  //         console.log("User authenticated:", data.user);
  //       } else {
  //         console.error("Error:", data.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //   }
  // };



  // const fetchUserData = async ()=>{
  //   // onAuthStateChanged it is going to do when user is loggedin the auth variable iwll be empty , when logged in this auth will contain the data fo users
  //   // the user params will hold all the detail when the user is logging in like eamil and pass
  //   // auth.onAuthStateChanged(async (user)=>{
  //   //   console.log(user)
  //   // })
  // }

  // useEffect(()=>{
  //   fetchUserData()
  // }, [])


  // const logout = async ()=>{
  //   try{
  //     // signOut it will empty the auth variable
  //     await auth.signOut();
  //     window.location.href= '/login'
  //     console.log("logged out")
  //   }
  //   catch(err){
  //     if(err instanceof Error)
  //     console.log(err.message)
  //   }
  // }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {

      validateRegister({ email, password, phoneNumber, pincode, address, state: indianState, userName: name })

      const data = await registerUser({ userName: name, email, password, pincode, address, state: indianState });

      // if (!data.user || !data.user.userId) {
      //   throw new Error("Invalid response: Missing userId");
      // }

      setEmail("")
      setPassword("")
      setName("")
      dispatch(setUser({ userId: data.user.userId, userName: data.user.userName, email: data.user.email, isAuthenticated: true, address: data.user.address, phoneNumber: data.user.phoneNumber }));

      // alert("Registration successful");
      setError(null);
      navigate('/')
    } catch (err: any) {
      // const msg =
      //   err?.message ||
      //   "An unexpected error occurred during registration.";
      const msg = err?.response?.data?.message || err?.message || "Something went wrong please try again";

      dispatch(setUser({ userId: null, userName: null, email: null, isAuthenticated: false, address: null, phoneNumber: null }));
      setError(msg);
    }
    finally {
      setLoading(false)
    }
  };


  return (
    <main className={`${styles.maincontainer}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.header}`}>
          <h2 className={`${styles.title}`}>{isLogin ? 'Login to BMB Fashion.' : 'Register for BMB Fashion.'}</h2>
          <p className={`${styles.subtitle}`}>
            {isLogin ? (
              <>
                Don't have an account? <span className={`${styles.link}`} onClick={() => setIsLogin(false)}>Create a free account</span>
              </>
            ) : (
              <>
                Already have an account? <span className={`${styles.link}`} onClick={() => setIsLogin(true)}>Login here</span>
              </>
            )}
          </p>
        </div>
        {/* <div>
        <button className={`${styles.googleButton}`}>
          <img src={GoogleLogo} alt="Google logo" className={`${styles.googleLogo}`} onClick={googleLogin}/>
          {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
        </button>
      </div> */}
        <div className={`${styles.divider}`}>
          <span className={`${styles.dividerText}`}>or {isLogin ? 'Sign in' : 'Sign up'} with Email</span>
          <div className={`${styles.dividerLine}`}></div>
        </div>

        {error && <div className={`${styles.errormessage}`}>
          <p>*{error}</p>
        </div>}

        <form className={`${styles.form}`} onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className={`${styles.label}`}>Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`${styles.input}`}
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className={`${styles.label}`}>Your Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`${styles.input}`}
              placeholder="BMB Fashion@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className={`${styles.label}`}>Password</label>
            <div className={`${styles.passwordContainer}`}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`${styles.input}`}
                placeholder="Min. 6 character"
                value={password}

                onChange={(e) => setPassword(e.target.value)}
              />

              <Box
                sx={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  // border:"2px solid red",
                  // height:"100%"
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff sx={{
                    height:{
                      xs:"20px",
                      sm:"20px",
                      md:"20px",
                      lg:"25px"
                    },
                    width:{
                      xs:"20px",
                      sm:"20px",
                      md:"20px",
                      lg:"25px",
                    }
                  }} /> : <Visibility  sx={{
                    height:{
                      xs:"20px",
                      sm:"20px",
                      md:"20px",
                      lg:"25px"
                    },
                    width:{
                      xs:"20px",
                      sm:"20px",
                      md:"20px",
                      lg:"25px",
                    }
                  }}  />}
                </IconButton>
              </Box>
              {/* <div className={`${styles.eyeIcon}`}>
              <i className="fas fa-eye"></i>
            </div> */}
            </div>
          </div>
          {isLogin && (
            <div className="flex items-center justify-end">
              {/* <div className={`${styles.checkboxContainer}`}>
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className={`${styles.checkbox}`}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember_me" className={`${styles.checkboxLabel}`}>Remember me</label>
              </div> */}
              <div className="text-sm">
                <Link to="/forgotpassword" className={`${styles.forgotPassword}`}>Forgot Password?</Link>
              </div>
            </div>
          )}
          <div className='!mt-[10px]'>
            <Button
              variant='contained'
              type="submit"
              className={`${styles.loginButton}`}
            >
              {isLogin ? (loading ? <CircularProgress size={29} sx={{ color: "#fafafa" }} /> : 'Login')
                :
                (loading ? <CircularProgress size={29} sx={{ color: "#fafafa" }} /> : 'Register')}
            </Button>
          </div>
        </form>
      </div>
    </main>

  );
};

export default Login;