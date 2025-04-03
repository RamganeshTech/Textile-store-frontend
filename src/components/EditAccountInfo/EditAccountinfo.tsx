import React from 'react'
import style from './EditAccountinfo.module.css'
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const EditAccountinfo = () => {
    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <div className={style.titleDiv}>
                <h2 className={style.title}>Edit Account info</h2>
            </div>

            <div className={`${style.innerDiv}`}>
                <List className={`${style.list}`}>

                    <ListItem
                        component="button"
                        onClick={() => navigate("../editemail")}
                        className={`${style.listItem}`}
                    >
                        <ListItemText primary="Edit Email"
                            sx={{
                                "& .MuiTypography-root": {
                                    fontSize: {
                                        xs: "18px",
                                        sm: "22px",
                                        md: "22px",
                                        lg: "24px",
                                        xl: "26px",  // Extra large screens
                                    }
                                }
                            }}
                        />
                    </ListItem>

                    <Divider />
                    <ListItem
                        component="button"
                        onClick={() => navigate("../editphonenumber")}
                        className={`${style.listItem}`}
                    >
                        <ListItemText primary="phone Number"
                            sx={{
                                "& .MuiTypography-root": {
                                    fontSize: {
                                        xs: "18px",
                                        sm: "22px",
                                        md: "22px",
                                        lg: "24px",
                                        xl: "26px",  // Extra large screens
                                    }
                                }
                            }}
                        />
                    </ListItem>

                    <Divider />
                    <ListItem
                        component="button"
                        onClick={() => navigate("../editusername")}
                        className={`${style.listItem}`}
                    >
                        <ListItemText primary="User Name"
                            sx={{
                                "& .MuiTypography-root": {
                                    fontSize: {
                                        xs: "18px",
                                        sm: "22px",
                                        md: "22px",
                                        lg: "24px",
                                        xl: "26px",  // Extra large screens
                                    }
                                }
                            }}
                        />
                    </ListItem>

                </List>
            </div>
        </div>

    )
}

export default EditAccountinfo