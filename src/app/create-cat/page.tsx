/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Breed {
    id: number;
    name: string;
}

const CreateCatPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(1);
    const [breed, setBreed] = useState<string>("");
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    // Obtener razas al cargar
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/breeds`, {
                    headers: {
                        Authorization: `Bearer ${session?.user?.token}`,
                    },
                });
                if (!res.ok) throw new Error("Error al obtener las razas");
                const data = await res.json();
                setBreeds(data);
            } catch (error: any) {
                console.error(error);
                setErrors([error.message || "No se pudieron cargar las razas"]);
            }
        };

        if (session?.user?.token) {
            fetchBreeds();
        }
    }, [session?.user?.token]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.user?.token}`,
                },
                body: JSON.stringify({ name, age, breed }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors(Array.isArray(data.message) ? data.message : [data.message]);
                return;
            }

            router.push("/dashboard");
        } catch (error: any) {
            setErrors([error.message || "Error al crear el gato"]);
        }
    };

    return (
        <div className="pb-18 flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-2xl">
                {/* Logo y nombre */}
                <div className="flex flex-col items-center mb-6">
                    <Image
                        src="https://res.cloudinary.com/dsugc0qfa/image/upload/v1755112962/logo-cat_i4ssoc.png"
                        alt="GatoVet Logo"
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                    <span className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Crear nuevo gatito
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre del gato"
                        name="name"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Edad"
                        name="age"
                        min={0}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />

                    <div className="relative">
                        <select
                            name="breed"
                            required
                            className={`w-full rounded-xl border px-4 py-3 pr-10 text-gray-900 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${!breed && errors.length > 0 ? "border-red-500" : "border-gray-300"
                                }`}
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Seleccione una raza
                            </option>
                            {breeds.map((b) => (
                                <option key={b.id} value={b.name}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                            ▼
                        </span>
                    </div>


                    <button
                        type="submit"
                        className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-3 font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        Guardar gatito
                    </button>
                </form>

                {errors.length > 0 && (
                    <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                        <ul className="list-disc pl-5">
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateCatPage;
