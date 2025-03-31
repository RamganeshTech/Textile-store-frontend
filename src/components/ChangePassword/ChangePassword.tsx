import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./ChangePassword.module.css";
import { validateChangePassword } from "../../Utils/validation";
import { useChangePassword } from "../../apiList/userprofileApi";
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {


  let navigate = useNavigate()

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  

  let {mutate, isPending, error , isError} = useChangePassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      validateChangePassword(form)

      mutate(form, {
        onSuccess:(data)=>{
          if (data.ok) {
            console.log(data.message)
          }       
         }
      })
    }
    catch (error) {
      if(error instanceof Error){
        console.log(error.message)
      }   
  };
}


if(isError){
  console.log(error)
}

  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change Password</h2>
      <form onSubmit={handleSubmit} className={styles[`form`]}>
        <TextField
          label="Current Password"
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          fullWidth
          className={styles[`inputField`]}
        />
        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          fullWidth
          className={styles[`inputField`]}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          fullWidth
          className={styles[`inputField`]}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {isPending ? <CircularProgress sx={{color:"#fafafa"}} size={25} /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
