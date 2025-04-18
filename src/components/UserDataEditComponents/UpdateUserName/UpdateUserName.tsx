import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./UpdaeUserName.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/user";
import { useChangeUserName } from "../../../apiList/userprofileApi";
import store from "../../../store/store";

const UpdateUserName: React.FC = () => {



  const [userName, setUserName] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  

  let {mutate, isPending, isError, error} = useChangeUserName();

  let dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
    //  if(!userName){
    //     throw new Error("Please enter the Username")
    //  }
     
     mutate(userName, {
       onSuccess:(data)=>{
         if (data.ok) {
           const currentState = store.getState().user; 
            dispatch(setUser({...currentState,userName }))

            setSuccessMessage(data.message);

            // Clear success message after 3 seconds
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          }       
         }
      })
    }
    catch (error) {
      if(error instanceof Error){
      }   
  };
}

  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change username</h2>


      {successMessage && <div className={styles.successmessage}>{successMessage}</div>}



      <form onSubmit={handleSubmit} className={styles[`form`]}>
      <div className={`${styles.inputcontainer}`}>
      <TextField
          label="Username"
          type="text"
          name="username"
          value={userName}
          onChange={handleChange}
          fullWidth
          required
          className={styles[`inputField`]}
        />
            {isError && <div className={`${styles.errormessage}`}>
            <p>{(error as any)?.response?.data?.message || error?.message || "Something went wrong"}</p>
            {/* <p>error ocuuere man man man</p> */}
          </div>} 
      </div>
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
