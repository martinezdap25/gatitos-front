import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <HeroSection />

      {/* Servicios */}
      <ServicesSection />

      {/* Beneficios */}
      <WhyChooseUsSection />

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
            Agenda tu visita hoy
          </h2>
          <p className="text-lg md:text-xl drop-shadow-sm max-w-2xl mx-auto">
            Nuestro equipo está listo para cuidar de tu felino con todo el profesionalismo y cariño que merece.
          </p>
          <a
            href="#contact"
            className="inline-block bg-gray-100 text-blue-600 px-8 py-3 rounded-md font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Contactanos
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 GatoVet. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
