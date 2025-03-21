import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Utils/firebase';


import GoogleLogo from '../../assets/Google Logo.png'
import { Button } from '@mui/material';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  const googleLogin = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result)=>{
      console.log(result)

      if(result.user){
        console.log(result.user)
      }
    })
  }


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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
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
      <div>
        <button className={`${styles.googleButton}`} onClick={googleLogin}>
          <img src={GoogleLogo} alt="Google logo" className={`${styles.googleLogo}`} />
          {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
        </button>
      </div>
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
              <a href="#" className={`${styles.forgotPassword}`}>Forgot Password?</a>
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