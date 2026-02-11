'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CloudinaryUpload from '@/components/CloudinaryUpload';

export default function NewLocationPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [googleMapsUrl, setGoogleMapsUrl] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch('/api/locations', {
            method: 'POST',
            body: JSON.stringify({ name, description, image, googleMapsUrl }),
        });
        router.push('/admin-secret-login/dashboard/locations');
        router.refresh();
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <Link href="/admin-secret-login/dashboard/locations" className="flex items-center gap-2 text-gray-500 hover:text-primary mb-4 transition-colors text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Cancelar y Volver
                </Link>
                <h1 className="text-2xl font-bold font-serif text-charcoal">Registrar Nueva Ubicación</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Ubicación</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                        placeholder="Ej. Parque Central"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        className="w-full p-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                        placeholder="Detalles sobre dónde encontrar esta casita..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Enlace de Google Maps</label>
                    <input
                        type="url"
                        value={googleMapsUrl}
                        onChange={(e) => setGoogleMapsUrl(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                        placeholder="https://goo.gl/maps/..."
                    />
                </div>

                <CloudinaryUpload
                    onImageUrl={setImage}
                    currentImage={image}
                    label="Imagen"
                />

                <div className="pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-white font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-primary transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar Ubicación'}
                    </button>
                </div>
            </form>
        </div>
    );
}
