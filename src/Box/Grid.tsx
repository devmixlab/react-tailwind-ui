import React from 'react';
import { __TokenizedBox, type TokenizedBoxProps } from './core/__TokenizedBox';

type GridProps = TokenizedBoxProps & {
    cols?: number;
    template?: string;
};

export const Grid: React.FC<GridProps> = ({ cols = 12, template, ...props }) => {
    const temp = template ?? `repeat(${cols ?? 12}, 1fr)`;
    return <__TokenizedBox {...props} d="grid" gridTemplateColumns={temp} />;
};
