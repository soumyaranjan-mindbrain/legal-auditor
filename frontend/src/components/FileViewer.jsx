import React, { useState, useEffect } from 'react';
import { Loader2, FileText, AlertCircle, Maximize2 } from 'lucide-react';
import api from '../lib/api';

const FileViewer = ({ docId, title, isBase = false }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        if (docId) {
            fetchContent();
        }
    }, [docId]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/documents/${docId}/content`);
            setContent(res.data.content);
            setFileType(res.data.fileType);
            setFileUrl(res.data.fileUrl);
        } catch (err) {
            console.error("Failed to fetch document content", err);
            setError("Unable to render document stream.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 bg-slate-50/50 dark:bg-slate-900/20">
                <Loader2 className="w-6 h-6 animate-spin text-primary/40" />
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Streaming {isBase ? 'Baseline' : 'Target'} Node...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-8 text-center bg-rose-50/10">
                <AlertCircle className="w-8 h-8 text-rose-500/40" />
                <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight">{error}</p>
            </div>
        );
    }

    // For PDF, we show the iframe if we want high fidelity, but the user wants real content.
    // If it's a PDF, we can use the iframe for better visuals, or show the extracted text.
    // Let's use iframe for PDFs and text for everything else.
    
    const isPDF = fileType === 'application/pdf' || fileUrl?.toLowerCase().endsWith('.pdf');

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-950">
            <div className="h-10 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 shrink-0">
                <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 truncate max-w-[150px]">
                        {title}
                    </span>
                    {isBase && <span className="text-[7px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase tracking-widest ml-2">Base</span>}
                </div>
                <div className="flex items-center gap-1">
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {isPDF ? (
                    <iframe 
                        src={`${fileUrl}#toolbar=0`} 
                        className="w-full h-full border-none rounded-lg"
                        title={title}
                    />
                ) : (
                    <div className="max-w-prose mx-auto">
                        <pre className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap font-sans">
                            {content}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileViewer;
