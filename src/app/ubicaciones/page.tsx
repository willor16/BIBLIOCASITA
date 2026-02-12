import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Ubicaciones - Bibliocasita',
    description: 'Encuentra las ubicaciones de nuestras Bibliocasitas.',
};

export const dynamic = 'force-dynamic';

export default async function LocationsPage() {
    const locations = await prisma.location.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-background-light py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 text-center">
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm block mb-4">Nuestra Red</span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">Ubicaciones</h1>
                </header>

                {locations.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 font-display">No hay ubicaciones registradas aún.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {locations.map((item) => (
                            <div key={item.id} className="bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100">
                                <div className="relative h-64 w-full overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <MapPin className="w-10 h-10" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <h2 className="font-serif text-2xl font-bold mb-4 text-charcoal group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {item.description}
                                    </p>
                                    {item.googleMapsUrl ? (
                                        <a href={item.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full py-3 border border-charcoal/10 text-charcoal font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white hover:border-primary transition-all text-center">
                                            Ver en Mapa
                                        </a>
                                    ) : (
                                        <button disabled className="w-full py-3 border border-gray-100 text-gray-300 font-bold uppercase tracking-widest text-xs cursor-not-allowed">
                                            Mapa no disponible
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
