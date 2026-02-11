import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash, ArrowLeft, MapPin } from 'lucide-react'; // Added MapPin for icon representation
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

async function deleteLocation(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.location.delete({ where: { id } });
    revalidatePath('/admin-secret-login/dashboard/locations');
    revalidatePath('/ubicaciones');
}

export default async function LocationsAdminPage() {
    const locations = await prisma.location.findMany({ orderBy: { createdAt: 'desc' } });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin-secret-login/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-charcoal" />
                    </Link>
                    <h1 className="text-2xl font-bold font-serif text-charcoal">Gestión de Ubicaciones</h1>
                </div>
                <Link href="/admin-secret-login/dashboard/locations/new" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-charcoal transition-colors uppercase tracking-widest text-xs font-bold">
                    <Plus size={16} /> Nueva Ubicación
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {locations.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No hay ubicaciones registradas.</div>
                ) : (
                    <div>
                        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <div className="col-span-2">Imagen</div>
                            <div className="col-span-4">Nombre</div>
                            <div className="col-span-5">Descripción</div>
                            <div className="col-span-1 text-right">Acciones</div>
                        </div>
                        {locations.map(item => (
                            <div key={item.id} className="grid grid-cols-12 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
                                <div className="col-span-2 relative h-12 w-20 rounded overflow-hidden bg-gray-200">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <MapPin size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-4 font-bold text-charcoal pr-4">{item.name}</div>
                                <div className="col-span-5 text-sm text-gray-500 line-clamp-1">{item.description}</div>
                                <div className="col-span-1 flex justify-end gap-2">
                                    <Link href={`/admin-secret-login/dashboard/locations/${item.id}`} className="text-gray-400 hover:text-primary p-2 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                    </Link>
                                    <form action={deleteLocation}>
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
