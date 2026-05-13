import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Command, ArrowRight, Fingerprint, ShieldCheck, Loader2, Eye, EyeOff, AlertTriangle, X } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await login(email, password);
            const role = data.user.role.toLowerCase();
            
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fffcf0] dark:bg-[#0c0a09] flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fbbf24 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="w-full max-w-[480px] space-y-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 rounded-xl border-2 border-amber-400/50 flex items-center justify-center bg-white/80 dark:bg-zinc-950/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]">
                        <img src="/favicon_mbi.png" alt="Mindex Logo" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Mindex Auditor</h1>
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-[#0c0a09]/60 backdrop-blur-md border border-amber-200/50 dark:border-amber-900/30 rounded-2xl p-8 shadow-xl space-y-5">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] font-black text-rose-600 uppercase tracking-widest text-center shadow-inner">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 px-5 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Password</label>
                                <button 
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                    className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors"
                                >
                                    Forgot Password
                                </button>
                            </div>
                            <div className="relative group">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12 px-5 pr-12 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-12 bg-slate-900 dark:bg-amber-500 dark:text-slate-900 rounded-xl text-[11px] uppercase font-black tracking-[0.2em] mt-4 group shadow-lg shadow-slate-900/10 dark:shadow-amber-500/20"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Login
                                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            New to Mindex? <Link to="/signup" className="text-amber-600 hover:text-amber-700 font-black decoration-2 underline-offset-4">Signup now</Link>
                        </p>
                    </div>

                </div>

                <div className="flex flex-col items-center space-y-6">
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em]">© 2026 • ALL RIGHTS RESERVED</p>
                </div>
            </div>

            {/* Custom SMTP Blocked Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-amber-200/50 dark:border-amber-900/30 p-8 shadow-2xl animate-in zoom-in-95 duration-300 relative">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-900 flex items-center justify-center">
                                <AlertTriangle className="w-10 h-10 text-amber-600 dark:text-amber-500" />
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Password Reset Restricted</h3>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                    password reset system is curently not available due to smtp block.
                                </p>
                            </div>

                            <Button 
                                onClick={() => setShowModal(false)}
                                className="w-full h-12 bg-slate-900 dark:bg-amber-500 dark:text-slate-900 rounded-xl text-[11px] uppercase font-black tracking-[0.2em]"
                            >
                                Got it, thanks
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
