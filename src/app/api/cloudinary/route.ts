import { NextResponse } from 'next/server';

export async function GET() {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json(
            { error: 'Cloudinary credentials not configured' },
            { status: 500 }
        );
    }

    try {
        const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=100&prefix=bibliocasita&type=upload`,
            {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
                next: { revalidate: 30 },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Cloudinary API error:', errorText);
            return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
        }

        const data = await response.json();
        const images = (data.resources || []).map((r: { secure_url: string; public_id: string; width: number; height: number; bytes: number }) => ({
            url: r.secure_url,
            publicId: r.public_id,
            width: r.width,
            height: r.height,
            size: r.bytes,
        }));

        return NextResponse.json(images);
    } catch (error) {
        console.error('Error fetching Cloudinary images:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
