import React from 'react';
import clsx from 'clsx';
import { type View } from '../tokens/button';
import { type Size, type Variant } from '../tokens/common';
import { buttonStyles as bs } from './Button.styles';

type GroupProps = {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    variant?: Variant;
    view?: View;
    size?: Size;
};

const Group = ({
    children,
    orientation = 'horizontal',
    className,
    variant = 'primary',
    view = 'solid',
    size = 'md',
}: GroupProps) => {
    const items = React.Children.toArray(children).filter(React.isValidElement);

    return (
        <div
            role="group"
            className={clsx(bs.group.group, bs.group.orientation[orientation], className)}
        >
            {items.map((child: any, index) => {
                return React.cloneElement(child, {
                    ...child.props,
                    groupItem: true,
                    variant: child.props.variant ?? variant ?? 'primary',
                    view: child.props.view ?? view ?? 'solid',
                    size: child.props.size ?? size ?? 'md',
                    fullWidth: orientation === 'vertical',
                    className: clsx(child.props.className),
                });
            })}
        </div>
    );
};

Group.displayName = 'Group';

export { Group };
