"use client";

import { useSession, signOut } from "next-auth/react";
import { FiUsers, FiPlusCircle, FiSearch, FiShield, FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  // Animation variants pour la section header
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
      <header className="py-20 px-4 sm:px-6 lg:px-8 text-center flex-grow">
        <motion.div initial="hidden" animate="visible" variants={headerVariants}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Gérez vos contacts avec{" "}
            <span className="text-blue-600">ContactFlow</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            La solution tout-en-un pour organiser, suivre et optimiser vos relations professionnelles
          </p>

          {/* Boutons dynamiques selon session */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            {status === "loading" ? (
              <p className="text-gray-500">Chargement...</p>
            ) : session ? (
              <>
                <button
                  onClick={() => router.push("/contacts")}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-400"
                  aria-label="Voir mes contacts"
                >
                  <FiUsers className="mr-2" />
                  Voir mes contacts
                </button>
                <button
                  onClick={() => router.push("/contacts/create")}
                  className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-400"
                  aria-label="Ajouter un contact"
                >
                  <FiPlusCircle className="mr-2" />
                  Ajouter un contact
                </button>
                <button
                  onClick={handleLogout}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-red-400"
                  aria-label="Se déconnecter"
                >
                  <FiLogOut className="mr-2" />
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-400"
                  aria-label="Se connecter"
                >
                  <FiLogIn className="mr-2" />
                  Se connecter
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-8 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-400"
                  aria-label="S’inscrire"
                >
                  <FiUserPlus className="mr-2" />
                  S’inscrire
                </button>
              </>
            )}
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Pourquoi choisir ContactFlow ?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FiUsers size={32} />,
              title: "Gestion centralisée",
              desc:
                "Tous vos contacts au même endroit, classés et organisés pour un accès instantané.",
            },
            {
              icon: <FiSearch size={32} />,
              title: "Recherche intelligente",
              desc:
                "Trouvez n'importe quel contact en quelques secondes avec notre moteur de recherche avancé.",
            },
            {
              icon: <FiShield size={32} />,
              title: "Sécurité renforcée",
              desc:
                "Vos données sont chiffrées et protégées selon les standards les plus stricts.",
            },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-blue-600 mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à révolutionner votre gestion de contacts ?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-xl mx-auto leading-relaxed">
            Rejoignez des milliers de professionnels qui utilisent déjà ContactFlow
            au quotidien.
          </p>
          <button
            onClick={() =>
              session ? router.push("/contacts/create") : router.push("/register")
            }
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition focus:outline-none focus:ring-4 focus:ring-white"
            aria-label="Commencer gratuitement"
          >
            Commencer gratuitement
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} ContactFlow. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
