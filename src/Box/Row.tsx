import React from 'react';
import { __TokenizedBox, type TokenizedBoxProps } from './core/__TokenizedBox';

type RowProps = Omit<TokenizedBoxProps, 'dir' | 'd'> & {
    gap?: TokenizedBoxProps['gap'];
    align?: TokenizedBoxProps['align'];
};

export const Row: React.FC<RowProps> = ({ gap = 'md', align = 'center', ...props }) => {
    return <__TokenizedBox {...props} d="flex" dir="row" align={align} gap={gap} />;
};
