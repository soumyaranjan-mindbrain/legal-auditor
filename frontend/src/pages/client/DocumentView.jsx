import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, FileText, AlertCircle } from "lucide-react";
import { Button } from '../../components/ui/button';
import FileViewer from '../../components/FileViewer';
import { useHeader } from '../../context/HeaderContext';
import api from '../../lib/api';

const DocumentView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doc, setDoc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/documents/${id}`);
                setDoc(res.data);
            } catch (err) {
                console.error("Failed to fetch document", err);
                setError('Failed to retrieve document from vault.');
            } finally {
                setLoading(false);
            }
        };
        fetchDoc();
    }, [id]);

    const backButton = React.useMemo(() => (
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/client/documents')}
            className="h-9 px-0 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-black uppercase text-[10px] tracking-widest gap-2"
        >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Registry
        </Button>
    ), [navigate]);

    useHeader(backButton, null);

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Accessing Vault Node...</p>
            </div>
        );
    }

    if (error || !doc) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <AlertCircle className="w-10 h-10 text-rose-500" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">{error || 'Document not found'}</p>
                <Button onClick={() => navigate('/client/documents')} variant="outline" className="h-10 px-6 rounded-lg font-black uppercase text-[10px] tracking-widest border-slate-200">
                    Return to Directory
                </Button>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col bg-white dark:bg-[#0c0a09] overflow-hidden">
            <div className="flex-1 min-h-0 overflow-hidden">
                <FileViewer 
                    docId={doc._id} 
                    title={doc.fileName}
                    isBase={doc.isSource}
                />
            </div>
        </div>
    );
};

export default DocumentView;
