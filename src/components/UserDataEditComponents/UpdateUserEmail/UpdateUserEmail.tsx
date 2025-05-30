import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import styles from "./UpdateUserEmail.module.css";
import { useChangeEmail } from "../../../apiList/userprofileApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/user";

const UpdateUserEmail: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);



  let { mutate, isPending, isError, error } = useChangeEmail();

  let dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // if (!email) {
      //   throw new Error("Please enter the Email")
      // }


      mutate(email, {
        onSuccess: (data) => {
          if (data.ok) {
            dispatch(setUser(({email: email})))

            setSuccessMessage(data.message);

            // Clear success message after 3 seconds
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          }
        },

      })
    }
    catch (error) {
      // so if you wnat to handle that custom throw error message it will be catched here 
      // (that is outiside of the mutate will be caught here the bakcend will be caught in 
      // error variable itself form the mutation)
      if (error instanceof Error) {
      }
    };
  }
  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change Email</h2>

      {successMessage && <div className={styles.successmessage}>{successMessage}</div>}
       {/* <div className={styles.successmessage}>dat one world one</div> */}

      <form onSubmit={handleSubmit} className={styles[`form`]}>
        <div className={`${styles.inputcontainer}`}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
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
          {isPending ? <CircularProgress sx={{ color: "#fafafa" }} size={25} /> : "Update Email"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUserEmail;
