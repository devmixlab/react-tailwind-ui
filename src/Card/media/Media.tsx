import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { prefix as classPrefix } from '../Card';
import { Box, type BoxProps } from '../../Box/Box';
import { createPolymorphic } from '../../types/polymorphic';

export type MediaProps = {
    children?: React.ReactNode;
    className?: string;
} & BoxProps;

export type MediaComponent = React.FC<MediaProps> & {
    Image: React.FC<any>;
};

const prefix = (name: string = '') => {
    return classPrefix(`__media${name}`);
};

export const MediaImpl = ({ className, children, ...rest }: MediaProps, ref: React.Ref<any>) => {
    const cl = clsx(prefix(), className);

    return (
        <Box ref={ref} className={cl} {...rest}>
            {children}
        </Box>
    );
};

export const Media = createPolymorphic<MediaProps>(forwardRef(MediaImpl), 'Card.Media');
