import React from 'react';
import { __TokenizedBox, type TokenizedBoxProps } from './core/__TokenizedBox';
import type { Responsive } from './core/helpers';

type ColProps = TokenizedBoxProps & {
    span?: Responsive<number>;
};

export const Col: React.FC<ColProps> = ({ span, ...props }) => {
    return <__TokenizedBox gridCol={`span ${span}`} {...props} />;
};
