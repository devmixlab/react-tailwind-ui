import React from 'react';
import { TokenizedBox, type TokenizedBoxProps } from './core/TokenizedBox';

type StackProps = TokenizedBoxProps & {
    gap?: TokenizedBoxProps['gap'];
};

export const Stack: React.FC<StackProps> = ({ gap = 'md', ...props }) => {
    return <TokenizedBox d="flex" dir="column" gap={gap} {...props} />;
};
