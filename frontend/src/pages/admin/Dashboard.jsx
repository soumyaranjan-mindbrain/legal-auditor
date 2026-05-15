import React, { useState, useEffect } from 'react';
import { Users, FileText, FileSearch, Loader2, ChevronLeft, ChevronRight, Activity, ArrowUpRight } from "lucide-react";
import { cn } from '../../lib/utils';
import { useHeader } from '../../context/HeaderContext';
import api from '../../lib/api';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const AdminDashboard = () => {
    const today = new Date();
    const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
    const [viewYear, setViewYear]   = useState(today.getFullYear());

    const [stats, setStats]       = useState(null);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [chartLoading, setChartLoading] = useState(false);

    const fetchAll = async (month, year, isInitial = false) => {
        if (isInitial) setLoading(true);
        else setChartLoading(true);

        try {
            const [statsRes, activityRes] = await Promise.all([
                isInitial ? api.get('/admin/stats') : Promise.resolve(null),
                api.get(`/admin/activity?month=${month + 1}&year=${year}`)
            ]);
            
            if (statsRes) setStats(statsRes.data.data);
            setActivity(activityRes.data.data || []);
        } catch (err) {
            console.error('Admin dashboard fetch error:', err);
        } finally {
            setLoading(false);
            setChartLoading(false);
        }
    };

    useEffect(() => {
        fetchAll(viewMonth, viewYear, !stats);
    }, [viewMonth, viewYear]);

    const handleMonthChange = (delta) => {
        let m = viewMonth + delta;
        let y = viewYear;
        if (m < 0)  { m = 11; y -= 1; }
        if (m > 11) { m = 0;  y += 1; }
        setViewMonth(m);
        setViewYear(y);
    };

    useHeader('Admin Dashboard');

    const kpiCards = [
        { label: 'Total Clients', value: stats?.totalClients ?? '—', icon: Users,       cls: 'kpi-indigo' },
        { label: 'Total Uploads', value: stats?.totalUploads ?? '—', icon: FileText,    cls: 'kpi-rose'   },
        { label: 'Total Reports', value: stats?.totalReports ?? '—', icon: FileSearch,  cls: 'kpi-violet' },
    ];

    // Parse date without timezone shift: split YYYY-MM-DD directly
    const formatDay = (dateStr) => {
        const parts = dateStr.split('-');
        return parseInt(parts[2], 10); // day number
    };

    const formatTooltipLabel = (dateStr) => {
        const [y, m, d] = dateStr.split('-');
        return `${parseInt(d)} ${MONTHS[parseInt(m) - 1]} ${y}`;
    };

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground/20" />
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-10">

            {/* Elegant Pill KPI Cards: Text-Left, Data-Right */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {kpiCards.map((card, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            'flex items-center justify-between px-7 py-3.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 group',
                            card.cls
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm">
                                <card.icon className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <span className="text-[10px] font-black text-slate-800/50 dark:text-slate-300/50 uppercase tracking-[0.2em]">
                                {card.label}
                            </span>
                        </div>
                        <div className="text-xl font-black tracking-tighter text-slate-900 dark:text-white bg-white/40 dark:bg-black/20 px-4 py-1 rounded-full border border-white/50 dark:border-white/5">
                            {card.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Activity Chart - Theme-Aware Adaptive Card */}
            <div className="p-8 rounded-[32px] border border-amber-200 dark:border-slate-800 bg-amber-100 dark:bg-slate-950 shadow-xl shadow-amber-200/20 dark:shadow-none relative overflow-hidden group">
                {/* Subtle Ambient Depth - Theme Aware */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 dark:bg-primary/5 rounded-full blur-[80px] -mr-40 -mt-40 pointer-events-none" />
                
                {/* Header row */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h3 className="text-xl font-black tracking-tight uppercase text-slate-950 dark:text-white">Platform Engagement</h3>
                        <div className="flex items-center gap-4 mt-1.5">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-800/60 dark:text-slate-400">Uploads</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-800/60 dark:text-slate-400">Reports</span>
                            </div>
                        </div>
                    </div>

                    {/* Month Navigator - Refined Layering */}
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-none ring-1 ring-slate-100 dark:ring-slate-700/50">
                        <button
                            onClick={() => handleMonthChange(-1)}
                            className="p-2.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 hover:text-primary transition-all duration-300 active:scale-90"
                        >
                            <ChevronLeft className="w-4 h-4" strokeWidth={3} />
                        </button>

                        <div className="px-6 min-w-[180px] text-center border-x border-slate-100 dark:border-slate-700">
                            <span className="text-[12px] font-black uppercase tracking-[0.25em] text-primary dark:text-indigo-400">
                                {MONTHS[viewMonth]} {viewYear}
                            </span>
                        </div>

                        <button
                            onClick={() => handleMonthChange(1)}
                            className="p-2.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 hover:text-primary transition-all duration-300 active:scale-90"
                        >
                            <ChevronRight className="w-4 h-4" strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* Bar Chart - Refined Data Layering */}
                <div className="relative z-10 h-[360px]">
                    {chartLoading && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-50/40 dark:bg-slate-900/40 backdrop-blur-[4px] transition-all duration-500 rounded-3xl">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-primary/60" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Synchronizing Data</span>
                            </div>
                        </div>
                    )}
                    
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={activity}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            barCategoryGap="35%"
                            barGap={6}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 800, fill: '#64748b' }}
                                dy={15}
                                interval={1}
                                tickFormatter={formatDay}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 800, fill: '#64748b' }}
                                allowDecimals={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(0,0,0,0.03)', radius: 10 }}
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '20px',
                                    padding: '16px 20px',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    color: '#fff',
                                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(10px)'
                                }}
                                itemStyle={{ color: '#94a3b8', padding: '4px 0' }}
                                labelStyle={{ color: '#fff', marginBottom: 8, fontSize: '12px' }}
                                labelFormatter={formatTooltipLabel}
                            />
                            <Bar 
                                dataKey="uploads" 
                                name="Document Uploads" 
                                fill="#6366f1" 
                                radius={[6, 6, 0, 0]} 
                                barSize={12}
                                animationDuration={1000} 
                            />
                            <Bar 
                                dataKey="reports" 
                                name="AI Reports" 
                                fill="#f43f5e" 
                                radius={[6, 6, 0, 0]} 
                                barSize={12}
                                animationDuration={1300} 
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
