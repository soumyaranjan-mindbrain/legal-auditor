import React from 'react';
import {
    Activity,
    BarChart3,
    Database,
    Globe,
    Zap,
    Cpu,
    ArrowUpRight,
    Search,
    Shield,
    Server,
    Layers,
    Monitor
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../lib/utils';

const SystemAnalytics = () => {
    const nodes = [
        { id: 'US-EAST-1', status: 'Optimal', load: 12, throughput: '1.2 GB/s', uptime: '99.99%', color: 'text-emerald-500' },
        { id: 'EU-WEST-2', status: 'Optimal', load: 45, throughput: '2.4 GB/s', uptime: '99.98%', color: 'text-emerald-500' },
        { id: 'AP-SOUTH-1', status: 'Sync', load: 8, throughput: '0.4 GB/s', uptime: '99.95%', color: 'text-amber-500' },
        { id: 'SA-EAST-1', status: 'Optimal', load: 19, throughput: '0.8 GB/s', uptime: '99.99%', color: 'text-emerald-500' },
    ];

    const logs = [
        { time: '14:22:01', system: 'AUDIT_ENGINE', event: 'PARALLEL_SCAN_INIT', status: 'SUCCESS' },
        { time: '14:21:45', system: 'INGEST_V5', event: 'OCR_PRECISION_NORM', status: 'SUCCESS' },
        { time: '14:20:12', system: 'SECURITY_NX', event: 'JWT_ROTATION_INST', status: 'DEBUG' },
        { time: '14:18:55', system: 'CORE_DB', event: 'VACUUM_ANALYSIS_FIN', status: 'INFO' },
        { time: '14:15:30', system: 'NETWORK', event: 'GLOBAL_SYNC_LATENCY', status: 'OPTIMAL' },
    ];
    const headerActions = React.useMemo(() => (
        <Button variant="outline" className="h-9 px-4 rounded-md gap-2 text-[10px] font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800 bg-transparent">
            <Shield className="w-3.5 h-3.5" />
            Policy Propagation
        </Button>
    ), []);

    useHeader('System Analytics', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Performance Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Node Health Grid */}
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-8 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                        <Globe className="w-40 h-40" />
                    </div>
                    <h3 className="text-sm font-bold tracking-tight mb-8 flex items-center gap-2">
                        <Server className="w-4 h-4 text-muted-foreground/40" /> Global Node Performance
                    </h3>

                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {nodes.map((node) => (
                            <div key={node.id} className="p-5 rounded-[6px] border border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 hover:shadow-sm transition-all group/node">
                                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-3 opacity-60">{node.id}</div>
                                <div className="flex justify-between items-end mb-3">
                                    <div className={cn("text-xs font-bold tracking-tight", node.color)}>{node.status}</div>
                                    <div className="text-[10px] font-bold tracking-tighter">{node.throughput}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary/20 transition-all duration-1000" style={{ width: `${node.load}%` }} />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                                        <span>Load: {node.load}%</span>
                                        <span>UP: {node.uptime}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-time Telemetry (Logs) */}
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-8 bg-zinc-950/40 backdrop-blur-sm text-foreground shadow-sm overflow-hidden flex flex-col relative">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                        <Monitor className="w-40 h-40" />
                    </div>
                    <h3 className="text-xs font-bold tracking-wider flex items-center gap-2 mb-8 text-zinc-400">
                        <Layers className="w-3.5 h-3.5" /> High-Density Log Feed
                    </h3>

                    <div className="space-y-4 font-mono text-[10px] flex-1">
                        {logs.map((log, idx) => (
                            <div key={idx} className="flex gap-4 border-b border-zinc-900 pb-3 last:border-0 opacity-80 hover:opacity-100 transition-opacity">
                                <span className="text-zinc-600 shrink-0">{log.time}</span>
                                <span className="text-primary/70 shrink-0">[{log.system}]</span>
                                <span className="text-zinc-300 truncate">{log.event}</span>
                                <span className={cn(
                                    "ml-auto font-bold px-1.5 py-0.5 rounded-sm border",
                                    log.status === 'SUCCESS' ? 'border-emerald-500/20 text-emerald-500' : 'border-zinc-800 text-zinc-500'
                                )}>
                                    {log.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center text-[9px] font-bold tracking-widest text-zinc-500">
                        <span className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-emerald-500" /> Receiving Data
                        </span>
                        <span>0.42ms Latency</span>
                    </div>
                </div>
            </div>

            {/* Platform Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'CPU Utilization', value: '12.4%', icon: Cpu },
                    { label: 'Storage Cluster', value: '64.2TB', icon: Database },
                    { label: 'Ingress Volume', value: '42.1k/hr', icon: Zap },
                    { label: 'Encryption Ops', value: '850M+', icon: Shield },
                ].map((item, idx) => (
                    <div key={idx} className="p-6 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm flex justify-between items-center group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-all cursor-pointer">
                        <div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 opacity-60">{item.label}</div>
                            <div className="text-lg font-bold tracking-tighter">{item.value}</div>
                        </div>
                        <item.icon className="w-5 h-5 text-muted-foreground/20 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemAnalytics;
