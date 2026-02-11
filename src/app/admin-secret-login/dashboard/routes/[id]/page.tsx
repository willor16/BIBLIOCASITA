'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import Link from 'next/link';

interface Book {
    title: string;
    author: string;
    description: string;
    image: string;
}

export default function EditRoutePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tips, setTips] = useState('');
    const [books, setBooks] = useState<Book[]>([]);

    // Available images for picker
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // Local state for active book being edited? No, simpler to just have list of inputs.
    // For Image Picker, we need to know which book index we are picking for.
    const [pickingImageFor, setPickingImageFor] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
        fetch('/api/images').then(res => res.json()).then(data => setImages(data));
        fetch(`/api/routes/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setDescription(data.description || '');
                setTips(data.tips || '');
                // Map existing books to simple Book interface (ignoring IDs for now as we replace them on server)
                if (data.books) {
                    setBooks(data.books.map((b: any) => ({
                        title: b.title,
                        author: b.author,
                        description: b.description,
                        image: b.image
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
        setBooks([...books, { title: '', author: '', description: '', image: '' }]);
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
            body: JSON.stringify({ title, description, tips, books }),
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
                                        <label className="block text-xs font-bold text-gray-500 mb-1 pointer-events-none">Título del Libro *</label>
                                        <input
                                            type="text"
                                            value={book.title}
                                            onChange={(e) => updateBook(index, 'title', e.target.value)}
                                            required
                                            className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 pointer-events-none">Autor *</label>
                                        <input
                                            type="text"
                                            value={book.author}
                                            onChange={(e) => updateBook(index, 'author', e.target.value)}
                                            required
                                            className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 pointer-events-none">Descripción</label>
                                        <textarea
                                            value={book.description}
                                            onChange={(e) => updateBook(index, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-2 pointer-events-none">Portada</label>
                                    <div className={`border-2 border-dashed rounded-lg p-4 h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${book.image ? 'border-primary bg-primary/5' : 'border-gray-300'}`}
                                        onClick={() => setPickingImageFor(index)}
                                    >
                                        {book.image ? (
                                            <div className="relative w-full h-32">
                                                <img src={book.image} className="w-full h-full object-contain" />
                                                <p className="text-center text-xs mt-2 text-primary font-bold truncate px-2">{book.image.split('/').pop()}</p>
                                            </div>
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <span className="material-symbols-outlined text-4xl block mb-2">add_photo_alternate</span>
                                                <span className="text-xs font-bold uppercase">Seleccionar Imagen</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {books.length === 0 && (
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-400">
                            No has agregado libros a esta ruta. Haz clic en "Agregar Libro".
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

            {/* Image Picker Modal Overlay */}
            {pickingImageFor !== null && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold text-charcoal">Seleccionar Portada para Libro {pickingImageFor + 1}</h3>
                            <button onClick={() => setPickingImageFor(null)}><ArrowLeft size={20} /></button>
                        </div>
                        <div className="p-4 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {images.map(img => (
                                <div
                                    key={img}
                                    onClick={() => {
                                        updateBook(pickingImageFor!, 'image', img);
                                        setPickingImageFor(null);
                                    }}
                                    className="cursor-pointer border hover:border-primary rounded overflow-hidden aspect-square"
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
