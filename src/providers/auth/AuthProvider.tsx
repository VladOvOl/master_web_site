import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContextType {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}

interface IProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: IProps) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
