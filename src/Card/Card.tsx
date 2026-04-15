// import React from 'react';
import React, { useMemo, ElementType, ComponentPropsWithoutRef } from 'react';
// import {
//     type ShadowWithNone,
//     type View,
//     type SizeWithNone,
//     type RadiusWithNone,
// } from '../tokens/__card';
// import { type Variant } from '../tokens/common';
// import clsx from 'clsx';
// import { CardProvider } from './Card.context';
// import { DEFAULT_SIZE } from './constants';
import { CLASS_PREFIX } from '../constants';
import { CardProvider } from './card.context';

import { Color } from '../Box/core/tokens';
import { Kind, Density } from './card.tokens';

import { Box, type BoxProps } from '../Box/Box';
import clsx from 'clsx';
import { Header } from './Header';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--card${name}`;
};

type CardProps = {
    // rounded?: TokenizedBoxProps['rounded'];
    // shadow?: TokenizedBoxProps['rounded'];
    tone?: Color;
    kind?: Kind;
    density?: Density;
    // size?: SizeWithNone;
    // interactive?: boolean;
    // accent?: 'left' | 'top';
} & BoxProps;

// type CardProps<T extends ElementType> = CardOwnProps & {
//     as?: T;
// } & ComponentPropsWithoutRef<T>;

export type CardComponent = React.FC<CardProps> & {
    Header: React.FC<any>;
    // Body: React.FC<any>;
    // Footer: React.FC<any>;
    // Group: React.FC<any>;
    // Image: React.FC<any>;
};

export const Card: React.FC<CardProps> = ({
    className,
    rounded = 'md',
    shadow = 'sm',
    kind = 'solid',
    tone = 'secondary',
    density = 'lg',
    // variant = 'primary',
    // view = 'solid',
    // size = DEFAULT_SIZE,
    // interactive = true,
    // accent,
    // children,
    ...rest
}) => {
    const cl = useMemo(
        () => clsx(prefix(), prefix(`--${tone}`), prefix(`--${kind}`), className),
        [className, kind, tone],
    );

    return (
        <CardProvider value={{ tone, kind, density }}>
            <Box className={cl} shadow={shadow} rounded={rounded} {...rest} />
        </CardProvider>
    );
};

Card.displayName = 'Card';
