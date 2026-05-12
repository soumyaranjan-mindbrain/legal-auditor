import React from 'react';
import {
    FileSearch,
    ArrowUpRight,
    Filter,
    Calendar,
    FileText,
    PieChart,
    BarChart3,
    Activity
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

import { useHeader } from '../../context/HeaderContext';

const Reports = () => {
    const reportHistory = [
        { id: 'REP-4921', name: 'Quarterly Risk Assessment', client: 'Global Finance Corp', date: '2026-04-12', type: 'Audit' },
        { id: 'REP-4922', name: 'Annual Compliance Matrix', client: 'Nexus Legal Ltd', date: '2026-04-10', type: 'Legal' },
        { id: 'REP-4923', name: 'Resource Allocation Log', client: 'Internal Ops', date: '2026-04-08', type: 'Infrastructure' },
        { id: 'REP-4924', name: 'Security Protocol Audit', client: 'Meridian Capital', date: '2026-04-05', type: 'Security' },
    ];

    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 items-center gap-2 border-zinc-200 dark:border-zinc-800 bg-transparent">
                <Calendar className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Timeframe</span>
            </Button>
            <Button size="sm" className="h-8 px-3 text-[9px] font-bold uppercase tracking-widest">Generate Analysis</Button>
        </div>
    ), []);

    useHeader('Reports', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Quick Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Reports Generated', value: '482', icon: FileText, detail: 'This Quarter', bgClass: 'kpi-indigo' },
                    { label: 'Audit Accuracy', value: '99.8%', icon: Activity, detail: 'Infrastructure Target', bgClass: 'kpi-amber' },
                    { label: 'Client Retention', value: '94%', icon: PieChart, detail: 'Annual Factor', bgClass: 'kpi-violet' },
                ].map((stat, idx) => (
                    <div key={idx} className={cn("border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-6 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm", stat.bgClass)}>
                        <div className="flex justify-between items-start mb-6">
                            <stat.icon className="w-4 h-4 text-muted-foreground/40" />
                            <span className="text-[8px] font-bold text-primary px-1.5 py-0.5 rounded border border-primary/20 bg-primary/5 uppercase tracking-widest">Verified</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold tracking-tighter">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                        </div>
                        <p className="text-[9px] text-muted-foreground/40 mt-4 uppercase font-bold tracking-tighter tracking-widest">{stat.detail}</p>
                    </div>
                ))}
            </div>

            {/* Report Ledger */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest">Documentation Ledger</h3>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">View All Records</Button>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] overflow-hidden bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30">
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Identification</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Resource Name</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Entity Target</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Initiated</th>
                                <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                            {reportHistory.map((report) => (
                                <tr key={report.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                                    <td className="px-6 py-4 text-[11px] font-mono text-muted-foreground">{report.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold tracking-tight">{report.name}</p>
                                        <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">{report.type}</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">{report.client}</td>
                                    <td className="px-6 py-4 text-[11px] text-muted-foreground">{report.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                                <ArrowUpRight className="w-3.5 h-3.5" />
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

export default Reports;
