'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Compass, X, Instagram, Linkedin, Mail, Youtube, Facebook, BookOpen, ClipboardList, Home, Bell, RefreshCw, MapPin } from 'lucide-react';
import Carousel from '@/components/Carousel';
import { HERO_BG, HISTORY_IMG, FOUNDER_IMG } from '@/lib/cloudinary';

interface NewsItem {
    id: string;
    title: string;
    description: string;
    date: Date;
    image: string | null;
}

interface HomeClientProps {
    news: NewsItem[];
}

export default function HomeClient({ news }: HomeClientProps) {
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={HERO_BG}
                        alt="Bibliocasita Library"
                        fill
                        sizes="100vw"
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="font-serif text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                            Bibliocasita
                        </h1>
                        <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mb-6 flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-white/50"></div>
                            <span className="text-white/70 text-lg">❝</span>
                            <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-white/50"></div>
                        </div>
                        <p className="font-serif text-lg md:text-2xl text-white italic tracking-wide leading-relaxed">
                            Un proyecto nacido del corazón para nutrir una mente olvidada
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="h-px w-8 bg-white/30"></div>
                            <span className="text-primary text-sm">♥</span>
                            <div className="h-px w-8 bg-white/30"></div>
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-xl md:text-3xl font-light tracking-wide mb-10 text-cream/90 font-display"
                    >
                        Un santuario para el pensamiento y la lectura en comunidad.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <a
                            href="#sobre-nosotros"
                            className="inline-block px-8 py-3 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300"
                        >
                            Descubrir más
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Reglas de Uso */}
            <section className="py-24 px-6 md:px-20 bg-white relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Cómo Funciona</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">Reglas de Uso</h2>
                        <p className="text-charcoal/60 text-lg font-display max-w-2xl mx-auto">
                            Sigue estos sencillos pasos para disfrutar de nuestros libros
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Vertical timeline line - desktop */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/60 to-primary/30 -translate-x-1/2"></div>

                        <div className="space-y-8 md:space-y-0">
                            {[
                                {
                                    icon: BookOpen,
                                    title: 'Disfrutar de la lectura',
                                    description: 'Explora nuestra colección y sumérgete en el mundo de los libros. Encuentra historias que despierten tu imaginación.',
                                    color: 'from-amber-400 to-orange-500',
                                    bgColor: 'bg-amber-50',
                                },
                                {
                                    icon: ClipboardList,
                                    title: 'Registra tus datos',
                                    description: 'Al encontrar el libro que sea de tu interés, deberás dejar tus datos para llevar un control adecuado.',
                                    color: 'from-emerald-400 to-teal-500',
                                    bgColor: 'bg-emerald-50',
                                },
                                {
                                    icon: Home,
                                    title: 'Lectura en casa',
                                    description: 'Disfruta de la lectura desde la comodidad de tu casa cuidando los libros con responsabilidad y cariño.',
                                    color: 'from-blue-400 to-indigo-500',
                                    bgColor: 'bg-blue-50',
                                },
                                {
                                    icon: Bell,
                                    title: 'Toca la campana',
                                    description: 'Al finalizar, debes tocar la campana como señal de haber terminado, trayendo de vuelta el libro a la Bibliocasita.',
                                    color: 'from-purple-400 to-violet-500',
                                    bgColor: 'bg-purple-50',
                                },
                                {
                                    icon: RefreshCw,
                                    title: '¡Repite la aventura!',
                                    description: 'Si deseas seguir leyendo otro libro, simplemente repite los pasos anteriores. ¡La lectura no tiene límites!',
                                    color: 'from-rose-400 to-pink-500',
                                    bgColor: 'bg-rose-50',
                                },
                            ].map((rule, index) => {
                                const Icon = rule.icon;
                                const isEven = index % 2 === 0;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className={`relative md:flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} md:mb-16`}
                                    >
                                        {/* Timeline node */}
                                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${rule.color} flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-white`}>
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Spacer */}
                                        <div className="hidden md:block w-1/2"></div>

                                        {/* Card */}
                                        <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                                            <div className={`${rule.bgColor} rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden`}>
                                                {/* Decorative gradient */}
                                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${rule.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`}></div>

                                                <div className="relative z-10 flex items-start gap-5">
                                                    {/* Mobile number + Icon */}
                                                    <div className="flex-shrink-0">
                                                        <div className={`md:hidden w-10 h-10 rounded-full bg-gradient-to-br ${rule.color} flex items-center justify-center text-white font-bold text-sm shadow-md mb-3`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rule.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                                            <Icon className="w-7 h-7 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal mb-2 group-hover:text-primary transition-colors">
                                                            {rule.title}
                                                        </h3>
                                                        <p className="text-charcoal/60 leading-relaxed font-display">
                                                            {rule.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mt-16"
                    >
                        <Link
                            href="/ubicaciones"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-primary/90 text-white font-bold uppercase tracking-widest rounded-xl hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <MapPin className="w-5 h-5" />
                            Visítanos
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-charcoal/40 text-sm mt-4 font-display">Encuentra tu Bibliocasita más cercana</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission/Vision/Objective - Improved Design */}
            <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-background-light to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Nuestros Pilares</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">Lo Que Nos Define</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Misión */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative bg-gradient-to-br from-white to-cream p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4 text-charcoal">Misión</h3>
                                <p className="text-charcoal/70 leading-relaxed font-display">
                                    Contribuir al desarrollo comunitario en espacios que permitan tener el acceso libre a los libros en su formato físico.
                                </p>
                            </div>
                        </motion.div>

                        {/* Visión */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative bg-gradient-to-br from-white to-cream p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Eye className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4 text-charcoal">Visión</h3>
                                <p className="text-charcoal/70 leading-relaxed font-display">
                                    Ser pioneros en promover la lectura en las comunidades y del país a través de la participación ciudadana en las diferentes actividades que incentiven el gusto por la lectura.
                                </p>
                            </div>
                        </motion.div>

                        {/* Objetivo */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative bg-gradient-to-br from-white to-cream p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Compass className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4 text-charcoal">Objetivo</h3>
                                <p className="text-charcoal/70 leading-relaxed font-display">
                                    Crear una sociedad lectora con criterio, empática, con valores y futuros líderes con convicción de servicio a su comunidad.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Context / History */}
            <section id="sobre-nosotros" className="py-24 px-6 md:px-20 bg-charcoal text-cream relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16 relative z-10">
                    <div className="w-full md:w-1/2">
                        <div className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={HISTORY_IMG}
                                alt="Espacio de lectura"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2">Sobre Nosotros</div>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-cream leading-tight">Nuestra Historia</h2>
                            <p className="text-cream/70 text-lg leading-loose mb-6 font-display">
                                El deseo nace ante la crisis social que se vive por la poca práctica de valores especialmente en la lectura, siendo esto una de las maneras donde las personas experimentan distintas emociones volviendo más empática a la sociedad.
                            </p>
                            <p className="text-cream/70 text-lg leading-loose font-display">
                                Otro de los motivos es debido a las grandes limitantes que se tienen en las áreas rurales. Nace nuestro compromiso de tomar acción a través de la Bibliocasita para ofrecer un acceso rápido al material literario, diferente a las bibliotecas municipales tradicionales.
                            </p>

                            <div className="pt-8">
                                <button
                                    onClick={() => setIsSupportModalOpen(true)}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 rounded-lg group"
                                >
                                    Cómo Apoyarnos
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Support Modal */}
            <AnimatePresence>
                {isSupportModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsSupportModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsSupportModalOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                            >
                                <X size={24} className="text-charcoal" />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                                    <Image
                                        src={FOUNDER_IMG}
                                        alt="Apoyando a Bibliocasita"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                        <div className="text-white">
                                            <h3 className="text-2xl font-bold font-serif mb-2">Juntos Transformamos Vidas</h3>
                                            <p className="text-sm opacity-80">Tu apoyo hace posible que más niños descubran el amor por la lectura.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
                                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">Cómo Apoyar</h2>

                                    <div className="space-y-6 text-gray-600 mb-8">
                                        <p>
                                            Juntos podemos hacer a que este proyecto siga creciendo y puedes hacerlo donando libros que ayuden a despertar el interés por la lectura en los niños, jóvenes y adultos de la comunidad.
                                        </p>
                                        <p>
                                            También puedes hacerlo donando bolsas de estudio los cuales se hacen entrega a los estudiantes que visitan con frecuencia este proyecto.
                                        </p>
                                        <p>
                                            Otra forma de apoyar es donando recursos para la construcción de otra estructura de la Bibliocasita para seguir transformando comunidades donde sus habitantes tengan la accesibilidad a los recursos de forma gratuita y lograr un impacto positivo en la sociedad.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="font-bold text-charcoal uppercase tracking-widest text-sm mb-4">Conoce Más en Video</h3>
                                        <a
                                            href="https://youtu.be/Uq-0QcDIt68?si=8GoQYjwdWvWr68ll"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors group"
                                        >
                                            <Youtube size={24} className="group-hover:scale-110 transition-transform" />
                                            <span className="font-bold">Ver Video de la Iniciativa</span>
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8">
                                        <div>
                                            <h3 className="font-bold text-charcoal uppercase tracking-widest text-xs mb-4 border-b border-gray-100 pb-2">Redes Bibliocasita</h3>
                                            <div className="flex flex-col gap-3">
                                                <a href="https://www.instagram.com/bibliocasitatoto" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                                                    <Instagram size={18} /> @bibliocasitatoto
                                                </a>
                                                <a href="https://www.pinterest.com/bibliocasitatoto/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                                                    <span className="font-bold text-lg">P</span> Pinterest
                                                </a>
                                                <a href="https://www.facebook.com/share/1BvjvEfk2D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                                                    <Facebook size={18} /> Facebook
                                                </a>
                                                <a href="https://www.youtube.com/@BibliocasitaToto" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                                                    <Youtube size={18} /> YouTube
                                                </a>
                                                <a href="mailto:bibliocasitatoto24@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm">
                                                    <Mail size={18} /> bibliocasitatoto24@gmail.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Featured Carousel Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-20">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">Galería</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">Momentos Bibliocasita</h2>
                    </div>
                    <Carousel />
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-charcoal text-cream">
                <div className="max-w-7xl mx-auto px-6 md:px-20">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                        <div className="w-full md:w-1/2">
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">Multimedia</span>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Conoce Nuestra Iniciativa</h2>
                            <p className="text-cream/70 text-lg leading-loose mb-8 font-display">
                                Descubre cómo Bibliocasita está transformando espacios y uniendo comunidades a través de la lectura. Mira nuestro video promocional para ver el impacto real de nuestras actividades.
                            </p>
                            <a href="https://www.youtube.com/watch?v=Uq-0QcDIt68" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-white transition-colors">
                                Ver en YouTube <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/Uq-0QcDIt68?si=PlaceholderVideo"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent News Section */}
            <section className="py-24 px-6 md:px-20 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                        <div>
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">Actualidad</span>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">Últimas Noticias</h2>
                        </div>
                        <Link href="/blog" className="hidden md:flex items-center gap-2 text-charcoal font-bold uppercase tracking-widest text-xs hover:text-primary transition-colors group">
                            Ver todas <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {news.length === 0 ? (
                        <p className="text-gray-500">No hay noticias recientes.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {news.map((item) => (
                                <article key={item.id} className="bg-white group rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                                    <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-charcoal px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                                            {new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="font-serif text-xl font-bold mb-3 text-charcoal group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {item.description}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-gray-50">
                                            <Link href={`/blog/${item.id}`} className="text-primary text-xs font-bold uppercase tracking-widest hover:text-charcoal transition-colors flex items-center gap-2 group/link">
                                                Leer más <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-charcoal font-bold uppercase tracking-widest text-xs hover:text-primary transition-colors">
                            Ver todas <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
