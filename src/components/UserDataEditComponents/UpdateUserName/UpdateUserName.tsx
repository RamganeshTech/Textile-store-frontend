import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./UpdaeUserName.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, UserState } from "../../../slices/user";
import { useChangeUserName } from "../../../apiList/userprofileApi";
import store from "../../../store/store";

const UpdateUserName: React.FC = () => {


  let navigate = useNavigate()

  const [userName, setUserName] = useState<string>("");

  

  let {mutate, isPending, isError, error} = useChangeUserName();

  let dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
     if(!userName){
        throw new Error("Please enter the Username")
     }
     
     mutate(userName, {
       onSuccess:(data)=>{
         if (data.ok) {
           console.log(data.message)
           const currentState = store.getState().user; 
            dispatch(setUser({...currentState,userName }))
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

  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change username</h2>
      <form onSubmit={handleSubmit} className={styles[`form`]}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={userName}
          onChange={handleChange}
          fullWidth
          className={styles[`inputField`]}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {isPending ? <CircularProgress sx={{color:"#fafafa"}} size={25} /> : "Update Username"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUserName;
