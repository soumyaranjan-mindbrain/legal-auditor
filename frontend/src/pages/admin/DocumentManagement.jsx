import React from 'react';
import {
    Upload,
    FileText,
    Search,
    Filter,
    Trash2,
    Edit3,
    MoreHorizontal,
    ArrowUpRight,
    FileSearch,
    Clock,
    CheckCircle2
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../lib/utils';

const DocumentManagement = () => {
    const documents = [
        { id: 'DOC-NX-001', name: 'Institutional_Asset_Registry.pdf', client: 'MindBrain Intelligence', type: 'Audit', size: '2.4 MB', date: '2m ago', status: 'Verified' },
        { id: 'DOC-NX-002', name: 'Legal_Flow_Optimization.docx', client: 'Nexus Legal Group', type: 'Contract Review', size: '1.1 MB', date: '14m ago', status: 'Processing' },
        { id: 'DOC-NX-003', name: 'Compliance_Manifesto_V5.pdf', client: 'Quantico Systems', type: 'Compliance', size: '4.8 MB', date: '1h ago', status: 'Verified' },
        { id: 'DOC-NX-004', name: 'Strategic_Vulnerability_Scan.pdf', client: 'MindBrain Intelligence', type: 'Security', size: '12.2 MB', date: '3h ago', status: 'Verified' },
    ];

    const headerActions = React.useMemo(() => (
        <Button className="h-9 px-4 rounded-md gap-2 text-[10px] font-bold uppercase tracking-widest shadow-sm">
            <Upload className="w-3.5 h-3.5" />
            Deploy Document
        </Button>
    ), []);

    useHeader('Document Ingress', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Document Registry */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20">
                    <div className="flex items-center gap-4 flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                            <input
                                placeholder="Search platform-wide documents..."
                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-900">
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Document Asset</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Client Entity</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Deployment</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                            {documents.map((doc) => (
                                <tr key={doc.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold tracking-tight line-clamp-1">{doc.name}</div>
                                                <div className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5 uppercase tracking-widest">
                                                    {doc.id} • {doc.size}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-[11px] font-bold tracking-tight">{doc.client}</div>
                                        <div className="text-[9px] text-muted-foreground mt-0.5">{doc.type}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest",
                                            doc.status === 'Verified' ? "text-emerald-500" : "text-amber-500"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full", doc.status === 'Verified' ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                                            {doc.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5">
                                            <Clock className="w-3 h-3 opacity-30" />
                                            {doc.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2 px-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                                <Edit3 className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                                <Trash2 className="w-4 h-4 text-risk-red" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
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

export default DocumentManagement;
