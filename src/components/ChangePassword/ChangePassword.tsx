import React, { useState } from "react";
import { TextField, Button, CircularProgress, Box, IconButton } from "@mui/material";
import styles from "./ChangePassword.module.css";
import { validateChangePassword } from "../../Utils/validation";
import { useChangePassword } from "../../apiList/userprofileApi";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword: React.FC = () => {


  let navigate = useNavigate()

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)



  let { mutate, isPending, error, isError } = useChangePassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      validateChangePassword(form)

      mutate(form, {
        onSuccess: (data) => {
          if (data.ok) {
            console.log(data.message)

            setErrorMessage("")
            setSuccessMessage(data.message);

            // Clear success message after 3 seconds
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          }
        },

        onError: (data) => {
          setErrorMessage(data.message)
        }
      })
    }
    catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        setSuccessMessage("")
        setErrorMessage(error.message)
      }
    };
  }


  if (isError) {
    console.log(error)
  }

  return (
    <div className={styles[`container`]}>
      <h2 className={styles[`title`]}>Change Password</h2>

      {!errorMessage && successMessage && <div className={styles.successmessage}>{successMessage}</div>}
      {!successMessage && errorMessage && <div className={styles.errormessage}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} className={styles[`form`]}>
        <div className="relative">
          <TextField
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            fullWidth
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
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <VisibilityOff sx={{
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


        </div>
        <div className="relative">

          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            fullWidth
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
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <VisibilityOff sx={{
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

        </div>
        <div className="relative">
          <TextField
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VisibilityOff sx={{
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

        </div>



        <Button
          type="submit"
          variant="contained"
          className={styles[`submitButton`]}
        >
          {isPending ? <CircularProgress sx={{ color: "#fafafa" }} size={25} /> : "Update Password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
