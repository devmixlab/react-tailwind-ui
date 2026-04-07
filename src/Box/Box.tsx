import React, { CSSProperties, useMemo } from 'react';
import clsx from 'clsx';
import { BoxProps } from './Box.props';
import { toSize, getResponsiveClasses, isResponsiveObject, resolveResponsive } from './Box.helpers';
import { classPrefix } from '../utils/classPrefix';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useWindowWidthContext } from './WindowWidthProvider';

const Box = ({
    as: Component = 'div',
    children,
    className,
    display,
    columns,
    width,
    height,
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
    style: userStyle,
    ...spaceProps
}: BoxProps) => {
    const widthFromContext = useWindowWidthContext();
    const windowWidth = widthFromContext || useWindowWidth();

    const style: CSSProperties = {
        ...userStyle,
    };

    // layout
    if (display) style.display = display;
    // if (display?.includes('grid')) style.gridTemplateColumns = `repeat(12, 1fr)`;

    if (display === 'grid') style.gridTemplateColumns = `repeat(${columns ?? 12}, 1fr)`;

    if (display === 'flex' && flexDirection) {
        style.flexDirection = flexDirection; // supports row, row-reverse, column, column-reverse
    }
    if (display === 'grid' && gridAutoFlow) {
        style.gridAutoFlow = gridAutoFlow; // supports row, column, dense, row dense, column dense
    }
    // if (width) style.width = toSize(width);
    if (width) style.width = resolveResponsive(width, windowWidth, (w) => toSize(w));
    if (height) style.height = resolveResponsive(height, windowWidth, (w) => toSize(w));
    // if (height) style.height = toSize(height);

    // flex
    if (flex) style.flex = flex;
    if (grow !== undefined)
        style.flexGrow = resolveResponsive(grow, windowWidth, (v) => (v ? 1 : 0));
    if (shrink !== undefined)
        style.flexShrink = resolveResponsive(shrink, windowWidth, (v) => (v ? 1 : 0));
    // if (shrink !== undefined) style.flexShrink = shrink ? 1 : 0;
    if (basis !== undefined) style.flexBasis = toSize(basis);

    if (align) style.alignItems = align;
    if (justify) style.justifyContent = justify;
    if (wrap) style.flexWrap = 'wrap';

    if (gap !== undefined) style.gap = toSize(gap);
    if (rowGap !== undefined) style.rowGap = toSize(rowGap);
    if (columnGap !== undefined) style.columnGap = toSize(columnGap);

    const spacingClasses = useMemo(
        () =>
            clsx(
                getResponsiveClasses(spaceProps.p, 'p-'),
                getResponsiveClasses(spaceProps.pt, 'pt-'),
                getResponsiveClasses(spaceProps.pb, 'pb-'),
                getResponsiveClasses(spaceProps.pl, 'pl-'),
                getResponsiveClasses(spaceProps.pr, 'pr-'),
                getResponsiveClasses(spaceProps.px, 'px-'),
                getResponsiveClasses(spaceProps.py, 'py-'),

                getResponsiveClasses(spaceProps.m, 'm-'),
                getResponsiveClasses(spaceProps.mt, 'mt-'),
                getResponsiveClasses(spaceProps.mb, 'mb-'),
                getResponsiveClasses(spaceProps.ml, 'ml-'),
                getResponsiveClasses(spaceProps.mr, 'mr-'),
                getResponsiveClasses(spaceProps.mx, 'mx-'),
                getResponsiveClasses(spaceProps.my, 'my-'),
            ),
        [
            spaceProps.p,
            spaceProps.pt,
            spaceProps.pb,
            spaceProps.pl,
            spaceProps.pr,
            spaceProps.px,
            spaceProps.py,

            spaceProps.m,
            spaceProps.mt,
            spaceProps.mb,
            spaceProps.ml,
            spaceProps.mr,
            spaceProps.mx,
            spaceProps.my,
        ],
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
        <Component className={clsx(className, spacingClasses, colClasses)} style={style}>
            {children}
        </Component>
    );
};

export { Box };
