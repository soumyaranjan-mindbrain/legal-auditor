import React from 'react';
import {
    Search,
    FileText,
    Eye,
    MoreVertical,
    Filter,
    ArrowUpDown,
    Download,
    Hash
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';

import { useHeader } from '../../context/HeaderContext';

const Documents = () => {
    const [pageSize, setPageSize] = React.useState(25);

    const allDocs = Array.from({ length: 60 }, (_, i) => ({
        name: i % 2 === 0 ? `Meridian_SaaS_Agreement_V${i + 1}.pdf` : `Thompson_NDA_Cross_Border_v${i}.docx`,
        risk: (Math.random() * 90 + 5).toFixed(1),
        date: `${(i % 28) + 1} APR 2026`,
        type: i % 3 === 0 ? 'Detailed' : i % 3 === 1 ? 'Standard' : 'Core',
        riskColor: i % 4 === 0 ? 'rose' : i % 4 === 1 ? 'amber' : i % 4 === 2 ? 'emerald' : 'orange'
    }));

    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400/50" />
                <Input
                    className="h-8 pl-8 pr-3 text-[11px] w-full md:w-64 bg-white/40 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 rounded-[6px]"
                    placeholder="Search documents..."
                />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-[6px]">
                <Filter className="w-3.5 h-3.5" />
            </Button>
        </div>
    ), []);

    useHeader('Document Directory', headerActions);

    return (
        <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500 min-h-0">

            {/* Document Registry Table Container */}
            <div className="flex-1 min-h-0 border border-zinc-200 dark:border-zinc-800 rounded-[6px] bg-white/40 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-20">
                            <tr className="bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                                <th className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        Document Name <ArrowUpDown className="w-2.5 h-2.5 opacity-30" />
                                    </div>
                                </th>
                                <th className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        Risk Assessment <ArrowUpDown className="w-2.5 h-2.5 opacity-30" />
                                    </div>
                                </th>
                                <th className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        Uploaded On
                                    </div>
                                </th>
                                <th className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        Category
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-right">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900/50">
                            {allDocs.slice(0, pageSize).map((doc, idx) => (
                                <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-all group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-[4px] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-all">
                                                <FileText className="w-4 h-4" strokeWidth={1.25} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold tracking-tight leading-none mb-1.5 text-zinc-800 dark:text-zinc-200">{doc.name}</div>
                                                <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-400/60 uppercase">
                                                    <Hash className="w-2.5 h-2.5" /> 8Xf2...{1000 + idx}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3 w-40">
                                            <div className="flex-1 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-500",
                                                        doc.riskColor === 'rose' ? "bg-rose-500" :
                                                        doc.riskColor === 'amber' ? "bg-amber-500" :
                                                        doc.riskColor === 'emerald' ? "bg-emerald-500" :
                                                        doc.riskColor === 'orange' ? "bg-orange-500" : "bg-zinc-400"
                                                    )}
                                                    style={{ width: `${doc.risk}%` }}
                                                />
                                            </div>
                                            <span className={cn(
                                                "text-[11px] font-mono font-bold",
                                                doc.riskColor === 'rose' ? "text-rose-600" :
                                                doc.riskColor === 'amber' ? "text-amber-600" :
                                                doc.riskColor === 'emerald' ? "text-emerald-600" : "text-zinc-500"
                                            )}>{doc.risk}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] font-bold text-zinc-500/70 uppercase tracking-wider">
                                        {doc.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[4px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                                            {doc.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                                                <Eye className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                                                <Download className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                                                <MoreVertical className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination: Locked at bottom */}
            <div className="flex justify-between items-center py-2 shrink-0 border-t border-zinc-100 dark:border-zinc-900/50 mt-4">
                <div className="flex items-center gap-6">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Showing 1-{pageSize} of {allDocs.length}</p>
                    <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-6">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Rows:</span>
                        {[25, 50].map(size => (
                            <button
                                key={size}
                                onClick={() => setPageSize(size)}
                                className={cn(
                                    "text-[10px] font-bold px-2 py-1 rounded transition-all",
                                    pageSize === size 
                                        ? "text-zinc-900 dark:text-zinc-100 bg-zinc-200/50 dark:bg-zinc-800 shadow-sm" 
                                        : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                )}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-widest px-4 text-zinc-400" disabled>Prev</Button>
                    <div className="flex items-center mx-2 gap-1">
                        {[1, 2, 3].map(p => (
                            <Button
                                key={p}
                                variant={p === 1 ? "outline" : "ghost"}
                                size="sm"
                                className={cn(
                                    "h-8 w-8 p-0 text-[10px] font-bold rounded-[6px]",
                                    p === 1 ? "border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900 shadow-sm text-zinc-900" : "text-zinc-400"
                                )}
                            >
                                {p}
                            </Button>
                        ))}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-widest px-4 text-zinc-400">Next</Button>
                </div>
            </div>
        </div>
    );
};

export default Documents;
