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
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="w-full max-w-[450px] space-y-8 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm">
                        <Command className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tighter">Create Account</h1>
                        <p className="text-[13px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">Join MBI Legal Auditor</p>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-8 shadow-sm space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-md text-[10px] font-bold text-rose-500 uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                        className="h-11 pl-4 rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 focus-visible:ring-1 focus-visible:ring-zinc-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone (Optional)</label>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter your phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="h-11 pl-4 rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 focus-visible:ring-1 focus-visible:ring-zinc-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                className="h-11 px-4 rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 focus-visible:ring-1 focus-visible:ring-zinc-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                required
                                className="h-11 px-4 rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 focus-visible:ring-1 focus-visible:ring-zinc-400"
                            />
                        </div>

                        {/* Verification Toggle */}
                        <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-md border border-zinc-200 dark:border-zinc-800">
                            <div className="space-y-0.5">
                                <p className="text-[11px] font-bold uppercase tracking-widest">Verify Email</p>
                            </div>
                            <div 
                                onClick={() => setFormData({...formData, verifyEmail: !formData.verifyEmail})}
                                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${formData.verifyEmail ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.verifyEmail ? 'left-6' : 'left-1'}`} />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full h-11 rounded-md text-xs uppercase font-bold tracking-widest mt-2 group"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
