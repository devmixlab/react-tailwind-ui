import React, { useEffect, useState, forwardRef, useMemo } from 'react';
import clsx from 'clsx';
import { Box, type BoxProps } from '../Box/Box';
import { createPolymorphic } from '../types/polymorphic';
import { LoadingPosition, Size, Intent, Variant } from './button.tokens';
import { isLongNumber, prefix } from './button.helpers';

// export type ButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {
export type ButtonProps = {
    className?: string;
    children?: React.ReactNode;
    // as?: React.ElementType;
    // type?: 'button' | 'submit' | 'reset';
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
};

type ButtonImplProps = ButtonProps & {
    as?: React.ElementType;
    type?: 'button' | 'submit' | 'reset';
} & {
    onClick?: React.MouseEventHandler<any>;
    onKeyDown?: React.KeyboardEventHandler<any>;
};

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
        rounded = 'md',
        iconOnly = false,
        startIcon,
        endIcon,
        loading = false,
        loadingPosition = 'center',
        spinnerDelay = 150,
        ...props
    }: ButtonImplProps,
    ref: React.Ref<any>,
) => {
    const [showSpinner, setShowSpinner] = useState(false);

    const isButton = as === 'button';
    const isDisabled = disabled || loading || noInteraction;

    const { onClick, onKeyDown, ...restProps } = props;

    const cl = clsx(
        className,
        prefix(),
        prefix(`--${variant}`),
        prefix(`--${intent}`),
        prefix(`--size-${size}`),
        {
            [prefix(`--numeric`)]: number != null,
            [prefix(`--long`)]: isLongNumber(number, 2),
            [prefix(`--disabled`)]: disabled,
            [prefix(`--active`)]: active,
            [prefix(`--no-interaction`)]: noInteraction,
            // [bs.fullWidth]: fullWidth,
            [prefix(`--icon-only`)]: iconOnly,
            [prefix(`--loading`)]: showSpinner,
            [prefix(`--loading-${loadingPosition}`)]: showSpinner,
        },
    );

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

    const handleClick = (e: React.MouseEvent<any>) => {
        if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<any>) => {
        if (isDisabled) {
            e.preventDefault();
            return;
        }

        if (!isButton && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick(e as any);
        }

        onKeyDown?.(e);
    };

    return (
        <Box
            aria-busy={showSpinner}
            aria-disabled={isDisabled}
            role={!isButton ? 'button' : undefined}
            tabIndex={!isButton && !isDisabled ? 0 : undefined}
            as={as}
            type={isButton ? type : undefined}
            ref={ref}
            className={cl}
            disabled={isButton ? isDisabled : undefined}
            rounded={rounded}
            {...restProps}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {/* START ICON */}
            {startIcon && loadingPosition !== 'start' && (
                <span className={prefix(`__icon`)}>{startIcon}</span>
            )}

            {/* CONTENT */}
            <span className={prefix(`__content`)}>{number != null ? number : children}</span>

            {/* END ICON */}
            {endIcon && loadingPosition !== 'end' && (
                <span className={prefix(`__icon`)}>{endIcon}</span>
            )}
        </Box>
    );
};

export const Button = createPolymorphic<ButtonProps, 'button'>(forwardRef(ButtonImpl), 'Button');
