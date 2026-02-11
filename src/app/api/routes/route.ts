import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, description, tips, books } = body;

        // books is array of { title, author, description, image }

        const route = await prisma.readingRoute.create({
            data: {
                title,
                description,
                tips,
                books: {
                    create: books
                }
            },
        });
        return NextResponse.json(route);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating route' }, { status: 500 });
    }
}
