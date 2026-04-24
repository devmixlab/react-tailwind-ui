import React, { useEffect, useState, forwardRef, useMemo } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import clsx from 'clsx';
// import { type View, type LodaingPosition } from '../tokens/__button';
// import { buttonStyles as bs } from './Button.styles';
// import { type Size, type Radius } from '../tokens/common';
import { Box, type BoxProps } from '../Box/Box';
import { CLASS_PREFIX } from '../constants';
import { createPolymorphic } from '../types/polymorphic';

export type LoadingPosition = 'start' | 'center' | 'end';
export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type Size = (typeof sizes)[number];

type Variant = 'base' | 'solid' | 'outlined' | 'subtle' | 'ghost' | 'link';
type Intent = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--button${name}`;
};

const isLongNumber = (value?: number, length = 2) => {
    // if (value === undefined || isNaN(value)) return false;
    // return value.toString().length > length; // true if 3 or more digits

    if (value === undefined || value === null) return false;

    // Convert to string for length check
    const str = value.toString();

    // Check if it contains only digits
    if (!/^\d+$/.test(str)) return false;

    // Return true if length exceeds threshold
    return str.length > length;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
    className?: string;
    children?: React.ReactNode;
    as?: React.ElementType;
    type?: 'button' | 'submit' | 'reset';
    intent?: Intent;
    variant?: Variant;
    size?: Size;
    number?: number; // to format value as tabular-nums
    disabled?: boolean;
    active?: boolean; // selected / current (pagination, tabs)
    noInteraction?: boolean; // removes hover/active interaction styles
    // fullWidth?: boolean;
    rounded?: BoxProps['rounded'];
    iconOnly?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    loading?: boolean;
    loadingPosition?: LoadingPosition;
    spinnerDelay?: number;
}

const ButtonImpl = (
    {
        className,
        children,
        as = 'button',
        type = 'button',
        intent = 'primary',
        variant = 'base',
        size = 'md',
        number,
        disabled = false,
        active = false,
        noInteraction = false,
        // fullWidth = false,
        rounded = 'sm',
        iconOnly = false,
        startIcon,
        endIcon,
        loading = false,
        loadingPosition = 'center',
        spinnerDelay = 150,
        ...props
    }: ButtonProps,
    ref: React.Ref<any>,
) => {
    const [showSpinner, setShowSpinner] = useState(false);

    const cl = clsx(
        className,
        prefix(),
        prefix(`--${variant}`),
        prefix(`--${intent}`),
        prefix(`--size-${size}`),
        {
            [prefix(`--numeric`)]: number,
            [prefix(`--long`)]: isLongNumber(number, 2),
            [prefix(`--disabled`)]: disabled,
            [prefix(`--active`)]: active,
            [prefix(`--no-interaction`)]: noInteraction,
            // [bs.fullWidth]: fullWidth,
            [prefix(`--icon-only`)]: iconOnly,
            [prefix(`--loading`)]: showSpinner,
            [prefix(`--loading-pos-${loadingPosition}`)]: showSpinner,
        },
    );

    // useEffect(() => {
    //     let t: NodeJS.Timeout;
    //
    //     if (loading) {
    //         t = setTimeout(() => setShowSpinner(true), spinnerDelay);
    //     } else {
    //         // defer state update to next tick
    //         // setTimeout(() => setShowSpinner(false), 0);
    //         const frame = requestAnimationFrame(() => setShowSpinner(false));
    //         return () => cancelAnimationFrame(frame);
    //     }
    //
    //     return () => clearTimeout(t);
    // }, [loading, spinnerDelay]);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        let frameId: number | null = null;

        if (loading) {
            timeoutId = setTimeout(() => {
                setShowSpinner(true);
            }, spinnerDelay);
        } else {
            frameId = requestAnimationFrame(() => {
                setShowSpinner(false);
            });
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [loading, spinnerDelay]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (disabled || loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        props.onClick?.(e);
    };

    return (
        <Box
            aria-busy={showSpinner}
            aria-disabled={disabled || showSpinner}
            as={as}
            ref={ref}
            className={cl}
            disabled={as === 'button' ? disabled : undefined}
            {...props}
            onClick={handleClick}
        >
            {number != null ? number : children}
        </Box>
    );
};

export const Button = createPolymorphic<ButtonProps, 'div'>(forwardRef(ButtonImpl), 'Button');
