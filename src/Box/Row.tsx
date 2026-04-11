import React from 'react';
import { Box, type BoxProps } from './Box';

type RowProps = Omit<BoxProps, 'dir' | 'd'> & {
    gap?: BoxProps['gap'];
    align?: BoxProps['align'];
};

export const Row: React.FC<RowProps> = ({ gap = 'md', align = 'center', ...props }) => {
    return <Box {...props} d="flex" dir="row" align={align} gap={gap} />;
};
