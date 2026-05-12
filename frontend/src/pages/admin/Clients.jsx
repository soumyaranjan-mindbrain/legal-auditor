import React from 'react';
import {
    Users,
    Search,
    Filter,
    MoreHorizontal,
    Shield,
    ExternalLink,
    Mail,
    Building2,
    Calendar
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../lib/utils';

const Clients = () => {
    const clients = [
        {
            name: 'Global Finance Corp',
            id: 'GFC-882',
            contact: 'sarah.j@globfin.ai',
            tier: 'Enterprise',
            status: 'Optimal',
            joined: 'Apr 2024',
            clearance: 'L3 Audit',
            color: 'text-emerald-500 bg-emerald-500/5'
        },
        {
            name: 'Nexus Legal Ltd',
            id: 'NXL-412',
            contact: 'admin@nexus.io',
            tier: 'Sovereign',
            status: 'Verified',
            joined: 'Dec 2023',
            clearance: 'L5 Sovereign',
            color: 'text-blue-500 bg-blue-500/5'
        },
        {
            name: 'Starlight Ventures',
            id: 'STV-009',
            contact: 'ops@starlight.v',
            tier: 'Incubator',
            status: 'Pending',
            joined: 'Jan 2025',
            clearance: 'L1 Standard',
            color: 'text-amber-500 bg-amber-500/5'
        },
        {
            name: 'Meridian Capital',
            id: 'MER-551',
            contact: 'ops@merid.cap',
            tier: 'Enterprise',
            status: 'Optimal',
            joined: 'Jun 2024',
            clearance: 'L3 Audit',
            color: 'text-emerald-500 bg-emerald-500/5'
        },
    ];

    const headerActions = React.useMemo(() => (
        <div className="flex items-center gap-2">
            <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                    className="h-8 w-48 rounded-[4px] border border-zinc-200 dark:border-zinc-800 bg-background pl-8 text-[10px] outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
                    placeholder="Identify specific entity..."
                />
            </div>
            <Button variant="outline" size="sm" className="h-8 items-center gap-2 border-zinc-200 dark:border-zinc-800 bg-transparent">
                <Filter className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Filter</span>
            </Button>
            <Button size="sm" className="h-8 px-3 text-[9px] font-bold uppercase tracking-widest">Register Entity</Button>
        </div>
    ), []);

    useHeader('Client Management', headerActions);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Client Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.map((client) => (
                    <div key={client.id} className="group border border-zinc-200 dark:border-zinc-800 rounded-[6px] p-6 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                                    {client.name.charAt(0)}
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                                        {client.name}
                                        <ExternalLink className="w-3 h-3 text-muted-foreground/30" />
                                    </h3>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest flex items-center gap-1.5">
                                        <Shield className="w-3 h-3 text-primary/50" /> {client.clearance}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/40 hover:text-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6">
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Institutional Identity</p>
                                <p className="text-[11px] font-mono flex items-center gap-2"><Building2 className="w-3 h-3 opacity-30" /> {client.id}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Clearance Level</p>
                                <p className="text-[11px] font-bold uppercase tracking-widest">{client.tier}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Primary Registry</p>
                                <p className="text-[11px] flex items-center gap-2"><Mail className="w-3 h-3 opacity-30" /> {client.contact}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Initiation Date</p>
                                <p className="text-[11px] flex items-center justify-end gap-2"><Calendar className="w-3 h-3 opacity-30" /> {client.joined}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900 border-dashed">
                            <span className={cn("text-[8px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest", client.color.replace('bg-', 'border-').replace('/5', '/10'), client.color)}>
                                {client.status} Status
                            </span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800">Clearance</Button>
                                <Button variant="outline" size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest border-zinc-200 dark:border-zinc-800">Records</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;
