'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'bibliocasita23toto') {
            // Set cookie client-side for simplicity in this demo context
            document.cookie = "admin_session=true; path=/; max-age=3600";
            router.push('/admin-secret-login/dashboard');
        } else {
            alert('Contraseña incorrecta');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-xl w-full max-w-sm border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold text-charcoal mb-2">Acceso Restringido</h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Panel de Administración</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-gray-900"
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-charcoal transition-colors">
                        Ingresar
                    </button>
                </div>
            </form>
        </div>
    );
}
