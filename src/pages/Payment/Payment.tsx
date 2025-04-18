import React, { ChangeEvent, useEffect, useState, useMemo } from 'react'
import style from './Payment.module.css'
import { Button, TextField } from '@mui/material'
import { validateDeliveryDetails } from '../../Utils/validation'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'


export interface BookinginfoType {
    username: string
    state: string
    pincode: string,
    district: string
    landmark: string
    email: string
    phonenumber: string
    doorno: string
    street: string
}

const inputFields = [
    { name: "username", placeholder: "Username" },
    { name: "doorno", placeholder: "Door No" },
    { name: "street", placeholder: "Street" },
    { name: "state", placeholder: "State" },
    { name: "district", placeholder: "District" },
    { name: "landmark", placeholder: "Landmark" },
    { name: "email", placeholder: "Email" },
    { name: "phonenumber", placeholder: "Phone Number" },
];

const Payment = () => {

    const [bookingInfo, setBookingInfo] = useState<BookinginfoType>({
        username: "",
        doorno: "",
        street: "",
        state: "",
        pincode: "",
        district: "",
        landmark: "",
        email: "",
        phonenumber: "",
    })

    const [errors, setErrors] = useState<Partial<Record<keyof BookinginfoType, string>>>({});

    let user = useSelector((state: RootState) => state.user)
    let buyItems = useSelector((state: RootState) => state.buyItems.items)

    // let { data: cart, isLoading, isError, error } = useFetchCart()


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target
        setBookingInfo((p) => ({ ...p, [name]: value }))
    }

    // const totalAmount = useMemo(() => {
    //     if (!cart) return 0;

    //     return cart.reduce((sum: number, item: any) => {
    //         return sum + (item.productId.price * item.quantity);
    //     }, 0);
    // }, [cart]);

    // const totalQuantity = useMemo(() => {
    //     if (!cart) return 0;

    //     return cart.reduce((sum: number, item: any) => {
    //         return sum + item.quantity;
    //     }, 0);
    // }, [cart]);


    // combining redux for single 
    // let { singleProductAmount, singleProductQuantity }: { singleProductAmount: number, singleProductQuantity: number } = useMemo(() => {

    //     let singleProductQuantity = 0;
    //     let singleProductAmount = 0;

    //     if (buyItems.length === 1) {
    //         singleProductQuantity = buyItems.reduce((acc, curr) => {
    //             return acc + curr.quantity
    //         }, 0)

    //         singleProductAmount = buyItems.reduce((acc, curr) => {
    //             return acc + curr.singleQuantityPrice
    //         }, 0)
    //     }

    //     return { singleProductAmount, singleProductQuantity }
    // }, [])


    // using api if the length is multiple
    // let { multipleProductAmount, multipleProductQuantity }: { multipleProductAmount: number, multipleProductQuantity: number } = useMemo(() => {

    //     let multipleProductQuantity = 0;
    //     let multipleProductAmount = 0;

    //     if (cart.length > 1) {
    //         multipleProductQuantity = cart.reduce((sum: number, item: any) => {
    //                     return sum + item.quantity;
    //                 }, 0);

    //         multipleProductAmount = cart.reduce((sum: number, item: any) => {
    //                     return sum + (item.productId.price * item.quantity);
    //                 }, 0);
    //     }

    //     return { multipleProductAmount, multipleProductQuantity }
    // }, [cart])


    const totalQuantity = useMemo(() => buyItems.reduce((acc, item) => acc + item.quantity, 0), []);
    const totalAmount = useMemo(() => buyItems.reduce((acc, item) => acc + (item.quantity * item.singleQuantityPrice), 0), []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: Partial<Record<keyof BookinginfoType, string>> = {};

        Object.entries(bookingInfo).forEach(([key, value]) => {
            try {
                validateDeliveryDetails(key as keyof BookinginfoType, value);
            } catch (error: any) {
                newErrors[key as keyof BookinginfoType] = error.message;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            // There are errors; do not submit the form.
            return;
        }

        // Proceed with form submission logic here
        console.log("Form submitted successfully!", bookingInfo);
    };


    // const {data:createOrder, isPending``:createorderIsPending, isError:createorderIsError} = useCreateOrder()

    useEffect(() => {
        // Create the new booking object using user data, defaulting to empty strings if not present
        const newBookingInfo: BookinginfoType = {
            username: user.userName || '',
            doorno: user.address?.doorno || '',
            street: user.address?.street || '',
            state: user.address?.state || '',
            district: user.address?.district || '',
            pincode: user.address?.pincode || '',
            landmark: user.address?.landmark || '',
            email: user.email || '',
            phonenumber: user.phoneNumber || '',
        };


        console.log(newBookingInfo,)

        let newErrors: Partial<Record<keyof BookinginfoType, string>> = {};
        Object.keys(newBookingInfo).forEach((key) => {
            const fieldName = key as keyof BookinginfoType;
            const fieldValue = newBookingInfo[fieldName];
            console.log("entering int to useEffect of payment")
            try {
                console.log(fieldName, fieldValue)

                // Validate each field individually
                validateDeliveryDetails(fieldName, fieldValue);
            } catch (err: any) {
                console.log(err)
                newErrors[fieldName] = err.message; // Store error message for the specific field
            }
        });
        console.log(newErrors)
        // Update the state with new values and errors
        setBookingInfo(newBookingInfo);
        setErrors(newErrors);
    }, [user]);

    return (
        <main className={`${style.maincontainer}`}>

            {/* {isRemoveQuanError && [401, 403].includes((removeQuantityError as any)?.response?.status) &&
                    <ErrorComponent message={(removeQuantityError as any)?.response?.data?.message || removeQuantityError?.message as string}
                        showLoginButton={true} onClose={() => {
                            removeFavQuanReset()
                        }
                        } />} */}

            <div className={`${style.innerDiv}`}>
                <section className={`${style.inputfields}`}>
                    <form action="" onSubmit={handleSubmit} className={`${style.inputform}`}>
                        <h1>Delivery Details</h1>
                        {inputFields.map(({ name, placeholder }) => (
                            <div key={name} className={style.individualTextDiv}>
                                <TextField
                                    error={!!errors[name as keyof BookinginfoType]}
                                    helperText={errors[name as keyof BookinginfoType] || ""}
                                    className={style.inputfield}
                                    placeholder={placeholder}
                                    name={name}
                                    value={bookingInfo[name as keyof BookinginfoType]}
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
                                {/* {errors[name as keyof BookinginfoType] && (
                                    <p className="error">{errors[name as keyof BookinginfoType]}</p>
                                )} */}
                            </div>
                        ))}

                    </form>
                </section>

                <section className={`${style.cartDiv}`}>

                <div className={`${style.productListPayment}`}>
                            <p className='text-2xl font-normal text-[#2473ea]'>Products</p>
                            <div className={style.innerdiv}>
                            {buyItems.map((item) => (
                                <div key={item.itemId} className={`${style.cartItem}`}>
                                    <div className={style.imgwrapper}>
                                    <img src={item.productImg} alt={item.itemId} className={style.productImage} />

                                    </div>
                                    <div className={style.productInfo}>
                                        <p><strong>{item.productName}</strong></p>
                                        <p>Price: <span>₹{item.singleQuantityPrice}</span></p>
                                        <p>Quantity: <span>{item.quantity}</span></p>
                                        <p>Color: <span>{item.color}</span> </p>
                                        <p>Size: <span>{item.size}</span> </p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    <div className={`${style.cartinnerDiv}`}>
                        <div>
                            <p>Cart Details</p>
                        </div>

                        <div>
                            <p>Total Amount</p>
                            <span>₹{totalAmount}</span>
                        </div>

                        <div>
                            <p>Total Items</p>
                            <span>{totalQuantity}</span>
                        </div>

                        <div className='w-[100%] !flex !justify-center '>
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>


                </section>
            </div>
        </main>
    )
}

export default Payment