import React, { useEffect, useState, forwardRef, useMemo } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import clsx from 'clsx';
import { type View, type LodaingPosition } from '@/tokens/button';
import { buttonStyles as bs } from './Button.styles';
import { type Size, type Variant } from '@/tokens/common';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    view?: View;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    active?: boolean;
    fixed?: boolean;
    fullWidth?: boolean;
    pill?: boolean;
    iconOnly?: boolean;
    textIcon?: boolean;
    loading?: boolean;
    loadingPosition?: LodaingPosition;
    spinnerDelay?: number;
    as?: React.ElementType;
}

const Button = forwardRef<HTMLElement, ButtonProps>(
    (
        {
            children,
            view = 'solid',
            variant = 'primary',
            size = 'md',
            disabled = false,
            active = false,
            fixed = false,
            fullWidth = false,
            pill = false,
            iconOnly = false,
            textIcon = false,
            loading = false,
            loadingPosition = 'center',
            spinnerDelay = 150,
            as = 'button',
            ...props
        },
        ref,
    ) => {
        const [showSpinner, setShowSpinner] = useState(false);

        const buttonClass = useMemo(
            () =>
                clsx(bs.base, bs.view[view], bs.variant[variant], bs.size[size], {
                    [bs.disabled]: disabled,
                    [bs.active]: active,
                    [bs.fixed]: fixed,
                    [bs.fullWidth]: fullWidth,
                    [bs.pill]: pill,
                    [bs.iconOnly]: iconOnly,
                    [bs.textIcon]: textIcon,
                    [bs.loading.base]: showSpinner,
                    [bs.loading.position[loadingPosition]]: showSpinner,
                }),
            [
                view,
                variant,
                size,
                disabled,
                active,
                fixed,
                fullWidth,
                pill,
                iconOnly,
                textIcon,
                showSpinner,
                loadingPosition,
            ],
        );

        useEffect(() => {
            let t: NodeJS.Timeout;

            if (loading) {
                t = setTimeout(() => setShowSpinner(true), spinnerDelay);
            } else {
                // defer state update to next tick
                setTimeout(() => setShowSpinner(false), 0);
            }

            return () => clearTimeout(t);
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
            <HeadlessButton
                aria-busy={loading}
                aria-disabled={disabled || loading}
                as={as}
                ref={ref}
                className={buttonClass}
                disabled={as === 'button' ? disabled : undefined}
                {...props}
                onClick={handleClick}
            >
                {children}
            </HeadlessButton>
        );
    },
);

Button.displayName = 'Button'; // optional, improves devtools & error messages

export default Button;
