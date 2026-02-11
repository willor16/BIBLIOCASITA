import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const route = await prisma.readingRoute.findUnique({
            where: { id },
            include: { books: true },
        });
        if (!route) {
            return NextResponse.json({ error: 'Route not found' }, { status: 404 });
        }
        return NextResponse.json(route);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching route' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, description, tips, books } = body;

        // Perform a transaction to update route and replace books if provided
        const result = await prisma.$transaction(async (tx) => {
            // Update route details
            const updatedRoute = await tx.readingRoute.update({
                where: { id },
                data: { title, description, tips },
            });

            if (books) {
                // Delete existing books
                await tx.book.deleteMany({
                    where: { readingRouteId: id },
                });

                // Create new books
                // Note: If books have IDs they might be existing, but for simplicity in this MVP, we re-create
                for (const book of books) {
                    await tx.book.create({
                        data: {
                            title: book.title,
                            author: book.author,
                            description: book.description,
                            image: book.image,
                            readingRouteId: id,
                        },
                    });
                }
            }
            return updatedRoute;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error updating route' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.readingRoute.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Route deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting route' }, { status: 500 });
    }
}
