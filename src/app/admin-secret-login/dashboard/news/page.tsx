import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash, ArrowLeft, Pencil } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

async function deleteNews(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.news.delete({ where: { id } });
    revalidatePath('/admin-secret-login/dashboard/news');
    revalidatePath('/blog');
}

export default async function NewsAdminPage() {
    const news = await prisma.news.findMany({ orderBy: { date: 'desc' } });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin-secret-login/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-charcoal" />
                    </Link>
                    <h1 className="text-2xl font-bold font-serif text-charcoal">Gestión de Noticias</h1>
                </div>
                <Link href="/admin-secret-login/dashboard/news/new" className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-charcoal transition-colors uppercase tracking-widest text-xs font-bold">
                    <Plus size={16} /> Nueva Noticia
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {news.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No hay noticias registradas.</div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block">
                            <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                                <div className="col-span-2">Imagen</div>
                                <div className="col-span-4">Título</div>
                                <div className="col-span-3">Fecha</div>
                                <div className="col-span-2">Autor</div>
                                <div className="col-span-1 text-right">Acciones</div>
                            </div>
                            {news.map(item => (
                                <div key={item.id} className="grid grid-cols-12 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
                                    <div className="col-span-2 relative h-12 w-20 rounded overflow-hidden bg-gray-200">
                                        {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />}
                                    </div>
                                    <div className="col-span-4 font-bold text-charcoal pr-4 truncate">{item.title}</div>
                                    <div className="col-span-3 text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                                    <div className="col-span-2 text-sm text-gray-500">{item.author || '-'}</div>
                                    <div className="col-span-1 flex justify-end gap-2">
                                        <Link href={`/admin-secret-login/dashboard/news/${item.id}`} className="text-gray-400 hover:text-primary p-2 transition-colors">
                                            <Pencil size={18} />
                                        </Link>
                                        <form action={deleteNews}>
                                            <input type="hidden" name="id" value={item.id} />
                                            <button type="submit" className="text-gray-400 hover:text-red-600 p-2 transition-colors">
                                                <Trash size={18} />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {news.map(item => (
                                <div key={item.id} className="p-4 flex gap-4">
                                    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                        {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-charcoal truncate mb-1">{item.title}</h3>
                                        <p className="text-xs text-gray-500 mb-2">
                                            {new Date(item.date).toLocaleDateString()} {item.author && `• ${item.author}`}
                                        </p>
                                        <div className="flex gap-2">
                                            <Link href={`/admin-secret-login/dashboard/news/${item.id}`} className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                                <Pencil size={14} /> Editar
                                            </Link>
                                            <form action={deleteNews} className="inline">
                                                <input type="hidden" name="id" value={item.id} />
                                                <button type="submit" className="text-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                                    <Trash size={14} /> Eliminar
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
