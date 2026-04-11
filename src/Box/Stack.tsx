import React from 'react';
import { Box, type BoxProps } from './Box';

type StackProps = BoxProps & {
    gap?: BoxProps['gap'];
};

export const Stack: React.FC<StackProps> = ({ gap = 'md', ...props }) => {
    return <Box d="flex" dir="column" gap={gap} {...props} />;
};
