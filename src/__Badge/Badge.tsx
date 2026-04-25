import clsx from 'clsx';
import { useMemo, ElementType, ComponentPropsWithoutRef } from 'react';
import { badgeStyles as bs } from './Badge.styles';
import { type Variant } from '../tokens/common';
import { type View, type Size } from '../tokens/badge';

type BadgeOwnProps = {
    children: React.ReactNode;
    variant?: Variant;
    view?: View;
    className?: string;
    size?: Size;
    pill?: boolean;
    iconOnly?: boolean;
    textIcon?: boolean;
};

type BadgeProps<T extends ElementType> = BadgeOwnProps & {
    as?: T;
} & ComponentPropsWithoutRef<T>;

const Badge = <T extends ElementType = 'span'>({
    as,
    className,
    children,
    variant = 'primary',
    view = 'solid',
    size = 'sm',
    pill = false,
    iconOnly = false,
    textIcon = false,
    ...rest
}: BadgeProps<T>) => {
    const Component = as || 'span';

    const isInteractive = as === 'a' || 'onClick' in rest || 'href' in rest;

    const badgeClass = useMemo(
        () =>
            clsx(className, bs.base, bs.view[view], bs.variant[variant], bs.size[size], {
                [bs.pill]: pill,
                [bs.iconOnly]: iconOnly,
                [bs.textIcon]: textIcon,
                [bs.interactive]: isInteractive,
            }),
        [className, view, variant, size, pill, iconOnly, textIcon, isInteractive],
    );

    return (
        <Component className={badgeClass} {...rest}>
            {children}
        </Component>
    );
};

Badge.displayName = 'Badge';

export { Badge };
