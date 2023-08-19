import PixIcon from "@mui/icons-material/Pix";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const Navbar=()=> {
    const { palette } = useTheme();
    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
                <FlexBetween gap="0.75rem">
                    <PixIcon sx={{ fontSize: "28px" }} />
                    <Typography variant="h4" fontSize="20px">
                    Academic World
                    </Typography>
                </FlexBetween>
                <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
            Author: Xiaojing Xu
        </Box>
      </FlexBetween>
      </FlexBetween>
    );
}

export default Navbar;