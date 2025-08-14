import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";

interface DropdownMenuProps {
    onEdit: () => void;
    onDelete: () => void;
    align?: "left" | "right";
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    onEdit,
    onDelete,
    align = "right",
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <FiMoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {open && (
                <div
                    className={`absolute mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10
          ${align === "right" ? "right-0" : "left-0"}`}
                >
                    <button
                        onClick={() => {
                            setOpen(false);
                            onEdit();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => {
                            setOpen(false);
                            onDelete();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-xl"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};
