import { AppBar, Toolbar, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow:'none'}}>
            <Toolbar>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ flexGrow: "1", backgroundColor: "transparent", textAlign:'center' }}
                >
                    {"Copyright © "}
                    Jesús Sánchez{" "}
                    {new Date().getFullYear()}
                    {"."}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
