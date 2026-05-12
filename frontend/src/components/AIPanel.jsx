import React from 'react';
import {
    Zap,
    Activity,
    ShieldAlert,
    MessageSquare,
    Sparkles,
    ArrowUpRight,
    Search,
    Clock,
    FileCheck,
    AlertTriangle
} from "lucide-react";
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export const AnalysisInsights = ({ role = 'client', data = { documents: [], audits: [] } }) => {
    const getCriticalVariances = () => {
        const allVariances = data.audits.reduce((acc, audit) => {
            if (!audit.results || !audit.results.clauses) return acc;

            const docVariances = audit.results.clauses
                .filter(c => c.status === 'variance' || c.status === 'alert')
                .map(c => ({
                    title: c.title || 'Untitled Clause',
                    docName: audit.targetDocumentId?.fileName || 'Vault Node',
                    status: c.status === 'alert' ? 'Conflict' : 'Variance',
                    severity: c.severity || 'medium',
                    id: `${audit._id}-${c._id}`
                }));
            return [...acc, ...docVariances];
        }, []);

        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return allVariances
            .sort((a, b) => (severityOrder[a.severity] ?? 99) - (severityOrder[b.severity] ?? 99))
            .slice(0, 4);
    };

    const criticalVariances = getCriticalVariances();

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-rose-500" strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-300">Variance Analysis Insights</span>
            </div>
            
            {criticalVariances.length === 0 ? (
                <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                        Start analysis to see variance insights here
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-2.5">
                    {criticalVariances.map((item) => (
                        <div key={item.id} className={cn(
                            "p-3 rounded-xl border flex items-center justify-between",
                            item.severity === 'critical' || item.status === 'Conflict' 
                                ? "bg-rose-50/50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40" 
                                : "bg-amber-50/50 border-amber-200 dark:bg-amber-950/10 dark:border-amber-900/40"
                        )}>
                            <div className="flex-1 min-w-0 space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-[10px] font-black uppercase tracking-tight text-slate-900 dark:text-white truncate">
                                        {item.title}
                                    </h4>
                                    <span className={cn(
                                        "text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full border",
                                        item.severity === 'critical' || item.status === 'Conflict'
                                            ? "text-rose-600 bg-rose-100 border-rose-200"
                                            : "text-amber-600 bg-amber-100 border-amber-200"
                                    )}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    {item.docName}
                                </p>
                            </div>
                            <ArrowUpRight className="w-3 h-3 text-slate-300 dark:text-slate-600 ml-4 shrink-0" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const RecentActivity = ({ role = 'client', data = { documents: [], audits: [] } }) => {
    
    const getLiveFeed = () => {
        const feed = [];
        
        // Add doc events
        data.documents.slice(0, 2).forEach(doc => {
            feed.push({
                time: "Recently",
                text: `Ingress complete for ${doc.fileName}.`,
                icon: FileCheck
            });
        });

        // Add audit events
        data.audits.slice(0, 2).forEach(audit => {
            feed.push({
                time: "Audit Node",
                text: `AI risk evaluation complete for target cluster.`,
                icon: ShieldAlert
            });
        });

        if (feed.length === 0) {
            feed.push({ time: "System Idle", text: "Awaiting document ingress to begin analysis stream.", icon: Clock });
        }

        return feed.slice(0, 3);
    };

    const feed = getLiveFeed();

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-300">Analysis Feed</span>
            </div>
            <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-6">
                {feed.map((event, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-primary" />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-tighter">{event.time}</span>
                                <event.icon className="w-3 h-3 text-slate-800 dark:text-slate-500" strokeWidth={2.5} />
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-800 dark:text-slate-200 font-bold">{event.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const AnalysisAssistant = ({ role = 'client', data = { documents: [], audits: [] } }) => {
    
    const message = data.audits.length > 0 
        ? `System identified ${data.audits.length} comparative clusters. Would you like a global compliance summary?`
        : "I'm ready to audit. Please upload a base document and a target contract to begin.";

    return (
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 p-2 opacity-5">
                <MessageSquare className="w-8 h-8 text-slate-900 dark:text-slate-100" />
            </div>
            <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Legal AI Assistant</span>
            </div>
            <p className="text-sm text-slate-800 dark:text-slate-300 font-bold leading-relaxed tracking-tight italic">
                "{message}"
            </p>
            <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="btn-secondary h-7 text-[9px] font-bold px-4 border-slate-200 dark:border-slate-800 rounded-md dark:bg-slate-900 dark:text-slate-100">Initialize Summary</Button>
            </div>
        </div>
    );
};

export const AIPanel = ({ role = 'client', data = { documents: [], audits: [] } }) => {
    return (
        <div className="space-y-8">
            <AnalysisInsights role={role} data={data} />
            <RecentActivity role={role} data={data} />
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <AnalysisAssistant role={role} data={data} />
            </div>
        </div>
    );
};
