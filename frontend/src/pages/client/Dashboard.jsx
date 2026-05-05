import React from 'react';
import {
    FileText,
    ShieldAlert,
    Clock,
    ArrowUpRight,
    Activity
} from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

import { useHeader } from '../../context/HeaderContext';
import { RecentActivity, AnalysisAssistant, AnalysisInsights } from '../../components/AIPanel';

const Dashboard = () => {
    const stats = [
        { label: 'Total Audits', value: '128', icon: FileText, snippet: '12 added this week', bgClass: 'kpi-indigo' },
        { label: 'Risk Alerts', value: '12', icon: ShieldAlert, snippet: '3 critical pending', bgClass: 'kpi-rose' },
        { label: 'Avg. Severity', value: '3.4', icon: Activity, snippet: '0.2 increase from last', bgClass: 'kpi-amber' },
        { label: 'Pending Review', value: '7', icon: Clock, snippet: 'Last activity 2h ago', bgClass: 'kpi-violet' },
    ];

    const recentDocs = [
        { name: 'ServiceAgreement_v2.pdf', date: '2h ago', status: 'High Risk', risk: 'destructive' },
        { name: 'NDA_Standard_Final.docx', date: '5h ago', status: 'Clean', risk: 'emerald' },
        { name: 'EmploymentContract_Rev.pdf', date: 'Yesterday', status: 'Medium Risk', risk: 'amber' },
    ];

    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800 bg-transparent">Download Report</Button>
            <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest">New Upload</Button>
        </div>
    ), []);

    useHeader('Dashboard', headerActions);
    return (
        <div className="space-y-12 h-full flex flex-col">

            {/* Metrics: No background, thin separators */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-y border-zinc-200 dark:border-zinc-800 shrink-0">
                {stats.map((stat, i) => (
                    <div key={i} className={cn(
                        "px-8 py-8 space-y-6 transition-all duration-150",
                        i !== 0 && "md:border-l border-zinc-200 dark:border-zinc-800",
                        i === 0 && "md:pl-6",
                        stat.bgClass
                    )}>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">{stat.label}</span>
                            <stat.icon className="h-3 w-3 text-zinc-400" strokeWidth={1.5} />
                        </div>
                        
                        <div className="flex items-end justify-between gap-4">
                            <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 leading-tight max-w-[100px]">
                                {stat.snippet}
                            </p>
                            <span className="text-4xl font-bold tracking-tighter font-mono leading-none text-zinc-900 dark:text-zinc-50">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Insights: Merged below metrics */}
            <div className="bg-rose-50/50 dark:bg-rose-500/5 border border-rose-100/50 dark:border-rose-900/20 rounded-[6px] p-6 shrink-0 relative group">
                <div className="absolute top-4 right-4 z-20">
                    <Link to="/client/audit">
                        <Button variant="ghost" size="sm" className="h-6 text-[9px] px-2 uppercase tracking-wider font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-100/50">View All</Button>
                    </Link>
                </div>
                <AnalysisInsights role="client" />
            </div>

            {/* Bottom Grid: Analysis Merged */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 min-h-0">
                {/* Recent Documents - Taking 7/12 */}
                <div className="lg:col-span-7 flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Recent Documents</h2>
                        <Link to="/client/documents">
                            <Button variant="ghost" size="sm" className="h-7 text-[10px] px-2 uppercase tracking-wider font-bold text-muted-foreground hover:text-primary">View Directory</Button>
                        </Link>
                    </div>
                    <div className="flex-1 min-h-0 border-t border-zinc-100 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/40 rounded-[6px] p-1 overflow-hidden">
                        <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
                            {recentDocs.map((doc, i) => (
                                <div key={i} className="flex items-center justify-between py-4 group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors px-4 rounded-[4px]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 rounded-[4px] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 group-hover:bg-background transition-colors shadow-none">
                                            <FileText className="w-4 h-4 text-muted-foreground/60" strokeWidth={1.25} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium tracking-tight group-hover:text-primary transition-colors">{doc.name}</p>
                                            <p className="text-[10px] text-muted-foreground/70 uppercase font-bold tracking-wider mt-0.5">{doc.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 border rounded-[2px]",
                                            doc.risk === 'emerald' ? "border-emerald-500/20 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-500/5" :
                                                doc.risk === 'amber' ? "border-amber-500/20 text-amber-600 bg-amber-50/50 dark:bg-amber-500/5" :
                                                    "border-rose-500/20 text-rose-600 bg-rose-50/50 dark:bg-rose-500/5"
                                        )}>
                                            {doc.status}
                                        </div>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Analysis Integration - Taking 5/12 */}
                <div className="lg:col-span-5 flex flex-col min-h-0">
                    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-[6px] bg-zinc-50/50 dark:bg-zinc-900/10 flex-1 overflow-hidden">
                        <RecentActivity role="client" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
