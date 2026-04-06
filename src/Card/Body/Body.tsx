import React, { useMemo, CSSProperties } from 'react';
import clsx from 'clsx';
import { type Direction, type SizeWithNone } from '../../tokens/card';
import { prefix as classPrefix } from '../Card';
import { useCardContext } from '../Card.context';

type SpaceProps = {
    p?: number | string;
    px?: number | string;
    py?: number | string;
    pt?: number | string;
    pb?: number | string;
    pl?: number | string;
    pr?: number | string;

    m?: number | string;
    mx?: number | string;
    my?: number | string;
    mt?: number | string;
    mb?: number | string;
    ml?: number | string;
    mr?: number | string;
};

type BodyProps = {
    children: React.ReactNode;
    className: string;
    size?: SizeWithNone;

    // direction?: Direction;
    direction?: 'row' | 'column';
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    wrap?: boolean;

    gap?: number | string;
    rowGap?: number | string;
    columnGap?: number | string;
} & SpaceProps;

type BodyComponent = React.FC<BodyProps> & {
    Content?: React.FC<any>;
    // Body: React.FC<any>;
};

const prefix = (name: string = '') => {
    return classPrefix(`__body${name}`);
};

const toSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

type Space = 'sm' | 'md' | 'lg';
const spacing: Record<Space, number> = {
    sm: 8,
    md: 12,
    lg: 16,
};

const spacingScale: Record<number, number> = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
};

const resolveSpace = (value?: number | string) => {
    if (value === undefined) return undefined;

    if (typeof value === 'number') {
        return spacingScale[value] ?? value; // fallback to raw px
    }

    return value;
};

const applySpacing = (style: CSSProperties, props: SpaceProps) => {
    const { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr } = props;

    // padding
    if (p !== undefined) style.padding = resolveSpace(p);
    if (px !== undefined) style.paddingInline = resolveSpace(px);
    if (py !== undefined) style.paddingBlock = resolveSpace(py);
    if (pt !== undefined) style.paddingTop = resolveSpace(pt);
    if (pb !== undefined) style.paddingBottom = resolveSpace(pb);
    if (pl !== undefined) style.paddingLeft = resolveSpace(pl);
    if (pr !== undefined) style.paddingRight = resolveSpace(pr);

    // margin
    if (m !== undefined) style.margin = resolveSpace(m);
    if (mx !== undefined) style.marginInline = resolveSpace(mx);
    if (my !== undefined) style.marginBlock = resolveSpace(my);
    if (mt !== undefined) style.marginTop = resolveSpace(mt);
    if (mb !== undefined) style.marginBottom = resolveSpace(mb);
    if (ml !== undefined) style.marginLeft = resolveSpace(ml);
    if (mr !== undefined) style.marginRight = resolveSpace(mr);
};

const Body = ({
    className,
    children,
    direction = 'row',
    size: compSize,
    align,
    justify,
    wrap,

    gap,
    rowGap,
    columnGap,

    ...spaceProps
}: BodyProps) => {
    const { size } = useCardContext();
    compSize = compSize || size || 'md';

    const style: CSSProperties = {
        display: 'flex',
        flexDirection: direction,
    };

    if (align) style.alignItems = align;
    if (justify) style.justifyContent = justify;
    if (wrap) style.flexWrap = 'wrap';

    if (Object.keys(spacing).includes(String(gap))) gap = spacing[gap as Space];
    if (Object.keys(spacing).includes(String(rowGap))) rowGap = spacing[rowGap as Space];
    if (Object.keys(spacing).includes(String(columnGap))) columnGap = spacing[columnGap as Space];

    if (gap !== undefined) style.gap = toSize(gap);
    if (rowGap !== undefined) style.rowGap = toSize(rowGap);
    if (columnGap !== undefined) style.columnGap = toSize(columnGap);

    applySpacing(style, spaceProps);

    const cl = useMemo(
        () =>
            clsx(className, prefix(), {
                [prefix(`--${compSize}`)]: compSize && compSize !== 'none',
            }),
        [className, direction],
    );

    return (
        <div className={cl} style={style}>
            {children}
        </div>
    );
};
Body.displayName = 'Card.Body';

export { Body, BodyComponent };
