import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { ImageOff, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Noticias - Bibliocasita',
    description: 'Mántente informado de nuestras actividades y eventos.',
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
    const news = await prisma.news.findMany({
        orderBy: { date: 'desc' },
    });

    return (
        <div className="min-h-screen bg-background-light py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 text-center">
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm block mb-4">Blog & Eventos</span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">Nuestras Noticias</h1>
                </header>

                {news.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 font-display">No hay noticias publicadas aún.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {news.map((item) => (
                            <article key={item.id} className="bg-white group rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                                <div className="relative h-64 w-full overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <ImageOff className="w-10 h-10" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-charcoal px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                        {new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    {item.author && <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">Por {item.author}</span>}
                                    <h2 className="font-serif text-xl font-bold mb-4 text-charcoal group-hover:text-primary transition-colors leading-tight">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                        {item.description}
                                    </p>
                                    <div className="pt-4 border-t border-gray-100">
                                        <Link href={`/blog/${item.id}`} className="text-primary text-xs font-bold uppercase tracking-widest hover:text-charcoal transition-colors flex items-center gap-2">
                                            Leer más <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
