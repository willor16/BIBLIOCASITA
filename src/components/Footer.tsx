import { Facebook, Instagram, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white pt-20 pb-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
                    <div className="space-y-6">
                        <h3 className="font-serif text-3xl font-bold text-cream">Bibliocasita</h3>
                        <p className="text-white/60 leading-relaxed">
                            Promoviendo la lectura y el desarrollo comunitario a través del acceso libre a los libros y espacios de aprendizaje.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://www.facebook.com/share/1BvjvEfk2D" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-all text-white/80 hover:text-white"><Facebook size={18} /></a>
                            <a href="https://www.instagram.com/bibliocasitatoto" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-all text-white/80 hover:text-white"><Instagram size={18} /></a>
                            <a href="https://www.pinterest.com/bibliocasitatoto/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-all text-white/80 hover:text-white"><span className="font-bold text-xs">P</span></a>
                            <a href="mailto:bibliocasitatoto24@gmail.com" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-all text-white/80 hover:text-white"><Mail size={18} /></a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-cream uppercase tracking-widest text-xs">Contacto</h4>
                        <div className="space-y-4 text-white/60">
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-primary" />
                                <span>+502 46522368</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-primary" />
                                <span>bibliocasitatoto24@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-primary" />
                                <span>Totonicapán, Guatemala</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-cream uppercase tracking-widest text-xs">Wilmer Choxom</h4>
                        <p className="text-white/60 text-sm">
                            desarrollador de la pagina web contacta para saber mas.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/will_lor77" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all text-white/80 hover:text-white">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/wilmerchoxom" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-all text-white/80 hover:text-white">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:lorwilm@gmail.com" className="w-10 h-10 rounded-full bg-white/5 hover:bg-orange-500 flex items-center justify-center transition-all text-white/80 hover:text-white">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-white/40">
                    <p>© {new Date().getFullYear()} Wilmer Choxom. Todos los derechos reservados.</p>
                    <p className="text-center md:text-right max-w-lg">
                        Aviso Legal: Esta página es para fines informativos. El contenido no debe ser utilizado para otros fines sin autorización.
                    </p>
                </div>
            </div>
        </footer>
    );
}
