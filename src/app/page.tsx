export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">GatoVet 🐾</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Cuidado exclusivo para tus felinos. Salud, cariño y profesionalismo en un solo lugar.
          </p>
          <a
            href="#services"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Conoce nuestros servicios
          </a>
        </div>
      </section>

      {/* Servicios */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Consultas Generales</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Revisión de salud, vacunas y controles rutinarios para tus gatos.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Cirugías Especializadas</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Procedimientos quirúrgicos con especialistas en felinos.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Urgencias 24/7</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Atención inmediata para cualquier situación crítica de tu gato.
            </p>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Agenda tu visita hoy</h2>
          <p className="mb-8">
            Nuestro equipo está listo para cuidar de tu felino con todo el profesionalismo y cariño que merece.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
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

