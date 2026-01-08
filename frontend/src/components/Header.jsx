import { Link } from "react-router-dom";
import { Auth } from "./Auth";

import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#fff", 
                boxShadow: "none", 
                borderBottom: "1px solid #ccc", 
                
            }}
        >
            
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: '#333', 
                        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", 
                        fontWeight: '700',
                        fontSize: '1.8em'
                    }}
                >
                    LINK BOARD
                </Typography>

                <nav>
                    <Auth />
                </nav>
            </Toolbar>
        </AppBar>
    );
};
