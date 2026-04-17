// import React from 'react';
import React, { useMemo, ElementType, ComponentPropsWithoutRef } from 'react';
import {
    type ShadowWithNone,
    type View,
    type SizeWithNone,
    type RadiusWithNone,
} from '../tokens/card';
import { type Variant } from '../tokens/common';
import clsx from 'clsx';
import { CardProvider } from './Card.context';
import { DEFAULT_SIZE } from './constants';
import { CLASS_PREFIX } from '../constants';

import { TokenizedBoxProps } from '../Box/core/__TokenizedBox';
import { Color } from '../Box/core/tokens';
import { Kind } from './tokens';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--card${name}`;
};

type CardOwnProps = {
    rounded?: TokenizedBoxProps['rounded'];
    shadow?: TokenizedBoxProps['rounded'];
    tone?: Color;
    kind?: Kind;
    size?: SizeWithNone;
    interactive?: boolean;
    accent?: 'left' | 'top';
} & TokenizedBoxProps;

type CardProps<T extends ElementType> = CardOwnProps & {
    as?: T;
} & ComponentPropsWithoutRef<T>;

export type CardComponent<T extends React.ElementType = 'div'> = React.FC<CardProps<T>> & {
    Header: React.FC<any>;
    Body: React.FC<any>;
    Footer: React.FC<any>;
    Group: React.FC<any>;
    Image: React.FC<any>;
};

const Card = <T extends ElementType = 'div'>({
    children,
    className,
    rounded = 'sm',
    shadow = 'sm',
    variant = 'primary',
    view = 'solid',
    size = DEFAULT_SIZE,
    interactive = true,
    accent,
}: CardProps<T>) => {
    const cardClass = useMemo(
        () =>
            clsx(className, prefix(), prefix(`--${variant}-${view}`), {
                [prefix(`--${size}`)]: size && size !== 'none',
                [prefix(`--rounded-${rounded}`)]: rounded && rounded !== 'none',
                // [cs.col.base(col)]: col,
                // [cs.col.sm(smCol as string)]: smCol,
                // [cs.col.md(mdCol as string)]: mdCol,
                // [cs.col.md(lgCol as string)]: lgCol,
                // [cs.col.md(xlCol as string)]: xlCol,
                [prefix(`--accent-${accent}`)]: accent,
                [prefix('--interactive')]: interactive,
                [prefix(`--shadow-${shadow}`)]: shadow && shadow !== 'none',
            }),
        [className, view, variant, rounded, size],
    );

    return (
        <CardProvider value={{ variant, view, size }}>
            <div className={cardClass}>{children}</div>
        </CardProvider>
    );
};
Card.displayName = 'Card';

export { Card };
