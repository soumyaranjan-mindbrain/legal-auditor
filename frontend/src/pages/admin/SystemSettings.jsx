import React from 'react';
import {
    Settings,
    Lock,
    Shield,
    Activity,
    Zap,
    Clock,
    Key,
    Save,
    Bell,
    Fingerprint,
    Database,
    Cpu,
    Users,
    TrendingUp,
    ArrowUpRight,
    Terminal,
    MoreHorizontal,
    Search,
    FileText,
    UserPlus,
    FilePlus,
    FileSearch
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

import { useHeader } from '../../context/HeaderContext';

const SystemSettings = () => {
    const headerActions = React.useMemo(() => (
        <Button className="h-9 px-4 rounded-md gap-2 text-[10px] font-bold uppercase tracking-widest shadow-sm">
            <Save className="w-3.5 h-3.5" />
            Commit Operations
        </Button>
    ), []);

    useHeader('System Settings', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Security Config */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="card-premium">
                        <h3 className="text-sm font-bold tracking-tight mb-8 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                            <Lock className="w-4 h-4 text-primary" strokeWidth={2} /> Password Requirements
                        </h3>

                        <div className="space-y-8">
                            {[
                                { label: 'Minimum Character Count', value: '12', desc: 'Higher length ensures brute-force resilience.' },
                                { label: 'Complexity Index', value: 'Level 4 (Alphanumeric + Symbolic)', desc: 'Forced variance in credential structure.' },
                                { label: 'Rotation Policy', value: '90 Day Interval', desc: 'Mandatory epoch-based updates.' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 rounded-[6px] border border-zinc-100 dark:border-zinc-900">
                                    <div>
                                        <div className="text-sm font-bold tracking-tight mb-1">{item.label}</div>
                                        <p className="text-[10px] text-muted-foreground font-medium opacity-60 leading-relaxed max-w-sm">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-xs font-bold">{item.value}</div>
                                        <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest h-8 px-3">Adjust</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-premium">
                        <h3 className="text-sm font-bold tracking-tight mb-8 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                            <Zap className="w-4 h-4 text-muted-foreground/40" /> Performance & Encryption
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-[6px] border border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10">
                                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Encryption Type</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-primary/5 border border-primary/20 flex items-center justify-center text-primary">
                                        <Key className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold tracking-tight">AES-256-GCM</div>
                                        <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Verified</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-[6px] border border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10">
                                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Session Control</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-primary/5 border border-primary/20 flex items-center justify-center text-primary">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold tracking-tight">4 Hour Timeout</div>
                                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Institutional</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Alerts */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="card-premium !bg-zinc-950 !text-zinc-100 border-none shadow-sm p-8">
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8 flex items-center gap-2 italic">
                            <Shield className="w-3 h-3 text-primary" /> Sentinel Guard
                        </h4>

                        <div className="space-y-6">
                            {[
                                { node: 'Global Firewall', status: 'Enforced', icon: Database },
                                { node: 'Intrusion Detection', status: 'Optimal', icon: Activity },
                                { node: 'Zero-Trust Protocol', status: 'Active', icon: Fingerprint },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between group/row cursor-default">
                                    <div className="flex items-center gap-3">
                                        <s.icon className="w-4 h-4 text-zinc-700 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                                        <span className="text-xs font-bold tracking-tight opacity-70 group-hover:opacity-100">{s.node}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-500">{s.status}</span>
                                </div>
                            ))}
                        </div>

                        <div className="w-full h-px bg-zinc-900 my-8" />

                        <div className="p-4 rounded bg-white/5 border border-white/5 text-[9px] leading-relaxed italic opacity-40">
                            Last system audit performed by SuperAdmin at 14:22:15 GMT. No deviations recorded.
                        </div>
                    </div>

                    <div className="p-8 rounded-[6px] border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-all">
                        <div className="w-12 h-12 rounded-[6px] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                            <Bell className="w-5 h-5" />
                        </div>
                        <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 italic">Notifications</h4>
                        <p className="text-[9px] text-muted-foreground opacity-60 leading-relaxed max-w-[200px]">Configure platform-wide alerts and strategic reporting intervals.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
