import { Skeleton } from '@mui/material'
import React from 'react'


type SeaaChBarSkeleonProp = {
    height:string
}

const SeaachBarSkeleton:React.FC<SeaaChBarSkeleonProp> = ({height}) => {
  return (
    <div className='relative w-[100%]'>
    <Skeleton animation="wave" variant='rounded' width="100%" height={height}/>
    <Skeleton animation="wave" variant='rounded' width="50px" height="50px" 
    sx={{position:"absolute", zIndex:2, background:"#0000001c", right:"1%", top:"5px", borderRadius:"50%"}}  />
    </div>
        
  )
}

export default SeaachBarSkeleton