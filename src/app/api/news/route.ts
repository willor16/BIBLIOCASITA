import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, author, image, quote } = body;

        const news = await prisma.news.create({
            data: {
                title,
                description,
                author,
                image,
                quote,
                date: new Date(),
            },
        });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating news' }, { status: 500 });
    }
}
