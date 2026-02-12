'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import Link from 'next/link';
import CloudinaryUpload from '@/components/CloudinaryUpload';

interface Book {
    title: string;
    author: string;
    description: string;
    image: string;
    quote: string;
}

export default function EditRoutePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tips, setTips] = useState('');
    const [quote, setQuote] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/routes/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setDescription(data.description || '');
                setTips(data.tips || '');
                setQuote(data.quote || '');
                if (data.books) {
                    setBooks(data.books.map((b: any) => ({
                        title: b.title,
                        author: b.author,
                        description: b.description,
                        image: b.image || '',
                        quote: b.quote || ''
                    })));
                }
                setFetching(false);
            })
            .catch(err => {
                console.error(err);
                setFetching(false);
            });
    }, [id]);

    const addBook = () => {
        setBooks([...books, { title: '', author: '', description: '', image: '', quote: '' }]);
    };

    const removeBook = (index: number) => {
        const newBooks = [...books];
        newBooks.splice(index, 1);
        setBooks(newBooks);
    };

    const updateBook = (index: number, field: keyof Book, value: string) => {
        const newBooks = [...books];
        newBooks[index][field] = value;
        setBooks(newBooks);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch(`/api/routes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description, tips, quote, books }),
        });
        router.push('/admin-secret-login/dashboard/routes');
        router.refresh();
    };

    if (fetching) return <div className="p-8 text-center">Cargando datos...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <Link href="/admin-secret-login/dashboard/routes" className="flex items-center gap-2 text-gray-500 hover:text-primary mb-4 transition-colors text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Cancelar y Volver
                </Link>
                <h1 className="text-2xl font-bold font-serif text-charcoal">Editar Ruta de Lectura</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Route Details */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
                    <h2 className="font-bold text-lg text-charcoal border-b pb-2">Información General</h2>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Título de la Ruta</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-900"
                            placeholder="Ej. Aventura Fantástica"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Descripción General</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className="w-full p-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-900"
                            placeholder="Breve resumen de esta colección..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tips de Lectura</label>
                        <textarea
                            value={tips}
                            onChange={(e) => setTips(e.target.value)}
                            rows={2}
                            className="w-full p-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-900"
                            placeholder="Sugerencias para los lectores..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Frase Célebre de la Ruta (opcional)</label>
                        <input
                            type="text"
                            value={quote}
                            onChange={(e) => setQuote(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-900 italic"
                            placeholder='Ej. "Leer es soñar con los ojos abiertos."'
                        />
                    </div>
                </div>

                {/* Books List */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-lg text-charcoal">Libros en esta Ruta</h2>
                        <button type="button" onClick={addBook} className="bg-charcoal text-white px-3 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors flex items-center gap-2">
                            <Plus size={16} /> Agregar Libro
                        </button>
                    </div>

                    {books.map((book, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
                            <button type="button" onClick={() => removeBook(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                                <Trash size={18} />
                            </button>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Título del Libro *</label>
                                        <input
                                            type="text"
                                            value={book.title}
                                            onChange={(e) => updateBook(index, 'title', e.target.value)}
                                            required
                                            className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Autor *</label>
                                        <input
                                            type="text"
                                            value={book.author}
                                            onChange={(e) => updateBook(index, 'author', e.target.value)}
                                            required
                                            className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Descripción</label>
                                        <textarea
                                            value={book.description}
                                            onChange={(e) => updateBook(index, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <CloudinaryUpload
                                        onImageUrl={(url) => updateBook(index, 'image', url)}
                                        currentImage={book.image}
                                        label="Portada"
                                    />
                                    <div className="mt-3">
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Frase Célebre del Libro</label>
                                        <input
                                            type="text"
                                            value={book.quote}
                                            onChange={(e) => updateBook(index, 'quote', e.target.value)}
                                            className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none text-gray-900 italic text-sm"
                                            placeholder='"Frase célebre del libro..."'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {books.length === 0 && (
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400">
                            No has agregado libros a esta ruta. Haz clic en &quot;Agregar Libro&quot;.
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || books.length === 0}
                        className="px-8 bg-charcoal text-white font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-primary transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}
