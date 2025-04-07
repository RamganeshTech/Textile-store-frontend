import React, { FormEvent, useEffect, useState } from 'react'
import styles from './EditAddress.module.css'
import { setUser, userAddress } from '../../slices/user';
import { useDispatch } from 'react-redux';
import { useChangeAddress } from '../../apiList/userprofileApi';
import { Button, CircularProgress, TextField } from '@mui/material';
import { validateAddress } from '../../Utils/validation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const inputFields = [
    { name: "doorno", placeholder: "Door No" },
    { name: "street", placeholder: "Street" },
    { name: "state", placeholder: "State" },
    { name: "district", placeholder: "District" },
    { name: "landmark", placeholder: "Landmark" },
    { name: "pincode", placeholder: "Pincode" },
];

const EditAddress = () => {

    let user = useSelector((state:RootState)=> state.user.address)

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [globalError, setGlobalError] = useState<string | null>(null);

    const [errors, setErrors] = useState<Partial<Record<keyof userAddress, string>>>({});

    const [address, setAddress] = useState<userAddress>({
        street: "",
        doorno: "",
        landmark: "",
        state: "",
        district: "",
        pincode: ""
    })


    let { mutate, isPending, isError, error, data, isSuccess } = useChangeAddress();

    let dispatch = useDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target
        setAddress(p => ({ ...p, [name]: value }))
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
            let newErrors: Partial<Record<keyof userAddress, string>> = {};

            Object.entries(address).forEach(([key, value]) => {
                try {
                    validateAddress(key as keyof userAddress, value);
                } catch (error: any) {
                    newErrors[key as keyof userAddress] = error.message;
                }
            });

            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
                // There are errors; do not submit the form.
                return;
            }

            mutate(address, {
                onSuccess: (data) => {
                  dispatch(setUser({ address: data.data }));
                  console.log(data.data)
                  setSuccessMessage("Address updated successfully!");


                  setTimeout(()=>{
                        setSuccessMessage(null)
                  }, 2000)

                  setAddress({
                    street: "",
                    doorno: "",
                    landmark: "",
                    state: "",
                    district: "",
                    pincode: ""
                  })
                }
              })
    }

      useEffect(()=>{
        console.log("isError boolean", isError)
        if(isError){
            let message = (error as any)?.response?.data?.message || error?.message || "Something went wrong"
            setGlobalError(message)
        }
      }, [isError])


      useEffect(()=>{
        console.log("partial errors", errors)
      }, [errors])

    return (
        <div className={styles[`container`]}>
            <h2 className={styles[`title`]}>Update UserAddress</h2>

            {!globalError && successMessage && <div className={styles.successmessage}>{successMessage}</div>}
            {!successMessage && globalError && <div className={styles.errormessage}>{globalError}</div>}

            <form onSubmit={handleSubmit} className={styles[`inputform`]}>
                <div className={`${styles.inputcontainer}`}>
                    {inputFields.map(({ name, placeholder }) => (
                        <div key={name} className={styles.individualTextDiv}>
                            <TextField
                                error={!!errors[name as keyof userAddress]}
                                helperText={errors[name as keyof userAddress] || ""}
                                className={styles.inputfield}
                                placeholder={placeholder}
                                name={name}
                                value={address[name as keyof userAddress]}
                                onChange={handleChange}
                                fullWidth
                                sx={{
                                    width: "100%",
                                    "& .MuiInputBase-input": {
                                        height: {
                                            xs: "10px",
                                            sm: "10px",
                                            md: "10px",
                                            lg: "15px",
                                            xl: "15px",
                                        },
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    className={styles[`submitButton`]}
                >
                    {isPending ? <CircularProgress sx={{ color: "#fafafa" }} size={19} /> : "Update Address"}
                </Button>
            </form>
        </div>
    )
}

export default EditAddress