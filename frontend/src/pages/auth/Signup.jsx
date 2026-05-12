import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Command, ArrowRight, User, Mail, Lock, Phone, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../hooks/useAuth';

const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        verifyEmail: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await register(formData);
            if (data.verificationRequired) {
                // Navigate to a verification screen (to be created) or show success
                alert('Account created! Please check your email for the OTP.');
                navigate('/login'); // For now, redirect to login
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fffcf0] dark:bg-[#0c0a09] flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fbbf24 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="w-full max-w-[540px] space-y-4 relative z-10">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-16 h-16 rounded-xl border-2 border-amber-400/50 flex items-center justify-center bg-white/80 dark:bg-zinc-950/40 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]">
                        <img src="/favicon_mbi.png" alt="Mindex Logo" className="w-10 h-10 object-contain" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Mindex Auditor</h1>
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-[#0c0a09]/60 backdrop-blur-md border border-amber-200/50 dark:border-amber-900/30 rounded-2xl p-6 shadow-xl space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] font-black text-rose-600 uppercase tracking-widest text-center shadow-inner">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                <Input
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required
                                    className="h-12 px-5 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                                />
                            </div>
                            <div className="space-y-2.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone (Optional)</label>
                                <Input
                                    placeholder="Enter your phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="h-12 px-5 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                className="h-12 px-5 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                            />
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                                className="h-12 px-5 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                            />
                        </div>

                        {/* Verification Toggle */}
                        <div className="flex items-center justify-between p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-200/30 dark:border-amber-900/20">
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">Email Verification</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Recommended for Security</p>
                            </div>
                            <div 
                                onClick={() => setFormData({...formData, verifyEmail: !formData.verifyEmail})}
                                className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${formData.verifyEmail ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-800'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${formData.verifyEmail ? 'left-6' : 'left-1'}`} />
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
                                    Create Account
                                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            Already have an account? <Link to="/login" className="text-amber-600 hover:text-amber-700 font-black decoration-2 underline-offset-4">Login now</Link>
                        </p>
                    </div>

                </div>

                <div className="flex flex-col items-center space-y-6 opacity-60">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2026 • ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
