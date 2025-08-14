/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { Cat } from "@/types/cats";
import { FaUser } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useCats } from "@/context/CatsContext";

interface CatCardProps {
  cat: Cat;
  onView: (id: number) => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onView }) => {
  const { breeds, updateCat, deleteCat } = useCats();

  const [openMenu, setOpenMenu] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(cat.name);
  const [age, setAge] = useState(cat.age);
  const [breedId, setBreedId] = useState(cat.breed?.id || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre no puede estar vacío");
      return;
    }

    if (age <= 0) {
      setError("La edad debe ser mayor a 0");
      return;
    }

    const selectedBreed = breeds.find((b) => b.id === breedId);
    if (!selectedBreed) {
      setError("Selecciona una raza válida");
      return;
    }

    const payload = {
      name: name.trim(),
      age,
      breed: selectedBreed.name, // solo nombre
    };

    setLoading(true);
    try {
      const updated = await updateCat(cat.id, payload);
      if (!updated) throw new Error("No se pudo actualizar el gato");
      setEditOpen(false);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCat(cat.id);
      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="relative flex flex-col sm:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 min-h-[14rem] w-full">
        {/* Menú */}
        <div className="absolute top-4 right-4" ref={menuRef}>
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiMoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10">
              <button
                onClick={() => { setOpenMenu(false); setEditOpen(true); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl"
              >
                Editar
              </button>
              <button
                onClick={() => { setOpenMenu(false); setDeleteOpen(true); }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-xl"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>

        {/* Info gato */}
        <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6">
          <div className="flex-1 flex flex-col min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">{cat.name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full truncate">
                Raza: {cat.breed?.name || "Sin raza"}
              </span>
              <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                Edad: {cat.age} años
              </span>
            </div>
            <p className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2 truncate">
              <FaUser /> <span className="truncate ml-1">{cat.userEmail}</span>
            </p>
          </div>

          {/* Botón Ver ficha */}
          <div className="flex-shrink-0 mt-4 sm:mt-0 sm:self-end sm:ml-auto">
            <button
              onClick={() => onView(cat.id)}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
            >
              Ver ficha
            </button>
          </div>
        </div>
      </div>

      {/* Modal edición */}
      {editOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setEditOpen(false); }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 relative transition-transform transform scale-100 hover:scale-100.5">
            <button
              onClick={() => setEditOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
              Editar Gato
            </h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleEdit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del gato"
                className="w-full rounded-2xl border border-gray-300 px-5 py-3 text-gray-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                required
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Edad"
                min={1}
                className="w-full rounded-2xl border border-gray-300 px-5 py-3 text-gray-900 shadow-inner focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                required
              />
              <select
                value={breedId}
                onChange={(e) => setBreedId(Number(e.target.value))}
                className="w-full rounded-xl border px-4 py-3"
              >
                <option value={0}>Selecciona una raza</option>
                {breeds.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={loading || breedId === 0 || name.trim() === "" || age <= 0}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-3 font-semibold shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal eliminación */}
      {deleteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteOpen(false); }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setDeleteOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
              Confirmar eliminación
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
              ¿Estás seguro de que quieres eliminar al gato <strong>{cat.name}</strong>?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteOpen(false)}
                className="px-6 py-2 rounded-2xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
