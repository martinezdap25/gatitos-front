"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Cat } from "@/types/cats";
import { CatCard } from "@/components/cats/CatCard";
import { LoadingCards } from "@/components/ui/LoadingCards";
import { Spinner } from "@/components/ui/Spinner";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchCats = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data: Cat[] = await res.json();
    setCats(data);
    setLoading(false);
  };

  const handleViewCat = (id: number) => {
    console.log("Ver ficha del gato con ID:", id);
    // router.push(`/cats/${id}`)
  };

  // Carga inicial del dashboard (sesión)
  if (status === "loading") {
    return (
      <div className="max-w-5xl mx-auto p-6 text-gray-900 dark:text-gray-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Bienvenido, {session?.user?.email} 🐾
      </h1>

      {/* Botón para nuevo paciente */}
      <div className="flex justify-end mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
          + Nuevo paciente
        </button>
      </div>

      {/* Lista de pacientes */}
      <div className="bg-transparent">
        {loading ? (
          <LoadingCards count={6} />
        ) : cats.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {cats.map((cat) => (
              <CatCard key={cat.id} cat={cat} onView={handleViewCat} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No tienes pacientes registrados.
          </p>
        )}
      </div>
    </div>
  );
}
