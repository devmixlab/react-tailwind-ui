import React, { useMemo } from 'react';
import { cardStyles as cs } from './Card.styles';
import clsx from 'clsx';
import { type Radius, type View, type SizeWithNone, type Size } from '../tokens/card';
import { type Variant } from '../tokens/common';
import { DEFAULT_SIZE } from './constants';

type CollapseProps = {
    rounded?: Radius;
    variant?: Variant;
};

type GroupProps = {
    children: React.ReactNode;
    className: string;
    gap?: 'sm' | 'md' | 'lg' | 'none';
    collapse?: CollapseProps | boolean;
    rounded?: Radius;
    variant?: Variant;
    view?: View;
    size?: SizeWithNone;
    // cols?:
    //     | number
    //     | {
    //           sm?: number;
    //           md?: number;
    //           lg?: number;
    //           xl?: number;
    //       };
};

const Group = ({
    className,
    children,
    rounded = 'sm',
    variant = 'primary',
    view = 'solid',
    collapse = false,
    gap = 'md',
    size = DEFAULT_SIZE,
}: GroupProps) => {
    const items = React.Children.toArray(children).filter(React.isValidElement);

    const defaultCollapseConfig: CollapseProps = {
        rounded: rounded,
        variant: variant,
    };

    const collapseConfig =
        typeof collapse === 'boolean'
            ? collapse
                ? defaultCollapseConfig // default config
                : null
            : { ...defaultCollapseConfig, ...collapse };

    // const isColsNumber = Number.isInteger(cols);
    // const colsValue = isColsNumber
    //     ? 'cols-' + cols
    //     : Object.entries(cols)
    //           .map(([key, value]) => `${key}-cols-${value}`)
    //           .join(' ');

    if (collapse) gap = 'none';

    // const collapseClasses = [];
    // if (collapseConfig?.rounded) {
    //     collapseClasses.push(cs.collapse.rounded[collapseConfig.rounded as Radius]);
    // }

    // console.log('collapseConfig: ');
    // console.log(collapseConfig);

    const groupClass = useMemo(
        () =>
            clsx(className, cs.group.base, gap && `gap-${gap}`, {
                [cs.group.collapse.base]: collapseConfig != null,
                [cs.group.collapse.rounded[collapseConfig?.rounded ?? 'md']]:
                    collapseConfig?.rounded ?? false,
                [cs.group.collapse.variant[collapseConfig?.variant ?? 'primary']]:
                    collapseConfig?.variant ?? false,
                // [bs.pill]: pill,
                // [bs.iconOnly]: iconOnly,
                // [bs.textIcon]: textIcon,
                // [bs.interactive]: isInteractive,
            }),
        [className, gap, collapse],
    );
    return (
        <div className={groupClass}>
            <div className={cs.group.grid}>
                {items.map((child: any, index) => {
                    return React.cloneElement(child, {
                        ...child.props,
                        // groupItem: true,
                        variant: child.props.variant ?? variant ?? 'primary',
                        view: child.props.view ?? view ?? 'solid',
                        size: child.props.size ?? size ?? DEFAULT_SIZE,
                        rounded: child.props.rounded ?? rounded ?? 'sm',
                        // fullWidth: orientation === 'vertical',
                        className: clsx(child.props.className),
                    });
                })}
            </div>
        </div>
    );
};
Group.displayName = 'Group';

export { Group };
