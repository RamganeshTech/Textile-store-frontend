import {Hourglass}  from 'ldrs/react'
import 'ldrs/react/Hourglass.css'

const Loading = () => {
  return (
    <Hourglass
      size="40"
      bgOpacity="0.1"
      speed="1.75"
      color="black" 
    />
  )
}

export default Loading 