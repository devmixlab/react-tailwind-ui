import React from 'react';
import { TokenizedBox, type TokenizedBoxProps } from './core/TokenizedBox';
import type { Responsive } from './core/helpers';

type ColProps = TokenizedBoxProps & {
    span?: Responsive<number>;
};

export const Col: React.FC<ColProps> = ({ span, ...props }) => {
    return <TokenizedBox gridCol={`span ${span}`} {...props} />;
};
