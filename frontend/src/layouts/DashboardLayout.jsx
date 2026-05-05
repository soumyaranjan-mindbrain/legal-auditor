import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Upload,
    Archive,
    FileSearch,
    GitCompare,
    Settings,
    LogOut,
    Bell,
    User,
    Users,
    Activity,
    Shield,
    ChevronLeft,
} from "lucide-react";
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { CommandBar } from '../components/shared/CommandBar';
import { AIPanel } from '../components/AIPanel';
import { useHeader } from '../context/HeaderContext';

const DashboardLayout = ({ children, role = 'client', title: propTitle, headerActions: propActions, showRightPanel = false, rightPanelContent }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { title: contextTitle, actions: contextActions } = useHeader();

    const title = contextTitle || propTitle;
    const headerActions = contextActions || propActions;

    const getNavItems = () => {
        const profilePath = role === 'client' ? '/client/profile' : `/${role}/profile`;
        const common = [
            { path: profilePath, label: 'Settings', icon: Settings },
        ];

        const roles = {
            client: [
                { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { path: '/client/upload', label: 'Upload', icon: Upload },
                { path: '/client/documents', label: 'Directory', icon: Archive },
                { path: '/client/audit', label: 'Audit', icon: FileSearch },
                { path: '/client/compare', label: 'Variance', icon: GitCompare },
            ],
            admin: [
                { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { path: '/admin/clients', label: 'Clients', icon: Users },
                { path: '/admin/uploads', label: 'Uploads', icon: Upload },
                { path: '/admin/reports', label: 'Reports', icon: FileSearch },
                { path: '/admin/settings', label: 'Settings', icon: Settings },
            ],
            'super-admin': [
                { path: '/super-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { path: '/super-admin/admins', label: 'Admins', icon: User },
                { path: '/super-admin/clients', label: 'Clients', icon: Users },
                { path: '/super-admin/analytics', label: 'Analytics', icon: Activity },
                { path: '/super-admin/compliance', label: 'Compliance', icon: Shield },
            ]
        };

        return [...(roles[role] || roles.client), ...common];
    };

    const navItems = getNavItems();

    return (
        <div className="flex flex-col h-screen w-full bg-transparent font-sans tracking-tight antialiased overflow-hidden relative">
            <CommandBar />

            {/* Top Header: Fixed, Non-retracting */}
            <header className="h-14 flex items-center border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md z-40 shrink-0">
                <div className="w-[220px] h-full flex items-center px-6 border-r border-zinc-100 dark:border-zinc-900 shrink-0 bg-panel">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-[4px] flex items-center justify-center shrink-0 shadow-ambient-sm">
                            <span className="text-[10px] font-bold text-primary-foreground">L</span>
                        </div>
                        <span className="text-sm font-bold uppercase tracking-tighter text-foreground">LexAuditor</span>
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-between px-6">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{title || 'Dashboard'}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {headerActions && (
                            <div className="flex items-center gap-2 mr-2">
                                {headerActions}
                            </div>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <Bell className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <div className="h-4 w-px bg-border mx-1" />
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(role === 'client' ? '/client/profile' : `/${role}/profile`)}>
                            <span className="text-xs font-medium hidden md:inline-block">SR</span>
                            <div className="w-7 h-7 rounded-full bg-accent border flex items-center justify-center overflow-hidden">
                                <User className="w-4 h-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 min-h-0 overflow-hidden">
                {/* Left Column: Collapsible Sidebar Rail */}
                <aside
                    className={cn(
                        "flex flex-col border-r border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-30 will-change-[width]",
                        isCollapsed ? "w-[70px]" : "w-[220px]"
                    )}
                >
                    <ScrollArea className="flex-1 py-4">
                        <div className={cn("space-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]", isCollapsed ? "px-0" : "px-3")}>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "flex items-center h-10 rounded-md text-sm transition-[padding] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group relative overflow-hidden justify-start",
                                            isActive
                                                ? "text-primary-foreground font-medium"
                                                : "text-muted-foreground hover:text-foreground",
                                            isCollapsed ? "px-[19px]" : "px-3"
                                        )}
                                        title={isCollapsed ? item.label : ""}
                                    >
                                        {/* Active/Hover Background */}
                                        <div className={cn(
                                            "absolute transition-[inset,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0",
                                            isActive ? "bg-primary opacity-100" : "bg-accent opacity-0 group-hover:opacity-100",
                                            isCollapsed ? "inset-y-1 inset-x-[11px] rounded-lg" : "inset-0 rounded-md"
                                        )} />

                                        <div className="w-8 h-8 flex items-center justify-center shrink-0 z-10 relative">
                                            <Icon className={cn("w-4 h-4 transition-transform duration-300 group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} strokeWidth={1.5} />
                                        </div>
                                        <span className={cn(
                                            "transition-[opacity,max-width,margin,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap overflow-hidden ml-3 z-10 relative",
                                            isCollapsed ? "opacity-0 max-w-0 ml-0 translate-x-4" : "opacity-100 max-w-[150px] translate-x-0"
                                        )}>
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </ScrollArea>

                    <div className={cn("border-t bg-panel/50 space-y-1 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]", isCollapsed ? "p-0 py-3" : "p-3")}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "w-full text-muted-foreground hover:text-destructive overflow-hidden transition-[padding,color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] h-10 justify-start group relative",
                                isCollapsed ? "px-[19px]" : "px-3"
                            )}
                            onClick={() => navigate('/login')}
                        >
                            <div className={cn(
                                "absolute bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-0",
                                isCollapsed ? "inset-y-1 inset-x-[11px] rounded-lg" : "inset-0 rounded-md"
                            )} />

                            <div className="w-8 h-8 flex items-center justify-center shrink-0 z-10 relative">
                                <LogOut className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                            </div>
                            <span className={cn(
                                "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap overflow-hidden ml-3 z-10 relative",
                                isCollapsed ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-[150px]"
                            )}>
                                Sign Out
                            </span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "w-full text-muted-foreground transition-[padding,color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] h-10 justify-start group relative",
                                isCollapsed ? "px-[19px]" : "px-3"
                            )}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {/* Hover Background */}
                            <div className={cn(
                                "absolute bg-accent opacity-0 group-hover:opacity-100 transition-[inset,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0",
                                isCollapsed ? "inset-y-1 inset-x-[11px] rounded-lg" : "inset-0 rounded-md"
                            )} />

                            <div className="w-8 h-8 flex items-center justify-center shrink-0 z-10 relative">
                                <ChevronLeft className={cn("h-4 w-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110", isCollapsed ? "rotate-180" : "rotate-0")} strokeWidth={2} />
                            </div>
                            <span className={cn(
                                "transition-[opacity,max-width,margin,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap overflow-hidden ml-3 z-10 relative",
                                isCollapsed ? "opacity-0 max-w-0 ml-0 translate-x-4" : "opacity-100 max-w-[150px] translate-x-0"
                            )}>
                                Collapse
                            </span>
                        </Button>
                    </div>
                </aside>

                {/* Center Column: Fluid Content Area */}
                <main className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden relative">
                    <div className={cn(
                        "p-8 mx-auto w-full h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        isCollapsed ? "max-w-[1600px]" : "max-w-[1400px]"
                    )}>
                        {children}
                    </div>
                </main>

                {/* Right Column: Analysis Panel (Optional) */}
                {showRightPanel && (
                    <aside className="w-[340px] border-l bg-panel overflow-hidden flex flex-col z-20">
                        <div className="h-14 flex items-center px-6 border-b shrink-0">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Analysis Panel</span>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-6">
                                {rightPanelContent || <AIPanel role={role} />}
                            </div>
                        </ScrollArea>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default DashboardLayout;
