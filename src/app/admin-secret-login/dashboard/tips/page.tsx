import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Trash, ArrowLeft, Pencil, Lightbulb } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

async function deleteTip(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.tip.delete({ where: { id } });
    revalidatePath('/admin-secret-login/dashboard/tips');
    revalidatePath('/tips');
}

export default async function TipsAdminPage() {
    const tips = await prisma.tip.findMany({ orderBy: { order: 'asc' } });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin-secret-login/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-charcoal" />
                    </Link>
                    <h1 className="text-2xl font-bold font-serif text-charcoal">Gestión de Tips</h1>
                </div>
                <Link href="/admin-secret-login/dashboard/tips/new" className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-charcoal transition-colors uppercase tracking-widest text-xs font-bold">
                    <Plus size={16} /> Nuevo Tip
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {tips.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No hay tips registrados.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {tips.map(tip => (
                            <div key={tip.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {tip.order}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h3 className="font-bold text-charcoal truncate">{tip.title}</h3>
                                    <p className="text-sm text-gray-500 truncate">{tip.category || 'Sin categoría'}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <Link href={`/admin-secret-login/dashboard/tips/${tip.id}`} className="text-gray-400 hover:text-primary p-2 transition-colors">
                                        <Pencil size={18} />
                                    </Link>
                                    <form action={deleteTip}>
                                        <input type="hidden" name="id" value={tip.id} />
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
