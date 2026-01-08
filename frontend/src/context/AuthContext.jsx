import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    useEffect(() => {
        const getUserData = async () => {
            try {

                
                const data = await getMyUserDataService(token);

                setUser(data);

                
            } catch (error) {
                console.log(error.message)
                logout();
            }
        };

        if (token) getUserData();
    }, [token]);

    const updateUser = (updatedUser) => {
    
        setUser(updatedUser)
    }

    const login = (token) => {
        setToken(token);
    };

    const logout = () => {
        setToken("");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProviderComponent.propTypes = {
    children: PropTypes.node,
};
