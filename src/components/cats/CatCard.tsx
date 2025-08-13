import React from "react";
import { Cat } from "@/types/cats";

interface CatCardProps {
  cat: Cat;
  onView: (id: number) => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onView }) => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{cat.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {cat.breed?.name || "Sin raza"} — {cat.age} años
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          Dueño: {cat.userEmail}
        </p>
      </div>
      <button
        onClick={() => onView(cat.id)}
        className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 transition-colors"
      >
        Ver ficha
      </button>
    </div>
  );
};
