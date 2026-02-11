import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ImageOff } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) return { title: 'Noticia no encontrada' };

    return {
        title: `${news.title} - Bibliocasita`,
        description: news.description.substring(0, 160),
    };
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background-light py-20 px-4 sm:px-6 lg:px-8">
            <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="relative h-96 w-full">
                    {news.image ? (
                        <Image
                            src={news.image}
                            alt={news.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <ImageOff className="w-16 h-16" />
                        </div>
                    )}
                    <Link href="/noticias" className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-full text-charcoal shadow-lg hover:bg-primary hover:text-white transition-all">
                        <ArrowLeft size={24} />
                    </Link>
                </div>

                <div className="p-10 md:p-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 text-sm font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-8">
                        <div>
                            {new Date(news.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        {news.author && <div>Por {news.author}</div>}
                    </div>

                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-10 text-charcoal leading-tight">
                        {news.title}
                    </h1>

                    <div className="prose prose-lg prose-headings:font-serif prose-a:text-primary max-w-none text-charcoal/80 font-display leading-relaxed whitespace-pre-wrap">
                        {news.description}
                    </div>
                </div>
            </article>
        </div>
    );
}
