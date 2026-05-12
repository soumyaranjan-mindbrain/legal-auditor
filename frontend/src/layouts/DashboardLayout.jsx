import React, { useState, useContext } from 'react';
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
    BookOpen,
} from "lucide-react";
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';
import { CommandBar } from '../components/shared/CommandBar';
import { AIPanel } from '../components/AIPanel';
import { useHeader } from '../context/HeaderContext';
import { ThemeToggle } from '../components/theme-toggle';
import { AuthContext } from '../context/AuthContext';

const DashboardLayout = ({ children, role = 'client', title: propTitle, headerActions: propActions, showRightPanel = false, rightPanelContent }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
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

    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const navItems = getNavItems();

    const handleSignOut = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary selection:text-white relative">
            <CommandBar />
            
            {/* Premium Sign-Out Modal */}
            {showSignOutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setShowSignOutModal(false)} />
                    <div className="relative w-full max-w-[380px] bg-[#fffcf0] dark:bg-[#0c0a09] border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        <div className="p-8 text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-900/50">
                                <LogOut className="w-8 h-8 text-rose-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Terminate Session?</h3>
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                    You are about to securely sign out of the <span className="text-primary">Mindex Auditor</span> platform.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button 
                                    onClick={handleSignOut}
                                    className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg shadow-rose-600/20 transition-all active:scale-[0.98]"
                                >
                                    Confirm Sign Out
                                </Button>
                                <Button 
                                    variant="ghost"
                                    onClick={() => setShowSignOutModal(false)}
                                    className="w-full h-11 text-slate-500 dark:text-slate-400 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl"
                                >
                                    Stay Connected
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Top Navbar: Premium Enterprise Header */}
            <header className="fixed top-0 left-0 right-0 h-14 bg-[#fffcf0] dark:bg-[#0c0a09] border-b border-amber-200/50 dark:border-amber-900/30 z-50 flex items-center shrink-0 shadow-[0_1px_2px_rgba(251,191,36,0.05)] dark:shadow-none">
                <div className="w-[200px] h-full flex items-center px-6 border-r border-amber-200/50 dark:border-amber-900/30 shrink-0 bg-[#fffcf0] dark:bg-[#0c0a09]">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                            <img src="/favicon_mbi.png" alt="Mindex Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[13px] font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase group-hover:text-primary transition-colors">Mindex</span>
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-between px-6 bg-[#fffcf0] dark:bg-[#0c0a09]">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">{title || 'Dashboard'}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {headerActions && (
                            <div className="flex items-center gap-2 mr-2">
                                {headerActions}
                            </div>
                        )}


                        <ThemeToggle variant="minimal" />
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
                        <div className="flex items-center gap-3 cursor-pointer group px-2 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all" onClick={() => navigate(role === 'client' ? '/client/profile' : `/${role}/profile`)}>
                            <div className="text-right hidden sm:block">
                                <p className="text-[11px] font-bold leading-none text-slate-900 dark:text-slate-100">{user?.fullName || user?.name || 'Authorized User'}</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-all shadow-sm">
                                <User className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 mt-14 min-h-0 overflow-hidden relative">
                {/* Left Column: Premium SaaS Sidebar */}
                <aside
                    className={cn(
                        "hidden md:flex flex-col border-r border-amber-200/50 dark:border-amber-900/30 bg-[#fffcf0] dark:bg-[#0c0a09] transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-40 will-change-[width]",
                        isCollapsed ? "w-[72px]" : "w-[200px]"
                    )}
                >
                    <ScrollArea className="flex-1 py-6">
                        <div className={cn("space-y-1.5 px-3 transition-all duration-300")}>
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "flex items-center h-9 rounded-lg text-[13px] transition-all duration-200 group relative",
                                            isActive
                                                ? "bg-slate-900 dark:bg-primary text-white dark:text-slate-900 shadow-md shadow-slate-900/10 dark:shadow-primary/20"
                                                : "text-slate-700 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100",
                                            isCollapsed ? "justify-center px-0" : "px-3"
                                        )}
                                        title={isCollapsed ? item.label : ""}
                                    >
                                        <div className="flex items-center justify-center shrink-0">
                                            <Icon className={cn("h-4 w-4 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")} strokeWidth={isActive ? 2.5 : 2} />
                                        </div>
                                        {!isCollapsed && (
                                            <span className="ml-3 font-semibold whitespace-nowrap overflow-hidden tracking-tight">
                                                {item.label}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </ScrollArea>

                    <div className={cn("p-3 pb-8 border-t border-slate-100 dark:border-slate-900 space-y-1.5")}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "w-full text-slate-600 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 h-9 justify-start transition-all duration-200 rounded-lg",
                                isCollapsed ? "justify-center px-0" : "px-3"
                            )}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <ChevronLeft className={cn("h-4 w-4 shrink-0 transition-all duration-300", isCollapsed ? "rotate-180" : "rotate-0")} strokeWidth={2} />
                            {!isCollapsed && <span className="ml-3 text-[13px] font-semibold">Collapse</span>}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "w-full text-slate-700 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 h-9 justify-start transition-all duration-200 rounded-lg",
                                isCollapsed ? "justify-center px-0" : "px-3"
                            )}
                            onClick={() => setShowSignOutModal(true)}
                        >
                            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
                            {!isCollapsed && <span className="ml-3 text-[13px] font-semibold">Sign Out</span>}
                        </Button>
                    </div>
                </aside>

                {/* Center Column: Fluid Content Area */}
                <main className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden relative">
                    <div className={cn(
                        "p-6 md:p-10 mx-auto w-full h-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto custom-scrollbar pb-24 md:pb-10 z-10",
                        isCollapsed ? "max-w-[1600px]" : "max-w-[1400px]"
                    )}>
                        {children}
                    </div>

                    {/* Mobile Navigation (Minimal Pill) */}
                    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] h-14 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl z-50 flex items-center justify-around px-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        {navItems.slice(0, 4).map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex flex-col items-center justify-center transition-all duration-200 w-10 h-10 rounded-xl",
                                        isActive ? "bg-slate-900 dark:bg-primary text-white dark:text-slate-900 shadow-lg shadow-slate-900/10 dark:shadow-primary/20" : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                                    )}
                                >
                                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                                </Link>
                            );
                        })}
                    </div>
                </main>

                {/* Right Column: Analysis Panel (Premium Sidebar) */}
                {showRightPanel && (
                    <aside className="w-[340px] border-l border-amber-200/50 dark:border-amber-900/30 bg-[#fffcf0]/50 dark:bg-[#0c0a09]/50 backdrop-blur-sm overflow-hidden flex flex-col z-20">
                        <div className="h-14 flex items-center px-6 border-b border-amber-200/50 dark:border-amber-900/30 shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Analysis Center</span>
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
