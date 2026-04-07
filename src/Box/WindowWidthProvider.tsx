import { createContext, useContext, ReactNode } from 'react';
import { useWindowWidth } from '../hooks/useWindowWidth';

const WindowWidthContext = createContext(0);

type WindowWidthProviderProps = {
    children: ReactNode;
};

export const WindowWidthProvider = ({ children }: WindowWidthProviderProps) => {
    const width = useWindowWidth();
    return <WindowWidthContext.Provider value={width}>{children}</WindowWidthContext.Provider>;
};

export const useWindowWidthContext = () => {
    return useContext(WindowWidthContext);
    // const context = useContext(WindowWidthContext);
    // // if (context === undefined) {
    // //     throw new Error('useWindowWidthContext must be used within a WindowWidthProvider');
    // // }
    // return context;
};
