import React from 'react';
import clsx from 'clsx';
import { prefix as classPrefix } from './Card';
import { Box, type BoxProps } from '../Box/Box';
import { Density, densitySpacing } from './card.tokens';
import { useCardContext } from './card.context';
import { hasKey } from '../utils/ts';

type SectionType = 'header' | 'body' | 'footer';

export type SectionProps = {
    density?: Density;
    type: SectionType;
} & BoxProps;

const prefix = (sectionType: SectionType, name: string = '') => {
    return classPrefix(`__${sectionType}${name}`);
};

export const Section = ({ className, children, px, py, density, type, ...rest }: SectionProps) => {
    const { density: ctxDensity } = useCardContext();

    const finalDensity = density ?? ctxDensity;

    const cl = clsx(className, prefix(type));

    const spacing = hasKey(densitySpacing, finalDensity)
        ? densitySpacing[finalDensity].header
        : undefined;

    return (
        <Box px={px ?? spacing?.px} py={py ?? spacing?.py} className={cl} {...rest}>
            {children}
        </Box>
    );
};
