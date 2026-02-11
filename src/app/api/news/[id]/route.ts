import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const news = await prisma.news.findUnique({
            where: { id },
        });
        if (!news) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching news' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, description, author, image } = body;
        const news = await prisma.news.update({
            where: { id },
            data: { title, description, author, image },
        });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating news' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.news.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'News deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting news' }, { status: 500 });
    }
}
