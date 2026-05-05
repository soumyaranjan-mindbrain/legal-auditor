import React, { useState } from 'react';
import {
    FileText,
    ShieldAlert,
    ChevronRight,
    Search,
    Info,
    AlertCircle,
    CheckCircle2,
    Scaling,
    Download,
    Share2
} from "lucide-react";
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { useHeader } from '../../context/HeaderContext';
import { AnalysisAssistant } from '../../components/AIPanel';

const Audit = () => {
    const [selectedClause, setSelectedClause] = useState(null);
    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800 bg-transparent rounded-[6px]">
                <Share2 className="w-3.5 h-3.5 mr-2" />
                Share
            </Button>
            <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest rounded-[6px] shadow-sm">
                <Download className="w-3.5 h-3.5 mr-2" />
                Export Audit
            </Button>
        </div>
    ), []);

    useHeader('Audit', headerActions);

    const clauses = [
        {
            id: 1,
            title: "Limitation of Liability",
            text: "The total liability of the Provider shall be limited to the amount paid by the Client in the previous 12 months.",
            risk: "High",
            severity: "critical",
            reasoning: "Clause lacks carved-out exceptions for gross negligence or willful misconduct, creating significant legal exposure."
        },
        {
            id: 2,
            title: "Governing Law",
            text: "This agreement shall be governed by the laws of the State of Delaware without regard to its conflict of laws principles.",
            risk: "Clean",
            severity: "emerald",
            reasoning: "Standard jurisdiction selection. Minimal variance from baseline templates."
        },
        {
            id: 3,
            title: "Intellectual Property",
            text: "All work product shall be owned exclusively by the Client, provided that Provider retains rights to its pre-existing materials.",
            risk: "Medium",
            severity: "amber",
            reasoning: "Definition of 'pre-existing materials' is overly broad and could lead to ownership disputes over derivatives."
        }
    ];

    return (
        <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-500">
            {/* Assessment Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-5 shadow-sm space-y-4 kpi-rose">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" strokeWidth={1.5} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600/60">Assessment Overview</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-medium uppercase tracking-widest text-rose-600/60">Risk Score</span>
                            <span className="text-2xl font-medium tracking-tighter font-mono text-rose-700">74.2</span>
                        </div>
                        <div className="w-full h-1 bg-white/50 dark:bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{ width: '74%' }} />
                        </div>
                        <p className="text-[10px] text-rose-600/70 leading-relaxed italic">
                            High variance detected in <span className="font-bold">Indemnification</span> and <span className="font-bold">Governing Law</span>.
                        </p>
                    </div>
                </div>

                <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-5 shadow-sm space-y-4 kpi-indigo">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" strokeWidth={1.5} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600/60">Compliance Status</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[9px] text-indigo-600/50 font-bold uppercase tracking-tighter">Matched</p>
                            <p className="text-xl font-medium tracking-tight font-mono text-indigo-700">12/14</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] text-indigo-600/50 font-bold uppercase tracking-tighter">Deviations</p>
                            <p className="text-xl font-medium tracking-tight font-mono text-rose-600">02</p>
                        </div>
                    </div>
                    <div className="pt-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-[4px] border border-emerald-500/20 bg-white/50 text-emerald-600 uppercase tracking-widest">Minimal Friction</span>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <AnalysisAssistant role="client" />
                </div>
            </div>

            {/* Document Viewer (Paper-like UI) */}
            <div className="grid grid-cols-1 gap-8 flex-1">
                <div className="bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 rounded-[6px] overflow-hidden shadow-sm flex flex-col h-full min-h-[600px] backdrop-blur-md">
                    <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center px-4 justify-between shrink-0">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Original Document Buffer</span>
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] text-muted-foreground/60 font-mono tracking-widest">PAGE 01 / 12</span>
                            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />
                            <Scaling className="w-3.5 h-3.5 text-muted-foreground/30" strokeWidth={1.25} />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-16 max-w-4xl mx-auto space-y-12 font-serif leading-[1.8] text-[15px] text-zinc-800 dark:text-zinc-200">
                            <div className="space-y-4">
                                <h2 className="text-xl font-medium font-sans tracking-tight border-b border-zinc-100 dark:border-zinc-900 pb-3 mb-8 text-zinc-900 dark:text-zinc-100 uppercase">Services Agreement</h2>
                                <p>This Services Agreement (the "Agreement") is entered into as of April 15, 2026, by and between LexCorp Systems ("Provider") and Global Dynamics ("Client").</p>
                            </div>

                            {clauses.map((clause) => (
                                <div
                                    key={clause.id}
                                    onClick={() => setSelectedClause(clause)}
                                    className={cn(
                                        "p-6 rounded-[4px] transition-all cursor-pointer border-l-[2px] -ml-[25px] pl-[23px]",
                                        selectedClause?.id === clause.id
                                            ? "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-900 dark:border-zinc-100"
                                            : "border-transparent hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 hover:border-zinc-200 dark:hover:border-zinc-800"
                                    )}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">{clause.title}</span>
                                        {clause.severity === 'critical' && <ShieldAlert className="w-3 h-3 text-rose-500" strokeWidth={1.5} />}
                                    </div>
                                    <p className="text-[14px] leading-relaxed">{clause.text}</p>
                                </div>
                            ))}

                            <div className="h-40 italic text-muted-foreground/30 text-sm font-sans">
                                [End of visible buffer. Secondary nodes processing remaining segments...]
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default Audit;
