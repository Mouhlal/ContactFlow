'use client'
import { FiUsers, FiPlusCircle, FiSearch, FiShield, FiSmartphone } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Gérez vos contacts avec <span className="text-blue-600">ContactFlow</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            La solution tout-en-un pour organiser, suivre et optimiser vos relations professionnelles
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push('/contacts')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              <FiUsers className="mr-2" />
              Voir mes contacts
            </button>
            <button
              onClick={() => router.push('/contacts/create')}
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center justify-center"
            >
              <FiPlusCircle className="mr-2" />
              Ajouter un contact
            </button>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Pourquoi choisir ContactFlow ?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="text-blue-600 mb-4">
              <FiUsers size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gestion centralisée</h3>
            <p className="text-gray-600">
              Tous vos contacts au même endroit, classés et organisés pour un accès instantané.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="text-blue-600 mb-4">
              <FiSearch size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Recherche intelligente</h3>
            <p className="text-gray-600">
              Trouvez n'importe quel contact en quelques secondes avec notre moteur de recherche avancé.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="text-blue-600 mb-4">
              <FiShield size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sécurité renforcée</h3>
            <p className="text-gray-600">
              Vos données sont chiffrées et protégées selon les standards les plus stricts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Prêt à révolutionner votre gestion de contacts ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de professionnels qui utilisent déjà ContactFlow au quotidien.
          </p>
          <button
            onClick={() => router.push('#')}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition"
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
  )
}