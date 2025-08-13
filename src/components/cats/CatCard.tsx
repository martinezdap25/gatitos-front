import React from "react";
import { Cat } from "@/types/cats";

interface CatCardProps {
  cat: Cat;
  onView: (id: number) => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onView }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">

      {/* Info del gato */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{cat.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
          {cat.breed?.name || "Sin raza"} — {cat.age} años
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Dueño: {cat.userEmail}
        </p>
      </div>

      {/* Botón */}
      <button
        onClick={() => onView(cat.id)}
        className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-transform duration-300"
      >
        Ver ficha
      </button>
    </div>
  );
};
