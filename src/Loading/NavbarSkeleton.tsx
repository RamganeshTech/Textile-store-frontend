import { Box, Skeleton } from "@mui/material";

const NavbarSkeleton = ()=> {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        backgroundColor: "#fff",
        width:"100%",
      }}
    >
      {/* Left: Login Skeleton */}
      <Skeleton variant="rectangular" width={60} height={30} />

      {/* Center: Logo */}
      <Skeleton variant="text" width={140} height={40} />

      {/* Right: Icons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="circular" width={30} height={30} />
      </Box>
    </Box>
  );
}


export default NavbarSkeleton;