import React, { useState, useEffect } from 'react';
import {
    Loader2,
    Activity,
    AlertCircle
} from "lucide-react";
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../lib/utils';
import api from '../../lib/api';

const Compare = () => {
    const [variances, setVariances] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVariances = async () => {
            try {
                setLoading(true);
                const res = await api.get('/audit/all');
                
                // Aggregate all variances across all audits
                let allVariances = res.data.reduce((acc, audit) => {
                    if (!audit.results || !audit.results.clauses) return acc;

                    const docVariances = audit.results.clauses
                        .filter(c => c.status === 'variance' || c.status === 'alert')
                        .map(c => ({
                            title: c.title || 'Untitled Clause',
                            docName: audit.targetDocumentId?.fileName || 'Vault Node',
                            origin: c.baseText || 'No baseline text available',
                            target: c.originalText || 'No target text found',
                            status: c.status === 'alert' ? 'Conflict' : 'Variance',
                            severity: c.severity || 'medium',
                            id: `${audit._id}-${c._id}`
                        }));
                    return [...acc, ...docVariances];
                }, []);

                // Display all variances in natural chronological order
                setVariances(allVariances);
            } catch (err) {
                console.error("Failed to fetch global intelligence stream", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVariances();
    }, []);

    useHeader('Variance Intelligence', null);

    const getCardBackground = (status, severity) => {
        if (severity === 'critical') return 'bg-rose-200/40 dark:bg-rose-950/60 border-rose-500 shadow-[0_8px_30px_-5px_rgba(225,29,72,0.15)] dark:border-rose-600';
        if (status === 'Conflict' || severity === 'high') return 'bg-rose-100/30 dark:bg-rose-950/40 border-rose-400 shadow-[0_8px_25px_-5px_rgba(225,29,72,0.1)] dark:border-rose-700/60';
        return 'bg-amber-100/30 dark:bg-amber-950/20 border-amber-400/50 shadow-[0_8px_20px_-5px_rgba(251,191,36,0.08)] dark:border-amber-800/60';
    };

    const getStatusStyles = (status, severity) => {
        if (status === 'Conflict' || severity === 'high' || severity === 'critical') {
            return 'text-rose-600 bg-rose-100/50 border-rose-200 dark:bg-rose-900/40 dark:border-rose-800';
        }
        return 'text-amber-600 bg-amber-100/50 border-amber-200 dark:bg-amber-900/40 dark:border-amber-800';
    };

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Aggregating Global Intelligence...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {variances.length === 0 ? (
                <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 opacity-40 text-center px-6">
                    <Activity className="w-12 h-12 text-slate-300 dark:text-slate-700" strokeWidth={1.5} />
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">No Intelligence Detected Yet</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 max-w-xs">Run audits in your document registry to see identified variances here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {variances.map((item) => (
                        <div key={item.id} className={cn("rounded-2xl p-8 space-y-6 border", getCardBackground(item.status, item.severity))}>
                            <div className="flex justify-between items-center">
                                <div className="space-y-1.5">
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.15em] text-slate-900 dark:text-white">{item.title}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                        <p className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">{item.docName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {item.severity && (
                                        <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-40">{item.severity} severity</span>
                                    )}
                                    <span className={`${getStatusStyles(item.status, item.severity)} text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-30">
                                        <div className="w-1 h-3 bg-slate-400 rounded-full" />
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Baseline Clause</span>
                                    </div>
                                    <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed pl-4 border-l italic">
                                        "{item.origin}"
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-3 bg-amber-500 rounded-full" />
                                        <span className="text-[8px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.2em]">Negotiated Fragment</span>
                                    </div>
                                    <p className="text-[13px] font-medium text-slate-900 dark:text-slate-200 leading-relaxed pl-4 border-l border-amber-500/20">
                                        "{item.target}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Compare;
