import React from 'react';
import {
    Users,
    Activity,
    Shield,
    TrendingUp,
    ArrowUpRight,
    Terminal,
    Settings,
    MoreHorizontal,
    Search,
    FileText,
    Clock,
    UserPlus,
    FilePlus,
    FileSearch
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useHeader } from '../../context/HeaderContext';

const AdminDashboard = () => {
    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800 bg-transparent">
                <FilePlus className="w-3.5 h-3.5 mr-2" />
                Trigger Audit
            </Button>
            <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest px-4">
                <UserPlus className="w-3.5 h-3.5 mr-2" />
                Onboard Tenant
            </Button>
        </div>
    ), []);

    useHeader('Admin Dashboard', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Metric Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Clients', value: '1,240', trend: '+12 New', icon: Users },
                    { label: 'Active Clients', value: '1,240', delta: '+12 today', icon: Users },
                    { label: 'Audit Velocity', value: '42.4 GB/s', delta: 'Nominal', icon: Activity },
                    { label: 'Total Audits', value: '85.4M', delta: '+1.2M last 24h', icon: FileSearch },
                ].map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                                <stat.icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">{stat.delta}</span>
                        </div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold tracking-tighter">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Client Overview & Document Ingress (Section III.1.2, III.1.3) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/10">
                            <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground/40" /> Recent Document Ingress
                            </h3>
                            <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest h-7 gap-1.5 opacity-60 hover:opacity-100">
                                Global Ingress View <ArrowUpRight className="w-3 h-3" />
                            </Button>
                        </div>

                        <div className="divide-y divide-zinc-100 dark:divide-zinc-900 flex-1">
                            {[
                                { id: 'TX-4412', name: 'Institutional_Asset_Registry.pdf', client: 'MindBrain Intelligence', time: '2m ago' },
                                { id: 'TX-4411', name: 'Legal_Flow_Optimization.docx', client: 'Nexus Legal Group', time: '14m ago' },
                                { id: 'TX-4410', name: 'Compliance_Manifesto_V5.pdf', client: 'Quantico Systems', time: '1h ago' },
                                { id: 'TX-4409', name: 'Regional_Policy_Manual.pdf', client: 'Zodiac Ventures', time: '3h ago' },
                                { id: 'TX-4408', name: 'Asset_Liquidity_SOP.docx', client: 'MindBrain Intelligence', time: '5h ago' },
                            ].map((doc, idx) => (
                                <div key={idx} className="p-4 flex items-center justify-between group cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900 transition-colors px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold tracking-tight">{doc.name}</div>
                                            <div className="text-[10px] text-muted-foreground font-medium">{doc.client} • ID: {doc.id}</div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{doc.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Report Metrics (Section III.1.4, III.1.5) */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 bg-zinc-950 text-zinc-100 shadow-xl min-h-[400px] flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                            <Activity className="w-40 h-40" />
                        </div>

                        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-10 text-zinc-400">
                            Operational Commands
                        </h3>

                        <div className="space-y-4 flex-1">
                            <Button className="w-full h-12 justify-start gap-4 text-[11px] font-bold uppercase tracking-widest px-6 shadow-sm">
                                <UserPlus className="w-4 h-4" /> Onboard New Tenant
                            </Button>
                            <Button variant="outline" className="w-full h-12 justify-start gap-4 text-[11px] font-bold uppercase tracking-widest px-6 border-zinc-800 hover:bg-zinc-900">
                                <FilePlus className="w-4 h-4" /> Trigger Strategic Audit
                            </Button>
                            <Button variant="outline" className="w-full h-12 justify-start gap-4 text-[11px] font-bold uppercase tracking-widest px-6 border-zinc-800 hover:bg-zinc-900">
                                <FileSearch className="w-4 h-4" /> Batch Report Extract
                            </Button>
                        </div>

                        <div className="mt-auto pt-8 border-t border-zinc-900">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-4">Ingress Pulse</h4>
                            <div className="flex gap-1 h-8 items-end">
                                {[30, 45, 25, 60, 40, 80, 50, 70, 45, 90, 30, 50].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
