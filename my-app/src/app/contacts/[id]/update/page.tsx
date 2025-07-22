'use client';
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiUser, FiMail, FiHome, FiLoader, FiSave, FiArrowLeft } from "react-icons/fi";

interface Contact {
  id: number;
  name: string;
  email: string;
  departement: string;
  phone: string;
}

export default function Update() {
    const router = useRouter();
    const [contact, setContact] = useState<Contact | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const params = useParams();
    const id = params.id as string;

    async function getContact() {
        try {
            const response = await axios.get(`/api/contacts/${id}`);
            setContact(response.data);
        } catch (error) {
            console.log(error);
            alert('Erreur lors du chargement du contact');
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!contact) return;
        
        setIsSubmitting(true);
        try {
            await axios.put(`/api/contacts/${id}`, contact);
            alert('Contact a été modifié avec succès');
            router.push('/contacts');
        } catch (error) {
            console.log(error);
            alert('Erreur lors de la modification');
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        getContact();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <FiLoader className="animate-spin text-3xl text-blue-600 mb-4" />
                <p className="text-gray-600">Chargement du contact...</p>
            </div>
        );
    }

    if (!contact) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center max-w-md">
                    <h2 className="text-xl font-bold text-red-800 mb-2">Contact introuvable</h2>
                    <p className="text-red-600 mb-4">Le contact demandé n'a pas pu être chargé.</p>
                    <button 
                        onClick={() => router.push('/contacts')}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Retour à la liste
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                    >
                        <FiArrowLeft className="mr-2" />
                        Retour
                    </button>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Modifier le Contact</h1>
                        <p className="mt-2 text-gray-600">Mettez à jour les informations du contact</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <FiUser className="mr-2 text-gray-400" />
                                Nom complet
                            </label>
                            <input
                                type="text"
                                value={contact.name}
                                onChange={(e) => setContact({...contact, name: e.target.value})}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <FiMail className="mr-2 text-gray-400" />
                                Email
                            </label>
                            <input
                                type="email"
                                value={contact.email}
                                onChange={(e) => setContact({...contact, email: e.target.value})}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <FiMail className="mr-2 text-gray-400" />
                                Phone
                            </label>
                            <input
                                type="phone"
                                value={contact.phone}
                                onChange={(e) => setContact({...contact, phone: e.target.value})}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <FiHome className="mr-2 text-gray-400" />
                                Département
                            </label>
                            <input
                                type="text"
                                value={contact.departement}
                                onChange={(e) => setContact({...contact, departement: e.target.value})}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                        >
                            {isSubmitting ? (
                                <>
                                    <FiLoader className="animate-spin mr-2" />
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <FiSave className="mr-2" />
                                    Enregistrer les modifications
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}