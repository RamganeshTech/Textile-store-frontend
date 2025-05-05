import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { List, ListItemText, Divider, ListItemButton } from "@mui/material";
import styles from "./UserProfile.module.css";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../apiList/userauthApi";
import { setUser } from "../../slices/user";
import { useDispatch } from 'react-redux';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  let location = useLocation()

  let dispatch = useDispatch()

  const [showUserProfile, setShowUserProfile] = useState<boolean>(false)

  let { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: data => {
      if (data.ok) {
        dispatch(setUser({ isAuthenticated: false, userId: null, email: null, userName: null, address: null, phoneNumber: null  }))
        navigate('/')
      }
    }
  })

  useEffect(() => {
    let locationArr = location.pathname.split("/")
    if (locationArr[locationArr.length - 1] == '') {
      locationArr.pop()
    }
    if (locationArr[locationArr.length - 1] == ("userprofile")) {
      setShowUserProfile(true)
    }
    else {
      setShowUserProfile(false)
    }
  }, [location.pathname])

  return (
    <div className="!mt-[70px] h-[100vh] w-[100vw] flex justify-center items-center bg-[#fafafa]">
      {showUserProfile ? <div className={`${styles.container}`}>
        <div className={`${styles.titleDiv}`}>
          <h2 className={`${styles.title}`}>My Profile</h2>
          <Divider />
        </div>

        <div className={`${styles.innerDiv}`}>
          <List className={`${styles.list}`}>
            <ListItemButton
              onClick={() => navigate("./verifypassword")}
              className={`${styles.listItem}`}
            >
              <ListItemText primary="Edit account info"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: {
                      xs: "18px",  // Small screens (mobile)
                      sm: "22px",  // Tablets
                      md: "22px",  // Medium screens
                      lg: "24px",  // Large screens
                      xl: "26px",  // Extra large screens
                    },
                    textAlign: "center",
                  },
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              onClick={() => navigate("./changepassword")}
              className={`${styles.listItem}`}
            >
              <ListItemText primary="Change Password"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: {
                      xs: "18px",  // Small screens (mobile)
                      sm: "22px",  // Tablets
                      md: "22px",  // Medium screens
                      lg: "24px",  // Large screens
                      xl: "26px",
                    },
                    textAlign: "center",
                  },
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              onClick={() => navigate("./editaddress")}
              className={`${styles.listItem}`}
            >
              <ListItemText primary="Edit Address"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: {
                      xs: "18px",  // Small screens (mobile)
                      sm: "22px",  // Tablets
                      md: "22px",  // Medium screens
                      lg: "24px",  // Large screens
                      xl: "26px",
                    },
                    textAlign: "center",
                  },
                }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={() => navigate("./myorders")}
              className={`${styles.listItem}`}
            >
              <ListItemText primary="My Orders"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: {
                      xs: "18px",  // Small screens (mobile)
                      sm: "22px",  // Tablets
                      md: "22px",  // Medium screens
                      lg: "24px",  // Large screens
                      xl: "26px",
                    },
                    textAlign: "center",
                  },
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => logout()} className={styles.listItem}>
              <ListItemText
                primary="Logout"
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: {
                      xs: "18px",
                      sm: "22px",
                      md: "22px",
                      lg: "24px",
                      xl: "26px",
                    },
                    textAlign: "center",
                  },
                }}
              />
            </ListItemButton>
          </List>
        </div>
      </div>

        :

        <Outlet />
      }
    </div>

  );
};

export default UserProfile;
