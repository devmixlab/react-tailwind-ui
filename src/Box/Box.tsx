import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { BoxProps } from './Box.props';
import { toSize, applySpacing } from './Box.helpers';
import { useWindowWidth } from '../hooks/useWindowWidth';

const Box = ({
    children,
    className,
    display,
    width,
    height,
    flex,
    grow,
    shrink,
    basis,
    flexDirection,
    align,
    justify,
    wrap,
    gap,
    rowGap,
    columnGap,
    style: userStyle,
    ...spaceProps
}: BoxProps) => {
    const style: CSSProperties = {
        ...userStyle,
    };

    // layout
    if (display) style.display = display;
    // if (flexDirection) style.flexDirection = flexDirection;
    if (flexDirection && display?.includes('flex')) style.flexDirection = flexDirection;
    if (width) style.width = toSize(width);
    if (height) style.height = toSize(height);

    // flex
    if (flex) style.flex = flex;
    if (grow !== undefined) style.flexGrow = grow ? 1 : 0;
    if (shrink !== undefined) style.flexShrink = shrink ? 1 : 0;
    if (basis !== undefined) style.flexBasis = toSize(basis);

    if (align) style.alignItems = align;
    if (justify) style.justifyContent = justify;
    if (wrap) style.flexWrap = 'wrap';

    if (gap !== undefined) style.gap = toSize(gap);
    if (rowGap !== undefined) style.rowGap = toSize(rowGap);
    if (columnGap !== undefined) style.columnGap = toSize(columnGap);

    // spacing
    applySpacing(style, spaceProps);

    return (
        <div className={clsx(className)} style={style}>
            {children}
        </div>
    );
};

export { Box };
