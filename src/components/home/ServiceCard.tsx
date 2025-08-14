"use client";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  alt?: string;
}

export default function ServiceCard({ title, description, imageUrl, alt }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 py-6 px-4 min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem] w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
      {/* Imagen */}
      <div className="relative w-full h-40 sm:h-48 lg:h-56 mb-6 rounded-xl overflow-hidden shadow-inner hover:scale-105 transition-transform duration-300">
        <Image
          src={imageUrl}
          alt={alt || title}
          fill
          className="object-cover"
        />
      </div>

      {/* Texto */}
      <div className="px-2 sm:px-4">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg">{description}</p>
      </div>
    </div>
  );
}
