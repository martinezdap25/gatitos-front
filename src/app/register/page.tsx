"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message instanceof Array ? responseAPI.message : [responseAPI.message]);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
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
            GatoVet
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            name="name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="tuemail@ejemplo.com"
            name="email"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña segura"
            name="password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-3 font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Registrarse
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

        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
