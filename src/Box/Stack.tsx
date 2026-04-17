import React from 'react';
import { __TokenizedBox, type TokenizedBoxProps } from './core/__TokenizedBox';

type StackProps = TokenizedBoxProps & {
    gap?: TokenizedBoxProps['gap'];
};

export const Stack: React.FC<StackProps> = ({ gap = 'md', ...props }) => {
    return <__TokenizedBox d="flex" dir="column" gap={gap} {...props} />;
};
