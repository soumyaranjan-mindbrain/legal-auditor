import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Command, ArrowRight, User, Mail, Lock, ShieldCheck, Loader2, Eye, EyeOff, Check, Circle } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';

const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        verifyEmail: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        // Name validation: must have at least first and last name (two words)
        const nameParts = formData.name.trim().split(/\s+/);
        if (nameParts.length < 2) {
            setError("Please enter your full name.");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        // Password validation: min 8 chars, one upper, one lower, no spaces, no special chars, only letters/numbers
        const password = formData.password;
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            setError("Password must contain both uppercase and lowercase letters.");
            return false;
        }
        if (/\s/.test(password)) {
            setError("Password cannot contain spaces.");
            return false;
        }
        if (!/^[a-zA-Z0-9]+$/.test(password)) {
            setError("Password can only contain letters and numbers. No special characters allowed.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);
        try {
            const data = await register(formData);
            if (data.verificationRequired) {
                alert('Account created! Please check your email for the OTP.');
                navigate('/login');
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

                <div className="bg-white/80 dark:bg-[#0c0a09]/60 backdrop-blur-md border border-amber-200/50 dark:border-amber-900/30 rounded-2xl p-5 shadow-xl space-y-3">
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        {error && (
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] font-black text-rose-600 uppercase tracking-widest text-center shadow-inner">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                            <Input
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                                className="h-10 px-4 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                className="h-10 px-4 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <div className="relative group">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                    className="h-10 px-4 pr-11 rounded-xl border-amber-200/50 dark:border-amber-900/30 bg-white dark:bg-zinc-900/30 focus-visible:ring-2 focus-visible:ring-amber-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            
                            {/* Password Rules */}
                            <div className="grid grid-cols-1 gap-1.5 px-1 mt-3">
                                {(() => {
                                    const p = formData.password;
                                    const rules = [
                                        { label: "Minimum 8 characters", met: p.length >= 8 },
                                        { label: "Uppercase & Lowercase", met: /[a-z]/.test(p) && /[A-Z]/.test(p) },
                                        { label: "Only letters & numbers", met: p.length > 0 && /^[a-zA-Z0-9]+$/.test(p) },
                                        { label: "No spaces or special characters", met: p.length > 0 && !/[^a-zA-Z0-9]/.test(p) }
                                    ];
                                    
                                    return rules.map((rule, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            {rule.met ? (
                                                <Check className="w-2.5 h-2.5 text-emerald-500" strokeWidth={3} />
                                            ) : (
                                                <div className="w-1 h-1 rounded-full bg-rose-500 ml-[3px] mr-[3px]" />
                                            )}
                                            <p className={cn(
                                                "text-[9px] font-black uppercase tracking-widest transition-colors duration-300",
                                                rule.met ? "text-emerald-500" : "text-rose-500"
                                            )}>
                                                {rule.label}
                                            </p>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* Verification Toggle */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 opacity-60">
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300">Email Verification</p>
                                <p className="text-[9px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-tighter">Not available due to SMTP block</p>
                            </div>
                            <div 
                                className="w-11 h-6 rounded-full relative cursor-not-allowed bg-slate-300 dark:bg-slate-800 transition-all duration-300"
                            >
                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-10 bg-slate-900 dark:bg-amber-500 dark:text-slate-900 rounded-xl text-[11px] uppercase font-black tracking-[0.2em] mt-2 group shadow-lg shadow-slate-900/10 dark:shadow-amber-500/20"
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

                    <div className="pt-2 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            Already have an account? <Link to="/login" className="text-amber-600 hover:text-amber-700 font-black decoration-2 underline-offset-4">Login now</Link>
                        </p>
                    </div>

                </div>

                <div className="flex flex-col items-center space-y-4">
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em]">© 2026 • ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
