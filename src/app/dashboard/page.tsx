"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Cat } from "@/types/cats";
import { CatCard } from "@/components/cats/CatCard";
import { Spinner } from "@/components/ui/Spinner";
import { LoadingCards } from "@/components/ui/LoadingCards";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-200/80 to-blue-200/80 dark:from-blue-900 dark:to-blue-800 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-gray-800 dark:text-gray-100">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
              Bienvenido, {session?.user?.email}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
              Aquí puedes ver y administrar todos tus pacientes felinos.
            </p>
          </div>
          <Link href="/create-cat">
            <button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
              + Nuevo paciente
            </button>
          </Link>
        </div>

        {/* Sección de pacientes */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">
            Mis pacientes:
          </h2>

          {loading ? (
            <LoadingCards count={6} />
          ) : cats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cats.map((cat) => (
                <CatCard key={cat.id} cat={cat} onView={handleViewCat} />
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 text-center py-10 text-sm sm:text-base">
              No tienes pacientes registrados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
