import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash, ArrowLeft, BookOpen } from 'lucide-react';
import { revalidatePath } from 'next/cache';

async function deleteRoute(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.readingRoute.delete({ where: { id } });
    revalidatePath('/admin-secret-login/dashboard/routes');
    revalidatePath('/rutas');
}

export default async function RoutesAdminPage() {
    const routes = await prisma.readingRoute.findMany({
        include: { _count: { select: { books: true } } },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin-secret-login/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-charcoal" />
                    </Link>
                    <h1 className="text-2xl font-bold font-serif text-charcoal">Gestión de Rutas de Lectura</h1>
                </div>
                <Link href="/admin-secret-login/dashboard/routes/new" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-charcoal transition-colors uppercase tracking-widest text-xs font-bold">
                    <Plus size={16} /> Nueva Ruta
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {routes.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No hay rutas registradas.</div>
                ) : (
                    <div>
                        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <div className="col-span-4">Título</div>
                            <div className="col-span-4">Descripción</div>
                            <div className="col-span-2">Libros</div>
                            <div className="col-span-2 text-right">Acciones</div>
                        </div>
                        {routes.map(item => (
                            <div key={item.id} className="grid grid-cols-12 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
                                <div className="col-span-4 font-bold text-charcoal pr-4 flex items-center gap-2">
                                    <BookOpen size={16} className="text-primary" /> {item.title}
                                </div>
                                <div className="col-span-4 text-sm text-gray-500 line-clamp-1">{item.description}</div>
                                <div className="col-span-2 text-sm text-gray-500"><span className="bg-gray-200 px-2 py-1 rounded text-xs font-bold">{item._count.books} libros</span></div>
                                <div className="col-span-2 flex justify-end gap-2">
                                    <Link href={`/admin-secret-login/dashboard/routes/${item.id}`} className="text-gray-400 hover:text-primary p-2 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                    </Link>
                                    <form action={deleteRoute}>
                                        <input type="hidden" name="id" value={item.id} />
                                        <button type="submit" className="text-gray-400 hover:text-red-600 p-2 transition-colors">
                                            <Trash size={18} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
