import React from 'react'
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const CardSkeleton: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 2,  width: '100%' }}>
      {/* Image with aspect ratio (16:9) */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            '&::after': {
              animationDuration: '0.8s', // default is 1.5s, decrease to speed up
            },
          }}
        />
      </Box>
      <CardContent>
        <Skeleton variant="text" width="80%" height={28} animation="wave" sx={{
          '&::after': {
            animationDuration: '0.8s', // default is 1.5s, decrease to speed up
          },
        }} />
        <Skeleton variant="text" width="60%" height={20} animation="wave" sx={{
          '&::after': {
            animationDuration: '0.8s', // default is 1.5s, decrease to speed up
          },
        }} />
      </CardContent>
    </Card>
  )
}

export default CardSkeleton