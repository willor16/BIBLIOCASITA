import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const location = await prisma.location.findUnique({
            where: { id },
        });
        if (!location) {
            return NextResponse.json({ error: 'Location not found' }, { status: 404 });
        }
        return NextResponse.json(location);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching location' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, description, image, googleMapsUrl } = body;
        const location = await prisma.location.update({
            where: { id },
            data: { name, description, image, googleMapsUrl },
        });
        return NextResponse.json(location);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating location' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.location.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Location deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting location' }, { status: 500 });
    }
}
