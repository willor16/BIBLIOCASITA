'use client';
import { useState, useCallback } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';

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
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'djteqchmj',
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
                            <p className="text-xs text-green-600 font-bold truncate max-w-[200px]">✓ Imagen subida</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    className="text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                                >
                                    <Upload size={12} /> Cambiar
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
                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={loading}
                        className="w-full py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-2 text-gray-400 hover:text-primary"
                    >
                        {loading ? (
                            <span className="text-sm font-bold">Cargando...</span>
                        ) : (
                            <>
                                <ImageIcon size={32} />
                                <span className="text-sm font-bold uppercase tracking-wider">
                                    Subir imagen
                                </span>
                                <span className="text-xs">Haz clic para seleccionar un archivo</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
