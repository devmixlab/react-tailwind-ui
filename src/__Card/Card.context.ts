import { createContext, useContext } from 'react';
import { type Variant } from '../tokens/common';
import { type Shadow, type View, type SizeWithNone } from '../tokens/card';

// Define the context type
export type CardContextProps = {
    variant: Variant;
    view: View;
    size: SizeWithNone;
};

// Create the context with undefined as default
// This forces consumers to check/use the Provider
const CardContext = createContext<CardContextProps | undefined>(undefined);

// Helper hook to use the context safely
export const useCardContext = (): CardContextProps => {
    const context = useContext(CardContext);
    if (!context) {
        throw new Error('CardContext must be used within a <__Card.Provider>');
    }
    return context;
};

// Export the Provider for wrapping __Card component
export const CardProvider = CardContext.Provider;
