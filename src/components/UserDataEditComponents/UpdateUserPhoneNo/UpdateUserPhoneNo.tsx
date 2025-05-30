import React, {  useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./UpdateUserPhoneNo.module.css";
import { useChangePhoneNo } from "../../../apiList/userprofileApi";


const UpdateUserPhoneNo: React.FC = () => {

  const [PhoneNo, setPhoneNo] = useState<string>("");
  const [localError, setLocalError] = useState<string>("")


  let { mutate, isPending, isError} = useChangePhoneNo();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let phoneRegex = /^[0-9]{10}$/

      if (!PhoneNo.trim()) {
        throw new Error("Please enter the PhoneNo")
      }

      if (!phoneRegex.test(PhoneNo.trim())) {
        throw new Error("Please enter 10 digits and it should not contain any alphabets or speacial symbols")
      }

      mutate(PhoneNo.trim(), {
        onSuccess: (data) => {
          if (data.ok) {
            setLocalError("")

            setSuccessMessage(data.message);

            // Clear success message after 3 seconds
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);

          }
        },
        onError(error:any) {

          let message = error?.response?.data.message || error?.message || "something went wrong"
          setLocalError(message)
        },
      })


    }
    catch (error) {
      if (error instanceof Error) {
        setLocalError(error.message)
      }
    };
  }


  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change PhoneNo</h2>

      {successMessage && <div className={styles.successmessage}>{successMessage}</div>}


      <form onSubmit={handleSubmit} className={styles[`form`]}>
        <div className={`${styles.inputcontainer}`}>
          <TextField
            label="PhoneNo"
            type="phone"
            name="PhoneNo"
            // error={isError}
            value={PhoneNo}
            onChange={handleChange}
            fullWidth
            required
            className={styles[`inputField`]}
          />
          {localError && <div className={`${styles.errormessage}`}>
            <p>{localError}</p>
            {/* <p>error ocuuere man man man</p> */}
          </div>}


          {/* {localError && isError && <div className={`${styles.errormessage}`}>
            <p>{localError}</p>
          </div>} */}
        </div>
        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {!isError && isPending ? <CircularProgress sx={{ color: "#fafafa" }} size={25} /> : "Update Phone Number"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUserPhoneNo;
