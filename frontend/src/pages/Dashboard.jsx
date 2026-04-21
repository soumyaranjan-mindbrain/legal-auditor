import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-cream py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20">
                    <h1 className="text-6xl mb-4">Welcome to Legal Auditor</h1>
                    <p className="text-xl text-plum-muted max-w-2xl leading-relaxed">
                        A premium intelligence interface for modern legal compliance and risk auditing.
                        Designed for accuracy, built for scale.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Example cards using tonal hierarchy instead of borders (No-Line Rule) */}
                    <div className="bg-cream-card rounded-lg p-8 h-64 flex flex-col justify-end">
                        <span className="text-sm uppercase tracking-widest text-plum-muted mb-2">Compliance</span>
                        <h3 className="text-2xl">Risk Overview</h3>
                    </div>

                    <div className="bg-cream-elevated rounded-lg p-8 h-64 flex flex-col justify-end italic">
                        <span className="text-sm uppercase tracking-widest text-plum-muted mb-2">Audit Logs</span>
                        <h3 className="text-2xl">Recent Activity</h3>
                    </div>

                    <div className="bg-plum text-cream-card rounded-lg p-8 h-64 flex flex-col justify-end">
                        <span className="text-sm uppercase tracking-widest text-cream/60 mb-2">Intelligence</span>
                        <h3 className="text-2xl text-cream">AI Insights</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
