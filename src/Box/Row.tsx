import React from 'react';
import { Box, type BoxProps } from './Box';

type StackProps = BoxProps & {
    gap?: BoxProps['gap'];
    align?: BoxProps['align'];
};

export const Stack: React.FC<StackProps> = ({ gap = 'md', align = 'center', ...props }) => {
    return <Box d="flex" dir="row" align={align} gap={gap} {...props} />;
};
