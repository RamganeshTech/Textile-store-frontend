import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import styles from "./UserProfile.module.css";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Profile</h2>
      <List className={styles.list}>
        <ListItem 
          component="button" 
          onClick={() => navigate("/changepassword")}
          className={styles.listItem}
        >
          <ListItemText primary="Change Password" />
        </ListItem>
        <Divider />
        <ListItem 
          component="button" 
          onClick={() => navigate("/myorders")}
          className={styles.listItem}
        >
          <ListItemText primary="My Orders" />
        </ListItem>
      </List>
    </div>
  );
};

export default UserProfile;
