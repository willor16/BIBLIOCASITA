import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Tips de Lectura - Bibliocasita',
    description: 'Descubre consejos y técnicas para mejorar tu experiencia de lectura.',
};

export const dynamic = 'force-dynamic';

export default async function TipsPage() {
    const tips = await prisma.tip.findMany({
        orderBy: { order: 'asc' },
    });

    // Group tips by category
    const tipsByCategory = tips.reduce((acc, tip) => {
        const category = tip.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(tip);
        return acc;
    }, {} as Record<string, typeof tips>);

    const categories = Object.keys(tipsByCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-background-light to-white">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6">
                        <Lightbulb className="w-4 h-4" />
                        Manual de Lectura
                    </div>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-charcoal mb-6">
                        Tips de Lectura
                    </h1>
                    <p className="text-xl text-charcoal/70 font-display max-w-2xl mx-auto">
                        Consejos prácticos y técnicas para mejorar tu experiencia de lectura y sacar el máximo provecho de cada libro.
                    </p>
                </div>
            </section>

            {/* Tips Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {tips.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-display text-lg">Próximamente agregaremos tips de lectura.</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {categories.map((category, categoryIndex) => (
                                <div key={category}>
                                    {categories.length > 1 && (
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                                {categoryIndex + 1}
                                            </div>
                                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal">{category}</h2>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        {tipsByCategory[category].map((tip, tipIndex) => (
                                            <div
                                                key={tip.id}
                                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                                            >
                                                <div className="flex flex-col md:flex-row">
                                                    {tip.image && (
                                                        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                                                            <Image
                                                                src={tip.image}
                                                                alt={tip.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 768px) 100vw, 256px"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="p-6 md:p-8 flex-grow">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
                                                                {tip.order || tipIndex + 1}
                                                            </span>
                                                            <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal">{tip.title}</h3>
                                                        </div>
                                                        <p className="text-charcoal/70 leading-relaxed font-display whitespace-pre-line">
                                                            {tip.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-charcoal to-charcoal/90 rounded-3xl p-12 text-white">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">¿Listo para comenzar tu aventura?</h2>
                        <p className="text-white/70 text-lg mb-8 font-display">
                            Explora nuestras rutas de lectura recomendadas y encuentra tu próximo libro favorito.
                        </p>
                        <a
                            href="/rutas"
                            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 group"
                        >
                            Ver Rutas de Lectura
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
