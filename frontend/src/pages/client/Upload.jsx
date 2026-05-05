import React, { useState } from 'react';
import {
    Upload as UploadIcon,
    FileText,
    CheckCircle,
    ArrowRight,
    Zap,
    Cpu,
    Shield,
    Clock,
    Search
} from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useHeader } from '../../context/HeaderContext';

const Upload = () => {
    const [state, setState] = useState("idle"); // idle | uploading | done
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState("");

    useHeader('Upload');

    const recentUploads = [
        { id: 'UX-901', name: 'Service_Level_Agreement.pdf', type: 'SaaS', status: 'Analyzed', date: '1h ago' },
        { id: 'UX-892', name: 'Master_Service_Agreement_V2.docx', type: 'Enterprise', status: 'Analyzed', date: '4h ago' },
        { id: 'UX-881', name: 'Consulting_Contract_Final.pdf', type: 'Legal', status: 'Analyzed', date: 'Yesterday' },
    ];

    const simulateUpload = (name) => {
        setFileName(name);
        setState("uploading");
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => setState("done"), 500);
            }
            setProgress(Math.min(p, 100));
        }, 150);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) simulateUpload(file.name);
    };

    const reset = () => {
        setState("idle");
        setProgress(0);
        setFileName("");
    };

    return (
        <div className="w-full space-y-12 pb-12 animate-in fade-in duration-500">
            <div className="space-y-10">
                {/* Upload Surface */}
                <div className="relative">
                    {state === "idle" ? (
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className="group relative border border-dashed border-zinc-200 dark:border-zinc-800 rounded-[6px] p-16 flex flex-col items-center justify-center space-y-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer kpi-violet min-h-[320px] shadow-sm"
                        >
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => simulateUpload(e.target.files[0]?.name)} />
                            <div className="w-14 h-14 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                <UploadIcon className="w-7 h-7 text-muted-foreground/40" strokeWidth={1.25} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium tracking-tight">Drop document to start processing</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em] mt-2 opacity-40">PDF, DOCX up to 50MB</p>
                            </div>
                            <Button variant="outline" size="sm" className="h-8 text-[9px] uppercase font-bold tracking-widest px-6 mt-2 border-zinc-200 dark:border-zinc-800 bg-white/50 backdrop-blur-sm rounded-[6px]">Select Manually</Button>
                        </div>
                    ) : state === "uploading" ? (
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-12 space-y-10 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm min-h-[320px] flex flex-col justify-center transition-all duration-500">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-[6px] bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center shrink-0 shadow-sm">
                                    <FileText className="w-6 h-6 text-white dark:text-zinc-900" strokeWidth={1.25} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-end mb-3">
                                        <p className="text-sm font-medium tracking-tight truncate">{fileName}</p>
                                        <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-tighter">{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 shadow-sm"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                {[
                                    { label: "Extraction", done: progress > 30, icon: Search },
                                    { label: "Anomaly Scan", done: progress > 65, icon: Cpu },
                                    { label: "Legal Match", done: progress > 90, icon: Shield },
                                ].map(({ label, done, icon: Icon }) => (
                                    <div key={label} className={cn(
                                        "flex items-center gap-3 p-4 rounded-[6px] border transition-all duration-500",
                                        done ? "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm" : "bg-transparent border-zinc-100 dark:border-zinc-900 text-muted-foreground/20"
                                    )}>
                                        <Icon className={cn("w-3.5 h-3.5", done ? "text-zinc-900 dark:text-zinc-100" : "text-muted-foreground/20")} strokeWidth={1.5} />
                                        <span className="text-[9px] font-bold uppercase tracking-widest leading-none opacity-80">{label}</span>
                                        {done && <CheckCircle className="w-3 h-3 ml-auto text-emerald-500" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-16 text-center bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm space-y-8 min-h-[320px] flex flex-col justify-center animate-in zoom-in duration-500">
                            <div className="w-16 h-16 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center mx-auto border border-zinc-200 dark:border-zinc-800 shadow-xl">
                                <CheckCircle className="w-8 h-8 text-emerald-400" strokeWidth={1.25} />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-medium tracking-tight uppercase">Analysis Complete</h3>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.1em]">Asset <span className="font-mono text-zinc-900 dark:text-zinc-100 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 rounded-[4px]">{fileName}</span> processed successfully.</p>
                            </div>
                            <div className="flex gap-4 justify-center pt-4">
                                <Link to="/client/audit">
                                    <Button size="sm" className="h-10 px-8 text-[10px] uppercase font-bold tracking-[0.2em] shadow-sm rounded-[6px]">
                                        View Audit <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <Button onClick={reset} variant="outline" size="sm" className="h-10 px-8 text-[10px] uppercase font-bold tracking-[0.2em] border-zinc-200 dark:border-zinc-800 bg-white/50 backdrop-blur-sm rounded-[6px]">
                                    Dismiss
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Uploads Table */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-1 h-3 bg-zinc-400 dark:bg-zinc-600 rounded-full opacity-30" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Recent Analysis</h3>
                    </div>
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] overflow-hidden bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                                {recentUploads.map((doc) => (
                                    <tr key={doc.id} className="group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition-all duration-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-[4px] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-muted-foreground group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition-all">
                                                    <FileText className="w-4 h-4" strokeWidth={1.25} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium tracking-tight">{doc.name}</p>
                                                    <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">{doc.id} • {doc.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-end">
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-1">{doc.status}</span>
                                                <div className="flex items-center gap-2 opacity-20">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-[9px] font-bold">{doc.date}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
