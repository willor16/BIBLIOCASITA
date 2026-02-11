import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const imagesDir = path.join(process.cwd(), 'public/images');
    try {
        if (!fs.existsSync(imagesDir)) {
            return NextResponse.json([]);
        }
        const files = fs.readdirSync(imagesDir);
        const images = files.filter(file => /\.(jpg|jpeg|png|webp|svg)$/i.test(file)).map(file => `/images/${file}`);
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}
