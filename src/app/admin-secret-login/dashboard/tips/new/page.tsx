'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import Image from 'next/image';

export default function NewTipPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [order, setOrder] = useState(0);
    const [image, setImage] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/images').then(r => r.json()).then(setImages);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch('/api/tips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, category, order, image }),
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
                <h1 className="text-2xl font-bold font-serif text-charcoal">Nuevo Tip</h1>
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

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Imagen (opcional)</label>
                    <div className="border border-gray-200 rounded-lg p-4">
                        {image ? (
                            <div className="flex items-center gap-4">
                                <div className="relative h-20 w-32 rounded overflow-hidden bg-gray-100">
                                    <Image src={image} alt="Preview" fill className="object-cover" />
                                </div>
                                <button type="button" onClick={() => setImage('')} className="text-red-500 text-sm font-medium">
                                    Quitar imagen
                                </button>
                            </div>
                        ) : (
                            <button type="button" onClick={() => setShowImagePicker(true)} className="text-primary font-medium text-sm">
                                + Seleccionar imagen
                            </button>
                        )}
                    </div>
                </div>

                {showImagePicker && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
                            <div className="p-4 border-b flex justify-between items-center">
                                <h3 className="font-bold text-charcoal">Seleccionar Imagen</h3>
                                <button onClick={() => setShowImagePicker(false)} className="text-gray-400 hover:text-charcoal">
                                    <ArrowLeft size={20} />
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto max-h-[60vh] grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {images.map(img => (
                                    <div
                                        key={img}
                                        onClick={() => { setImage(img); setShowImagePicker(false); }}
                                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all bg-gray-100"
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end pt-4 border-t">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-charcoal transition-colors font-bold uppercase tracking-wider text-sm disabled:opacity-50"
                    >
                        <Save size={16} /> {loading ? 'Guardando...' : 'Guardar Tip'}
                    </button>
                </div>
            </form>
        </div>
    );
}
