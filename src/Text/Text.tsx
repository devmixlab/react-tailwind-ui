import React, { CSSProperties, forwardRef } from 'react';
import { CLASS_PREFIX } from '../constants';

import { Box, type BoxProps } from '../Box/Box';
import clsx from 'clsx';

import { createPolymorphic } from '../types/polymorphic';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--text${name}`;
};

type VariantConfig = {
    textSize: TextSize;
    fw: BoxProps['fontWeight'];
    tone?: TextTone;
};

const variantStyles = {
    'heading-lg': {
        textSize: 'xl',
        fw: 'bold',
    },
    'heading-md': {
        textSize: 'lg',
        fw: 'semibold',
    },
    'body-md': {
        textSize: 'md',
        fw: 'normal',
    },
    'body-sm': {
        textSize: 'sm',
        fw: 'normal',
        tone: 'secondary',
    },
    caption: {
        textSize: 'xs',
        fw: 'medium',
        tone: 'muted',
    },
} as const satisfies Record<string, VariantConfig>;

type VariantStyle = keyof typeof variantStyles;

type TextSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inherit';
type TextTone = 'default' | 'secondary' | 'muted';

export type BaseProps = {
    as?: React.ElementType;
    tone?: TextTone;
    className?: string;
    style?: CSSProperties;
    inline?: boolean;
    variant?: VariantStyle;
} & BoxProps;

type TextBehaviorProps =
    | { truncate?: boolean; lineClamp?: never }
    | { lineClamp?: number; truncate?: never };

type TextSizeProps = { textSize?: TextSize; tz?: never } | { tz?: TextSize; textSize?: never };

export type TextProps = TextSizeProps & TextBehaviorProps & BaseProps;

const TextImpl = (
    {
        as,
        textSize,
        tz,
        tone,
        truncate = false,
        lineClamp,
        className,
        style,
        inline,
        variant,
        ...rest
    }: TextProps,
    ref: React.Ref<any>,
) => {
    const Component = inline ? (as ?? 'span') : (as ?? 'p');

    const isClamped = typeof lineClamp === 'number' && lineClamp > 0;
    const isTruncated = !isClamped && truncate;

    const clampStyle = isClamped
        ? {
              WebkitLineClamp: lineClamp,
          }
        : undefined;

    const truncateStyle = isTruncated
        ? {
              display: inline ? 'inline-block' : undefined,
          }
        : undefined;

    const variantStyle: VariantConfig | undefined = variant ? variantStyles[variant] : undefined;

    const resolvedSize = textSize ?? tz ?? variantStyle?.textSize ?? 'md';
    const resolvedTone = tone ?? variantStyle?.tone ?? 'default';
    const resolvedFw = rest.fw ?? variantStyle?.fw;

    return (
        <Box
            ref={ref}
            as={Component}
            className={clsx(
                prefix(),
                prefix(`--${resolvedSize}`),
                prefix(`--tone-${resolvedTone}`),
                isTruncated && prefix('--truncate'),
                isClamped && prefix('--clamp'),
                className,
            )}
            style={{ ...style, ...truncateStyle, ...clampStyle }}
            {...rest}
            fw={resolvedFw}
        />
    );
};

export const Text = createPolymorphic<TextProps, 'p'>(forwardRef(TextImpl), 'Text');
