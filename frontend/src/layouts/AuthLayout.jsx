import React from 'react';

// Centered layout for authentication pages
const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-[400px]">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
