import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
    Users,
    Search,
    Filter,
    MoreHorizontal,
    Shield,
    ExternalLink,
    Mail,
    Building2,
    Calendar,
    Loader2,
    Trash2,
    ArrowRight,
    AlertTriangle,
    X,
    Activity,
    FileText,
    TrendingUp
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { useHeader } from '../../context/HeaderContext';
import api from '../../lib/api';
import { cn } from '../../lib/utils';

const UserDetailsModal = ({ isOpen, onClose, client }) => {
    if (!isOpen || !client) return null;
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-[600px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-400">
                {/* Modal Header */}
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20 relative">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={onClose}
                        className="absolute top-6 right-6 h-8 w-8 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-primary/20">
                            {client.name?.charAt(0) || 'U'}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tighter uppercase">{client.name}</h2>
                        </div>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-8">
                    {/* Grid Info */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Email</p>
                            <p className="text-sm font-bold flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary/40" /> {client.email}
                            </p>
                        </div>
                        <div className="space-y-1.5 text-right">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Joined</p>
                            <p className="text-sm font-bold">
                                {new Date(client.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Stats Matrix */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10 text-center space-y-1 hover:border-primary/20 transition-all">
                            <FileText className="w-4 h-4 mx-auto text-primary/40 mb-1" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Files</p>
                            <p className="text-lg font-black leading-none">{client.fileCount || 0}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10 text-center space-y-1 hover:border-primary/20 transition-all">
                            <TrendingUp className="w-4 h-4 mx-auto text-emerald-500/40 mb-1" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Reports</p>
                            <p className="text-lg font-black leading-none">{client.reportCount || 0}</p>
                        </div>
                        <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10 text-center space-y-1 hover:border-primary/20 transition-all">
                            <Activity className="w-4 h-4 mx-auto text-blue-500/40 mb-1" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
                            <p className="text-sm font-bold uppercase tracking-widest text-emerald-500">Active</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
};

const DeleteModal = ({ isOpen, onClose, onConfirm, clientName }) => {
    if (!isOpen) return null;
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-[400px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-2">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold tracking-tight">Delete this client?</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Are you sure you want to remove <span className="font-bold text-slate-900 dark:text-slate-100">{clientName}</span>? 
                            All their files and reports will be deleted too. You can't undo this.
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 flex gap-3">
                    <Button 
                        variant="outline" 
                        onClick={onClose}
                        className="flex-1 h-11 text-[11px] font-black uppercase tracking-widest border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={onConfirm}
                        className="flex-1 h-11 text-[11px] font-black uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-600/20"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
};

const Clients = () => {
    const [data, setData] = useState({
        clients: [],
        loading: true,
        error: null
    });

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        client: null
    });

    const [viewModal, setViewModal] = useState({
        isOpen: false,
        client: null
    });

    const fetchClients = async () => {
        try {
            const res = await api.get('/admin/clients');
            if (res.data.success) {
                setData({
                    clients: res.data.data,
                    loading: false,
                    error: null
                });
            }
        } catch (err) {
            console.error("Fetch clients failed:", err);
            setData(prev => ({ ...prev, loading: false, error: "System failed to sync client records" }));
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.client) return;
        const id = deleteModal.client._id;
        
        try {
            const res = await api.delete(`/admin/clients/${id}`);
            if (res.data.success) {
                setData(prev => ({
                    ...prev,
                    clients: prev.clients.filter(c => c._id !== id)
                }));
                setDeleteModal({ isOpen: false, client: null });
            }
        } catch (err) {
            console.error("Delete client failed:", err);
            alert("System error: Failed to purge entity.");
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    useHeader('Client Management');

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Client List */}
            <div className="flex flex-col gap-3">
                {data.loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Syncing platform entities...</p>
                    </div>
                ) : data.error ? (
                    <div className="p-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                        <p className="text-xs font-bold text-risk-red uppercase tracking-widest">{data.error}</p>
                    </div>
                ) : data.clients.length === 0 ? (
                    <div className="p-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                        <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">No entities registered on platform</p>
                    </div>
                ) : (
                    data.clients.map((client) => (
                        <div key={client._id} className="group grid grid-cols-[1.5fr_1fr_0.5fr] items-center border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-4 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all px-8">
                            {/* Left: Identity */}
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center font-bold text-lg border border-zinc-100 dark:border-zinc-800 shadow-sm group-hover:scale-105 transition-transform">
                                    {client.name?.charAt(0) || 'U'}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 uppercase">{client.name || 'Unnamed Tenant'}</h3>
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 flex items-center gap-1.5 uppercase tracking-wider">
                                        <Mail className="w-3 h-3" /> {client.email}
                                    </p>
                                </div>
                            </div>

                            {/* Middle: Joined */}
                            <div className="text-center space-y-1">
                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Joined</p>
                                <p className="text-[11px] font-bold">{new Date(client.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex justify-end h-10">
                                <div className="flex items-center gap-2 border-l border-zinc-100 dark:border-zinc-900 pl-6">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                        onClick={() => setDeleteModal({ isOpen: true, client })}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-muted-foreground/40 hover:text-primary hover:bg-primary/5"
                                        onClick={() => setViewModal({ isOpen: true, client })}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <DeleteModal 
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, client: null })}
                onConfirm={handleDelete}
                clientName={deleteModal.client?.name}
            />

            <UserDetailsModal 
                isOpen={viewModal.isOpen}
                onClose={() => setViewModal({ isOpen: false, client: null })}
                client={viewModal.client}
            />
        </div>
    );
};

export default Clients;
