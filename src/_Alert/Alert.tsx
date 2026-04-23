import type { Variant } from '../tokens/common';
import type { Size, View } from '../tokens/badge';
import { alertStyles as aSt } from './Alert.styles';
import { useMemo } from 'react';
import clsx from 'clsx';

type AlertProps = {
    children: React.ReactNode;
    variant?: Variant;
    view?: View;
    className?: string;
    dismissible?: boolean;
    accent?: boolean;
    icon?: React.ReactNode;
};

const Alert = ({
    className,
    children,
    variant = 'primary',
    view = 'solid',
    dismissible = false,
    accent = false,
    icon,
}: AlertProps) => {
    const alertClass = useMemo(
        () =>
            clsx(className, aSt.base, aSt.view[view], aSt.variant[variant], {
                [aSt.dismissible]: dismissible,
                [aSt.accent]: accent,
                // [aSt.icon.base]: icon,
            }),
        [className, view, variant, dismissible, accent],
    );

    return (
        <div className={alertClass}>
            {icon && <span className={aSt.icon.icon}>{icon}</span>}

            <div className="alert-content">{children}</div>

            {dismissible && (
                <button className="alert-dismiss" aria-label="Close">
                    ×
                </button>
            )}
        </div>
    );
};

Alert.displayName = 'Alert';

export { Alert };
