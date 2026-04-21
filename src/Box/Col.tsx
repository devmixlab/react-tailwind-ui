import React from 'react';
import { Box, type BoxProps } from './Box';
import type { Responsive } from './core/helpers';

type ColProps = BoxProps & {
    span?: Responsive<number>;
};

export const Col: React.FC<ColProps> = ({ span, ...props }) => {
    return <Box gridCol={`span ${span}`} {...props} />;
};
