"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <>
            {/* Navbar Desktop */}
            <nav className="h-20 hidden md:block fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-6">
                    {/* Logo / Nombre */}
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
                        <span className="text-2xl font-bold">GatoVet</span>
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

            {/* Navbar Mobile */}
            <div className="block md:hidden">
                <MobileNavbar />
            </div>
        </>
    );
}
