import React, { useState, useRef, useEffect } from 'react';
import {
    Upload as UploadIcon,
    FileText,
    CheckCircle,
    ArrowRight,
    Zap,
    X,
    File as FileIcon,
    Loader2,
    Plus,
    Trash2,
    ShieldCheck,
    UploadCloud
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useHeader } from '../../context/HeaderContext';
import api from '../../lib/api';

const Upload = () => {
    const navigate = useNavigate();
    const [persistentSource, setPersistentSource] = useState(null);
    const [newSourceFile, setNewSourceFile] = useState(null);
    const [targetFiles, setTargetFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState("");
    const [loadingSource, setLoadingSource] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useHeader('Dual-Stream Ingress');

    const sourceInputRef = useRef(null);
    const targetsInputRef = useRef(null);

    useEffect(() => {
        fetchActiveSource();
    }, []);

    const fetchActiveSource = async () => {
        try {
            setLoadingSource(true);
            const res = await api.get('/documents/source');
            if (res.data) setPersistentSource(res.data);
            else setPersistentSource(null);
        } catch (err) {
            console.error("Failed to fetch persistent source", err);
        } finally {
            setLoadingSource(false);
        }
    };

    const handleSourceSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewSourceFile(file);
            setPersistentSource(null);
            setError("");
        }
    };

    const handleTargetsSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setTargetFiles(prev => [...prev, ...files]);
            setError("");
        }
    };

    const removeTarget = (index) => {
        setTargetFiles(prev => prev.filter((_, i) => i !== index));
    };

    const startBulkUpload = async () => {
        if ((!newSourceFile && !persistentSource) || targetFiles.length === 0) {
            setError("Analysis cluster requires both source and target nodes.");
            return;
        }

        setIsUploading(true);
        setError("");
        setUploadProgress(0);

        try {
            let activeSourceId = persistentSource?._id;

            // 1. Sync New Source if provided
            if (newSourceFile) {
                const sourceData = new FormData();
                sourceData.append('file', newSourceFile);
                sourceData.append('type', 'source');
                const sourceRes = await api.post('/documents/upload', sourceData);
                
                // Defensive check for response structure
                const sourceDoc = sourceRes.data.data || sourceRes.data.document;
                if (!sourceDoc?._id) throw new Error("Source synchronization failed - invalid response.");
                activeSourceId = sourceDoc._id;
            }

            // 2. Batch Sync Targets
            for (let i = 0; i < targetFiles.length; i++) {
                const targetData = new FormData();
                targetData.append('file', targetFiles[i]);
                targetData.append('type', 'target');
                targetData.append('sourceId', activeSourceId);
                await api.post('/documents/upload', targetData);
                setUploadProgress(Math.round(((i + 1) / targetFiles.length) * 100));
            }

            // Success Transition
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/client/documents');
            }, 800);

        } catch (err) {
            console.error("Cluster synchronization failed", err);
            setError(err.response?.data?.error || err.message || "Critical cluster failure during sync.");
            setIsUploading(false);
        }
    };

    // Rendering Logic
    if (isUploading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm">
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 border-[4px] border-slate-100 dark:border-slate-800 rounded-full" />
                    <div 
                        className={cn(
                            "absolute inset-0 border-[4px] rounded-full border-t-transparent",
                            isSuccess ? "border-emerald-500" : "border-slate-900 dark:border-primary animate-spin"
                        )}
                        style={{ animationDuration: '1s' }}
                    />
                    {isSuccess ? (
                        <CheckCircle className="w-10 h-10 text-emerald-500 animate-in zoom-in duration-300" strokeWidth={2} />
                    ) : (
                        <UploadCloud className="w-10 h-10 text-slate-900 dark:text-primary animate-bounce" strokeWidth={1.5} />
                    )}
                </div>
                <div className="text-center space-y-3">
                    <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">
                        {isSuccess ? "Upload Complete" : "Uploading Documents"}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-64 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                            <div 
                                className={cn(
                                    "h-full transition-all duration-500",
                                    isSuccess ? "bg-emerald-500" : "bg-slate-900 dark:bg-primary"
                                )} 
                                style={{ width: `${isSuccess ? 100 : uploadProgress}%` }} 
                            />
                        </div>
                        <p className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                            {isSuccess ? "Files Secured in Vault" : `${uploadProgress}% Uploaded`}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
                
                {/* Source Stream */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-primary" />
                            Source Document (Persistent)
                        </h2>
                    </div>
                    
                    <div 
                        onClick={() => (newSourceFile || persistentSource) ? null : sourceInputRef.current.click()}
                        className={cn(
                            "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all relative overflow-hidden",
                            (newSourceFile || persistentSource) 
                                ? "border-slate-300 bg-slate-50 dark:bg-slate-900/50" 
                                : "border-slate-300 hover:border-slate-900 dark:hover:border-primary cursor-pointer bg-white dark:bg-slate-900"
                        )}
                    >
                        <input type="file" ref={sourceInputRef} className="hidden" onChange={handleSourceSelect} />
                        
                        {loadingSource ? (
                            <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                        ) : persistentSource ? (
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shadow-sm relative">
                                    <ShieldCheck className="w-8 h-8 text-emerald-600" strokeWidth={2} />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-1">Active Reference</p>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[200px]">{persistentSource.fileName}</p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 text-[9px] font-black uppercase tracking-widest border-slate-300 hover:border-slate-900"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        sourceInputRef.current.click();
                                    }}
                                >
                                    <UploadIcon className="w-3 h-3 mr-1.5" /> Replace Source
                                </Button>
                            </div>
                        ) : newSourceFile ? (
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 flex items-center justify-center shadow-sm">
                                    <FileIcon className="w-8 h-8 text-slate-900 dark:text-primary" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 max-w-[200px]">{newSourceFile.name}</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Staged for Sync</p>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 text-[9px] font-black uppercase tracking-widest border-slate-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setNewSourceFile(null);
                                        fetchActiveSource();
                                    }}
                                >
                                    <Trash2 className="w-3 h-3 mr-1.5" /> Cancel
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                    <Plus className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Base Reference</p>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Click to sync source doc</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Target Stream */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-primary" />
                            Target Stream (Comparison)
                        </h2>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{targetFiles.length} Selected</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-3 min-h-0">
                        <div 
                            onClick={() => targetsInputRef.current.click()}
                            className="h-24 border-2 border-dashed border-slate-300 hover:border-slate-900 dark:hover:border-primary rounded-xl flex items-center justify-center cursor-pointer bg-white dark:bg-slate-900 transition-all shrink-0"
                        >
                            <input type="file" ref={targetsInputRef} multiple className="hidden" onChange={handleTargetsSelect} />
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                    <Plus className="w-4 h-4 text-slate-400" />
                                </div>
                                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">Batch Addition</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {targetFiles.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg group animate-in slide-in-from-right-2 duration-200">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">{file.name}</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{(file.size / 1024).toFixed(0)} KB</p>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
                                        onClick={() => removeTarget(i)}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            ))}
                            {targetFiles.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center h-full border border-slate-200 dark:border-slate-800 rounded-xl border-dashed opacity-50">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center px-8 leading-relaxed">
                                        Empty target stream.<br/>Upload docs for comparison.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Action Bar */}
            <div className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                    {error && (
                        <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest animate-pulse">{error}</p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-9 text-[10px] font-black uppercase tracking-widest text-slate-600"
                        onClick={() => { setPersistentSource(null); setNewSourceFile(null); setTargetFiles([]); setError(""); fetchActiveSource(); }}
                    >
                        Clear All
                    </Button>
                    <Button 
                        disabled={(!newSourceFile && !persistentSource) || targetFiles.length === 0}
                        onClick={startBulkUpload}
                        className="btn-premium h-9 px-8 rounded-lg"
                    >
                        Sync Documents <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
