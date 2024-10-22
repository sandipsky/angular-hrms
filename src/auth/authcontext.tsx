import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { User } from "../models/user";

type AuthContextType = {
    token: string | null;
    user: User | null;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
    const storedUser = localStorage.getItem("user");
    const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);

    const isLoggedIn = () => {
        return token != null;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{ token, user, logout, isLoggedIn }}>
            <>{children}</>
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
