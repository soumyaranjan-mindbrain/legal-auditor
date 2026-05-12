import React, { useState, useEffect } from 'react';
import {
    FileText,
    ShieldAlert,
    Clock,
    ArrowUpRight,
    Activity,
    Loader2
} from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

import { useHeader } from '../../context/HeaderContext';
import { RecentActivity, AnalysisAssistant, AnalysisInsights } from '../../components/AIPanel';
import api from '../../lib/api';

const Dashboard = () => {
    const [data, setData] = useState({
        documents: [],
        audits: [],
        loading: true
    });

    const fetchData = async () => {
        try {
            const [docsRes, auditsRes] = await Promise.all([
                api.get('/documents'),
                api.get('/audit/all')
            ]);
            setData({
                documents: docsRes.data,
                audits: auditsRes.data,
                loading: false
            });
        } catch (err) {
            console.error("Dashboard data fetch failed", err);
            setData(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const stats = [
        { label: 'Total Audits', value: data.audits.length, icon: FileText, bgClass: 'kpi-indigo', path: '/client/audit' },
        { label: 'Risk Alerts', value: data.audits.filter(a => a.status === 'Completed').length, icon: ShieldAlert, bgClass: 'kpi-rose', path: '/client/compare' },
        { label: 'Pending Review', value: data.documents.filter(doc => !doc.isSource).length, icon: Clock, bgClass: 'kpi-violet', path: '/client/documents' },
    ];

    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-3">
            <Link to="/client/upload">
                <Button size="sm" className="btn-premium h-8 text-[10px] font-black uppercase tracking-widest px-6 shadow-lg shadow-primary/20">New Upload</Button>
            </Link>
        </div>
    ), []);

    useHeader('Dashboard', headerActions);

    return (
        <div className="space-y-12 h-full flex flex-col">

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                {stats.map((stat, i) => (
                    <Link 
                        key={i} 
                        to={stat.path}
                        className={cn(
                            "kpi-card pill-card transition-all active:scale-[0.98] cursor-pointer group",
                            stat.bgClass
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/40 dark:bg-black/20 flex items-center justify-center border border-white/30 dark:border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                                <stat.icon className="h-4.5 w-4.5 text-current" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-700 dark:text-slate-300 leading-none mb-1">{stat.label}</span>
                                <span className="text-xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">{stat.value}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-px bg-slate-900/10 dark:bg-white/10" />
                            <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-slate-400">
                                <ArrowUpRight className="h-4 w-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Bottom Section: Recent Documents & Insights */}
            <div className="flex-1 min-h-0 flex flex-col gap-8 pb-8">
                <div className="flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-primary" />
                            Recent Document Ingress
                        </h2>
                        <Link to="/client/documents">
                            <Button variant="ghost" size="sm" className="h-7 text-[9px] px-3 uppercase tracking-wider font-bold text-slate-500 hover:text-slate-900 transition-colors">View All</Button>
                        </Link>
                    </div>
                    
                    {data.loading ? (
                        <div className="flex items-center justify-center h-32 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <Loader2 className="w-6 h-6 animate-spin text-primary/30" />
                        </div>
                    ) : data.documents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-32 opacity-20 border border-slate-200 dark:border-slate-800 rounded-xl">
                            <FileText className="w-8 h-8 mb-2" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">No documents found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.documents.slice(0, 3).map((doc, i) => (
                                <div 
                                    key={i} 
                                    className="group relative flex flex-col p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary transition-all duration-300 cursor-pointer overflow-hidden active:scale-[0.98]"
                                    onClick={() => navigate(`/client/audit/${doc._id}`)}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white dark:group-hover:text-slate-900 group-hover:border-primary transition-all">
                                            <FileText className="w-4.5 h-4.5" strokeWidth={1.5} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-emerald-700 dark:text-emerald-400">
                                                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                                Live
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex-1">
                                        <h3 className="text-[13px] font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1">
                                            {doc.fileName}
                                        </h3>
                                        <p className="text-[9px] font-black text-slate-700 dark:text-slate-500 uppercase tracking-wider mt-1">
                                            {new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-300 dark:border-slate-800">
                                        <span className="text-[9px] font-black text-slate-900 dark:text-primary flex items-center gap-1 uppercase tracking-widest">
                                            Analyze <ArrowUpRight className="w-2.5 h-2.5" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* AI Insights Card */}
                <div className="kpi-card p-6 shrink-0 relative group bg-card border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="absolute top-4 right-4 z-20">
                        <Link to="/client/compare">
                            <Button variant="ghost" size="sm" className="h-7 text-[9px] px-3 uppercase tracking-wider font-bold text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-full transition-all">Expand Analysis</Button>
                        </Link>
                    </div>
                    <AnalysisInsights role="client" data={data} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
