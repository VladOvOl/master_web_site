import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const initialUser: IUser = {
    id: 0,
    username: '',
    email: '' ,
    phoneNumber: '' ,
    firstName: '',
    lastName: '',
    role: "USER",
    hideNumberInProfile: false
}

export type IUser = {
    id: number;
    username: string;
    email: string | null;
    phoneNumber: string | null;
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN";
    hideNumberInProfile: boolean;
}

interface UserContextState {
    user: IUser;
    setUser: (user: IUser ) => void;
}

const UserContext = createContext<UserContextState | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUserState] = useState<IUser>(initialUser);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserState(JSON.parse(storedUser));
        }
    }, []);

    const setUser = (user: IUser) => {
        setUserState(user);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    };

    

    return (
        <UserContext.Provider value= {{ user, setUser}}>
            { children }
        </UserContext.Provider>
        )
    }

export const useUserStore = (): UserContextState => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside <UserProvider>");
    }
    return context;
};