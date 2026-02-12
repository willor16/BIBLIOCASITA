import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const tip = await prisma.tip.findUnique({
            where: { id },
        });
        if (!tip) {
            return NextResponse.json({ error: 'Tip not found' }, { status: 404 });
        }
        return NextResponse.json(tip);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching tip' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, content, category, image, order, quote } = body;
        const tip = await prisma.tip.update({
            where: { id },
            data: { title, content, category, image, order, quote },
        });
        return NextResponse.json(tip);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating tip' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.tip.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Tip deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting tip' }, { status: 500 });
    }
}
