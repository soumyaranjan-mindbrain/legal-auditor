import React from 'react';
import {
    Zap,
    Activity,
    ShieldAlert,
    MessageSquare,
    Sparkles,
    ArrowUpRight,
    Search
} from "lucide-react";
import { Button } from './ui/button';

const getRoleInsights = (role) => {
    if (role === 'admin') {
        return {
            metrics: [
                { label: "Review Latency", value: "+12.4h Delta", color: "text-amber-500", bg: "bg-amber-500/5" },
                { label: "Audit Anomaly", value: "Nexus_NDA.pdf", color: "text-red-500", bg: "bg-red-500/5" },
            ],
            feed: [
                { time: "5m ago", text: "Client 'Global Finance' requested priority audit.", icon: Search },
                { time: "22m ago", text: "New report cluster generated for 'Meridian'.", icon: Sparkles },
            ],
            message: "System capacity is at 24%. Priority audits are currently processing ahead of schedule."
        };
    }
    if (role === 'super-admin') {
        return {
            metrics: [
                { label: "Kernel Load", value: "08% Avg", color: "text-emerald-500", bg: "bg-emerald-500/5" },
                { label: "Security Trace", value: "US-EAST Sync", color: "text-blue-500", bg: "bg-blue-500/5" },
            ],
            feed: [
                { time: "1m ago", text: "Regional cluster 'AP-SOUTH-1' sync complete.", icon: Activity },
                { time: "8m ago", text: "Key rotation successful for Administrator Console.", icon: ShieldAlert },
            ],
            message: "Global nodes are reporting nominal heartbeat. No unauthorized access attempts detected in last 24h."
        };
    }
    return {
        metrics: [
            { label: "Anomaly Detected", value: "Section 4.2", color: "text-red-500", bg: "bg-red-500/5" },
            { label: "Optimal Clause", value: "Liability Cap", color: "text-emerald-500", bg: "bg-emerald-500/5" },
        ],
        feed: [
            { time: "2m ago", text: "System identified high-risk variance in indemnification terms.", icon: ShieldAlert },
            { time: "15m ago", text: "Vector embedding complete for Thompson_NDA.docx.", icon: Sparkles },
            { time: "1h ago", text: "New precedent match found: 'Liability Limits 2024'.", icon: Search },
        ],
        message: "I've flagged three discrepancies in the governing law section. Would you like a comparative summary?"
    };
};

export const AnalysisInsights = ({ role = 'client' }) => {
    const insights = getRoleInsights(role);
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Analysis Insights</span>
            </div>
            <div className="space-y-3">
                {insights.metrics.map((item, i) => (
                    <div key={i} className={`p-3 rounded-md border border-zinc-200 dark:border-zinc-800 ${item.bg} flex items-center justify-between group cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all`}>
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                            <p className="text-xs font-semibold">{item.value}</p>
                        </div>
                        <ArrowUpRight className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const RecentActivity = ({ role = 'client' }) => {
    const insights = getRoleInsights(role);
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Recent Activity</span>
            </div>
            <div className="relative pl-4 border-l border-zinc-100 dark:border-zinc-900 space-y-6">
                {insights.feed.map((event, i) => (
                    <div key={i} className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-background border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">{event.time}</span>
                                <event.icon className="w-3 h-3 text-muted-foreground/40" strokeWidth={1.5} />
                            </div>
                            <p className="text-[11px] leading-relaxed text-foreground/80">{event.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const AnalysisAssistant = ({ role = 'client' }) => {
    const insights = getRoleInsights(role);
    return (
        <div className="bg-zinc-50 dark:bg-zinc-900/40 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-primary/60" strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Analysis Assistant</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                "{insights.message}"
            </p>
            <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="h-7 text-[9px] uppercase font-bold tracking-widest px-3 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-white dark:hover:bg-zinc-900 transition-colors">Generate</Button>
                <Button variant="ghost" size="sm" className="h-7 text-[9px] uppercase font-bold tracking-widest px-3 text-muted-foreground hover:text-foreground">Dismiss</Button>
            </div>
        </div>
    );
};

export const AIPanel = ({ role = 'client' }) => {
    return (
        <div className="space-y-8">
            <AnalysisInsights role={role} />
            <RecentActivity role={role} />
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 text-center">
                <AnalysisAssistant role={role} />
            </div>
        </div>
    );
};
