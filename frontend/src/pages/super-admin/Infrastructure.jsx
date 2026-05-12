import React from 'react';
import {
    Server,
    Activity,
    Database,
    Globe,
    Zap,
    Cpu,
    ArrowUpRight,
    Search,
    Shield
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const Infrastructure = () => {
    const nodes = [
        { id: 'LEX-USA-01', location: 'VA, USA', status: 'Optimal', load: '14.2%', latency: '8ms', temp: '42°C', uptime: '99.99%', connections: '4.8k' },
        { id: 'LEX-EU-02', location: 'Frankfurt, DE', status: 'Optimal', load: '32.1%', latency: '12ms', temp: '38°C', uptime: '99.98%', connections: '12.1k' },
        { id: 'LEX-ASIA-03', location: 'Mumbai, IN', status: 'Syncing', load: '64.8%', latency: '24ms', temp: '45°C', uptime: '99.95%', connections: '28.4k' },
        { id: 'LEX-BRZ-04', location: 'Sao Paulo, BR', status: 'Optimal', load: '18.4%', latency: '28ms', temp: '40°C', uptime: '99.99%', connections: '2.1k' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-primary" strokeWidth={2.5} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Distributed Infrastructure</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter">Node Clusters</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 items-center gap-2 border-zinc-200 dark:border-zinc-800">
                        <Globe className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Global Status</span>
                    </Button>
                    <Button size="sm" className="h-9 px-4 text-[10px] font-bold uppercase tracking-widest font-bold">Initiate Protocol</Button>
                </div>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Compute Power', value: '4.2 PH/s', detail: 'Consolidated', icon: Cpu },
                    { label: 'Total Index', value: '1.8 PT', detail: 'Distributed', icon: Database },
                    { label: 'Global Latency', value: '14ms', detail: 'Median Target', icon: Activity },
                    { label: 'Energy Factor', value: '0.82', detail: 'Efficiency', icon: Zap },
                ].map((stat, idx) => (
                    <div key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-5 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                        <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-muted-foreground/40 group-hover:text-primary transition-colors mb-4">
                            <stat.icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-0.5">
                            <h3 className="text-2xl font-bold tracking-tighter">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        </div>
                        <p className="text-[8px] font-bold text-primary/40 uppercase tracking-[0.2em] mt-3">{stat.detail}</p>
                    </div>
                ))}
            </div>

            {/* Node Management Grid */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest">Active Infrastructure Ledger</h3>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30" />
                        <input
                            className="h-8 w-48 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent pl-8 text-[11px] outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                            placeholder="Locate node..."
                        />
                    </div>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] overflow-hidden bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30">
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Node ID</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Region</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Load Factor</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Latency</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Availability</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                            {nodes.map((node) => (
                                <tr key={node.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                                    <td className="px-6 py-4 text-[11px] font-mono font-bold tracking-tight">{node.id}</td>
                                    <td className="px-6 py-4 text-xs font-medium">{node.location}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 w-24">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[9px] font-mono text-muted-foreground">{node.load}</span>
                                            </div>
                                            <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full transition-all", parseInt(node.load) > 50 ? "bg-amber-500" : "bg-primary")}
                                                    style={{ width: node.load }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] font-mono font-bold">{node.latency}</td>
                                    <td className="px-6 py-4 text-[10px] font-bold text-muted-foreground">{node.uptime}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={cn(
                                            "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest",
                                            node.status === 'Optimal' ? "text-emerald-500 bg-emerald-500/5 border-emerald-500/20" : "text-amber-500 bg-amber-500/5 border-amber-500/20"
                                        )}>
                                            {node.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Storage Distribution */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-8 bg-zinc-950/40 backdrop-blur-sm text-foreground shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <Shield className="w-40 h-40" />
                </div>
                <div className="flex items-center gap-2 mb-6 relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Sentinel Grid Active</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {[
                        { label: 'Data Encryption', value: 'AES-4096-ECC', color: 'text-zinc-100' },
                        { label: 'Sharding Integrity', value: '99.999%', color: 'text-zinc-100' },
                        { label: 'Recovery Strategy', value: 'T-Minus Offset', color: 'text-zinc-100' },
                        { label: 'Access Policy', value: 'Zero-Trust ZK', color: 'text-zinc-100' },
                    ].map((config, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{config.label}</p>
                            <p className={cn("text-xs font-bold tracking-tight", config.color)}>{config.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Infrastructure;
