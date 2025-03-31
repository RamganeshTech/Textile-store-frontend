import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./UpdateUserEmail.module.css";
import { useNavigate } from "react-router-dom";
import { useChangeEmail } from "../../../apiList/userprofileApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/user";

const UpdateUserEmail: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  

  let {mutate, isPending ,isError, error} = useChangeEmail();

  let dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setEmail(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
     if(!email){
        throw new Error("Please enter the Email")
     }


      mutate(email, {
        onSuccess:(data)=>{
          if (data.ok) {
            console.log(data.message)
            dispatch(setUser({isAuthenticated:true,userId: null, email: email, userName:null}))
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
    console.log(error, isError)
    }
  
  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change Email</h2>
      <form onSubmit={handleSubmit} className={styles[`form`]}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          fullWidth
          className={styles[`inputField`]}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {isPending ? <CircularProgress sx={{color:"#fafafa"}} size={25} /> : "Update Email"}
          </Button>
      </form>
    </div>
  );
};

export default UpdateUserEmail;
