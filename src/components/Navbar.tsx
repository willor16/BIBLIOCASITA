'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_IMG } from '@/lib/cloudinary';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Inicio' },
        { href: '/blog', label: 'Noticias' },
        { href: '/ubicaciones', label: 'Ubicaciones' },
        { href: '/rutas', label: 'Rutas' },
        { href: '/tips', label: 'Tips' },
    ];

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (pathname === href) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12">
                            <Image
                                src={LOGO_IMG}
                                alt="Bibliocasita Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-serif text-2xl font-bold text-charcoal tracking-tight group-hover:text-primary transition-colors">Bibliocasita</span>
                    </Link>

                    <div className="hidden md:flex space-x-6">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`transition-colors font-medium text-sm uppercase tracking-wider ${pathname === link.href ? 'text-primary' : 'text-charcoal hover:text-primary'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal hover:text-primary transition-colors p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => { handleNavClick(e, link.href); setIsOpen(false); }}
                                    className={`block py-3 px-4 rounded-lg font-medium ${pathname === link.href ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 text-charcoal hover:text-primary'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
