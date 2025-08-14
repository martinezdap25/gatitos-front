"use client";
import ServiceCard from "./ServiceCard";

interface Service {
    title: string;
    description: string;
    imageUrl: string;
}

const services: Service[] = [
    {
        title: "Consultas Generales",
        description: "Revisión de salud, vacunas y controles rutinarios para tus gatos.",
        imageUrl: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1755113468/gato-vacuna_hnx5ff.jpg",
    },
    {
        title: "Cirugías Especializadas",
        description: "Procedimientos quirúrgicos con especialistas en felinos.",
        imageUrl: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1755113468/gatoesterilizacion-29_vdm3hj.jpg",
    },
    {
        title: "Urgencias 24/7",
        description: "Atención inmediata para cualquier situación crítica de tu gato.",
        imageUrl: "https://res.cloudinary.com/dsugc0qfa/image/upload/v1755114166/veterinario-gatito-min_kejzk4.jpg",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Nuestros Servicios</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Atención profesional y personalizada para tus felinos, con todo el cariño que se merecen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {services.map((service) => (
                    <ServiceCard
                        key={service.title}
                        title={service.title}
                        description={service.description}
                        imageUrl={service.imageUrl}
                    />
                ))}
            </div>
        </section>
    );
}
