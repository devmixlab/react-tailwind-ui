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
    number?: number;
    disabled?: boolean;
    active?: boolean;
    fixed?: boolean;
    fullWidth?: boolean;
    pill?: boolean;
    iconOnly?: boolean;
    textIcon?: boolean;
    loading?: boolean;
    groupItem?: boolean;
    loadingPosition?: LodaingPosition;
    spinnerDelay?: number;
    as?: React.ElementType;
    className?: string;
}

const Button = forwardRef<HTMLElement, ButtonProps>(
    (
        {
            children,
            view = 'solid',
            variant = 'primary',
            size = 'md',
            number,
            disabled = false,
            active = false,
            fixed = false,
            fullWidth = false,
            pill = false,
            iconOnly = false,
            textIcon = false,
            loading = false,
            groupItem = false,
            loadingPosition = 'center',
            spinnerDelay = 150,
            as = 'button',
            className,
            ...props
        },
        ref,
    ) => {
        const [showSpinner, setShowSpinner] = useState(false);

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

        const wrapperClass = useMemo(
            () =>
                clsx(bs.wrapper, {
                    [bs.disabled]: disabled,
                    [bs.fullWidth]: fullWidth,
                }),
            [disabled, fullWidth],
        );

        const buttonClass = useMemo(
            () =>
                clsx(className, bs.base, bs.view[view], bs.variant[variant], bs.size[size], {
                    [bs.number.base]: number,
                    [bs.number.big]: isLongNumber(number, 2),
                    [bs.disabled]: disabled,
                    [bs.active]: active,
                    [bs.fixed]: fixed,
                    [bs.fullWidth]: fullWidth,
                    [bs.pill]: pill,
                    [bs.iconOnly]: iconOnly,
                    [bs.textIcon]: textIcon,
                    [bs.loading.base]: showSpinner,
                    [bs.loading.position[loadingPosition]]: showSpinner,
                    [bs.group.groupItem]: groupItem,
                }),
            [
                className,
                view,
                variant,
                size,
                number,
                disabled,
                active,
                fixed,
                fullWidth,
                pill,
                iconOnly,
                textIcon,
                showSpinner,
                loadingPosition,
                children,
                groupItem,
            ],
        );

        useEffect(() => {
            let t: NodeJS.Timeout;

            if (loading) {
                t = setTimeout(() => setShowSpinner(true), spinnerDelay);
            } else {
                // defer state update to next tick
                // setTimeout(() => setShowSpinner(false), 0);
                const frame = requestAnimationFrame(() => setShowSpinner(false));
                return () => cancelAnimationFrame(frame);
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
            <div className={wrapperClass}>
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
                    {number !== undefined ? number : children}
                </HeadlessButton>
            </div>
        );
    },
);

Button.displayName = 'Button'; // optional, improves devtools & error messages

export default Button;
