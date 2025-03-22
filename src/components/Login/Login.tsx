import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Utils/firebase';


import GoogleLogo from '../../assets/Google Logo.png'
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../../apiClient/apiClient';
import { validateLogin, validateRegister } from '../../Utils/validation';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [indianState, setIndianState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {

      validateLogin({email, password})

      const response = await Api.post("/login", { email, password });
      // The backend should set an httpOnly, secure cookie with the token.
      if (response.data?.success) {
        console.log("Login successful:", response.data.user);
        // Redirect to a protected route
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "An unexpected error occurred during login.";
      console.error("Login error:", msg);
      setError(msg);
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



  const fetchUserData = async ()=>{
    // onAuthStateChanged it is going to do when user is loggedin the auth variable iwll be empty , when logged in this auth will contain the data fo users
    // the user params will hold all the detail when the user is logging in like eamil and pass
    auth.onAuthStateChanged(async (user)=>{
      console.log(user)
    })
  }

  useEffect(()=>{
    fetchUserData()
  }, [])


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
    setError(null);
    try {

      validateRegister({email, password, phoneNumber, pincode, address, state:indianState, userName:name})
      const response = await Api.post("/register", {
        // Required fields
        userName: name, // Pass the name input as userName, as defined in your UserModel
        email,
        password,
        // Optional fields – if not provided, backend should default them to null
        address: address || null,
        pincode: pincode || null,
        state: indianState || null,
        phoneNumber: phoneNumber || null,
      });
  
      if (response.data?.success) {
        console.log("Registration successful:", response.data.message);
        // Optionally, switch to login view or automatically log the user in
        setIsLogin(true);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "An unexpected error occurred during registration.";
      console.error("Registration error:", msg);
      setError(msg);
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
              type="password"
              autoComplete="current-password"
              required
              className={`${styles.input}`}
              placeholder="Min. 6 character"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={`${styles.eyeIcon}`}>
              <i className="fas fa-eye"></i>
            </div>
          </div>
        </div>
        {isLogin && (
          <div className="flex items-center justify-between">
            <div className={`${styles.checkboxContainer}`}>
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className={`${styles.checkbox}`}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember_me" className={`${styles.checkboxLabel}`}>Remember me</label>
            </div>
            <div className="text-sm">
              <Link to="/forgotpassword" className={`${styles.forgotPassword}`}>Forgot Password?</Link>
            </div>
          </div>
        )}
        <div>
          <Button
          variant='contained'
            type="submit"
            className={`${styles.loginButton}`}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </div>
      </form>
    </div>
    </main>
   
  );
};

export default Login;