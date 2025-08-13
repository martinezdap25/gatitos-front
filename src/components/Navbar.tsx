"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-900 text-white">
            <div className="container mx-auto flex items-center justify-between py-3 px-4">
                <div className="flex items-center space-x-2">
                    <Link
                        href="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                    >
                        Home
                    </Link>
                </div>

                <div className="flex items-center space-x-2">
                    {session?.user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
