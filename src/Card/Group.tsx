import React, { useMemo } from 'react';
import { cardStyles as cs } from './Card.styles';
import clsx from 'clsx';
import { type Radius } from '../tokens/card';
import { type Variant } from '../tokens/common';

type CollapseProps = {
    rounded?: Radius;
    variant?: Variant;
};

type GroupProps = {
    children: React.ReactNode;
    className: string;
    gap?: 'sm' | 'md' | 'lg' | 'none';
    collapse?: CollapseProps | boolean;
    // cols?:
    //     | number
    //     | {
    //           sm?: number;
    //           md?: number;
    //           lg?: number;
    //           xl?: number;
    //       };
};

const Group = ({ className, children, collapse = false, gap = 'md' }: GroupProps) => {
    const defaultCollapseConfig: CollapseProps = {
        // rounded: 'md',
        variant: 'primary',
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

    console.log('collapseConfig: ');
    console.log(collapseConfig);

    const groupClass = useMemo(
        () =>
            clsx(className, cs.group.base, gap && `gap-${gap}`, {
                [cs.collapse.base]: collapseConfig != null,
                [cs.collapse.rounded[collapseConfig?.rounded ?? 'md']]:
                    collapseConfig?.rounded ?? false,
                [cs.collapse.variant[collapseConfig?.variant ?? 'primary']]:
                    collapseConfig?.variant ?? false,
                // [bs.pill]: pill,
                // [bs.iconOnly]: iconOnly,
                // [bs.textIcon]: textIcon,
                // [bs.interactive]: isInteractive,
            }),
        [className, gap, collapse],
    );
    return (
        <div className={cs.group.wrapper}>
            <div className={groupClass}>{children}</div>
        </div>
    );
};
Group.displayName = 'Group';

export { Group };
