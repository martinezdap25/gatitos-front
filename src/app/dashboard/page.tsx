"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Cat } from "@/types/cats";
import { CatCard } from "@/components/cats/CatCard";
import { Spinner } from "@/components/ui/Spinner";
import { LoadingCards } from "@/components/ui/LoadingCards";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") fetchCats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchCats = async () => {
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      headers: { Authorization: `Bearer ${session?.user?.token}` },
    });
    const data: Cat[] = await res.json();
    setCats(data);
    setLoading(false);
  };

  const handleViewCat = (id: number) => {
    console.log("Ver ficha del gato con ID:", id);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200/80 via-blue-50 to-blue-200/80 dark:from-blue-900 dark:to-blue-800">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200/80 to-blue-200/80 dark:from-blue-900 dark:to-blue-800 py-12">
      <div className="max-w-6xl mx-auto px-6 text-gray-800 dark:text-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-4xl md:text-3xl font-extrabold mb-2">
              Bienvenido, {session?.user?.email} 🐾
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Aquí puedes ver y administrar todos tus pacientes felinos.
            </p>
          </div>
          <button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
            + Nuevo paciente
          </button>
        </div>

        {/* Sección de pacientes */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-medium mb-6 text-gray-800 dark:text-gray-100">
            Mis pacientes:
          </h2>

          {loading ? (
            <LoadingCards count={6} />
          ) : cats.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cats.map((cat) => (
                <CatCard key={cat.id} cat={cat} onView={handleViewCat} />
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 text-center py-10">
              No tienes pacientes registrados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
