import React from 'react';
import { TokenizedBox, type TokenizedBoxProps } from './core/TokenizedBox';

type RowProps = Omit<TokenizedBoxProps, 'dir' | 'd'> & {
    gap?: TokenizedBoxProps['gap'];
    align?: TokenizedBoxProps['align'];
};

export const Row: React.FC<RowProps> = ({ gap = 'md', align = 'center', ...props }) => {
    return <TokenizedBox {...props} d="flex" dir="row" align={align} gap={gap} />;
};
