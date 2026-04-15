import React, { useMemo } from 'react';
import clsx from 'clsx';
import { prefix as classPrefix } from './Card';
import { Box, type BoxProps } from '../Box/Box';
import { Density, densitySpacing, Kind } from './card.tokens';
import { useCardContext } from './card.context';
import { hasKey } from '../utils/ts';
import { Color } from '../Box/core/tokens';

type FooterProps = {
    tone?: Color;
    kind?: Kind;
    density?: Density;
} & BoxProps;

const prefix = (name: string = '') => {
    return classPrefix(`__header${name}`);
};

export const Footer = ({ className, children, px, py, density, ...rest }: FooterProps) => {
    const { density: ctxDensity } = useCardContext();
    const finalDensity = density ?? ctxDensity;

    const cl = useMemo(() => clsx(className, prefix()), [className]);

    const spacing = hasKey(densitySpacing, finalDensity)
        ? densitySpacing[finalDensity].footer
        : undefined;

    console.log('spacing');
    console.log(ctxDensity);
    console.log(finalDensity);
    console.log(spacing);
    console.log(densitySpacing);

    return (
        <Box px={px ?? spacing?.px} py={py ?? spacing?.py} className={cl} {...rest}>
            {children}
        </Box>
    );
};
