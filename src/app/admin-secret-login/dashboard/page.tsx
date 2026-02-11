import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Newspaper, MapPin, BookOpen, Lightbulb, Plus, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        redirect('/admin-secret-login');
    }

    const newsCount = await prisma.news.count();
    const locationsCount = await prisma.location.count();
    const routesCount = await prisma.readingRoute.count();
    const tipsCount = await prisma.tip.count();

    const cards = [
        { href: '/admin-secret-login/dashboard/news', icon: Newspaper, count: newsCount, label: 'Noticias Publicadas', color: 'blue' },
        { href: '/admin-secret-login/dashboard/locations', icon: MapPin, count: locationsCount, label: 'Ubicaciones Activas', color: 'green' },
        { href: '/admin-secret-login/dashboard/routes', icon: BookOpen, count: routesCount, label: 'Rutas de Lectura', color: 'purple' },
        { href: '/admin-secret-login/dashboard/tips', icon: Lightbulb, count: tipsCount, label: 'Tips de Lectura', color: 'amber' },
    ];

    const colorClasses: Record<string, { bg: string; text: string; hoverBg: string }> = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', hoverBg: 'group-hover:bg-blue-600' },
        green: { bg: 'bg-green-50', text: 'text-green-600', hoverBg: 'group-hover:bg-green-600' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600', hoverBg: 'group-hover:bg-amber-600' },
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif font-bold text-charcoal">Resumen del Panel</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map(card => {
                    const Icon = card.icon;
                    const colors = colorClasses[card.color];
                    return (
                        <Link key={card.href} href={card.href} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 ${colors.bg} ${colors.text} rounded-lg ${colors.hoverBg} group-hover:text-white transition-colors`}>
                                    <Icon size={24} />
                                </div>
                                <span className="text-3xl font-bold text-charcoal">{card.count}</span>
                            </div>
                            <h3 className="text-gray-500 font-medium">{card.label}</h3>
                            <div className={`mt-4 ${colors.text} text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                                Gestionar <ArrowRight size={14} />
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-charcoal mb-6">Acciones Rápidas</h2>
                <div className="flex flex-wrap gap-4">
                    <Link href="/admin-secret-login/dashboard/news/new" className="flex items-center gap-2 px-5 py-3 bg-charcoal text-white rounded-lg hover:bg-primary transition-colors font-bold text-sm uppercase tracking-wider">
                        <Plus size={16} /> Nueva Noticia
                    </Link>
                    <Link href="/admin-secret-login/dashboard/locations/new" className="flex items-center gap-2 px-5 py-3 bg-charcoal text-white rounded-lg hover:bg-primary transition-colors font-bold text-sm uppercase tracking-wider">
                        <Plus size={16} /> Nueva Ubicación
                    </Link>
                    <Link href="/admin-secret-login/dashboard/routes/new" className="flex items-center gap-2 px-5 py-3 bg-charcoal text-white rounded-lg hover:bg-primary transition-colors font-bold text-sm uppercase tracking-wider">
                        <Plus size={16} /> Nueva Ruta
                    </Link>
                    <Link href="/admin-secret-login/dashboard/tips/new" className="flex items-center gap-2 px-5 py-3 bg-charcoal text-white rounded-lg hover:bg-primary transition-colors font-bold text-sm uppercase tracking-wider">
                        <Plus size={16} /> Nuevo Tip
                    </Link>
                </div>
            </div>
        </div>
    );
}
