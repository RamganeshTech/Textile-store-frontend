import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, IconButton } from "@mui/material";
import styles from "./VerifyPassword.module.css";
import { data, Navigate, useNavigate } from "react-router-dom";
import { useVerifyPassword } from "../../apiList/userprofileApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const VerifyPassword = () => {

  let navigate = useNavigate()
  const [form, setForm] = useState({
    // email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false)


  let { mutate, isPending, isError, error, reset, data } = useVerifyPassword()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.password) {
        throw new Error("Enter the password")
      }

      // if (form.password.length < 8) {
      //   throw new Error("password should be atleast 8 digits long")
      // }

      mutate(form.password, {
        onSuccess: (data) => {
          if (data.ok) {
            setErrorMessage("")
            navigate('../editaccountinfo')
          }
        },

        onError: (data) => {
          setErrorMessage(data.message)
        }
      })
      console.log("Password Changed:", form);
    }
    catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        setErrorMessage(error.message)
      }

    }
  };


  // console.log(error, isError)
  console.log(data)
  if (isError) {
    console.log(error, isError)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles[`title`]}>Verify Password</h2>

      {data && <div className={styles.successmessage}>{data?.message}</div>}

      <form onSubmit={handleSubmit} className={styles[`form`]}>
        {/* <TextField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        className={styles[`inputField`]}
      /> */}
        <div className={`${styles.inputcontainer}`}>
          <TextField
            label="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            // required
            className={styles[`inputField`]}

          />

          <Box
            sx={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
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
                  }} /> : <Visibility sx={{
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
                  }} />}
            </IconButton>
          </Box>

          {errorMessage && <div className={`${styles.errormessage}`}>
            <p>*{errorMessage}</p>
            {/* <p>error ocuuere man man man</p> */}
          </div>}
        </div>



        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {!isPending ? "verify" : <CircularProgress size={24} thickness={6} sx={{ color: "#fafafa" }} />}
        </Button>
      </form>
    </div>
  )
}

export default VerifyPassword