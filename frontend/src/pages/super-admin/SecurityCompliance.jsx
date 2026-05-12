import React from 'react';
import {
    Shield,
    Lock,
    Zap,
    FileCheck,
    ArrowUpRight,
    ShieldAlert
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

import { useHeader } from '../../context/HeaderContext';

const SecurityCompliance = () => {
    const protocols = [
        { id: 'SEC-101', name: 'AES-256 Rotation', status: 'Enforced', level: 'MAX', type: 'Encryption' },
        { id: 'SEC-204', name: 'MFA Biometrics', status: 'Active', level: 'HIGH', type: 'Access' },
        { id: 'SEC-312', name: 'Session Scoping', status: 'Enforced', level: 'HIGH', type: 'Session' },
        { id: 'SEC-441', name: 'JWT Fingerprinting', status: 'Monitoring', level: 'MED', type: 'Auth' },
    ];

    const reports = [
        { date: '2026-04-23', status: 'PASSED', type: 'SOC2 Type II', checksum: '8F2B...C9D' },
        { date: '2026-04-22', status: 'PASSED', type: 'GDPR Compliance', checksum: 'A4E1...B5F' },
        { date: '2026-04-21', status: 'WARNING', type: 'Hipaa Verification', checksum: 'E2D9...0A1' },
    ];

    const headerActions = React.useMemo(() => (
        <Button variant="destructive" className="h-9 px-4 rounded-md gap-2 text-[10px] font-bold uppercase tracking-widest shadow-sm shadow-risk-red/20">
            <ShieldAlert className="w-3.5 h-3.5" />
            Enter Lockdown Mode
        </Button>
    ), []);

    useHeader('Security & Compliance', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 gap-8">
                {/* Security Protocol Control */}
                <div className="card-premium relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                        <Lock className="w-48 h-48" />
                    </div>
                    <h3 className="text-sm font-bold tracking-tight mb-8 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                        <Zap className="w-4 h-4 text-primary" strokeWidth={2} /> Sentinel Protocol Enforcement
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {protocols.map((p) => (
                            <div key={p.id} className="p-5 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/10 group/row hover:bg-white dark:hover:bg-zinc-900 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{p.id}</div>
                                    <div className={cn(
                                        "text-[8px] font-black px-1.5 py-0.5 rounded border tracking-widest",
                                        p.level === 'MAX' ? 'border-primary/20 text-primary' : 'border-zinc-200 text-muted-foreground'
                                    )}>
                                        {p.level}
                                    </div>
                                </div>
                                <h4 className="text-md font-bold tracking-tight mb-1">{p.name}</h4>
                                <p className="text-[10px] text-muted-foreground font-medium mb-5">{p.type} Layer Enforcement</p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-900">
                                    <span className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest",
                                        p.status === 'Enforced' ? 'text-emerald-500' : 'text-primary'
                                    )}>
                                        {p.status}
                                    </span>
                                    <div className="w-8 h-4 rounded-full bg-primary/20 relative">
                                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compliance Reporting */}
                <div className="card-premium">
                    <h3 className="text-sm font-bold tracking-tight mb-8 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-6">
                        <FileCheck className="w-4 h-4 text-muted-foreground/40" /> Regulatory Compliance Reports
                    </h3>
                    <div className="space-y-4">
                        {reports.map((report, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-[6px] bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        report.status === 'PASSED' ? 'bg-emerald-500 shadow-sm' : 'bg-amber-500'
                                    )} />
                                    <div>
                                        <div className="text-xs font-bold tracking-tight">{report.type}</div>
                                        <div className="text-[9px] text-muted-foreground font-medium mt-0.5">Checksum: <span className="font-mono">{report.checksum}</span></div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold tracking-widest flex items-center gap-2 justify-end">
                                        {report.status} <ArrowUpRight className="w-3 h-3 opacity-30" />
                                    </div>
                                    <div className="text-[10px] text-muted-foreground font-medium mt-0.5">{report.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityCompliance;
