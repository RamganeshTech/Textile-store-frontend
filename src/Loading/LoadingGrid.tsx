import React from 'react'
import CardSkeleton from './CardSkeleton';
import { Grid, Box } from '@mui/material';

type LoadingGridProps = {
    rows?: number;
    columns?: number;
};

const LoadingGrid: React.FC<LoadingGridProps> = ({ rows = 2, columns = 3 }) => {
    const total = rows * columns;

    //   const getGridColumnWidth = () => Math.floor(12 / columns);

    return (
        <Box sx={{
            width: '100%',
            padding:"10px",
        }}>
            <Grid container spacing={2}>
                {Array.from({ length: total }).map((_, index) => (
                    <Grid
                        item
                        key={index}
                        xs={6}
                        sm={Math.floor(12 / Math.min(columns, 2))}
                        md={Math.floor(12 / columns)}
                    >
                        <CardSkeleton />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default LoadingGrid