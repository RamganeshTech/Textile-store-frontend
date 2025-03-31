import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./VerifyPassword.module.css";
import { data, Navigate, useNavigate } from "react-router-dom";
import { useVerifyPassword } from "../../apiList/userprofileApi";

const VerifyPassword = () => {

  let navigate = useNavigate()
  const [form, setForm] = useState({
    // email: "",
    password: "",
  });



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
            navigate('../editaccountinfo')
          }
        }
      })
      console.log("Password Changed:", form);
    }
    catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
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

     {data && <div>{data?.message}</div>}

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
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            className={styles[`inputField`]}
            // sx={{
            //   height: { xs: 30, sm: 40, md: 50, lg: 60 },
            //   "& .MuiOutlinedInput-root": {
            //     height: { xs: 30, sm: 40, md: 50, lg: 60 }, // Wrapper height
            //     "& input": {
            //       height: { xs: 30, sm: 40, md: 50, lg: 60 }, // Input field height
            //     },
            //   },
            //   "& .MuiInputLabel-root": {
            //     top: "1px", // Adjusts the placeholder position
            //     fontSize: "14px"
            //   },
            //   "& .MuiOutlinedInput-input": {
            //     padding: "12px 14px", // Adjusts input padding
            //   },
            //   "& .MuiInputLabel-shrink": {
            //     // transform: "translate(14px, -10px) scale(0.85)", // Fixes label shrink position
            //   },
            // }}



            // sx={{
            //   height: { xs: 40, sm: 50, md: 60, lg: 70 }, // Adjusts input height
            //   "& .MuiOutlinedInput-root": {
            //     height: { xs: 40, sm: 50, md: 60, lg: 70 }, // Wrapper height
            //     "& input": {
            //       height: "100%", // Makes sure input takes full height
            //       padding: "12px 14px", // Fix text alignment inside input
            //     },
            //   },
            //   "& .MuiInputLabel-root": {
            //     transform: "translate(14px, 14px) scale(1)", // Default position
            //     fontSize: "14px",
            //     transition: "all 0.2s ease-out",
            //   },
            //   "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
            //     transform: "translate(14px, -8px) scale(0.85)", // Moves label slightly up
            //   },
            // }}
          />


          {!isError && <div className={`${styles.errormessage}`}>
            {/* <p>{error?.message}</p> */}
            <p>error ocuuere man man man</p>
          </div>}
        </div>



        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {!isPending ? "verify" : "loading"}
        </Button>
      </form>
    </div>
  )
}

export default VerifyPassword