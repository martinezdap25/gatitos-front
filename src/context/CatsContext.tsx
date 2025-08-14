/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Cat } from "@/types/cats";
import { useUser } from "./UserContext";
import * as catService from "@/services/catService";

export interface Breed {
    id: number;
    name: string;
}

interface CatsContextType {
    cats: Cat[];
    breeds: Breed[];
    loading: boolean;
    fetchCats: () => Promise<void>;
    fetchBreeds: () => Promise<void>;
    createCat: (cat: { name: string; age: number; breed: string }) => Promise<Cat | null>;
    updateCat: (id: number, cat: { name: string; age: number; breed: string }) => Promise<Cat | null>;
    deleteCat: (id: number) => Promise<boolean>;
}

const CatsContext = createContext<CatsContextType | undefined>(undefined);

export const CatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser();
    const [cats, setCats] = useState<Cat[]>([]);
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCats = async () => {
        if (!user?.token) return;
        setLoading(true);
        try {
            const data = await catService.fetchCats(user.token);
            setCats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBreeds = async () => {
        if (!user?.token) return;
        try {
            const data = await catService.fetchBreeds(user.token);
            setBreeds(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createCat = async (catData: { name: string; age: number; breed: string }) => {
        if (!user?.token) return null;
        try {
            const newCat = await catService.createCat(catData, user.token);
            setCats((prev) => [...prev, newCat]);
            return newCat;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const updateCat = async (id: number, catData: { name: string; age: number; breed: string }) => {
        if (!user?.token) return null;
        try {
            const updatedCat = await catService.updateCat(id, catData, user.token);
            setCats((prev) => prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
            await fetchCats(); // <-- refresca la lista desde el backend
            return updatedCat;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const deleteCat = async (id: number) => {
        if (!user?.token) return false;
        try {
            await catService.deleteCat(id, user.token);
            setCats((prev) => prev.filter((c) => c.id !== id));
            await fetchCats(); // <-- refresca la lista desde el backend
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchCats();
            fetchBreeds();
        }
    }, [user]);

    return (
        <CatsContext.Provider
            value={{ cats, breeds, loading, fetchCats, fetchBreeds, createCat, updateCat, deleteCat }}
        >
            {children}
        </CatsContext.Provider>
    );
};

export const useCats = () => {
    const context = useContext(CatsContext);
    if (!context) throw new Error("useCats debe usarse dentro de CatsProvider");
    return context;
};
