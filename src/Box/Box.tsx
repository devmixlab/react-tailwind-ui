import React, { CSSProperties, useMemo } from 'react';
import clsx from 'clsx';
import { BoxProps } from './Box.props';
import {
    toSize,
    getResponsiveClasses,
    isResponsiveObject,
    breakpoints,
    getActiveBreakpoint,
    Responsive,
    resolveResponsive,
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
    boxShadow,
    transition,

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

    // grid container
    gridTemplateRows,
    gridTemplateAreas,
    justifyItems,
    alignItems,
    alignContent,
    placeItems,
    gridArea,

    // grid item
    columnSpan,
    rowSpan,
    justifySelf,
    alignSelf,

    // align,
    justifyContent,
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
    const bp = getActiveBreakpoint(windowWidth);

    const style: CSSProperties = {
        ...userStyle,
    };

    const resolved: Record<string, any> = {};

    const get = <T, R = T>(
        key: string,
        value: Responsive<T | undefined> | undefined,
        bp: keyof typeof breakpoints | 'base',
        modify?: (v: T) => R,
    ): R | undefined => {
        const cacheKey = `${key}_${bp}`;
        if (cacheKey in resolved) return resolved[cacheKey];

        const result = resolveResponsive(value, bp, modify);
        resolved[cacheKey] = result;
        return result;
    };

    const applyStyle = <K extends keyof CSSProperties, T>(
        styleProp: K,
        value: Responsive<T> | undefined,
        modifier?: (v: T) => CSSProperties[K],
    ) => {
        if (value !== undefined) {
            style[styleProp] = get(styleProp, value, bp, modifier);
        }
    };

    // layout
    applyStyle('display', display);

    if (display === 'grid') {
        //grid layout
        const finalColumns = columns && columns > 0 ? columns : 12;
        style.gridTemplateColumns = `repeat(${finalColumns}, 1fr)`;

        applyStyle('gridAutoFlow', gridAutoFlow);

        if (gridTemplateRows)
            style.gridTemplateRows = get('gridTemplateRows', gridTemplateRows, bp);

        if (gridTemplateAreas)
            style.gridTemplateAreas = get('gridTemplateAreas', gridTemplateAreas, bp);

        if (alignContent) style.alignContent = get('alignContent', alignContent, bp);

        if (placeItems) {
            style.placeItems = get('placeItems', placeItems, bp);
        } else {
            if (justifyItems) style.justifyItems = get('justifyItems', justifyItems, bp);
        }

        if (gridArea) style.gridArea = get('gridArea', gridArea, bp);
    } else if (display === 'flex') {
        //flex layout
        if (flexDirection) style.flexDirection = get('flexDirection', flexDirection, bp);
        if (flex !== undefined) {
            style.flex = get('flex', flex, bp);
        } else {
            if (grow !== undefined)
                style.flexGrow = get('grow', grow, bp, (v) =>
                    typeof v === 'boolean' ? (v ? 1 : 0) : v,
                );
            if (shrink !== undefined)
                style.flexShrink = get('shrink', shrink, bp, (v) =>
                    typeof v === 'boolean' ? (v ? 1 : 0) : v,
                );
            if (basis !== undefined) style.flexBasis = get('basis', basis, bp);
        }
        if (wrap !== undefined)
            style.flexWrap = get('wrap', wrap, bp, (v) =>
                typeof v === 'boolean' ? (v ? 'wrap' : undefined) : v,
            );
    }

    if ((display === 'grid' && !placeItems) || display === 'flex') {
        if (alignItems) style.alignItems = get('alignItems', alignItems, bp);
    }
    if (justifyContent) style.justifyContent = get('justifyContent', justifyContent, bp);

    // grid item
    if (columnSpan !== undefined) {
        const span = get('columnSpan', columnSpan, bp);
        // console.log('Span:');
        // console.log(span);
        if (span !== undefined) style.gridColumn = `span ${span}`;
    }

    if (rowSpan !== undefined) {
        const span = get('rowSpan', rowSpan, bp);
        if (span !== undefined) style.gridRow = `span ${span}`;
    }

    if (justifySelf) style.justifySelf = get('justifySelf', justifySelf, bp);

    if (alignSelf) style.alignSelf = get('alignSelf', alignSelf, bp);

    // interaction
    if (cursor) style.cursor = get('cursor', cursor, bp);
    if (pointerEvents !== undefined) {
        const resolvedPointerEvents = get('pointerEvents', pointerEvents, bp);
        style.pointerEvents =
            typeof resolvedPointerEvents === 'boolean'
                ? resolvedPointerEvents
                    ? 'auto'
                    : 'none'
                : resolvedPointerEvents;
    }

    // overflow
    if (overflow) style.overflow = get('overflow', overflow, bp);
    if (overflowX) style.overflowX = get('overflowX', overflowX, bp);
    if (overflowY) style.overflowY = get('overflowY', overflowY, bp);
    if (whiteSpace) style.whiteSpace = get('whiteSpace', whiteSpace, bp);

    // visual / appearance
    if (borderRadius) style.borderRadius = get('borderRadius', borderRadius, bp, toSize);
    if (opacity !== undefined) style.opacity = get('opacity', opacity, bp);
    if (background) style.background = get('background', background, bp);
    if (backgroundColor) style.backgroundColor = get('backgroundColor', backgroundColor, bp);

    // Border
    const resolvedBorder = get('border', border, bp);
    if (resolvedBorder) {
        style.border = resolvedBorder;
    } else {
        if (borderColor) style.borderColor = get('borderColor', borderColor, bp);
        if (borderStyle) style.borderStyle = get('borderStyle', borderStyle, bp);
        if (borderWidth !== undefined)
            style.borderWidth = get('borderWidth', borderWidth, bp, toSize);
    }

    if (boxShadow) style.boxShadow = get('boxShadow', boxShadow, bp);
    if (transition) style.transition = get('transition', transition, bp);

    // sizing
    if (width) style.width = get('width', width, bp, toSize);
    if (height) style.height = get('height', height, bp, toSize);
    if (minWidth) style.minWidth = get('minWidth', minWidth, bp, toSize);
    if (maxWidth) style.maxWidth = get('maxWidth', maxWidth, bp, toSize);
    if (minHeight) style.minHeight = get('minHeight', minHeight, bp, toSize);
    if (maxHeight) style.maxHeight = get('maxHeight', maxHeight, bp, toSize);
    if (aspectRatio !== undefined) style.aspectRatio = get('aspectRatio', aspectRatio, bp);

    // positioning
    if (position) style.position = get('position', position, bp);
    if (top !== undefined) style.top = get('top', top, bp, toSize);
    if (left !== undefined) style.left = get('left', left, bp, toSize);
    if (right !== undefined) style.right = get('right', right, bp, toSize);
    if (bottom !== undefined) style.bottom = get('bottom', bottom, bp, toSize);
    if (zIndex !== undefined) style.zIndex = get('zIndex', zIndex, bp);

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
