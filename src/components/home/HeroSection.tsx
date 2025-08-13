"use client";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-r from-blue-200/90 via-blue-50 to-blue-200/90 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col-reverse md:flex-row items-center md:justify-between">

                {/* Texto */}
                <div className="md:w-1/2 text-center md:text-left space-y-6 z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-700 dark:text-gray-100">
                        GatoVet 🐾
                    </h1>
                    <p className="text-lg md:text-xl text-gray-900/80 dark:text-gray-100 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md max-w-md mx-auto md:mx-0">
                        Cuidado exclusivo para tus felinos. Salud, cariño y profesionalismo en un solo lugar.
                    </p>
                    <a
                        href="#services"
                        className="inline-block bg-gradient-to-r from-blue-800 to-blue-500 text-white px-6 py-3 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        Conoce nuestros servicios
                    </a>
                </div>

                {/* Imagen hero */}
                <div className="md:w-1/2 mb-8 md:mb-0 relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src="https://res.cloudinary.com/dsugc0qfa/image/upload/v1755113076/gato-feliz_mcehsw.jpg"
                        alt="Gato feliz"
                        fill
                        className="object-cover"
                    />
                    {/* Overlay más fuerte para que el texto no se pierda */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/30"></div>
                </div>
            </div>
        </section>
    );
}
