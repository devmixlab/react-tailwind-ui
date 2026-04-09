import React, { CSSProperties, useMemo } from 'react';
import clsx from 'clsx';
import { BoxProps } from './Box.props';
import {
    toSize,
    getResponsiveClasses,
    breakpoints,
    getActiveBreakpoint,
    Responsive,
    resolveResponsive,
} from './Box.helpers';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useWindowWidthContext } from './WindowWidthProvider';

const Box = ({
    as: Component = 'div',

    children,
    className,
    display,
    columns,

    // typography
    fontSize,
    fontStyle,
    fontWeight,
    lineHeight,
    color,

    textAlign,
    textTransform,
    letterSpacing,

    fontFamily,
    textDecoration,

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
    transform,

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
    flexGrow,
    flexShrink,
    flexBasis,
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
    gridColumn,
    gridRow,
    justifySelf,
    alignSelf,

    justifyContent,
    flexWrap,
    gap,
    rowGap,
    columnGap,

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
            const resolved = get<T, CSSProperties[K]>(styleProp, value, bp, modifier);
            if (resolved !== undefined) {
                style[styleProp] = resolved;
            }
        }
    };

    // typography
    applyStyle('fontSize', fontSize, toSize); // careful: numbers → px
    applyStyle('fontStyle', fontStyle);
    applyStyle('fontWeight', fontWeight);
    applyStyle('lineHeight', lineHeight); // ! no toSize
    applyStyle('color', color);
    applyStyle('textAlign', textAlign);
    applyStyle('textTransform', textTransform);
    applyStyle('letterSpacing', letterSpacing);
    applyStyle('fontFamily', fontFamily);
    applyStyle('textDecoration', textDecoration);

    // layout
    applyStyle('display', display);

    if (display === 'grid') {
        //grid layout
        const finalColumns = columns && columns > 0 ? columns : 12;
        style.gridTemplateColumns = `repeat(${finalColumns}, 1fr)`;

        applyStyle('gridAutoFlow', gridAutoFlow);
        applyStyle('gridTemplateRows', gridTemplateRows);
        applyStyle('gridTemplateAreas', gridTemplateAreas);
        applyStyle('alignContent', alignContent);
        applyStyle('gridArea', gridArea);

        if (placeItems) {
            applyStyle('placeItems', placeItems);
        } else {
            applyStyle('justifyItems', justifyItems);
        }
    } else if (display === 'flex') {
        //flex layout
        applyStyle('flexDirection', flexDirection);
        applyStyle('flexWrap', flexWrap, (v) =>
            typeof v === 'boolean' ? (v ? 'wrap' : undefined) : v,
        );
    }

    if (flex !== undefined) {
        applyStyle('flex', flex);
    } else {
        applyStyle('flexGrow', flexGrow, (v) => (typeof v === 'boolean' ? (v ? 1 : 0) : v));
        applyStyle('flexShrink', flexShrink, (v) => (typeof v === 'boolean' ? (v ? 1 : 0) : v));
        applyStyle('flexBasis', flexBasis);
    }

    if ((display === 'grid' && !placeItems) || display === 'flex') {
        applyStyle('alignItems', alignItems);
    }
    applyStyle('justifyContent', justifyContent);

    applyStyle('gridColumn', gridColumn);
    // applyStyle('gridColumn', columnSpan !== undefined ? columnSpan : gridColumn, (v) => {
    //     return columnSpan !== undefined ? `span ${v}` : v;
    // });
    applyStyle('gridRow', gridRow);
    // applyStyle('gridRow', rowSpan !== undefined ? rowSpan : gridRow, (v) => {
    //     return rowSpan !== undefined ? `span ${v}` : v;
    // });

    applyStyle('justifySelf', justifySelf);
    applyStyle('alignSelf', alignSelf);

    // interaction
    applyStyle('cursor', cursor);
    applyStyle('pointerEvents', pointerEvents, (v) => {
        return typeof v === 'boolean' ? (v ? 'auto' : 'none') : v;
    });

    // overflow
    applyStyle('overflow', overflow);
    applyStyle('overflowX', overflowX);
    applyStyle('overflowY', overflowY);
    applyStyle('whiteSpace', whiteSpace);

    // visual / appearance
    applyStyle('borderRadius', borderRadius, toSize);
    applyStyle('opacity', opacity);
    applyStyle('background', background);
    applyStyle('backgroundColor', backgroundColor);

    // Border
    const resolvedBorder = get('border', border, bp);
    if (resolvedBorder) {
        style.border = resolvedBorder;
    } else {
        applyStyle('borderColor', borderColor);
        applyStyle('borderStyle', borderStyle);
        applyStyle('borderWidth', borderWidth, toSize);
    }

    applyStyle('boxShadow', boxShadow);
    applyStyle('transition', transition);
    applyStyle('transform', transform);

    // sizing
    applyStyle('width', width, toSize);
    applyStyle('minWidth', minWidth, toSize);
    applyStyle('maxWidth', maxWidth, toSize);
    applyStyle('height', height, toSize);
    applyStyle('minHeight', minHeight, toSize);
    applyStyle('maxHeight', maxHeight, toSize);
    applyStyle('aspectRatio', aspectRatio);

    // positioning
    applyStyle('position', position);
    applyStyle('top', top, toSize);
    applyStyle('left', left, toSize);
    applyStyle('right', right, toSize);
    applyStyle('bottom', bottom, toSize);
    applyStyle('zIndex', zIndex);

    applyStyle('gap', gap, toSize);
    applyStyle('rowGap', rowGap, toSize);
    applyStyle('columnGap', columnGap, toSize);

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

    // const colClasses = useMemo(
    //     () =>
    //         clsx(getResponsiveClasses(col, 'col-'), {
    //             [classPrefix(`--col-${isResponsiveObject(col) ? col.base : ''}`)]:
    //                 col !== undefined && isResponsiveObject(col) && col.base,
    //             [classPrefix(`--col`)]: col !== undefined && isResponsiveObject(col) && !col.base,
    //         }),
    //     [col],
    // );

    return (
        <Component className={clsx(className, spacingClasses)} style={style} {...props}>
            {children}
        </Component>
    );
};

export { Box };
