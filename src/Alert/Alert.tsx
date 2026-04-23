import React, { forwardRef, useState } from 'react';
import { createPolymorphic, type PolymorphicComponent } from '../types/polymorphic';
import { type BoxProps } from '../Box/Box';
import { Card } from '../Card';
import { type CardProps } from '../Card/Card';
import { themes } from './alert.themes';
import { Box } from '../Box/Box';
import { CLASS_PREFIX } from '../constants';
import clsx from 'clsx';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--alert${name}`;
};

type Intent = keyof typeof themes;
type Variant = 'base' | 'solid';

type AlertProps = {
    children: React.ReactNode;
    intent?: Intent;
    variant?: Variant;
    className?: string;

    dismissible?: boolean;
    onDismiss?: () => void;
} & CardProps;

const AlertImpl = (
    {
        children,
        intent = 'primary',
        variant = 'base',
        className,
        dismissible,
        onDismiss,
        ...rest
    }: AlertProps,
    ref: React.Ref<any>,
) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    return (
        <Card
            className={clsx(
                prefix(),
                // prefix(`--intent-${intent}`),
                // prefix(`--variant-${variant}`),
                className,
            )}
            dir="row"
            rounded="md"
            theme={themes[intent][variant]}
            ref={ref}
            {...rest}
        >
            {/*<Card.Body pos="relative">*/}
            <Card.Section grow={1}>{children}</Card.Section>

            {dismissible && (
                <Card.Section centerY>
                    <Box
                        as="button"
                        size={20}
                        onClick={handleDismiss}
                        aria-label="Close alert"
                        className={prefix('__dismiss-button')}
                    >
                        ×
                    </Box>
                </Card.Section>
            )}
            {/*</Card.Body>*/}
        </Card>
    );
};

export const Alert = createPolymorphic<AlertProps, 'div'>(forwardRef(AlertImpl), 'Alert');
