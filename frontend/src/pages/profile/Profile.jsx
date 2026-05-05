import React from 'react';
import {
    User,
    ShieldCheck,
    Lock,
    Fingerprint,
    Mail,
    AtSign,
    Award,
    Activity,
    CreditCard
} from "lucide-react";

import { useHeader } from '../../context/HeaderContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const Profile = () => {
    const headerActions = React.useMemo(() => (
        <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest px-6 rounded-[6px] shadow-sm">
            Save Changes
        </Button>
    ), []);

    useHeader('Professional Profile', headerActions);

    return (
        <div className="animate-in fade-in duration-700 w-full space-y-12">

            <div className="space-y-8">
                {/* Identity Matrix */}
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-10 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                        <User className="w-48 h-48" strokeWidth={1} />
                    </div>
                    
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm">
                            <span className="text-lg font-medium">SR</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium tracking-tight">Soumyaranjan R.</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Legal Nomenclature</label>
                            <div className="relative group/field">
                                <Input
                                    readOnly
                                    value="Soumyaranjan R."
                                    className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-[6px] px-4 font-medium text-sm focus:outline-none cursor-default"
                                />
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/20" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Personnel Identifier</label>
                            <Input
                                value="Senior_Auditor_NX"
                                className="h-12 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-[6px] px-4 font-medium text-sm transition-all shadow-sm"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Email Address</label>
                            <div className="relative group/field">
                                <Input
                                    readOnly
                                    value="soumya@mindbrain.ai"
                                    className="h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-[6px] px-4 font-medium text-sm focus:outline-none cursor-default"
                                />
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/20" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-6 shadow-sm space-y-4 kpi-violet">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-[4px] bg-white/50 flex items-center justify-center text-violet-600 shadow-sm">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600/60">2FA Status</span>
                        </div>
                        <p className="text-xs font-medium text-violet-700">Enabled & Encrypted</p>
                    </div>

                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-6 shadow-sm space-y-4 kpi-amber">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-[4px] bg-white/50 flex items-center justify-center text-amber-600 shadow-sm">
                                <Activity className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600/60">Last Audit Activity</span>
                        </div>
                        <p className="text-xs font-medium text-amber-700">Today, 09:12 AM</p>
                    </div>

                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-6 shadow-sm space-y-4 kpi-indigo">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-[4px] bg-white/50 flex items-center justify-center text-indigo-600 shadow-sm">
                                <CreditCard className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600/60">Plan Tier</span>
                        </div>
                        <p className="text-xs font-medium text-indigo-700">Enterprise Pro</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
