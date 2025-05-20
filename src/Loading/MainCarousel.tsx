import { Box, Skeleton } from "@mui/material";

const MainCarousel = () => {
  return (
    <Box sx={{ position: "relative", width: "100%", height:{
        xs:"35vh",
        sm:"88vh",
        md:"88vh"
    } }}>
      <Skeleton variant="rectangular" width="100%" height="100%" />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height:"100%",
          display:"flex",
          alignItems:"center",
          gap:"10px",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="90%" sx={{ borderRadius:"5px" }} />
        <div className="w-[100%]  flex flex-col items-start justify-center">
        <Skeleton variant="rectangular" width="100%" sx={{height:"80px"}} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        </div>
        <Skeleton variant="rectangular" width="100%" height="90%" sx={{ borderRadius:"5px" }}  />
      </Box>
    </Box>
  )
}

export default MainCarousel