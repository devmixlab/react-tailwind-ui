import React, { forwardRef } from 'react';
import { CLASS_PREFIX } from '../constants';
import { CardProvider } from './card.context';

import { Density } from './card.tokens';

import { Box, type BoxProps } from '../Box/Box';
import clsx from 'clsx';

import { defaultCardTheme } from './card.themes';
import { toCardVars } from './card.helpers';

import { createPolymorphic, type PolymorphicComponent } from '../types/polymorphic';
import { HeadingsProps, HProps } from '../Heading/Heading';

import { type HeaderOwnProps } from './Header';
import { type BodyOwnProps } from './Body';
import { type MediaProps } from './media/Media';
import { type FooterOwnProps } from './Footer';
import { type ContentProps } from './Content';
import { type SectionOwnProps } from './Section';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--card${name}`;
};

type SpreadProps = {
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    href?: string;
    role?: string;
    tabIndex?: number;
    type?: 'button' | 'submit' | 'reset';
};

export type CardProps = {
    className?: string;
    as?: React.ElementType;
    density?: Density;
    accent?: boolean;
    accentSide?: 'left' | 'top';
    interactive?: boolean;
    disabled?: boolean;
    appearance?: 'neutral' | 'semantic';
    theme?: typeof defaultCardTheme;
} & BoxProps &
    SpreadProps;

// export type CardComponent = React.FC<CardProps> & {
//     Header: React.FC<any>;
//     Body: React.FC<any>;
//     Footer: React.FC<any>;
//     Media: React.FC<any>;
//     Content: React.FC<any>;
//     Section: React.FC<any>;
// };

export type CardComponent = PolymorphicComponent<CardProps, 'div'> & {
    Header: PolymorphicComponent<HeaderOwnProps>;
    Body: PolymorphicComponent<BodyOwnProps>;
    Footer: PolymorphicComponent<FooterOwnProps>;
    Media: PolymorphicComponent<MediaProps>;
    Content: PolymorphicComponent<ContentProps>;
    Section: PolymorphicComponent<SectionOwnProps>;
};

export const CardImpl = (
    {
        className,
        as = 'div',
        theme,
        density = 'md',
        interactive = false,
        disabled = false,
        accent = false,
        accentSide = 'left',
        appearance = 'neutral',
        ...rest
    }: CardProps,
    ref: React.Ref<any>,
) => {
    const { onClick, onKeyDown, href, role, tabIndex, type, ...restProps } = rest;

    const isNaturallyInteractive = (as === 'a' && href != null) || as === 'button';
    const isDisabled = disabled;
    const finalInteractive = !isDisabled && (isNaturallyInteractive || interactive);
    const isButtonLike = finalInteractive && !isNaturallyInteractive;

    const cl = clsx(prefix(), prefix(`--appearance-${appearance}`), className, {
        // [prefix(`--outlined`)]: outlined,
        [prefix(`--interactive`)]: finalInteractive,
        [prefix(`--disabled`)]: isDisabled,
        [prefix(`--accent`)]: accent,
        [prefix(`--accent-${accentSide}`)]: accent,
    });

    return (
        <CardProvider value={{ density, interactive: finalInteractive, disabled: isDisabled }}>
            <Box
                ref={ref}
                style={toCardVars(theme ?? defaultCardTheme)}
                as={as}
                href={as === 'a' && isDisabled ? undefined : href}
                aria-disabled={isDisabled || undefined}
                tabIndex={isDisabled ? -1 : isButtonLike ? 0 : tabIndex}
                role={isButtonLike ? 'button' : role}
                type={as === 'button' ? (type ?? 'button') : undefined}
                onClick={
                    isDisabled
                        ? (e: React.MouseEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                          }
                        : onClick
                }
                onKeyDown={
                    isDisabled
                        ? (e: React.KeyboardEvent) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                              }
                              onKeyDown?.(e);
                          }
                        : isButtonLike
                          ? (e: React.KeyboardEvent) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onClick?.(e as any);
                                }
                                onKeyDown?.(e);
                            }
                          : onKeyDown
                }
                disabled={as === 'button' ? isDisabled : undefined}
                data-interactive={finalInteractive || undefined}
                data-disabled={isDisabled || undefined}
                data-accent={accent || undefined}
                data-appearance={appearance}
                data-density={density}
                className={cl}
                {...restProps}
            />
        </CardProvider>
    );
};

export const Card = createPolymorphic<CardProps, 'div'>(forwardRef(CardImpl), 'Card');
