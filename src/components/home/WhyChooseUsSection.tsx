"use client";
import Image from "next/image";

interface Feature {
    title: string;
    description: string;
    imageUrl: string;
}

const features: Feature[] = [
    {
        title: "Cuidado Personalizado",
        description: "Cuidado personalizado para cada felino.",
        imageUrl: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1755113468/gato-vacuna_hnx5ff.jpg",
    },
    {
        title: "Profesionales Especializados",
        description: "Profesionales especializados en gatos.",
        imageUrl: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1755115416/veterinaria-especialista-Dra-Cats_dc20ei.png",
    },
    {
        title: "Ambiente Seguro",
        description: "Un ambiente seguro y amigable para tu gato.",
        imageUrl: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1755115518/MICROCHIP_te96xp.png",
    },
];

export default function WhyChooseUsSection() {
    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-12">Por qué elegirnos</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 h-full"
                        >
                            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden shadow-md group">
                                <Image
                                    src={feature.imageUrl}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
