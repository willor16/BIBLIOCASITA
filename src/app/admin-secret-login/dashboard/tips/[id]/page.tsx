'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import CloudinaryUpload from '@/components/CloudinaryUpload';

export default function EditTipPage() {
    const router = useRouter();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [order, setOrder] = useState(0);
    const [image, setImage] = useState('');
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`/api/tips/${id}`).then(r => r.json()).then(data => {
            setTitle(data.title || '');
            setContent(data.content || '');
            setCategory(data.category || '');
            setOrder(data.order || 0);
            setImage(data.image || '');
            setQuote(data.quote || '');
        });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch(`/api/tips/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, category, order, image, quote }),
        });
        router.push('/admin-secret-login/dashboard/tips');
        router.refresh();
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin-secret-login/dashboard/tips" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-charcoal" />
                </Link>
                <h1 className="text-2xl font-bold font-serif text-charcoal">Editar Tip</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                            placeholder="Ej: Cómo elegir tu próximo libro"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                                placeholder="Ej: Hábitos"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Orden</label>
                            <input
                                type="number"
                                value={order}
                                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contenido</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={8}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                        placeholder="Escribe el contenido del tip en detalle..."
                    />
                </div>

                <CloudinaryUpload
                    onImageUrl={(url) => setImage(url)}
                    currentImage={image}
                    label="Imagen (opcional)"
                />

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Frase Célebre (opcional)</label>
                    <input
                        type="text"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900 italic"
                        placeholder='Ej. "La lectura es una conversación con los más grandes." — Descartes'
                    />
                </div>

                <div className="flex justify-end pt-4 border-t">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-charcoal transition-colors font-bold uppercase tracking-wider text-sm disabled:opacity-50"
                    >
                        <Save size={16} /> {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}
