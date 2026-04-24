import React, { forwardRef, useState } from 'react';
import { createPolymorphic, type PolymorphicComponent } from '../types/polymorphic';
import { type BoxProps } from '../Box/Box';
import { Card } from '../Card';
import { type CardProps } from '../Card/Card';
// import { themes } from './alert.themes';
import { Box } from '../Box/Box';
import { CLASS_PREFIX } from '../constants';
import clsx from 'clsx';
import { InfoIcon, WarningIcon, SuccessIcon } from './icons';
import { Icon } from '../Icon/Icon';

export const prefix = (name: string = '') => {
    return `${CLASS_PREFIX}--alert${name}`;
};

type Intent = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type Variant = 'base' | 'solid' | 'outlined' | 'subtle';

type AlertProps = {
    children: React.ReactNode;
    intent?: Intent;
    variant?: Variant;
    className?: string;
    icon?: boolean | React.ReactNode;

    dismissible?: boolean;
    onDismiss?: () => void;
} & CardProps;

const defaultIcons: Record<Intent, React.ReactNode> = {
    // primary: <WarningIcon />,
    primary: null,
    secondary: null,
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    danger: <WarningIcon />,
    info: <InfoIcon />,
};

const AlertImpl = (
    {
        children,
        intent = 'primary',
        variant = 'base',
        className,
        icon,
        dismissible,
        onDismiss,
        ...rest
    }: AlertProps,
    ref: React.Ref<any>,
) => {
    const [visible, setVisible] = useState(true);

    const renderIcon = () => {
        if (!icon) return null;

        if (icon === true) {
            return defaultIcons[intent]; // your internal mapping
        }

        return icon; // custom node
    };

    if (!visible) return null;

    const handleDismiss = () => {
        setVisible(false);
        onDismiss?.();
    };

    // const resolvedIcon = icon ?? defaultIcons[intent];
    const resolvedIcon = renderIcon();

    return (
        <Card
            className={clsx(
                prefix(),
                prefix(`--${intent}-${variant}`),
                // prefix(`--variant-${variant}`),
                className,
            )}
            direction="row"
            rounded="md"
            // theme={themes[intent][variant]}
            ref={ref}
            {...rest}
        >
            {resolvedIcon != null && (
                // <Card.Media pl={2} mr={0} centerY justify="right">
                //     <Card.Media.Icon size="md" justify="right" w={30}>
                //         {resolvedIcon}
                //     </Card.Media.Icon>
                // </Card.Media>
                <Card.Section className={prefix(`__icon`)} density="none" centerY>
                    <Icon w="inherit" pl="md" size="lg" justify="right">
                        {resolvedIcon}
                    </Icon>
                </Card.Section>
            )}

            {/*<Card.Body pos="relative">*/}
            <Card.Section grow={1}>{children}</Card.Section>

            {dismissible && (
                <Card.Section pr={3} density="none" centerY>
                    <Box
                        as="button"
                        rounded="xs"
                        size={26}
                        onClick={handleDismiss}
                        aria-label="Close alert"
                        className={prefix('__dismiss-__button')}
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
