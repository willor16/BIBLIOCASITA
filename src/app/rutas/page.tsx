import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Rutas de Lectura - Bibliocasita',
    description: 'Descubre nuevas aventuras literarias con nuestras rutas guiadas.',
};

export const revalidate = 60;

export default async function RoutesPage() {
    const routes = await prisma.readingRoute.findMany({
        include: { books: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-background-light to-white">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                        <BookOpen className="w-4 h-4" />
                        Catálogo Literario
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-charcoal mb-6">
                        Rutas de Lectura
                    </h1>
                    <p className="text-xl text-charcoal/70 font-display max-w-2xl mx-auto">
                        Explora nuestras recomendaciones de lectura organizadas por temática. Cada ruta te guía a través de una secuencia de libros cuidadosamente seleccionados.
                    </p>
                </div>
            </section>

            {/* Routes Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 pb-24">
                <div className="max-w-7xl mx-auto">
                    {routes.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-display text-lg">No hay rutas de lectura disponibles aún.</p>
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {routes.map((route, routeIndex) => (
                                <section key={route.id} className="relative">
                                    {/* Route Header */}
                                    <div className="bg-gradient-to-r from-charcoal to-charcoal/90 rounded-2xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
                                        {/* Decorative element */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
                                                    {routeIndex + 1}
                                                </span>
                                                <span className="text-primary text-sm font-bold uppercase tracking-widest">Ruta de Lectura</span>
                                            </div>
                                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{route.title}</h2>
                                            {route.description && (
                                                <p className="text-white/70 text-lg max-w-3xl font-display">{route.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Books Timeline */}
                                    <div className="relative">
                                        {/* Timeline Line - Hidden on mobile */}
                                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

                                        <div className="space-y-8 md:space-y-0">
                                            {route.books.map((book, bookIndex) => (
                                                <div
                                                    key={book.id}
                                                    className={`relative md:flex items-center ${bookIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                                >
                                                    {/* Timeline Node - Hidden on mobile */}
                                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-primary rounded-full items-center justify-center z-10 shadow-lg">
                                                        <span className="text-primary font-bold">{bookIndex + 1}</span>
                                                    </div>

                                                    {/* Spacer */}
                                                    <div className="hidden md:block w-1/2"></div>

                                                    {/* Book Card */}
                                                    <div className={`w-full md:w-1/2 ${bookIndex % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                                                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                                            <div className="flex flex-col sm:flex-row">
                                                                {/* Book Cover */}
                                                                <div className="relative w-full sm:w-32 h-48 sm:h-auto flex-shrink-0 bg-gray-100">
                                                                    {book.image ? (
                                                                        <Image
                                                                            src={book.image}
                                                                            alt={book.title}
                                                                            fill
                                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                            sizes="(max-width: 640px) 100vw, 128px"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                            <BookOpen className="w-12 h-12" />
                                                                        </div>
                                                                    )}
                                                                    {/* Mobile number badge */}
                                                                    <div className="md:hidden absolute top-3 left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                                                        {bookIndex + 1}
                                                                    </div>
                                                                </div>

                                                                {/* Book Info */}
                                                                <div className="p-6 flex-grow">
                                                                    <h4 className="font-serif text-xl font-bold text-charcoal group-hover:text-primary transition-colors mb-1">
                                                                        {book.title}
                                                                    </h4>
                                                                    <p className="text-sm text-primary font-medium mb-3">{book.author}</p>
                                                                    <p className="text-charcoal/60 text-sm line-clamp-3 font-display">{book.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal mb-4">¿Nuevo en la lectura?</h2>
                    <p className="text-charcoal/70 text-lg mb-8 font-display">
                        Revisa nuestros consejos y técnicas para mejorar tu experiencia de lectura.
                    </p>
                    <Link
                        href="/tips"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-charcoal transition-all duration-300 group"
                    >
                        Ver Tips de Lectura
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
