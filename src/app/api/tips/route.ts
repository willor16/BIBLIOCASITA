import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const tips = await prisma.tip.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(tips);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching tips' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, content, category, image, order } = body;

        const tip = await prisma.tip.create({
            data: {
                title,
                content,
                category,
                image,
                order: order || 0,
            },
        });
        return NextResponse.json(tip, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating tip' }, { status: 500 });
    }
}
