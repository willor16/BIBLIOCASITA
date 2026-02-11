import Link from 'next/link';
import { LayoutDashboard, Newspaper, MapPin, BookOpen, LogOut, ArrowLeft, Lightbulb } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-charcoal text-white hidden md:flex flex-col fixed h-full shadow-2xl z-20">
                <div className="p-6 text-center border-b border-white/10">
                    <h2 className="text-xl font-serif font-bold text-white">Bibliocasita</h2>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Admin Panel</span>
                </div>

                <nav className="flex-grow p-4 space-y-2 mt-4">
                    <Link href="/admin-secret-login/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all group">
                        <LayoutDashboard size={18} className="group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">Resumen</span>
                    </Link>
                    <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/40 font-bold mt-4">Contenido</div>
                    <Link href="/admin-secret-login/dashboard/news" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all group">
                        <Newspaper size={18} className="group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">Noticias</span>
                    </Link>
                    <Link href="/admin-secret-login/dashboard/locations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all group">
                        <MapPin size={18} className="group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">Ubicaciones</span>
                    </Link>
                    <Link href="/admin-secret-login/dashboard/routes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all group">
                        <BookOpen size={18} className="group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">Rutas de Lectura</span>
                    </Link>
                    <Link href="/admin-secret-login/dashboard/tips" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all group">
                        <Lightbulb size={18} className="group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">Tips de Lectura</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors mb-2">
                        <ArrowLeft size={18} /> <span className="text-sm">Volver al Sitio</span>
                    </Link>
                </div>
            </aside>

            <main className="flex-grow md:ml-64 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
