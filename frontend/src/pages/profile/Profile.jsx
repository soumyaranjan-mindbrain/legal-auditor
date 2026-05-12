import React, { useState, useEffect, useContext } from 'react';
import {
    User,
    ShieldCheck,
    Lock,
    Fingerprint,
    Mail,
    AtSign,
    Award,
    Activity,
    CreditCard,
    Loader2,
    CheckCircle2
} from "lucide-react";

import { useHeader } from '../../context/HeaderContext';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import api from '../../lib/api';

const Profile = () => {
    const { user, checkUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const isInitialMount = React.useRef(true);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'client'
            });
        }
    }, [user]);

    const handleUpdate = async (newName) => {
        try {
            setIsUpdating(true);
            await api.put('/auth/profile', { name: newName });
            await checkUser(); // Refresh global user state
            setSuccessMsg('Matrix Auto-Synchronized.');
            setTimeout(() => setSuccessMsg(''), 2000);
        } catch (err) {
            console.error("Auto-sync failed", err);
        } finally {
            setIsUpdating(false);
        }
    };

    // Auto-save logic
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const timer = setTimeout(() => {
            if (formData.name && formData.name !== user?.name) {
                handleUpdate(formData.name);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [formData.name]);

    useHeader('Personnel Profile', null);

    if (!user) return (
        <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
        </div>
    );

    return (
        <div className="animate-in fade-in duration-700 w-full h-full">
            
            {successMsg && (
                <div className="mb-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-lg p-3 flex items-center gap-3 animate-in slide-in-from-top-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{successMsg}</p>
                </div>
            )}

            {/* Identity Matrix */}
            <div className="kpi-card static-card h-full p-12 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group rounded-2xl flex flex-col">
                <div className="absolute top-0 right-0 p-24 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                    <Fingerprint className="w-96 h-96 text-primary" strokeWidth={1} />
                </div>
                
                <div className="flex items-center gap-8 mb-16">
                    <div className="w-24 h-24 rounded-full bg-slate-900 dark:bg-primary flex items-center justify-center text-white dark:text-slate-900 shadow-2xl shadow-primary/30 border-8 border-white dark:border-slate-900">
                        <span className="text-4xl font-black">{formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none mb-3">{formData.name}</h2>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-6xl">
                    <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">Legal Nomenclature</label>
                        <div className="relative group/field">
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="h-14 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold text-base focus:ring-4 focus:ring-primary/10 transition-all text-slate-900 dark:text-slate-100"
                                placeholder="Enter full legal name"
                            />
                            <User className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-700 group-hover/field:text-primary transition-colors" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium ml-1">This name will be used on all generated legal audit reports.</p>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">Personnel Account ID</label>
                        <div className="relative group/field">
                            <Input
                                readOnly
                                value={user._id}
                                className="h-14 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-mono text-xs focus:outline-none cursor-not-allowed text-slate-500"
                            />
                            <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-700" />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium ml-1">Immutable system identifier for your enterprise node.</p>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 ml-1">Secure Communication Channel</label>
                        <div className="relative group/field max-w-xl">
                            <Input
                                readOnly
                                value={formData.email}
                                className="h-14 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl px-6 font-bold text-base focus:outline-none cursor-not-allowed text-slate-500"
                            />
                            <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 dark:text-slate-700" />
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    );
};

export default Profile;
