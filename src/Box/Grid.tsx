import React from 'react';
import { Box, type BoxProps } from './Box';

type GridProps = BoxProps & {
    cols?: number;
    template?: string;
};

export const Grid: React.FC<GridProps> = ({ cols = 12, template, ...props }) => {
    const temp = template ?? `repeat(${cols ?? 12}, 1fr)`;
    return <Box {...props} d="grid" gridTemplateColumns={temp} />;
};
