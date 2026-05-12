import React from 'react';
import {
    Cpu,
    ShieldAlert,
    Globe,
    Database,
    Zap,
    Lock,
    Activity,
    Layers,
    Server,
    ArrowUpRight,
    Users,
    Search,
    Shield,
    Clock,
    UserPlus,
    Building2,
    FileText
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../lib/utils';

const SuperAdminDashboard = () => {
    const headerActions = React.useMemo(() => (
        <Button variant="outline" className="text-[10px] font-bold uppercase tracking-widest h-9 px-4 gap-2 border-zinc-200 dark:border-zinc-800">
            Export Log <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
    ), []);

    useHeader('Super Admin Dashboard', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* System Overview High-Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Active Personnel', value: '42', delta: 'System-wide', icon: Users, bgClass: 'kpi-indigo' },
                    { label: 'Platform Tenants', value: '128', delta: '+4 Internal', icon: Building2, bgClass: 'kpi-amber' },
                    { label: 'Ingress Volume', value: '2.4 TB', delta: 'Last 24h', icon: Zap, bgClass: 'kpi-violet' },
                    { label: 'Sentinel Status', value: 'Nominal', delta: 'Active Node: US-E1', icon: Shield, bgClass: 'kpi-rose' },
                ].map((stat, idx) => (
                    <div key={idx} className={cn("p-6 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm group", stat.bgClass)}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                                <stat.icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <span className="text-[8px] font-bold text-muted-foreground opacity-40 uppercase tracking-widest">{stat.delta}</span>
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold tracking-tighter">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Recent User Activity (Section III.1.3) */}
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-8 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 italic">
                            <Clock className="w-4 h-4 text-muted-foreground/40" /> Strategic Activity Ledger
                        </h3>
                        <Button variant="outline" className="text-[10px] font-bold uppercase tracking-widest h-9 px-4 gap-2 border-zinc-200 dark:border-zinc-800">
                            Export Log <ArrowUpRight className="w-3.5 h-3.5" />
                        </Button>
                    </div>

                    <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                        {[
                            { user: 'Admin_SR', role: 'Super Admin', action: 'Infrastructure Sync', time: '2m ago', color: 'bg-primary', detail: 'Authorized synchronization across all regional node clusters (US-E1, EU-W2).' },
                            { user: 'Client_MindBrain', role: 'Tenant', action: 'Document Extraction', time: '14m ago', color: 'bg-zinc-500', detail: 'Parallel clause extraction initiated on Institutional_Asset_Registry.pdf.' },
                            { user: 'Admin_Legal', role: 'Compliance', action: 'Policy Override', time: '1h ago', color: 'bg-amber-500', detail: 'Manual override of regional GDPR mandate for specific tenant request.' },
                            { user: 'System_Sentinel', role: 'Automated', action: 'Backup Propagation', time: '3h ago', color: 'bg-emerald-500', detail: 'Platform-wide encrypted backup routine completed successfully.' },
                            { user: 'Admin_Audit', role: 'Super Admin', action: 'User Provisioning', time: '5h ago', color: 'bg-primary', detail: 'Secondary administrator role assigned to personnel ADM-4412.' },
                        ].map((log, idx) => (
                            <div key={idx} className="flex items-start justify-between py-6 group/row first:pt-0 last:pb-0">
                                <div className="flex gap-6">
                                    <div className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", log.color)} />
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-bold tracking-tight">{log.user}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{log.role}</span>
                                        </div>
                                        <div className="text-[11px] text-muted-foreground font-medium flex items-center gap-2">
                                            <span className="text-foreground">{log.action}:</span> {log.detail}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest shrink-0">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
