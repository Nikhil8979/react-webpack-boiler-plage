import React from "react";
import {LinearProgress,Box} from '@mui/material';
import {useLoader} from "../../hooks/common";

export const ProgressIndicator = () => {
    const loading = useLoader();
    return loading && <Box sx={{width: '100%'}}>
        <LinearProgress/>
    </Box>
}
