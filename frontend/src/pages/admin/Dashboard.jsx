import React, { useState, useEffect } from 'react';
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
    FileSearch,
    Loader2
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useHeader } from '../../context/HeaderContext';
import api from '../../lib/api';

const AdminDashboard = () => {
    const [data, setData] = useState({
        clients: [],
        documents: [],
        audits: [],
        loading: true
    });

    const fetchData = async () => {
        try {
            const [clientsRes, docsRes, auditsRes] = await Promise.all([
                api.get('/settings/clients').catch(() => ({ data: [] })), // Assuming this endpoint exists or will
                api.get('/documents/admin/all').catch(() => api.get('/documents')), // Fallback
                api.get('/audit/reports').catch(() => ({ data: [] }))
            ]);
            setData({
                clients: clientsRes.data,
                documents: docsRes.data,
                audits: auditsRes.data,
                loading: false
            });
        } catch (err) {
            console.error("Admin data fetch failed", err);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const stats = [
        { label: 'Total Clients', value: data.clients.length || '0', delta: '+0 today', icon: Users, bgClass: 'kpi-indigo' },
        { label: 'Total Assets', value: data.documents.length, delta: 'Real-time', icon: FileText, bgClass: 'kpi-rose' },
        { label: 'Audit Velocity', value: 'Nominal', delta: 'Active', icon: Activity, bgClass: 'kpi-amber' },
        { label: 'Total Reports', value: data.audits.length, delta: 'Total generated', icon: FileSearch, bgClass: 'kpi-violet' },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Metric Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={cn("p-6 rounded-[6px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm group", stat.bgClass)}>
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
                {/* Document Ingress */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="border border-slate-200 dark:border-slate-800 rounded-[6px] bg-white dark:bg-slate-900 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/10">
                            <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground/40" /> Recent Document Ingress
                            </h3>
                            <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest h-7 gap-1.5 opacity-60 hover:opacity-100">
                                Global View <ArrowUpRight className="w-3 h-3" />
                            </Button>
                        </div>

                        <div className="divide-y divide-zinc-100 dark:divide-zinc-900 flex-1">
                            {data.loading ? (
                                <div className="flex items-center justify-center h-40">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            ) : data.documents.length === 0 ? (
                                <div className="flex items-center justify-center h-40 opacity-20">
                                    <p className="text-[10px] font-bold uppercase tracking-widest">No documents found</p>
                                </div>
                            ) : (
                                data.documents.slice(0, 10).map((doc, idx) => (
                                    <div key={idx} className="p-4 flex items-center justify-between group cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900 transition-colors px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold tracking-tight">{doc.fileName}</div>
                                                <div className="text-[10px] text-muted-foreground font-medium">Tenant ID: {doc.user}</div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                                            {new Date(doc.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="border border-slate-200 dark:border-slate-800 rounded-[6px] p-8 bg-white dark:bg-slate-900 text-foreground shadow-sm min-h-[400px] flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                            <Activity className="w-40 h-40" />
                        </div>

                        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-10 text-muted-foreground">
                            Operational Commands
                        </h3>

                        <div className="space-y-4 flex-1">
                            <Button className="w-full h-12 justify-start gap-4 text-[11px] font-bold uppercase tracking-widest px-6 shadow-sm rounded-[6px]">
                                <UserPlus className="w-4 h-4" /> Onboard New Tenant
                            </Button>
                            <Button variant="outline" className="w-full h-12 justify-start gap-4 text-[11px] font-bold uppercase tracking-widest px-6 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-[6px]">
                                <FilePlus className="w-4 h-4" /> Trigger Strategic Audit
                            </Button>
                            <Button variant="outline" className="w-full h-12 justify-start gap-4 text-[11px] font-bold uppercase tracking-widest px-6 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-[6px]">
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
