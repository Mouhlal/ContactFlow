'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiBriefcase, FiCheckCircle, FiArrowLeft } from "react-icons/fi";

export default function CreateContactForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        departement: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post('/api/contacts', formData);
            setSuccess(true);
            setTimeout(() => {
                router.push('/contacts');
            }, 1500);
        } catch (error) {
            console.error("Erreur de création:", error);
            alert("Erreur lors de la création du contact");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
                >
                    <FiCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact créé avec succès</h2>
                    <p className="text-gray-600 mb-6">Le nouveau contact a été enregistré dans votre base de données.</p>
                    <div className="animate-pulse text-sm text-gray-500">
                        Redirection en cours...
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md"
            >
                <div className="p-8">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                    >
                        <FiArrowLeft className="mr-2" />
                        Retour
                    </button>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Nouveau Contact</h1>
                        <p className="mt-2 text-gray-500">Remplissez les informations du contact</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FiUser className="mr-2 text-gray-400" />
                                Nom complet
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Jean Dupont"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FiMail className="mr-2 text-gray-400" />
                                Adresse email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="jean.dupont@entreprise.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FiBriefcase className="mr-2 text-gray-400" />
                                Département
                            </label>
                            <input
                                type="text"
                                name="departement"
                                value={formData.departement}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Ressources Humaines"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700 flex items-center">
                                <FiBriefcase className="mr-2 text-gray-400" />
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="+212 ... | 07/6 ..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Création en cours...
                                </span>
                            ) : 'Créer le contact'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}