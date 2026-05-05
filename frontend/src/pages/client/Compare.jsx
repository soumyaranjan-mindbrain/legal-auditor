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

    useHeader('Comparison', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">

            {/* Selection Surface */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-6 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm relative group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all kpi-indigo">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Source Document</span>
                        <Info className="w-3.5 h-3.5 text-muted-foreground/20" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[4px] bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm transition-all">
                            <FileText className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate leading-none mb-1.5">Meridian_SaaS_Base.pdf</p>
                            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">Template • Active</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-[9px] uppercase font-bold tracking-widest px-3 opacity-40 hover:opacity-100">Change</Button>
                    </div>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-6 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm relative group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all kpi-rose">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Target Document</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/20" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[4px] bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm transition-all">
                            <GitCompare className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate leading-none mb-1.5">Thompson_Draft_V2.docx</p>
                            <p className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wider">Negotiated Fragment • 89% Match</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-[9px] uppercase font-bold tracking-widest px-3 opacity-40 hover:opacity-100">Change</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Comparison Results</h3>
                    </div>
                </div>

                <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/20 rounded-[6px] p-1">
                    <AnalysisAssistant role="client" />
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] overflow-hidden bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm divide-y divide-zinc-100 dark:divide-zinc-900">
                    {[
                        {
                            title: 'Intellectual Property Assignment',
                            origin: 'Assignor conveys all rights, title and interest in the Work globally and in perpetuity.',
                            target: 'Assignor conveys limited regional rights only for a period of ten (10) years.',
                            status: 'Conflict',
                            color: 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800'
                        },
                        {
                            title: 'Liability Caps',
                            origin: 'Total aggregate liability shall not exceed 1x the Fees paid in the past 12 months.',
                            target: 'Total aggregate liability shall not exceed 2x the Fees paid in the past 24 months.',
                            status: 'Variance',
                            color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800'
                        },
                        {
                            title: 'Governing Law',
                            origin: 'The laws of the State of Delaware shall govern this repository.',
                            target: 'The laws of the State of Delaware shall govern this repository.',
                            status: 'Consistent',
                            color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800'
                        },
                    ].map((row, idx) => (
                        <div key={idx} className="p-8 space-y-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                            <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{row.title}</h4>
                                <span className={`${row.color} text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[4px] border`}>
                                    {row.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-30">
                                        <div className="w-1 h-3 bg-zinc-400 dark:bg-zinc-600 rounded-full" />
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Baseline</span>
                                    </div>
                                    <p className="text-[13px] text-muted-foreground/80 leading-relaxed pl-4 border-l italic">
                                        "{row.origin}"
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-3 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                                        <span className="text-[8px] font-bold text-foreground uppercase tracking-[0.2em]">Target Fragment</span>
                                    </div>
                                    <p className="text-[13px] font-medium leading-relaxed pl-4 border-l border-zinc-200 dark:border-zinc-800">
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
