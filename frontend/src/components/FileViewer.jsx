import React, { useState, useEffect } from 'react';
import { Loader2, FileText, AlertCircle } from 'lucide-react';
import api from '../lib/api';

const FileViewer = ({ docId, title, isBase = false }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!docId) return;
        fetchDocMeta();
    }, [docId]);

    const fetchDocMeta = async () => {
        try {
            setLoading(true);
            setError('');
            // Fetch metadata only — the content endpoint returns fileType + fileUrl
            const res = await api.get(`/documents/${docId}/content`);
            setFileType(res.data.fileType || '');
            setFileUrl(res.data.fileUrl || '');
            setContent(res.data.content || '');
        } catch (err) {
            console.error("Failed to load document", err);
            setError("Failed to load document.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
                <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Loading {isBase ? 'Base' : 'Target'} Document...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-8 text-center">
                <AlertCircle className="w-8 h-8 text-rose-500/40" />
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight">{error}</p>
            </div>
        );
    }

    const isPDF = fileType === 'application/pdf' || fileUrl?.toLowerCase().endsWith('.pdf');

    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Header */}
            <div className="h-12 flex items-center px-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 shrink-0 gap-2">
                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm font-black uppercase tracking-tight text-slate-800 dark:text-slate-200 truncate">
                    {title}
                </span>
                {isBase && (
                    <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full uppercase tracking-widest ml-1 border border-emerald-500/20 shrink-0">
                        BASE
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-hidden">
                {isPDF ? (
                    // Google Docs viewer — renders any public PDF inline, no download
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                        className="w-full h-full border-none"
                        title={title}
                        allow="fullscreen"
                    />
                ) : (
                    <div className="h-full overflow-y-auto custom-scrollbar p-6 bg-[#fefaf2] dark:bg-[#0c0a09]">
                        <div className="max-w-prose mx-auto">
                            <pre className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap font-sans">
                                {content || '(No text content)'}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileViewer;
