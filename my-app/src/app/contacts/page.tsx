'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiHome, FiLoader, FiAlertCircle, FiUsers, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiPhone, FiBriefcase } from 'react-icons/fi'
interface Contact {
  id: number;
  name: string;
  email: string;
  departement: string;
  phone: string
}

export default function ContactList() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Contact[]>('/api/contacts');
      
      if (Array.isArray(response.data)) {
        setContacts(response.data);
      } else {
        setError('Format des données incorrect.');
        setContacts([]);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des contacts:', err);
      setError('Erreur lors de la récupération des contacts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce contact ?')) return;
    
    try {
      setDeletingId(id);
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression du contact');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <FiLoader className="animate-spin text-3xl text-blue-600 mb-4" />
      <p className="text-gray-600">Chargement des contacts...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="max-w-md w-full bg-red-50 p-6 rounded-lg border border-red-200 text-center">
        <FiAlertCircle className="mx-auto text-4xl text-red-600 mb-4" />
        <h2 className="text-xl font-bold text-red-800 mb-2">Erreur</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchContacts}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Réessayer
        </button>
      </div>
    </div>
  );

  if (contacts.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="max-w-md w-full text-center">
        <FiUsers className="mx-auto text-4xl text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Aucun contact trouvé</h2>
        <p className="text-gray-500 mt-2 mb-6">Votre liste de contacts est vide pour le moment.</p>
        <button
          onClick={() => router.push('/contacts/create')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <FiPlus className="mr-2" />
          Ajouter un contact
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Contacts</h1>
            <p className="mt-2 text-gray-600">Liste de vos collaborateurs et partenaires</p>
          </div>
          <button
            onClick={() => router.push('/contacts/create')}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            <FiPlus className="mr-2" />
            Nouveau contact
          </button>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="col-span-4 md:col-span-3 font-medium text-gray-700">Nom</div>
            <div className="col-span-4 md:col-span-3 font-medium text-gray-700">Email</div>
            <div className="col-span-3 md:col-span-3 font-medium text-gray-700">Département</div>
            <div className="col-span-1 md:col-span-3 font-medium text-gray-700 text-right">Actions</div>
          </div>

          <motion.ul 
  initial="hidden" 
  animate="visible" 
  variants={{
    visible: { 
      transition: { 
        staggerChildren: 0.1,
        staggerDirection: 1
      } 
    }
  }}
  className="divide-y divide-gray-200"
>
  {contacts.map((contact) => (
    <motion.li
      key={contact.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
          }
        }
      }}
      whileHover={{ scale: 1.01 }}
      className="px-6 py-4 bg-white hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        {/* Colonne Nom */}
        <div className="col-span-12 md:col-span-3 flex items-center">
          <div className="relative flex-shrink-0 h-10 w-10">
            <img 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`}
              alt={contact.name}
              className="rounded-full bg-blue-100 p-1 border-2 border-blue-200"
            />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
          </div>
          <div className="ml-4 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {contact.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {contact.departement}
            </p>
          </div>
        </div>

        {/* Colonne Email */}
        <div className="col-span-6 md:col-span-3 flex items-center mt-2 md:mt-0">
          <FiMail className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
          <a 
            href={`mailto:${contact.email}`} 
            className="text-sm text-gray-600 hover:text-blue-600 truncate"
          >
            {contact.email}
          </a>
        </div>

        {/* Colonne Téléphone */}
        <div className="col-span-6 md:col-span-2 flex items-center">
          <FiPhone className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
          <a 
            href={`tel:${contact.phone}`} 
            className="text-sm text-gray-600 hover:text-blue-600 truncate"
          >
            {contact.phone || 'Non renseigné'}
          </a>
        </div>

        {/* Colonne Département */}
        <div className="hidden md:flex md:col-span-2 items-center">
          <FiBriefcase className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-600 truncate">
            {contact.departement}
          </span>
        </div>

        {/* Actions */}
        <div className="col-span-12 md:col-span-2 flex justify-end space-x-2 mt-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/contacts/${contact.id}/update`)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Modifier"
          >
            <FiEdit2 className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(contact.id)}
            disabled={deletingId === contact.id}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Supprimer"
          >
            {deletingId === contact.id ? 
              <FiLoader className="h-5 w-5 animate-spin" /> : 
              <FiTrash2 className="h-5 w-5" />
            }
          </motion.button>
        </div>
      </div>
    </motion.li>
  ))}
</motion.ul>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 sm:mb-0">
            Affichage de <span className="font-medium">1</span> à <span className="font-medium">{contacts.length}</span> sur{' '}
            <span className="font-medium">{contacts.length}</span> contacts
          </div>
          <div className="flex space-x-2">
            <button 
              disabled 
              className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Précédent
            </button>
            <button 
              disabled 
              className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 transition"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}