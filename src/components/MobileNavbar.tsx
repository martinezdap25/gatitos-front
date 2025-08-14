"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

export default function MobileNavbar() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <nav className="h-20 fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 md:hidden">
            <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <Image
                        src="https://res.cloudinary.com/dsugc0qfa/image/upload/v1755112962/logo-cat_i4ssoc.png"
                        alt="GatoVet Logo"
                        width={36}
                        height={36}
                        className="rounded-full"
                    />
                    <span className="text-xl font-bold">GatoVet</span>
                </Link>

                {/* Botón menú */}
                <button
                    onClick={() => setOpen(!open)}
                    className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    {open ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {/* Menú desplegable */}
            {open && (
                <div className="bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col p-4 space-y-3">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                        >
                            Inicio
                        </Link>

                        {session?.user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setOpen(false)}
                                    className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                                >
                                    Tablero
                                </Link>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setOpen(false);
                                    }}
                                    className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                                >
                                    Ingresar
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setOpen(false)}
                                    className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}