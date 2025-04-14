import { Button, CircularProgress, IconButton, TextField } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import style from './AdminLogin.module.css'
import { useForm } from 'react-hook-form'
import { validateLogin } from '../../../Utils/validation'
import SuccessAlert from '../../../Shared/SuccessAlert/SuccessAlert'
import { useNavigate } from 'react-router-dom'
import { useAdminLogin } from '../../../apiList/adminApi'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box } from '@mui/material';
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import { useDispatch } from 'react-redux'
import { setAdminLogin } from '../../../slices/admin'






const AdminLogin = () => {

    let admin = useSelector((state:RootState)=> state.admin)
    let dispatch = useDispatch<AppDispatch>()
    let { mutate: adminLogin, isPending, error, isError, isSuccess , data:adminLoginData} = useAdminLogin()

    const [showPassword, setShowPassword] = useState<boolean>(false)


    const [adminlogin, setAdminLoginData] = useState({
        email:"",
        password:""
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        let {name, value} = e.target
        setAdminLoginData((p:any)=> ({...p, [name]:value}))
    }

    // let { register, handleSubmit, control } = useForm();

    let navigate = useNavigate()

    const onSubmit = (e:FormEvent) => {
        e.preventDefault()
        try {
            validateLogin(adminlogin)

            adminLogin(adminlogin, {
                onSuccess:(data)=>{
                console.log(data)

                    dispatch(setAdminLogin({email:data.email, isAuthenticated:data.isAuthenticated}))
                    navigate('../admin/addproduct')
                    
                }
            })
            
            
            


        }
        catch (error) {
            // let msg;
            // if (typeof error === "string") {
            //     msg = error
            // }
            // else {
            //     msg = (error as any)?.response?.data?.message || (error as any)?.message
            // }
            dispatch(setAdminLogin({email:null, isAuthenticated:(error as any)?.response?.data?.isAuthenticated}))
            console.log("error from adminlogin", error)
        }
    }

    return (
        <main className={style.container}>
            <section className={style.innercontainer}>
                <h1 className={style.heading}>Admin Login</h1>
                {isSuccess && <div className={style.successmessage}>Logged in successfull</div> }
                <form action="" onSubmit={onSubmit} className={style.form}>
                    <TextField
                        // {...register('email',{required:true})}
                        className={style.loginform}
                        type="email"
                        label="email"
                        name="email"
                        onChange={handleChange}
                        required
                        value={adminlogin.email}
                        error={isError}
                        helperText={(error as any)?.response?.data?.message || error?.message}
                        fullWidth
                    />

                    <div className='relative'>
                        <TextField
                            // {...register("password",{required:true})}
                            className={style.loginform}
                            type={showPassword ? "text" : "password"}
                            label="password"
                            name="password"
                        onChange={handleChange}
                            required
                            value={adminlogin.password}
                            error={isError}
                            helperText={(error as any)?.response?.data?.message || error?.message}
                            fullWidth
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',                            
                                zIndex: 1,
                                // border: "2px solid red",
                                // width:""
                            }}
                        >
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VisibilityOff sx={{
                                    height: {
                                        xs: "20px",
                                        sm: "20px",
                                        md: "20px",
                                        lg: "25px"
                                    },
                                    width: {
                                        xs: "20px",
                                        sm: "20px",
                                        md: "20px",
                                        lg: "25px",
                                    }
                                }} /> : <Visibility sx={{
                                    height: {
                                        xs: "20px",
                                        sm: "20px",
                                        md: "20px",
                                        lg: "25px"
                                    },
                                    width: {
                                        xs: "20px",
                                        sm: "20px",
                                        md: "20px",
                                        lg: "25px",
                                    }
                                }} />}
                            </IconButton>
                        </Box>
                    </div>

                    <Button variant='contained' type='submit' sx={{width:"100%", fontSize:"clamp(14px, 1.2vw, 20px)"}}>
                        {isPending ? <CircularProgress sx={{ color: "#fafafa" }} size={25} /> : "Login"}
                    </Button>


                </form>
            </section>
        </main>
    )
}

export default AdminLogin