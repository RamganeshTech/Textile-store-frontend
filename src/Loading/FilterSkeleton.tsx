import { Skeleton } from '@mui/material';
import React from 'react'

const FilterSkeleton: React.FC = () => {
    return (
        <div className="w-full h-[80vh] p-4 flex flex-col gap-[30px]">
            <div className="">
                <Skeleton sx={{ height: 20, width: "90%", marginBottom: "5%" }} variant='rounded' />
                {[...Array(3)].map((_, i) => {
                    const mod = i % 3;
                    const width = mod === 0 ? 80 : mod === 1 ? 60 : 40;
                    return <Skeleton key={i} variant='text' sx={{
                        width: `${width}%`,
                    }}
                    />
                }
                )}
            </div>

            <div className=" ">
                <Skeleton sx={{ height: 20, width: "90%", marginBottom: "5%" }} variant='rounded' />
                {[...Array(3)].map((_, i) => {
                    const mod = i % 3;
                    const width = mod === 0 ? 80 : mod === 1 ? 60 : 40;
                    return <Skeleton key={i} variant='text' sx={{
                        width: `${width}%`,
                    }}
                    />
                }
                )}
            </div>

            <div className="">
                <Skeleton sx={{ height: 20, width: "90%", marginBottom: "5%" }} variant='rounded' />
                {[...Array(3)].map((_, i) => {
                    const mod = i % 3;
                    const width = mod === 0 ? 80 : mod === 1 ? 60 : 40;
                    return <Skeleton key={i} variant='text' sx={{
                        width: `${width}%`,
                    }}
                    />
                }
                )}
            </div>


            <div className="">
                <Skeleton sx={{ height: 20, width: "90%", marginBottom: "5%" }} variant='rounded' />
                {[...Array(3)].map((_, i) => {
                    const mod = i % 3;
                    const width = mod === 0 ? 80 : mod === 1 ? 60 : 40;
                    return <Skeleton key={i} variant='text' sx={{
                        width: `${width}%`,
                    }}
                    />
                }
                )}
            </div>

            <div className="">
                <Skeleton sx={{ height: 20, width: "90%", marginBottom: "5%" }} variant='rounded' />
                {[...Array(3)].map((_, i) => {
                    const mod = i % 3;
                    const width = mod === 0 ? 80 : mod === 1 ? 60 : 40;
                    return <Skeleton key={i} variant='text' sx={{
                        width: `${width}%`,
                    }}
                    />
                }
                )}
            </div>

            <div className="">
                <Skeleton sx={{ height: 20, width: "90%", marginBottom: "5%" }} variant='rounded' />
                {[...Array(3)].map((_, i) => {
                    const mod = i % 3;
                    const width = mod === 0 ? 80 : mod === 1 ? 60 : 40;
                    return <Skeleton key={i} variant='text' sx={{
                        width: `${width}%`,
                    }}
                    />
                }
                )}
            </div>

            <div className=''>
                <Skeleton variant='rectangular' sx={{
                    width: `80%`,
                    height: 30,
                    margin: "auto"
                }}
                />
            </div>

        </div>
    );
};


export default FilterSkeleton