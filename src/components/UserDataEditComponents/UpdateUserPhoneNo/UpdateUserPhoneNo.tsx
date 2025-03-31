import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./UpdateUserPhoneNo.module.css";
import { useChangePhoneNo } from "../../../apiList/userprofileApi";

const UpdateUserPhoneNo: React.FC = () => {

  const [PhoneNo, setPhoneNo] = useState<string>("");

  

  let {mutate, isPending, isError, error} = useChangePhoneNo();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
        let phoneRegex = /^[0-9]{10}$/

     if(!PhoneNo.trim()){
        throw new Error("Please enter the PhoneNo")
     }

     if(!phoneRegex.test(PhoneNo.trim())){
        throw new Error("Please enter 10 digits and it should not contain any alphabets or speacial symbols")
     }
     
     mutate(PhoneNo.trim(), {
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

  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change PhoneNo</h2>
      <form onSubmit={handleSubmit} className={styles[`form`]}>
        <TextField
          label="PhoneNo"
          type="phone"
          name="PhoneNo"
          value={PhoneNo}
          onChange={handleChange}
          fullWidth
          className={styles[`inputField`]}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {isPending ? <CircularProgress sx={{color:"#fafafa"}} size={25} /> : "Update Phone Number"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUserPhoneNo;
