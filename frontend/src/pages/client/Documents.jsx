import React, { useState, useEffect } from 'react';
import {
    Search,
    FileText,
    Eye,
    MoreVertical,
    Filter,
    ArrowUpDown,
    Download,
    Hash,
    Trash2,
    Loader2,
    AlertCircle,
    X,
    AlertTriangle
} from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';

import { useHeader } from '../../context/HeaderContext';
import api from '../../lib/api';

import { createPortal } from 'react-dom';

const DeleteModal = ({ isOpen, onClose, onConfirm, fileName, isDeleting }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 relative z-10">
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 flex items-center justify-center text-rose-600 shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">Delete Document</h3>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Permanent Repository Action</p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6">
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            Are you sure you want to permanently remove <span className="font-black text-slate-900 dark:text-white underline decoration-rose-500/30 underline-offset-4">{fileName}</span>?
                        </p>
                        <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mt-3 flex items-center gap-2">
                            <Trash2 className="w-3 h-3" /> This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button 
                            variant="ghost" 
                            className="flex-1 h-11 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
                            onClick={onClose}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="flex-1 h-11 text-xs font-black uppercase tracking-widest bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20 rounded-lg"
                            onClick={onConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Confirm Delete"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [auditedDocIds, setAuditedDocIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = React.useState(25);

    // Delete Modal State
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, docId: null, fileName: '' });
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const [docsRes, auditsRes] = await Promise.all([
                api.get('/documents'),
                api.get('/audit/all')
            ]);
            
            setDocuments(docsRes.data);
            
            const auditedIds = new Set(auditsRes.data
                .filter(a => a.status === 'completed')
                .map(a => typeof a.targetDocumentId === 'object' ? a.targetDocumentId._id : a.targetDocumentId)
            );
            setAuditedDocIds(auditedIds);
        } catch (err) {
            console.error("Failed to fetch documents", err);
            setError('Failed to load documents. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const confirmDelete = async () => {
        if (!deleteModal.docId) return;
        
        try {
            setIsDeleting(true);
            await api.delete(`/documents/${deleteModal.docId}`);
            setDocuments(documents.filter(doc => doc._id !== deleteModal.docId));
            setDeleteModal({ isOpen: false, docId: null, fileName: '' });
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete document cluster node.");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredDocs = documents.filter(doc => 
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <Input
                    className="h-10 pl-8 pr-3 text-sm w-full md:w-64 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-md focus:border-primary transition-all shadow-sm dark:shadow-none"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    ), [searchQuery]);

    useHeader('Document Directory', headerActions);

    return (
        <div className="h-full flex flex-col space-y-6 min-h-0">
            {/* Delete Confirmation Modal */}
            <DeleteModal 
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, docId: null, fileName: '' })}
                onConfirm={confirmDelete}
                fileName={deleteModal.fileName}
                isDeleting={isDeleting}
            />

            {/* Document Registry Table Container */}
            <div className="flex-1 min-h-0 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 shadow-sm dark:shadow-none overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Synchronizing Vault...</p>
                        </div>
                    ) : error ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 text-rose-500">
                            <AlertCircle className="w-10 h-10" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">{error}</p>
                        </div>
                    ) : filteredDocs.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700" strokeWidth={1.5} />
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">Repository Empty</p>
                            <Link to="/client/upload">
                                <Button variant="link" className="text-xs font-bold text-primary">Upload First Document</Button>
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 z-20">
                                <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-3.5">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-800 dark:text-slate-300">
                                            Document Name <ArrowUpDown className="w-2.5 h-2.5 opacity-50" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-3.5">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-slate-800 dark:text-slate-300">
                                            Created At
                                        </div>
                                    </th>
                                    <th className="px-6 py-3.5 text-right">
                                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-800 dark:text-slate-300">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredDocs.slice(0, pageSize).map((doc, idx) => (
                                    <tr key={doc._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-500 group-hover:bg-primary group-hover:text-white dark:group-hover:text-slate-900 group-hover:border-primary transition-all shadow-sm">
                                                    <FileText className="w-4 h-4" strokeWidth={2} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-[13px] font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{doc.fileName}</div>
                                                        {doc.isSource ? (
                                                            <span className="text-[9px] font-black bg-slate-900 dark:bg-primary text-white dark:text-slate-900 px-2 py-0.5 rounded uppercase tracking-[0.1em] shadow-sm">Base</span>
                                                        ) : (
                                                            <span className={cn(
                                                                "text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-[0.2em] border shadow-sm",
                                                                auditedDocIds.has(doc._id) 
                                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900" 
                                                                    : "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900"
                                                            )}>
                                                                {auditedDocIds.has(doc._id) ? 'Audited' : 'Pending'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-600 dark:text-slate-500 uppercase font-black">
                                                        <Hash className="w-2.5 h-2.5" /> {doc._id.substring(0, 8)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                                            {new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 transition-opacity">
                                                <Link to={`/client/documents/${doc._id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 dark:text-slate-400 hover:text-primary dark:hover:text-primary">
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        setDeleteModal({ isOpen: true, docId: doc._id, fileName: doc.fileName });
                                                    }}
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-rose-500"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center py-2 shrink-0 border-t border-slate-100 dark:border-slate-800 mt-2">
                <div className="flex items-center gap-6">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                        Showing 1-{Math.min(pageSize, filteredDocs.length)} of {filteredDocs.length}
                    </p>
                    <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-6">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Page Size:</span>
                        {[25, 50].map(size => (
                            <button
                                key={size}
                                onClick={() => setPageSize(size)}
                                className={cn(
                                    "text-[10px] font-bold px-2 py-1 rounded transition-all",
                                    pageSize === size 
                                        ? "text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 shadow-sm" 
                                        : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                                )}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="btn-secondary h-8 px-4 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800" disabled>Previous</Button>
                    <Button variant="ghost" size="sm" className="btn-secondary h-8 px-4 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800" disabled={filteredDocs.length <= pageSize}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default Documents;
