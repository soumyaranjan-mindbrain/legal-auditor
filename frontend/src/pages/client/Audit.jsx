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

    const fetchAuditEnvironment = async () => {
        try {
            setLoading(true);
            const docsRes = await api.get('/documents');
            setAllDocs(docsRes.data || []);

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
                            className="group relative p-6 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            {/* Subtle background glow */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                            
                            <div className="relative flex items-start justify-between mb-5">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                                        <Hash className="w-2.5 h-2.5" /> {doc._id.substring(0, 8)}
                                    </div>
                                    <div className="h-1.5 w-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 transition-colors" />
                                </div>
                            </div>
                            
                            <div className="relative space-y-1">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
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
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{document.fileName}</h2>
                            <span className={cn(
                                "text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-widest",
                                view === 'variance' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                            )}>
                                {view === 'variance' ? 'Analyzed' : 'Draft'}
                            </span>
                        </div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Comparative Session Node • UUID_{id.substring(0, 6)}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {view === 'variance' && (
                        <div className="flex items-center gap-6 mr-6 border-r border-slate-200 dark:border-slate-800 pr-6">
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Compliance Match</p>
                                <p className="text-lg font-black text-emerald-500">{auditData.results.complianceMatch}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Global Risk Score</p>
                                <p className="text-lg font-black text-rose-500">{auditData.results.overallScore}/100</p>
                            </div>
                        </div>
                    )}
                    

                    <Button 
                        onClick={initiateSync}
                        disabled={syncing}
                        className={cn(
                            "h-10 px-8 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all shadow-lg",
                            view === 'variance' 
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-emerald-500/20" 
                                : "btn-premium shadow-primary/20"
                        )}
                    >
                        {syncing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                        {view === 'variance' ? "Re-Analyze" : "Initiate Audit"}
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex gap-4 overflow-hidden">
                
                {/* Dual-View Document Pane */}
                <div className={cn(
                    "flex transition-all duration-500 gap-4 min-h-0",
                    view === 'variance' ? "w-2/3" : "w-full"
                )}>
                    {/* Base Document Viewer */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        {baseDocument ? (
                            <FileViewer 
                                docId={baseDocument._id} 
                                title={baseDocument.fileName} 
                                isBase={true} 
                            />
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-50">
                                <AlertCircle className="w-8 h-8 mb-3" />
                                <p className="text-[10px] font-black uppercase tracking-widest">No Base Reference</p>
                            </div>
                        )}
                    </div>

                    {/* Target Document Viewer */}
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <FileViewer 
                            docId={document._id} 
                            title={document.fileName} 
                        />
                    </div>
                </div>

                {/* Analysis Report Pane */}
                {view === 'variance' && (
                    <div className="w-1/3 flex flex-col bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-in slide-in-from-right-4 duration-500">
                        <div className={cn(
                            "h-12 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors bg-slate-900 text-white"
                        )}>
                            <div className="flex items-center gap-3">
                                <ArrowLeftRight className="w-4 h-4 text-amber-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    Variance Report
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="p-4 space-y-4">
                                {auditData?.results?.clauses.map((clause, i) => (
                                    <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm">
                                        <div className={cn(
                                            "px-3 py-2 flex items-center justify-between",
                                            clause.severity === 'critical' ? "bg-rose-500 text-white" : "bg-slate-100 dark:bg-slate-900"
                                        )}>
                                            <h4 className="text-[10px] font-black uppercase tracking-tight truncate">{clause.title}</h4>
                                            <span className="text-[7px] font-black uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
                                                {clause.severity}
                                            </span>
                                        </div>
                                        <div className="p-3 space-y-3">
                                            <div className="space-y-2">
                                                <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Variance Detected</p>
                                                <p className="text-[10px] font-medium text-slate-800 dark:text-slate-300 leading-relaxed italic line-clamp-3">
                                                    "{clause.originalText}"
                                                </p>
                                            </div>
                                            <div className="p-2 bg-slate-900 text-white rounded-lg">
                                                <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1">Recommendation</p>
                                                <p className="text-[10px] font-bold text-emerald-50 leading-relaxed">
                                                    {clause.suggestedFix}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Audit;
