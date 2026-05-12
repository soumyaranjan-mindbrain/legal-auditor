import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Command, ArrowRight, Mail, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import api from '../../lib/api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/forgot-password', { email });
            setSent(true);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="w-full max-w-[400px] space-y-10 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm">
                        <ShieldCheck className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tighter">Secure Recovery</h1>
                        <p className="text-[13px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">Reset your access credentials</p>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-8 shadow-sm space-y-6">
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-md text-[10px] font-bold text-rose-500 uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Registered Email</label>
                                <div className="relative">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-11 pl-4 pr-10 rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 focus-visible:ring-1 focus-visible:ring-zinc-400"
                                    />
                                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30" />
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
                                        Send Recovery Link
                                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 py-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-sm font-bold uppercase tracking-widest">Link Dispatched</h3>
                                <p className="text-[11px] text-muted-foreground">If an account exists for <b>{email}</b>, a recovery link has been sent. Please check your inbox.</p>
                            </div>
                            <Button onClick={() => setSent(false)} variant="outline" className="w-full h-10 text-[10px] uppercase font-bold tracking-widest">
                                Try Another Email
                            </Button>
                        </div>
                    )}

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-center">
                        <Link to="/login" className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors group">
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Access
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
