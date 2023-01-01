import {Box, Typography} from "@mui/material";
import {COLORS} from "../system/colors";
import React from "react";


const MainTitle = () => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: COLORS.GREEN, color: COLORS.WHITE }}>
            <Typography variant="h5" textAlign={"center"} padding={"1rem 0"}> Office Management Center</Typography>
        </Box>
    );
};

export default MainTitle;
