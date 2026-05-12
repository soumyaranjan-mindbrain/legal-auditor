import React from 'react';

const PlaceholderPage = ({ title }) => (
    <div>
        <header className="mb-16">
            <h1 className="text-5xl mb-4">{title}</h1>
            <p className="text-xl text-plum-muted italic">This module is currently initializing with AI compliance protocols...</p>
        </header>
        <div className="h-96 bg-cream-card rounded-[6px] flex items-center justify-center border border-dashed border-plum/10 text-plum/30">
            Visual Intel Coming Soon
        </div>
    </div>
);

export default PlaceholderPage;
