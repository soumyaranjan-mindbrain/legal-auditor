import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    FileText,
    ShieldAlert,
    CheckCircle,
    AlertCircle,
    Search,
    Share2,
    Eye,
    Zap,
    Scale as Scaling,
    Loader2,
    ArrowRight,
    AlertTriangle,
    ChevronRight,
    RefreshCw,
    UploadCloud,
    FolderOpen,
    Hash,
    Calendar,
    BarChart3,
    FileSearch,
    ArrowLeftRight,
    Layout
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useHeader } from '../../context/HeaderContext';
import api from '../../lib/api';
import FileViewer from '../../components/FileViewer';

const Audit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [baseDocument, setBaseDocument] = useState(null);
    const [auditData, setAuditData] = useState(null);
    const [allDocs, setAllDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [view, setView] = useState('pre-audit'); // 'pre-audit' | 'variance'
    const [error, setError] = useState('');
    const [allAudits, setAllAudits] = useState([]);

    const fetchAuditEnvironment = async () => {
        try {
            setLoading(true);
            const [docsRes, allAuditsRes] = await Promise.all([
                api.get('/documents'),
                api.get('/audit/all')
            ]);
            setAllDocs(docsRes.data || []);
            setAllAudits(allAuditsRes.data || []);

            if (id) {
                const [docRes, auditRes] = await Promise.all([
                    api.get(`/documents/${id}`),
                    api.get(`/audit/results/${id}`).catch(() => ({ data: null }))
                ]);
                
                const targetDoc = docRes.data;
                setDocument(targetDoc);

                if (targetDoc.sourceId) {
                    const baseRes = await api.get(`/documents/${targetDoc.sourceId}`);
                    setBaseDocument(baseRes.data);
                }

                if (auditRes.data) {
                    setAuditData(auditRes.data);
                    setView('variance');
                } else {
                    setAuditData(null);
                    setView('pre-audit');
                    // Auto-initiate audit if coming from a direct "Analyze" action
                    setTimeout(() => initiateSync(), 500);
                }
            }
        } catch (err) {
            console.error("Failed to load audit environment", err);
            setError('Failed to synchronize audit environment.');
        } finally {
            setLoading(false);
        }
    };

    const initiateSync = async () => {
        try {
            setSyncing(true);
            setError("");
            const res = await api.post(`/audit/sync/${id}`);
            setAuditData(res.data.data);
            setView('variance');
        } catch (err) {
            console.error("Audit Sync Failed", err);
            setError(err.response?.data?.error || "Critical failure during AI audit sync.");
        } finally {
            setSyncing(false);
        }
    };

    useEffect(() => {
        fetchAuditEnvironment();
    }, [id]);

    useHeader('Audit & Variance Engine', null);

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-slate-900 dark:text-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-primary animate-pulse">Initializing Audit Stream...</p>
            </div>
        );
    }

    if (allDocs.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
                <div className="relative">
                    <div className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                        <UploadCloud className="w-10 h-10 text-slate-400 dark:text-slate-600" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-950">
                        <Zap className="w-4 h-4 text-white fill-white" />
                    </div>
                </div>
                <div className="text-center space-y-3">
                    <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Repository Empty</h2>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest max-w-[300px] leading-relaxed mx-auto">
                        Please upload <span className="text-slate-900 dark:text-white">base doc</span> and <span className="text-slate-900 dark:text-white">target doc</span> to start audit
                    </p>
                </div>
            </div>
        );
    }

    if (!id || !document) {
        return (
            <div className="h-full flex flex-col space-y-6">
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                        <FolderOpen className="w-7 h-7 text-slate-400" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Active Audit Selection</h2>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Select a target document to begin compliance analysis</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar pb-8">
                    {allDocs.filter(doc => !doc.isSource).map((doc) => (
                        <div 
                            key={doc._id}
                            onClick={() => navigate(`/client/audit/${doc._id}`)}
                            className="group relative p-6 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-2xl hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm"
                        >
                            {/* Subtle background glow */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                            
                            <div className="relative flex items-start justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                                        <Hash className="w-2.5 h-2.5" /> {doc._id.substring(0, 8)}
                                    </div>
                                    {(() => {
                                        const audit = allAudits.find(a => (a.targetDocumentId?._id || a.targetDocumentId) === doc._id);
                                        const isAudited = audit?.status === 'completed';
                                        return (
                                            <span className={cn(
                                                "text-[7px] font-black uppercase tracking-[0.1em] px-1.5 py-0.5 rounded border shadow-sm",
                                                isAudited 
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900" 
                                                    : "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900"
                                            )}>
                                                {isAudited ? "Audited" : "Pending"}
                                            </span>
                                        );
                                    })()}
                                </div>
                            </div>
                            
                            <div className="relative space-y-1">
                                <h3 className="text-[13px] font-black text-slate-900 dark:text-white tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                                    {doc.fileName}
                                </h3>
                            </div>

                            <div className="relative flex items-center gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        {new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className="ml-auto flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                    Audit <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500 min-h-0">
            
            {/* Audit & Variance Header */}
            <div className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <div 
                        onClick={() => navigate('/client/audit')}
                        className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center cursor-pointer hover:border-primary transition-all group shadow-inner"
                        title="Change Document"
                    >
                        <Scaling className="w-5 h-5 text-slate-900 dark:text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{document.fileName}</h2>
                            <span className={cn(
                                "text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest shadow-sm",
                                view === 'variance' ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700"
                            )}>
                                {view === 'variance' ? 'Analyzed' : 'Draft'}
                            </span>
                        </div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">UUID_{id.substring(0, 6)}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    

                    {view !== 'variance' && (
                        <Button 
                            onClick={initiateSync}
                            disabled={syncing}
                            className="h-10 px-8 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all shadow-lg btn-premium shadow-primary/20"
                        >
                            {syncing ? "Auditing..." : "Initiate Audit"}
                        </Button>
                    )}
                </div>
            </div>            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-8">
                
                {/* Variance Intelligence Stream (Vertical) */}
                {view === 'variance' && (
                    <div className="flex flex-col bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-in slide-in-from-top-4 duration-500">
                        <div className="h-10 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-900 text-white">
                            <div className="flex items-center gap-3">
                                <ArrowLeftRight className="w-4 h-4 text-amber-400" />
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-50">Variance Intelligence Matrix</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total Nodes Identified: {auditData?.results?.clauses?.length || 0}</span>
                            </div>
                        </div>

                        <div className="p-4 space-y-6">
                            {auditData?.results?.clauses.map((clause, i) => (
                                <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm flex flex-col">
                                    <div className={cn(
                                        "px-4 py-3 flex flex-col items-center justify-center text-center gap-1.5 transition-colors duration-300",
                                        clause.severity === 'critical' && "bg-rose-600 text-white shadow-lg shadow-rose-600/20",
                                        clause.severity === 'high' && "bg-rose-300/90 text-rose-950 dark:bg-rose-900/60 dark:text-rose-100",
                                        clause.severity === 'medium' && "bg-amber-100 text-amber-950 dark:bg-amber-900/40 dark:text-amber-200",
                                        !['critical', 'high', 'medium'].includes(clause.severity) && "bg-slate-100 dark:bg-slate-900 dark:text-slate-100"
                                    )}>
                                        <h4 className="text-sm font-black uppercase tracking-[0.1em]">
                                            {i + 1}. {clause.title}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full border shadow-sm",
                                                clause.severity === 'critical' ? "bg-white/20 border-white/20 text-white" : "bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10"
                                            )}>
                                                {clause.severity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Detected Variance in Target</p>
                                                <p className="text-[11px] font-medium text-slate-800 dark:text-slate-300 leading-relaxed">
                                                    "{clause.originalText}"
                                                </p>
                                            </div>
                                            <div className="space-y-1.5 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                                                <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Playbook Standard Requirement</p>
                                                <p className="text-[11px] font-medium text-slate-800 dark:text-slate-300 leading-relaxed">
                                                    "{clause.baseText || 'N/A'}"
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-emerald-50/40 dark:bg-emerald-900/10 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                                            <p className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.15em] mb-2">AI Remediation Guidance</p>
                                            <p className="text-[11px] font-bold text-slate-800 dark:text-emerald-50 leading-relaxed">
                                                {clause.suggestedFix}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Dual-View Document Pane (Bottom - Side-by-Side) */}
                <div className="h-[600px] flex gap-4 shrink-0 pb-6">
                    {/* Base Document Viewer */}
                    <div className="flex-1 flex flex-col bg-[#fffbf0] dark:bg-[#0f0a05] border-2 border-amber-400 dark:border-amber-700/50 rounded-xl overflow-hidden shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]">
                        {baseDocument ? (
                            <FileViewer 
                                docId={baseDocument._id} 
                                title={baseDocument.fileName} 
                                isBase={true} 
                            />
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-50">
                                <AlertCircle className="w-8 h-8 mb-3" />
                                <p className="text-[10px] font-black uppercase tracking-widest">No Base Reference Loaded</p>
                            </div>
                        )}
                    </div>

                    {/* Target Document Viewer */}
                    <div className="flex-1 flex flex-col bg-[#fffbf0] dark:bg-[#0f0a05] border-2 border-amber-400 dark:border-amber-700/50 rounded-xl overflow-hidden shadow-[0_0_20px_-5px_rgba(251,191,36,0.2)]">
                        <FileViewer 
                            docId={document._id} 
                            title={document.fileName} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Audit;
