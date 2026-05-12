import React from 'react';
import {
    Users,
    UserPlus,
    Shield,
    MoreHorizontal,
    Mail,
    Lock,
    Search,
    Filter,
    ArrowUpRight,
    CheckCircle2
} from "lucide-react";
import { Button } from '../../components/ui/button';
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../lib/utils';

const AdminManagement = () => {
    const admins = [
        { id: 'ADM-001', name: 'Soumya Ranjan', email: 'soumya@mbi.ai', role: 'Super Admin', status: 'Active', lastLogin: '2m ago' },
        { id: 'ADM-002', name: 'System Auditor', email: 'auditor@mbi.ai', role: 'Security Admin', status: 'Active', lastLogin: '1h ago' },
        { id: 'ADM-003', name: 'Compliance Officer', email: 'compliance@mbi.ai', role: 'Legal Admin', status: 'Inactive', lastLogin: '3d ago' },
    ];

    const headerActions = React.useMemo(() => (
        <Button className="h-9 px-4 rounded-md gap-2 text-[10px] font-bold uppercase tracking-widest shadow-sm">
            <UserPlus className="w-3.5 h-3.5" />
            Provision Administrator
        </Button>
    ), []);

    useHeader('Admin Management', headerActions);

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Admin Registry */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-[6px] bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20">
                    <div className="flex items-center gap-4 flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                            <input
                                placeholder="Search administrative personnel..."
                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Total Personnel: <span className="text-foreground">{admins.length}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-100 dark:border-zinc-900">
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Administrator</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Access Role</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Last Auth</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                            {admins.map((admin) => (
                                <tr key={admin.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-primary border border-zinc-200 dark:border-zinc-800">
                                                {admin.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold tracking-tight">{admin.name}</div>
                                                <div className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                                                    <Mail className="w-3 h-3 opacity-40" />
                                                    {admin.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary">
                                            <Shield className="w-3 h-3" />
                                            {admin.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest",
                                            admin.status === 'Active' ? "text-emerald-500" : "text-muted-foreground/40"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full", admin.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-zinc-300")} />
                                            {admin.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-[11px] font-medium text-muted-foreground">
                                        {admin.lastLogin}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2 px-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdminManagement;
