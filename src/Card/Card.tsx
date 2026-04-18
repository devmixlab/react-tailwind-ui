import React, { useMemo } from 'react';
import { CLASS_PREFIX } from '../constants';
import { CardProvider } from './card.context';

import { Color } from '../Box/core/tokens';
import { Kind, Density } from './card.tokens';

import { Box, type BoxProps } from '../Box/Box';
import clsx from 'clsx';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--card${name}`;
};

type CardProps = {
    as?: React.ElementType;
    tone?: Color;
    kind?: Kind;
    density?: Density;
    accent?: boolean;
    accentSide?: 'left' | 'top';
    // size?: SizeWithNone;
    interactive?: boolean;
    disabled?: boolean;
    appearance?: 'neutral' | 'semantic';
    // accent?: 'left' | 'top';
} & BoxProps;

// type CardProps<T extends ElementType> = CardOwnProps & {
//     as?: T;
// } & ComponentPropsWithoutRef<T>;

export type CardComponent = React.FC<CardProps> & {
    Header: React.FC<any>;
    Body: React.FC<any>;
    Footer: React.FC<any>;
    Media: React.FC<any>;
    Content: React.FC<any>;
};

export const Card: React.FC<CardProps> = ({
    className,
    as,
    rounded,
    shadow,
    kind = 'solid',
    tone = 'secondary',
    density = 'md',
    interactive = false,
    disabled = false,
    accent = false,
    accentSide = 'left',
    appearance = 'neutral',
    // children,
    ...rest
}) => {
    const { onClick, onKeyDown, href, role, tabIndex, ...restProps } = rest;

    const finalShadow = shadow ?? (kind === 'solid' ? 'sm' : 'none');
    const finalRounded = rounded ?? (kind === 'flat' || kind === 'ghost' ? 'none' : 'md');

    const isNaturallyInteractive = (as === 'a' && href != null) || as === 'button';
    const isDisabled = disabled;
    const finalInteractive =
        !isDisabled && (isNaturallyInteractive || (interactive && (!as || as === 'button')));
    const isButtonLike = finalInteractive && !as;

    const cl = useMemo(
        () =>
            clsx(
                prefix(),
                prefix(`--${tone}`),
                prefix(`--${kind}`),
                prefix(`--appearance-${appearance}`),
                className,
                {
                    // [prefix(`--outlined`)]: outlined,
                    [prefix(`--interactive`)]: finalInteractive,
                    [prefix(`--disabled`)]: isDisabled,
                    [prefix(`--accent`)]: accent,
                    [prefix(`--accent-${accentSide}`)]: accent,
                },
            ),
        [className, kind, tone, finalInteractive, accent, accentSide, isDisabled, appearance],
    );

    return (
        <CardProvider
            value={{ tone, kind, density, interactive: finalInteractive, disabled: isDisabled }}
        >
            <Box
                as={as}
                href={as === 'a' && isDisabled ? undefined : href}
                aria-disabled={isDisabled || undefined}
                tabIndex={isDisabled ? -1 : isButtonLike ? 0 : tabIndex}
                role={isButtonLike ? 'button' : role}
                type={as === 'button' ? 'button' : undefined}
                onClick={
                    isDisabled
                        ? (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                          }
                        : onClick
                }
                onKeyDown={
                    isDisabled
                        ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                              }
                              onKeyDown?.(e);
                          }
                        : isButtonLike
                          ? (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onClick?.(e as any);
                                }
                                onKeyDown?.(e);
                            }
                          : onKeyDown
                }
                disabled={as === 'button' ? isDisabled : undefined}
                data-tone={tone}
                data-kind={kind}
                data-interactive={finalInteractive || undefined}
                data-disabled={isDisabled || undefined}
                // ov="hidden"
                className={cl}
                shadow={finalShadow}
                rounded={finalRounded}
                {...restProps}
            />
        </CardProvider>
    );
};

Card.displayName = 'Card';
