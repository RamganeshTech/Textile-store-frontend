import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./VerifyPassword.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useVerifyPassword } from "../../apiList/userprofileApi";

const VerifyPassword = () => {

  let navigate = useNavigate()
  const [form, setForm] = useState({
    // email: "",
    password: "",
  });

  let { mutate, isPending, isError, error } = useVerifyPassword()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.password) {
        throw new Error("Enter the password")
      }

      if (form.password.length < 8) {
        throw new Error("password should be atleast 8 digits long")
      }

      mutate(form.password, {
        onSuccess:(data)=>{
          if (data.ok) {
            navigate('../editaccountinfo')
          }       
         }
      })
      console.log("Password Changed:", form);
    }
    catch (error) {
      if(error instanceof Error){
        console.log(error.message)
      }
    }
  };


  // console.log(error, isError)

  if(isError){
  console.log(error, isError)
  }

  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Verify Password</h2>
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
        <TextField
          label="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          className={styles[`inputField`]}
        />
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