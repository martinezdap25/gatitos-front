import { Cat } from "@/types/cats";
import { Breed } from "@/context/CatsContext";
import api from "@/lib/axios";

export const fetchCats = async (token?: string): Promise<Cat[]> => {
  if (!token) return [];
  const response = await api.get<Cat[]>("/cats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchBreeds = async (token?: string): Promise<Breed[]> => {
  if (!token) return [];
  const response = await api.get<Breed[]>("/breeds", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createCat = async (
  catData: { name: string; age: number; breed: string },
  token?: string
): Promise<Cat> => {
  if (!token) throw new Error("No hay token");
  const response = await api.post<Cat>("/cats", catData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCat = async (
  id: number,
  catData: { name: string; age: number; breed: string },
  token?: string
): Promise<Cat> => {
  if (!token) throw new Error("No hay token");
  const response = await api.patch<Cat>(`/cats/${id}`, catData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteCat = async (id: number, token?: string): Promise<boolean> => {
  if (!token) throw new Error("No hay token");
  await api.delete(`/cats/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return true;
};
