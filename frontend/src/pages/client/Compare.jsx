import React from 'react';
import {
    GitCompare,
    ArrowRight,
    FileText,
    Plus,
    AlertCircle,
    CheckCircle,
    Info,
    Hash,
    MoreHorizontal
} from "lucide-react";
import { Button } from '../../components/ui/button';

import { useHeader } from '../../context/HeaderContext';
import { AnalysisAssistant } from '../../components/AIPanel';

const Compare = () => {
    const headerActions = React.useMemo(() => (
        <Button size="sm" className="h-8 text-[10px] uppercase font-bold tracking-widest px-6 rounded-[6px] shadow-sm">
            Run Analysis <GitCompare className="w-3.5 h-3.5 ml-2" />
        </Button>
    ), []);

    useHeader('Variance', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">

            {/* Selection Surface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="kpi-card kpi-indigo p-6 group">
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Source Document</span>
                        <Info className="w-3.5 h-3.5 text-foreground/20" />
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-[6px] bg-foreground text-background flex items-center justify-center shadow-lg shadow-foreground/10 transition-all group-hover:scale-105">
                            <FileText className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate leading-none mb-1.5 group-hover:text-primary transition-colors">Meridian_SaaS_Base.pdf</p>
                            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">Template • Active</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-[9px] uppercase font-bold tracking-widest px-3 opacity-40 hover:opacity-100 rounded-full">Change</Button>
                    </div>
                </div>

                <div className="kpi-card kpi-rose p-6 group">
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Target Document</span>
                        <ArrowRight className="w-3.5 h-3.5 text-foreground/20" />
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-[6px] bg-foreground text-background flex items-center justify-center shadow-lg shadow-foreground/10 transition-all group-hover:scale-105">
                            <GitCompare className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate leading-none mb-1.5 group-hover:text-primary transition-colors">Thompson_Draft_V2.docx</p>
                            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">Negotiated Fragment • 89% Match</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-[9px] uppercase font-bold tracking-widest px-3 opacity-40 hover:opacity-100 rounded-full">Change</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-primary/40 rounded-full" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Comparison Results</h3>
                    </div>
                </div>

                <div className="kpi-card overflow-hidden divide-y divide-border/50">
                    {[
                        {
                            title: 'Intellectual Property Assignment',
                            origin: 'Assignor conveys all rights, title and interest in the Work globally and in perpetuity.',
                            target: 'Assignor conveys limited regional rights only for a period of ten (10) years.',
                            status: 'Conflict',
                            color: 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-950/40 dark:border-rose-900/40'
                        },
                        {
                            title: 'Liability Caps',
                            origin: 'Total aggregate liability shall not exceed 1x the Fees paid in the past 12 months.',
                            target: 'Total aggregate liability shall not exceed 2x the Fees paid in the past 24 months.',
                            status: 'Variance',
                            color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900/40'
                        },
                        {
                            title: 'Governing Law',
                            origin: 'The laws of the State of Delaware shall govern this repository.',
                            target: 'The laws of the State of Delaware shall govern this repository.',
                            status: 'Consistent',
                            color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/40'
                        },
                    ].map((row, idx) => (
                        <div key={idx} className="p-8 space-y-6 hover:bg-muted/20 transition-all group active:scale-[0.995]">
                            <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{row.title}</h4>
                                <span className={`${row.color} text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm`}>
                                    {row.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-30">
                                        <div className="w-1 h-3 bg-muted-foreground rounded-full" />
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Baseline</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground/80 leading-relaxed pl-4 border-l italic">
                                        "{row.origin}"
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-3 bg-primary rounded-full" />
                                        <span className="text-[8px] font-bold text-foreground uppercase tracking-[0.2em]">Target Fragment</span>
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed pl-4 border-l border-primary/20">
                                        "{row.target}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Compare;
