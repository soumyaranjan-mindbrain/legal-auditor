import React from 'react';
import {
    Lock,
    ShieldAlert,
    Activity,
    Terminal,
    Eye,
    MoreHorizontal,
    Search,
    ShieldCheck,
    Fingerprint,
    Zap
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const Security = () => {
    const logs = [
        { id: 'SEC-LOG-4822', user: 'Admin_SR', event: 'DB_LINK_RESET', time: '2m', severity: 'HIGH', origin: '192.168.1.104' },
        { id: 'SEC-LOG-4821', user: 'Client_NX', event: 'SESS_AUTH_TOKEN', time: '14m', severity: 'MED', origin: '82.14.99.12' },
        { id: 'SEC-LOG-4820', user: 'Root', event: 'CORE_SYNC_START', time: '1h', severity: 'LOW', origin: 'INTERNAL' },
        { id: 'SEC-LOG-4819', user: 'System', event: 'DATA_ENCR_GEN', time: '3h', severity: 'LOW', origin: 'VIRTUAL' },
        { id: 'SEC-LOG-4818', user: 'Admin_NX', event: 'ACL_POLICY_MOD', time: '5h', severity: 'HIGH', origin: '10.0.0.45' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" strokeWidth={2.5} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Sentinel Security Logic</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter">Active Oversight</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 items-center gap-2 border-zinc-200 dark:border-zinc-800">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#10B981]">Verified System</span>
                    </Button>
                    <Button size="sm" className="h-9 px-4 text-[10px] font-bold uppercase tracking-widest bg-destructive hover:bg-destructive/90 text-white border-0">Force Lockout</Button>
                </div>
            </div>

            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Threat Mitigation', value: 'Zero detected', status: 'Optimal', icon: ShieldAlert, color: 'text-emerald-500' },
                    { label: 'Biometric Drift', value: 'Nominal (0.02%)', status: 'Stable', icon: Fingerprint, color: 'text-emerald-500' },
                    { label: 'Access Requests', value: '1,424/hr', status: 'Monitored', icon: Activity, color: 'text-primary' },
                ].map((stat, idx) => (
                    <div key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 bg-white dark:bg-zinc-950 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.02] scale-150 pointer-events-none group-hover:scale-[1.7] transition-transform duration-500">
                            <stat.icon className="w-16 h-16" />
                        </div>
                        <div className="space-y-1 relative z-10">
                            <h3 className="text-2xl font-bold tracking-tighter">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        </div>
                        <div className="flex items-center gap-1.5 mt-4 relative z-10">
                            <div className={cn("w-1.5 h-1.5 rounded-full", stat.color.replace('text-', 'bg-'))} />
                            <span className={cn("text-[9px] font-bold uppercase tracking-widest opacity-80", stat.color)}>{stat.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sentinel Terminal (Log Grid) */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest">Protocol Ledger</h3>
                        <div className="h-4 w-px bg-border" />
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Encrypted Streams Active</span>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30" />
                        <input
                            className="h-8 w-48 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent pl-8 text-[11px] outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                            placeholder="Locate event trace..."
                        />
                    </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-900 bg-zinc-900/30">
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Identification</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Entity</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Event Protocol</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Origin Trace</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Severity</th>
                                    <th className="px-6 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/50">
                                {logs.map((log) => (
                                    <tr key={log.id} className="group hover:bg-white/[0.02] transition-colors cursor-crosshair">
                                        <td className="px-6 py-4 text-[10px] font-mono text-zinc-600">{log.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                                <span className="text-xs font-bold text-zinc-200">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-mono text-primary/70 font-bold uppercase tracking-widest">{log.event}</span>
                                        </td>
                                        <td className="px-6 py-4 text-[10px] font-mono text-zinc-500">{log.origin}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-widest",
                                                log.severity === 'HIGH' ? "border-destructive/30 text-destructive bg-destructive/5" : "border-zinc-800 text-zinc-600"
                                            )}>
                                                {log.severity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-700 hover:text-zinc-400">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Global Sentinel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Encryption Matrix</span>
                    </div>
                    <div className="space-y-4">
                        <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-primary/40 w-full animate-[shimmer_2s_infinite]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Key Integrity</p>
                                <p className="text-sm font-bold tracking-tighter">99.999% Verified</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Entropy Level</p>
                                <p className="text-sm font-bold tracking-tighter">Critical Mass</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                        <Zap className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#EAB308]">Urgent Protocols</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 italic relative z-10 leading-relaxed">
                        "System detects abnormal session drift from <span className="text-white font-bold">AP-NORTH-2</span> cluster. Automated Sentinel reset recommended."
                    </p>
                    <div className="flex gap-2 mt-6 relative z-10">
                        <Button size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-black border-0">Acknowledge</Button>
                        <Button size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 text-white border-0">Dismiss</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;
