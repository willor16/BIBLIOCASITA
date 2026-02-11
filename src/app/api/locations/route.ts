import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, image, googleMapsUrl } = body;

        const location = await prisma.location.create({
            data: {
                name,
                description,
                image,
                googleMapsUrl,
            },
        });
        return NextResponse.json(location);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating location' }, { status: 500 });
    }
}
