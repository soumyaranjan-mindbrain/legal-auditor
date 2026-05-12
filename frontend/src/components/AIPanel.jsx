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
    const completedAudits = data.audits.filter(a => a.status === 'completed');

    const getLiveInsights = () => {
        const totalAudits = data.audits.length;
        const completedAudits = data.audits.filter(a => a.status === 'completed');
        
        // Calculate real compliance avg
        const avgCompliance = completedAudits.length > 0 
            ? Math.round(completedAudits.reduce((acc, curr) => acc + (curr.results?.complianceMatch || 0), 0) / completedAudits.length)
            : 0;

        // Count actual critical variances
        const criticalVariances = completedAudits.reduce((acc, curr) => {
            return acc + (curr.results?.clauses?.filter(c => c.severity === 'critical' || c.severity === 'high').length || 0);
        }, 0);

        const latestAudit = completedAudits[0];
        
        // Extract the most significant latest variance
        const latestVariance = latestAudit?.results?.clauses?.find(c => c.status === 'variance' || c.status === 'alert');

        const metrics = [
            { 
                label: "Global Compliance", 
                value: completedAudits.length > 0 ? `${avgCompliance}% Avg` : "Awaiting Audit", 
                color: avgCompliance > 80 ? "text-emerald-600" : (avgCompliance > 50 ? "text-amber-600" : "text-rose-600"), 
                bg: "bg-slate-50 dark:bg-slate-900" 
            },
            { 
                label: "Latest Variance", 
                value: latestVariance ? latestVariance.title : (completedAudits.length > 0 ? "No High Risks" : "Nominal Health"), 
                color: latestVariance ? (latestVariance.severity === 'critical' ? "text-rose-600" : "text-amber-600") : "text-emerald-600", 
                bg: latestVariance ? "kpi-rose" : "kpi-emerald" 
            },
            { 
                label: "Analyzed Node", 
                value: latestAudit ? latestAudit.targetDocumentId?.fileName || "Unknown File" : "No Active Node", 
                color: "text-indigo-600", 
                bg: "kpi-indigo" 
            },
        ];

        return { metrics };
    };

    const insights = getLiveInsights();

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-300">Live Analysis Insights</span>
            </div>
            
            {completedAudits.length === 0 ? (
                <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                        Start analysis to see live insights here
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {insights.metrics.map((item, i) => (
                        <div key={i} className={cn(
                            "p-3.5 rounded-xl border border-slate-300 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-primary transition-all shadow-sm dark:shadow-none",
                            item.bg.startsWith('kpi-') ? item.bg : `bg-white dark:bg-slate-900 ${item.bg}`
                        )}>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-widest leading-none">{item.label}</p>
                                <p className={cn("text-xs font-black tracking-tight line-clamp-1", item.color)}>{item.value}</p>
                            </div>
                            <ArrowUpRight className="w-3 h-3 text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors" />
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
