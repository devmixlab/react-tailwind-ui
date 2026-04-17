import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { prefix as classPrefix } from './Card';
import { Box, type BoxProps } from '../Box/Box';
import { Density, densitySpacing } from './card.tokens';
import { useCardContext } from './card.context';
import { hasKey } from '../utils/ts';
import { createPolymorphic } from '../types/polymorphic';

type SectionType = 'header' | 'body' | 'footer';

export type SectionOwnProps = {
    density?: Density;
    type: SectionType;
} & BoxProps;

type SectionProps = SectionOwnProps;

const prefix = (sectionType: SectionType, name: string = '') => {
    return classPrefix(`__${sectionType}${name}`);
};

type ImplProps = {
    children?: React.ReactNode;
    className?: string;
} & Record<string, unknown>;

export const SectionImpl = (
    { className, children, px, py, density, type, ...rest }: ImplProps,
    ref: React.Ref<any>,
) => {
    const { density: ctxDensity } = useCardContext();

    const finalDensity = density ?? ctxDensity;
    const densityValue = finalDensity as Density;

    const cl = clsx(className, prefix(type as SectionType));

    const spacing = hasKey(densitySpacing, densityValue)
        ? densitySpacing[densityValue][type as SectionType]
        : undefined;

    return (
        <Box px={px ?? spacing?.px} py={py ?? spacing?.py} className={cl} {...rest}>
            {children}
        </Box>
    );
};

export const Section = createPolymorphic<SectionProps, 'div'>(forwardRef(SectionImpl), 'Section');
