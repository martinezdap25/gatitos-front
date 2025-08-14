import React from "react";
import { Cat } from "@/types/cats";
import { FaUser } from "react-icons/fa";

interface CatCardProps {
  cat: Cat;
  onView: (id: number) => void;
}

export const CatCard: React.FC<CatCardProps> = ({ cat, onView }) => {
  return (
    <div className="flex flex-col sm:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 min-h-[14rem] w-full">

      {/* Contenedor info + botón */}
      <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-6">

        {/* Info */}
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

        {/* Botón abajo a la derecha */}
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
  );
};
