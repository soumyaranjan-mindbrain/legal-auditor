import React, { useState, useEffect } from 'react';
import { 
    BookOpen, 
    Search, 
    FileText, 
    Download, 
    ExternalLink, 
    Shield, 
    Scale, 
    Clock,
    ChevronRight,
    Loader2
} from "lucide-react";
import { useHeader } from '../../context/HeaderContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import api from '../../lib/api';

const Playbook = () => {
    const [playbooks, setPlaybooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchPlaybooks = async () => {
        try {
            setLoading(true);
            const res = await api.get('/playbooks');
            setPlaybooks(res.data || []);
        } catch (err) {
            console.error("Failed to fetch playbooks", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaybooks();
    }, []);

    const filteredPlaybooks = playbooks.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const headerActions = (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
                placeholder="Search playbooks..." 
                className="pl-10 h-10 w-64 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );

    useHeader('Legal Playbooks', headerActions);

    if (loading) return (
        <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Accessing Legal Archives...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Featured Header */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-12 text-white">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Scale className="w-64 h-64 rotate-12" strokeWidth={1} />
                </div>
                <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <Shield className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Compliance Framework</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Mindex Intelligence <br/>Playbook Registry</h1>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-lg">
                        Access our curated library of legal standards, compliance playbooks, and regulatory frameworks. Use these as a baseline for your automated audits.
                    </p>
                </div>
            </div>

            {/* Playbook Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaybooks.length > 0 ? (
                    filteredPlaybooks.map((playbook) => (
                        <div 
                            key={playbook._id}
                            className="group relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5"
                        >
                            <div className="flex flex-col h-full space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-all">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        <Clock className="w-3 h-3" />
                                        {new Date(playbook.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                                        {playbook.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                                        {playbook.description || "Standard legal operating procedure and compliance guidelines for enterprise auditing."}
                                    </p>
                                </div>

                                <div className="pt-4 mt-auto flex items-center gap-3">
                                    <Button 
                                        variant="outline" 
                                        className="flex-1 h-10 text-[10px] font-black uppercase tracking-widest border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white hover:border-primary transition-all"
                                        onClick={() => playbook.fileUrl && window.open(playbook.fileUrl, '_blank')}
                                    >
                                        <Download className="w-3.5 h-3.5 mr-2" />
                                        Download
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="h-10 w-10 text-slate-400 hover:text-primary"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-24 flex flex-col items-center justify-center space-y-4 opacity-40">
                        <FileText className="w-16 h-16 text-slate-300" strokeWidth={1} />
                        <div className="text-center">
                            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">No Playbooks Found</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Registry database currently empty</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Playbook;
