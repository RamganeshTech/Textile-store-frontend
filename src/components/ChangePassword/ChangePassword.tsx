import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./ChangePassword.module.css";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle password change
    console.log("Password Changed:", form);
  };

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
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
