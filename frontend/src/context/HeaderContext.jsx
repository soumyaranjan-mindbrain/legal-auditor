import React, { createContext, useContext, useState, useEffect } from 'react';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [title, setTitle] = useState('');
    const [actions, setActions] = useState(null);

    return (
        <HeaderContext.Provider value={{ title, setTitle, actions, setActions }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = (initialTitle, initialActions) => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }

    const { setTitle, setActions, title: currentTitle, actions: currentActions } = context;

    useEffect(() => {
        if (initialTitle) setTitle(initialTitle);
        if (initialActions) setActions(initialActions);

        return () => {
            if (initialTitle) {
                context.setTitle(prev => prev === initialTitle ? '' : prev);
            }
            if (initialActions) {
                context.setActions(prev => prev === initialActions ? null : prev);
            }
        };
    }, [initialTitle, initialActions, setTitle, setActions]);

    return context;
};

export const HeaderConsumer = ({ children }) => {
    const context = useContext(HeaderContext);
    return children(context);
};
