/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCats } from "@/context/CatsContext";

const CreateCatPage = () => {
    const router = useRouter();
    const { breeds, createCat } = useCats();

    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(1);
    const [breed, setBreed] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors([]);
        setLoading(true);

        if (!breed) {
            setErrors(["Debes seleccionar una raza"]);
            setLoading(false);
            return;
        }

        try {
            const newCat = await createCat({ name, age, breed });
            if (!newCat) {
                setErrors(["Error al crear el gato"]);
                setLoading(false);
                return;
            }
            router.push("/dashboard");
        } catch (err: any) {
            setErrors([err.message || "Error al crear el gato"]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-18 flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200/80 to-blue-200/80 dark:from-blue-900 dark:to-blue-800 px-4">
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

                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium text-gray-500/50 dark:text-gray-200/">
                            Nombre del gato
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ej: Pelusa"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="age" className="block mb-1 font-medium text-gray-500/50 dark:text-gray-200/">
                            Edad
                        </label>
                        <input
                            id="age"
                            type="number"
                            placeholder="Ej: 3"
                            min={0}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="breed" className="block mb-1 font-medium text-gray-500/50 dark:text-gray-200/">
                            Raza
                        </label>
                        <div className="relative">
                            <select
                                id="breed"
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
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !name || !breed || age < 0}
                        className="w-full mt-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-3 font-semibold shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
                    >
                        {loading ? "Guardando..." : "Guardar gatito"}
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
