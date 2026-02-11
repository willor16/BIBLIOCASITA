'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditLocationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [googleMapsUrl, setGoogleMapsUrl] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/images').then(res => res.json()).then(data => setImages(data));
        fetch(`/api/locations/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description || '');
                setImage(data.image || '');
                setGoogleMapsUrl(data.googleMapsUrl || '');
                setFetching(false);
            })
            .catch(err => {
                console.error(err);
                setFetching(false);
            });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch(`/api/locations/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, description, image, googleMapsUrl }),
        });
        router.push('/admin-secret-login/dashboard/locations');
        router.refresh();
    };

    if (fetching) return <div className="p-8 text-center">Cargando datos...</div>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <Link href="/admin-secret-login/dashboard/locations" className="flex items-center gap-2 text-gray-500 hover:text-primary mb-4 transition-colors text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Cancelar y Volver
                </Link>
                <h1 className="text-2xl font-bold font-serif text-charcoal">Editar Ubicación</h1>
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

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Imagen</label>
                    <div className="border border-gray-200 rounded p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {images.map(img => (
                                <div
                                    key={img}
                                    onClick={() => setImage(img)}
                                    className={`relative cursor-pointer aspect-square rounded overflow-hidden border-2 transition-all ${image === img ? 'border-primary ring-2 ring-primary/50' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                    {image === img && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                            <div className="bg-primary text-white rounded-full p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {image && <p className="mt-2 text-xs text-green-600 font-bold">Imagen seleccionada: {image.split('/').pop()}</p>}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-charcoal text-white font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-primary transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}
