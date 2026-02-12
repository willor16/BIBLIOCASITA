/**
 * Cloudinary image URL helper.
 * All images are stored in the `bibliocasita` folder on Cloudinary.
 *
 * When you upload an image to Cloudinary (to the bibliocasita folder),
 * you can reference it here using its filename.
 *
 * The `f_auto,q_auto` transformations automatically optimize
 * format (WebP/AVIF) and quality for each visitor's browser.
 */

const CLOUD_NAME = 'dqidjyjrm';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

/**
 * Build an optimized Cloudinary image URL.
 * @param publicId - The image public ID (e.g., "bibliocasita/my-image")
 * @param options - Optional width for responsive sizing
 */
export function cloudinaryUrl(publicId: string, options?: { width?: number }): string {
    const transforms = ['f_auto', 'q_auto'];
    if (options?.width) {
        transforms.push(`w_${options.width}`);
    }
    return `${BASE_URL}/${transforms.join(',')}/${publicId}`;
}

// ============================================================
// Home page images — update these after uploading to Cloudinary
// ============================================================

// Hero background
export const HERO_BG = cloudinaryUrl('bibliocasita/Descripcion_2');

// History / About section image
export const HISTORY_IMG = cloudinaryUrl('bibliocasita/foto_1ra');

// Founder photo
export const FOUNDER_IMG = cloudinaryUrl('bibliocasita/IMG-20241224-WA0008');

// Logo
export const LOGO_IMG = cloudinaryUrl('bibliocasita/lOGO_BIBLIOCASITA');

// Carousel images
export const CAROUSEL_IMAGES = [
    cloudinaryUrl('bibliocasita/Descripcion_2'),
    cloudinaryUrl('bibliocasita/Descripcion_1'),
    cloudinaryUrl('bibliocasita/Foto_1a'),
    cloudinaryUrl('bibliocasita/Foto_2da'),
    cloudinaryUrl('bibliocasita/Foto_3ra'),
    cloudinaryUrl('bibliocasita/IMG-20240914-WA0003'),
    cloudinaryUrl('bibliocasita/IMG-20241124-WA0012'),
];
