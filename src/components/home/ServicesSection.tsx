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
    <section id="services" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-2">Nuestros Servicios</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
        Atención profesional y personalizada para tus felinos, con todo el cariño que se merecen.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
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
