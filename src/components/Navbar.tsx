"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo / Nombre */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    GatoVet 🐾
                </Link>

                {/* Links */}
                <div className="flex items-center space-x-3">
                    <Link
                        href="/"
                        className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                    >
                        Inicio
                    </Link>

                    {session?.user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                Tablero
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                Ingresar
                            </Link>
                            <Link
                                href="/register"
                                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
