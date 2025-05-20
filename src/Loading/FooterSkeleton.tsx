// components/skeletons/FooterSkeleton.tsx

import { Box, Skeleton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FooterSkeleton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f5f5f5",
        px: 3,
        py: 4,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: 4,
        minHeight:{
            sm:"300px"
        },
        width:"100%"
      }}
    >
      {/* Column 1: Logo */}
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="rounded" width="80%"  height={isMobile ? 100 : "70%"}  />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </Box>

      {/* Column 2: List of content */}
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="50%" />
      </Box>

      {/* Column 3: List of content */}
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="50%" />
      </Box>
    </Box>
  );
}
