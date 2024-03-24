// AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from "react";
import { TeachineSessionStorage } from "../services/storageService";

// Define the authentication context type
interface AuthContextType {
    user: string | null;
    login: (userData: User) => void;
    logout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the authentication context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Authentication provider component
interface AuthProviderProps {
    children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(
        (TeachineSessionStorage.getItem("authToken") as string) || null
    );

    // Function to log in
    const login = async (userData: User) => {
        setUser(userData.token);
        TeachineSessionStorage.setItem("authToken", userData.token);
    };

    // Function to log out
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
