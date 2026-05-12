import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Command, ArrowRight, Fingerprint, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <div className="w-full max-w-[400px] space-y-10 relative z-10">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm">
                        <Command className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tighter">LexAuditor Access</h1>
                        <p className="text-[13px] text-muted-foreground uppercase font-bold tracking-widest opacity-60">Secure Document Analysis</p>
                    </div>
                </div>

                <div className="bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-8 shadow-sm space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-md text-[10px] font-bold text-rose-500 uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 pl-4 pr-10 rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 focus-visible:ring-1 focus-visible:ring-zinc-400"
                                />
                                <Fingerprint className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Account Password</label>
                                <Link to="/forgot-password" size="sm" className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors">Recover</Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11 px-4 rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 focus-visible:ring-1 focus-visible:ring-zinc-400"
                            />
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
                                    Sign In
                                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            New to LexAuditor? <Link to="/signup" className="text-primary hover:underline">Create Account</Link>
                        </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60" strokeWidth={1.5} />
                        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">End-to-End Security Encryption</span>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-6 opacity-40 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">© 2026 MBI INSTITUTIONAL • SYSTEM V10.0</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
