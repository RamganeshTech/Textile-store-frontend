import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {

    const navigate = useNavigate()

    return (
        <section className='!mt-[70px] h-[90vh] w-[100vw] flex justify-start items-start !p-[40px] sm:!p-[40px]'>
            <div className='!space-y-2 sm:!space-y-6'>
                <h1 className='text-xl font-semibold text-[#383737] lg:text-[34px] sm:text-[24px] md:text-[28px]'>Sorry Page Not Found...</h1>
                <Button variant='contained'
                    onClick={() => navigate(-1)}
                    sx={{
                        width:{
                            sm:"120px",
                            md:"120px"
                        },
                        height:{
                             sm:"50px",
                            md:"50px"
                        },
                        fontSize:{
                            sm:"20px",
                            md:"20px"
                        }
                    }}  
                >Go Back</Button>
            </div>
        </section>
    )
}

export default NotFound