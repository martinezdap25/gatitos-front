import { Cat } from "@/types/cats";
import { Breed } from "@/context/CatsContext";

export const fetchCats = async (token?: string): Promise<Cat[]> => {
  if (!token) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al traer gatos");
  return res.json();
};

export const fetchBreeds = async (token?: string): Promise<Breed[]> => {
  if (!token) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/breeds`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al traer razas");
  return res.json();
};

export const createCat = async (
  catData: { name: string; age: number; breed: string },
  token?: string
): Promise<Cat> => {
  if (!token) throw new Error("No hay token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catData),
  });
  if (!res.ok) throw new Error("Error al crear el gato");
  return res.json();
};

export const updateCat = async (
  id: number,
  catData: { name: string; age: number; breed: string },
  token?: string
): Promise<Cat> => {
  if (!token) throw new Error("No hay token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catData),
  });
  if (!res.ok) throw new Error("Error al actualizar el gato");
  return res.json();
};

export const deleteCat = async (id: number, token?: string): Promise<boolean> => {
  if (!token) throw new Error("No hay token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al eliminar el gato");
  return true;
};
