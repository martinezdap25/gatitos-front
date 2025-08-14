// context/UserContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface User {
    email: string;
    name?: string;
    token?: string;
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (session?.user) {
            setUser({
                email: session.user.email!,
                token: session.user.token,
            });
        } else {
            setUser(null);
        }
    }, [session]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser debe usarse dentro de UserProvider");
    return context;
};
