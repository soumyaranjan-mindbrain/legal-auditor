import React from 'react';
import {
    Users,
    Search,
    Filter,
    FileText,
    UploadCloud,
    Activity,
    MoreHorizontal,
    ArrowUpRight,
    Globe,
    Building2,
    CheckCircle2,
    Calendar
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../lib/utils';

const GlobalClientManagement = () => {
    const clients = [
        { id: 'CLI-902', name: 'MindBrain Intelligence', domain: 'mindbrain.ai', docs: 124, status: 'Active', growth: '+12%', lastActivity: '4m ago' },
        { id: 'CLI-441', name: 'Nexus Legal Group', domain: 'nexus-legal.com', docs: 850, status: 'Active', growth: '+5%', lastActivity: '1h ago' },
        { id: 'CLI-128', name: 'Quantico Systems', domain: 'quantico.io', docs: 45, status: 'Warning', growth: '-2%', lastActivity: '14h ago' },
        { id: 'CLI-673', name: 'Zodiac Ventures', domain: 'zodiac.v', docs: 219, status: 'Active', growth: '+24%', lastActivity: '2d ago' },
    ];

    const headerActions = React.useMemo(() => (
        <div className="flex gap-3">
            <Button variant="outline" className="h-9 px-4 rounded-md text-[10px] font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800 bg-transparent">
                Export Registry
            </Button>
            <Button className="h-9 px-4 rounded-md gap-2 text-[10px] font-bold uppercase tracking-widest shadow-ambient-xl">
                <Building2 className="w-3.5 h-3.5" />
                Register Entity
            </Button>
        </div>
    ), []);

    useHeader('Global Client Oversight', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Tenants', value: '42', delta: '+4 this month', icon: Building2 },
                    { label: 'Total Documents', value: '12.4k', delta: '+1.2k today', icon: FileText },
                    { label: 'System Load', value: '24%', delta: 'Optimal', icon: Activity },
                    { label: 'Avg Health', value: '98.2%', delta: 'Sentinel Verified', icon: CheckCircle2 },
                ].map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                                <stat.icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">{stat.delta}</span>
                        </div>
                        <div className="text-md font-bold tracking-tight text-muted-foreground mb-1 uppercase text-[10px] tracking-widest">{stat.label}</div>
                        <div className="text-2xl font-bold tracking-tighter">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Client Registry */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20">
                    <div className="flex items-center gap-4 flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                            <input
                                placeholder="Search international tenants..."
                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-900">
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Institution</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Document Ingress</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Growth</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Last Auth</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                            {clients.map((client) => (
                                <tr key={client.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div>
                                            <div className="text-sm font-bold tracking-tight">{client.name}</div>
                                            <div className="text-[10px] text-muted-foreground font-medium mt-0.5">{client.domain}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="text-[11px] font-bold tracking-tighter">{client.docs} units</div>
                                            <div className="w-12 h-1 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary/20 transition-all duration-1000" style={{ width: `${Math.min(100, (client.docs / 1000) * 100)}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest",
                                            client.status === 'Active' ? "text-emerald-500" : "text-amber-500"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full", client.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
                                            {client.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "text-[10px] font-bold tracking-widest",
                                            client.growth.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                                        )}>
                                            {client.growth}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[11px] font-medium text-muted-foreground flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3 opacity-30" />
                                        {client.lastActivity}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2 px-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GlobalClientManagement;
