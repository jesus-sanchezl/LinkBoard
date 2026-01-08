import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
    Avatar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCirlceIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingIcon from "@mui/icons-material/Settings";
import PowerSettingNewIcon from "@mui/icons-material/PowerSettingsNew";
import HomeIcon from "@mui/icons-material/Home";

export const Auth = () => {
    const navigate = useNavigate();

    const { user, logout } = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "shift")
        ) {
            return;
        }

        setOpen(open);
    };

    const handleHomeClick = () => {
        setOpen(false);
        navigate("/");
    };

    const handleProfileClick = () => {
        setOpen(false);
        navigate(`/user/${user.id}`);
    };

    const handleUpdateClick = () => {
        setOpen(false);
        navigate(`/update/${user.id}`);
    };

    const handleLogoutClick = () => {
        logout();
        setOpen(false);
        navigate("/login");
    };

    // const handleRegisterClick = () => {
    //     navigate("/register");
    // };

    // const handleLoginClick = () => {
    //     navigate("/login");
    // };

    return user ? (
        <>
            <Box display={"flex"} alignItems={"center"} marginRight={2}>
                <Typography
                    sx={{ marginRight: 1, color: "#333", fontSize: "14px" }}
                >
                    HOLA {user.username.toUpperCase()}
                </Typography>

                {user.image ? (
                    <Avatar
                        src={`${import.meta.env.VITE_BACKEND}/images/${
                            user.image
                        }`}
                        alt="Perfil"
                        sx={{ marginRight: 1, borderRadius: "50%" }}
                    />
                ) : (
                    <AccountCirlceIcon sx={{ color: "#333" }} />
                )}

                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{
                        color: "#333",
                        marginLeft: 1,
                    }}
                >
                    <MenuIcon sx={{ color: "#333" }} />{" "}
                </IconButton>

                <Drawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                    sx={{
                        "& .MuiDrawer-paper": {
                            backgroundColor: "rgba(34, 40, 49, 0.9)",
                            color: "#fff",
                            width: 250,
                            border: "none",
                            transition: "all 0.3s ease-in-out",
                        },
                    }}
                >
                    <List sx={{ paddingTop: "10px" }}>
                        <ListItem
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                onClick={handleHomeClick}
                                sx={{
                                    color: "white",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "white",
                                        color: "black",
                                        "& .MuiSvgIcon-root": {
                                            color: "black",
                                        },
                                    },
                                }}
                            >
                                <HomeIcon
                                    fontSize="medium"
                                    sx={{ color: "white", marginRight: 1 }}
                                />
                                <ListItemText primary="Inicio" />
                            </Button>
                        </ListItem>

                        <ListItem
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                onClick={handleProfileClick}
                                sx={{
                                    color: "white",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "white",
                                        color: "black",
                                        "& .MuiSvgIcon-root": {
                                            color: "black",
                                        },
                                    },
                                }}
                            >
                                <AccountBoxIcon
                                    fontSize="medium"
                                    sx={{ color: "white", marginRight: 1 }}
                                />
                                <ListItemText primary="Perfil" />
                            </Button>
                        </ListItem>

                        <ListItem
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                onClick={handleUpdateClick}
                                sx={{
                                    color: "white",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "white",
                                        color: "black",
                                        "& .MuiSvgIcon-root": {
                                            color: "black",
                                        },
                                    },
                                }}
                            >
                                <SettingIcon
                                    fontSize="medium"
                                    sx={{ color: "white", marginRight: 1 }}
                                />
                                <ListItemText primary="Actualizar perfil" />
                            </Button>
                        </ListItem>

                        <ListItem
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                onClick={handleLogoutClick}
                                sx={{
                                    color: "white",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "white",
                                        color: "black",
                                        "& .MuiSvgIcon-root": {
                                            color: "black",
                                        },
                                    },
                                }}
                            >
                                <PowerSettingNewIcon
                                    fontSize="medium"
                                    sx={{ color: "white", marginRight: 1 }}
                                />
                                <ListItemText primary="Salir" />
                            </Button>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </>
    ) : (
        <>
            {/* <Box display={"flex"} alignItems={"center"} marginRight={2}>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="register"
                    onClick={handleRegisterClick}
                    sx={{
                        color: "#333",
                        textTransform: "none",
                        marginRight: 2,
                    }}
                >
                    <Typography variant="body1" sx={{ marginRight: 1 }}>
                        Registrarse
                    </Typography>
                </IconButton>

                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="login"
                    onClick={handleLoginClick}
                    sx={{
                        color: "#333",
                        textTransform: "none",
                    }}
                >
                    <Typography variant="body1" sx={{ marginRight: 1 }}>
                        Iniciar sesión
                    </Typography>
                </IconButton>
            </Box> */}
        </>
    );
};
