import React from 'react';
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe, login } from "src/api/user";
import request from 'src/utils/request';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState();
    const navigate = useNavigate();

    const fetchUserData = React.useCallback(() => {
        fetchMe()
        .then((res) => {
            setUser(res)
            navigate('/dashboard', { replace: true });
        })
        .catch(() => setUser(false));
    }, [])

    const loginAdmin = React.useCallback((data, cb) => {
        login(data)
        .then((res) => {
            setUser(res);
            cb();
        })
        .catch((err) => console.log(err));
    }, []);

    const logoutAdmin = React.useCallback(() => {
        localStorage.removeItem('access_token');
        setUser(null);
    }, []);

    const value = useMemo(
    () => ({
        user,
        loginAdmin,
        logoutAdmin,
        fetchUserData
    }),
    [user, loginAdmin, logoutAdmin, fetchUserData]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};