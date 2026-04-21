import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { prefix as classPrefix } from '.././Card';
import { Box, type BoxProps } from '../../Box/Box';
import { createPolymorphic } from '../../types/polymorphic';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type SizeConfig = {
    size: number;
    fs: number;
};

export type IconProps = {
    className?: string;
    size?: Size;
} & Omit<BoxProps, 'children' | 'size'>;

const prefix = (name: string = '') => {
    return classPrefix(`__icon${name}`);
};

// const sizeMap: Record<Size, SizeConfig> = {
//     xs: { size: 26, fs: 12 },
//     sm: { size: 32, fs: 16 },
//     md: { size: 40, fs: 20 },
//     lg: { size: 56, fs: 28 },
//     xl: { size: 72, fs: 36 },
// };

export const IconImpl = ({ className, size = 'md', ...rest }: IconProps, ref: React.Ref<any>) => {
    const cl = clsx(prefix(), prefix(`--${size}`), className);

    // const sizeProps = sizeMap[size];

    return <Box {...rest} className={cl} />;
};

export const Icon = createPolymorphic<IconProps>(forwardRef(IconImpl), 'Card.Media.Icon');
