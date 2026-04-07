import React, { CSSProperties, useMemo } from 'react';
import clsx from 'clsx';
import { BoxProps } from './Box.props';
import {
    toSize,
    getResponsiveClasses,
    isResponsiveObject,
    resolveResponsive,
    type Responsive,
} from './Box.helpers';
import { classPrefix } from '../utils/classPrefix';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useWindowWidthContext } from './WindowWidthProvider';

const Box = ({
    as: Component = 'div',

    children,
    className,
    display,
    columns,

    // overflow
    overflow,
    overflowX,
    overflowY,
    whiteSpace,

    // visual / appearance
    borderRadius,
    opacity,
    background,
    backgroundColor,
    border,
    borderColor,
    borderStyle,
    borderWidth,

    // visual / interaction
    cursor,
    pointerEvents,

    // sizing
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    aspectRatio,

    flex,
    grow,
    shrink,
    basis,
    flexDirection,
    gridAutoFlow,
    align,
    justify,
    wrap,
    gap,
    rowGap,
    columnGap,
    col,

    // positioning
    position,
    top,
    left,
    right,
    bottom,
    zIndex,

    style: userStyle,

    // Space props
    p,
    pt,
    pb,
    pl,
    pr,
    px,
    py,
    m,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,

    ...props
}: BoxProps) => {
    const widthFromContext = useWindowWidthContext();
    const windowWidth = widthFromContext || useWindowWidth();

    const style: CSSProperties = {
        ...userStyle,
    };

    // layout
    if (display) style.display = resolveResponsive(display, windowWidth);

    if (display === 'grid') {
        //grid layout
        const finalColumns = columns && columns > 0 ? columns : 12;
        style.gridTemplateColumns = `repeat(${finalColumns}, 1fr)`;
        if (gridAutoFlow) style.gridAutoFlow = resolveResponsive(gridAutoFlow, windowWidth);
        // maybe future improvement to add next props
        // justifyItems, alignItems
    } else if (display === 'flex') {
        //flex layout
        if (flexDirection) style.flexDirection = resolveResponsive(flexDirection, windowWidth);
        if (flex !== undefined) {
            style.flex = resolveResponsive(flex, windowWidth);
        } else {
            if (grow !== undefined)
                style.flexGrow = resolveResponsive(grow, windowWidth, (v) =>
                    typeof v === 'boolean' ? (v ? 1 : 0) : v,
                );
            if (shrink !== undefined)
                style.flexShrink = resolveResponsive(shrink, windowWidth, (v) =>
                    typeof v === 'boolean' ? (v ? 1 : 0) : v,
                );
            if (basis !== undefined) style.flexBasis = resolveResponsive(basis, windowWidth);
        }
        if (align) style.alignItems = resolveResponsive(align, windowWidth);
        if (justify) style.justifyContent = resolveResponsive(justify, windowWidth);
        if (wrap !== undefined)
            style.flexWrap = resolveResponsive(wrap, windowWidth, (v) =>
                typeof v === 'boolean' ? (v ? 'wrap' : undefined) : v,
            );
    }

    // interaction
    if (cursor) style.cursor = resolveResponsive(cursor, windowWidth);
    if (pointerEvents !== undefined) {
        const resolvedPointerEvents = resolveResponsive(pointerEvents, windowWidth);
        style.pointerEvents =
            typeof resolvedPointerEvents === 'boolean'
                ? resolvedPointerEvents
                    ? 'auto'
                    : 'none'
                : resolvedPointerEvents;
    }

    // overflow
    if (overflow) style.overflow = resolveResponsive(overflow, windowWidth);
    if (overflowX) style.overflowX = resolveResponsive(overflowX, windowWidth);
    if (overflowY) style.overflowY = resolveResponsive(overflowY, windowWidth);
    if (whiteSpace) style.whiteSpace = resolveResponsive(whiteSpace, windowWidth);

    // visual / appearance
    if (borderRadius) style.borderRadius = resolveResponsive(borderRadius, windowWidth, toSize);
    if (opacity !== undefined) style.opacity = resolveResponsive(opacity, windowWidth);
    if (background) style.background = resolveResponsive(background, windowWidth);
    if (backgroundColor) style.backgroundColor = resolveResponsive(backgroundColor, windowWidth);

    // Border
    const resolvedBorder = resolveResponsive(border, windowWidth);
    if (resolvedBorder) {
        style.border = resolvedBorder;
    } else {
        if (borderColor) style.borderColor = resolveResponsive(borderColor, windowWidth);
        if (borderStyle) style.borderStyle = resolveResponsive(borderStyle, windowWidth);
        if (borderWidth !== undefined)
            style.borderWidth = resolveResponsive(borderWidth, windowWidth, toSize);
    }

    // sizing
    if (width) style.width = resolveResponsive(width, windowWidth, toSize);
    if (height) style.height = resolveResponsive(height, windowWidth, toSize);
    if (minWidth) style.minWidth = resolveResponsive(minWidth, windowWidth, toSize);
    if (maxWidth) style.maxWidth = resolveResponsive(maxWidth, windowWidth, toSize);
    if (minHeight) style.minHeight = resolveResponsive(minHeight, windowWidth, toSize);
    if (maxHeight) style.maxHeight = resolveResponsive(maxHeight, windowWidth, toSize);
    if (aspectRatio !== undefined) style.aspectRatio = resolveResponsive(aspectRatio, windowWidth);

    // positioning
    if (position) style.position = resolveResponsive(position, windowWidth);
    if (top !== undefined) style.top = resolveResponsive(top, windowWidth, toSize);
    if (left !== undefined) style.left = resolveResponsive(left, windowWidth, toSize);
    if (right !== undefined) style.right = resolveResponsive(right, windowWidth, toSize);
    if (bottom !== undefined) style.bottom = resolveResponsive(bottom, windowWidth, toSize);
    if (zIndex !== undefined) style.zIndex = resolveResponsive(zIndex, windowWidth);

    if (gap !== undefined) style.gap = toSize(gap);
    if (rowGap !== undefined) style.rowGap = toSize(rowGap);
    if (columnGap !== undefined) style.columnGap = toSize(columnGap);

    const spacingClasses = useMemo(
        () =>
            clsx(
                getResponsiveClasses(p, 'p-'),
                getResponsiveClasses(pt, 'pt-'),
                getResponsiveClasses(pb, 'pb-'),
                getResponsiveClasses(pl, 'pl-'),
                getResponsiveClasses(pr, 'pr-'),
                getResponsiveClasses(px, 'px-'),
                getResponsiveClasses(py, 'py-'),

                getResponsiveClasses(m, 'm-'),
                getResponsiveClasses(mt, 'mt-'),
                getResponsiveClasses(mb, 'mb-'),
                getResponsiveClasses(ml, 'ml-'),
                getResponsiveClasses(mr, 'mr-'),
                getResponsiveClasses(mx, 'mx-'),
                getResponsiveClasses(my, 'my-'),
            ),
        [p, pt, pb, pl, pr, px, py, m, mt, mb, ml, mr, mx, my],
    );

    const colClasses = useMemo(
        () =>
            clsx(getResponsiveClasses(col, 'col-'), {
                [classPrefix(`--col-${isResponsiveObject(col) ? col.base : ''}`)]:
                    col !== undefined && isResponsiveObject(col) && col.base,
                [classPrefix(`--col`)]: col !== undefined && isResponsiveObject(col) && !col.base,
            }),
        [col],
    );

    return (
        <Component className={clsx(className, spacingClasses, colClasses)} style={style} {...props}>
            {children}
        </Component>
    );
};

export { Box };
