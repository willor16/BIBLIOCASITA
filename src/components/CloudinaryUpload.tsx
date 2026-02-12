'use client';
import { useState, useCallback } from 'react';
import { Upload, X, ImageIcon, FolderOpen } from 'lucide-react';

interface CloudinaryImage {
    url: string;
    publicId: string;
    width: number;
    height: number;
    size: number;
}

interface CloudinaryUploadProps {
    onImageUrl: (url: string) => void;
    currentImage?: string;
    label?: string;
}

declare global {
    interface Window {
        cloudinary?: {
            createUploadWidget: (
                config: Record<string, unknown>,
                callback: (error: unknown, result: { event: string; info: { secure_url: string } }) => void
            ) => { open: () => void };
        };
    }
}

export default function CloudinaryUpload({ onImageUrl, currentImage, label = 'Imagen' }: CloudinaryUploadProps) {
    const [loading, setLoading] = useState(false);
    const [showBrowse, setShowBrowse] = useState(false);
    const [existingImages, setExistingImages] = useState<CloudinaryImage[]>([]);
    const [browseLoading, setBrowseLoading] = useState(false);

    const loadScript = useCallback(() => {
        return new Promise<void>((resolve) => {
            if (window.cloudinary) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://upload-widget.cloudinary.com/global/all.js';
            script.onload = () => resolve();
            document.head.appendChild(script);
        });
    }, []);

    const handleUpload = async () => {
        setLoading(true);
        await loadScript();
        setLoading(false);

        const widget = window.cloudinary!.createUploadWidget(
            {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqidjyjrm',
                uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'bibliocasita',
                sources: ['local', 'url', 'camera'],
                multiple: false,
                maxFiles: 1,
                cropping: false,
                folder: 'bibliocasita',
                resourceType: 'image',
            },
            (error: unknown, result: { event: string; info: { secure_url: string } }) => {
                if (!error && result.event === 'success') {
                    onImageUrl(result.info.secure_url);
                }
            }
        );
        widget.open();
    };

    const handleBrowseExisting = async () => {
        setBrowseLoading(true);
        setShowBrowse(true);
        try {
            const res = await fetch('/api/cloudinary');
            if (res.ok) {
                const images = await res.json();
                setExistingImages(images);
            }
        } catch (err) {
            console.error('Error fetching images:', err);
        }
        setBrowseLoading(false);
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
            <div className="border border-gray-200 rounded-lg p-4">
                {currentImage ? (
                    <div className="flex items-center gap-4">
                        <div className="relative h-24 w-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-green-600 font-bold truncate max-w-[200px]">✓ Imagen seleccionada</p>
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                                >
                                    <Upload size={12} /> Subir otra
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBrowseExisting}
                                    className="text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                                >
                                    <FolderOpen size={12} /> Existentes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onImageUrl('')}
                                    className="text-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                                >
                                    <X size={12} /> Quitar
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={loading}
                            className="flex-1 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-2 text-gray-400 hover:text-primary"
                        >
                            {loading ? (
                                <span className="text-sm font-bold">Cargando...</span>
                            ) : (
                                <>
                                    <Upload size={28} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Subir nueva</span>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={handleBrowseExisting}
                            className="flex-1 py-8 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center gap-2 text-gray-400 hover:text-blue-600"
                        >
                            <FolderOpen size={28} />
                            <span className="text-xs font-bold uppercase tracking-wider">Elegir existente</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Browse Existing Images Modal */}
            {showBrowse && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-charcoal text-lg">Imágenes en Cloudinary</h3>
                                <p className="text-xs text-gray-400">Haz clic en una imagen para seleccionarla</p>
                            </div>
                            <button
                                onClick={() => setShowBrowse(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto flex-1">
                            {browseLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="text-center text-gray-400">
                                        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
                                        <p className="text-sm font-bold">Cargando imágenes...</p>
                                    </div>
                                </div>
                            ) : existingImages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                    <ImageIcon size={48} className="mb-3" />
                                    <p className="font-bold">No hay imágenes</p>
                                    <p className="text-sm">Sube tu primera imagen con el botón &quot;Subir nueva&quot;</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {existingImages.map((img) => (
                                        <div
                                            key={img.publicId}
                                            onClick={() => {
                                                onImageUrl(img.url);
                                                setShowBrowse(false);
                                            }}
                                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg group ${currentImage === img.url
                                                ? 'border-primary ring-2 ring-primary/30'
                                                : 'border-transparent hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="aspect-square bg-gray-100">
                                                <img
                                                    src={img.url}
                                                    alt={img.publicId}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-[10px] font-bold truncate">
                                                    {img.publicId.split('/').pop()}
                                                </p>
                                                <p className="text-white/70 text-[10px]">
                                                    {formatSize(img.size)}
                                                </p>
                                            </div>
                                            {currentImage === img.url && (
                                                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
