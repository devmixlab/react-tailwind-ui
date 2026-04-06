import { CSSProperties } from 'react';
import { classPrefix } from '../utils/classPrefix';

export const prefix = (name: string = '') => {
    return classPrefix(`--box${name}`);
};

const spacing: Record<number, number> = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
};

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
};

type Responsive<T> =
    | T
    | {
          sm?: T;
          md?: T;
          lg?: T;
      };

type ResponsiveObject<T> = { sm?: T; md?: T; lg?: T };

const isResponsiveObject = <T>(value: any): value is ResponsiveObject<T> => {
    return value && typeof value === 'object' && ('sm' in value || 'md' in value || 'lg' in value);
};

type ResponsiveValue = Responsive<number | string>;
export const getResponsiveClasses = (value?: ResponsiveValue, p: string) => {
    if (value === undefined) return '';

    // p = prefix(p);

    if (typeof value !== 'object') {
        return classPrefix(`--${p}${value}`);
    }

    return [
        value.sm !== undefined && classPrefix(`--sm:${p}${value.sm}`),
        value.md !== undefined && classPrefix(`--md:${p}${value.md}`),
        value.lg !== undefined && classPrefix(`--lg:${p}${value.lg}`),
    ]
        .filter(Boolean)
        .join(' ');
};

// const resolveResponsive = <T>(value: Responsive<T> | undefined): T | undefined => {
//     if (value == null || typeof value !== 'object') {
//         return value as T;
//     }
//
//     const width = window.innerWidth;
//
//     if (width >= breakpoints.lg && value.lg !== undefined) return value.lg;
//     if (width >= breakpoints.md && value.md !== undefined) return value.md;
//     if (width >= breakpoints.sm && value.sm !== undefined) return value.sm;
//
//     return undefined;
// };

const resolveResponsive = <T>(value: Responsive<T> | undefined): T | undefined => {
    if (!isResponsiveObject<T>(value)) {
        return value as T;
    }

    const width = window.innerWidth;

    console.log('width:');
    console.log(width);
    console.log('value:');
    console.log(value);
    console.log('breakpoints:');
    console.log(breakpoints);

    if (width >= breakpoints.lg && value.lg !== undefined) return value.lg;
    if (width >= breakpoints.md && value.md !== undefined) return value.md;
    if (width >= breakpoints.sm && value.sm !== undefined) return value.sm;

    return undefined;
};

// export const resolveSpace = (value?: number | string) => {
//     if (value === undefined) return undefined;
//     if (typeof value === 'number') return spacing[value as number] ?? value;
//     return value;
// };

const resolveSpace = (value?: Responsive<number | string>) => {
    const v = resolveResponsive(value);
    if (v === undefined) return undefined;

    if (typeof v === 'number') return spacing[v] ?? v;
    return v;
};

export const toSize = (v: number | string) => (typeof v === 'number' ? `${v}px` : v);

export const applySpacing = (style: CSSProperties, props: any) => {
    const { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr } = props;

    if (p !== undefined) style.padding = resolveSpace(p);
    if (px !== undefined) style.paddingInline = resolveSpace(px);
    if (py !== undefined) style.paddingBlock = resolveSpace(py);
    if (pt !== undefined) style.paddingTop = resolveSpace(pt);
    if (pb !== undefined) style.paddingBottom = resolveSpace(pb);
    if (pl !== undefined) style.paddingLeft = resolveSpace(pl);
    if (pr !== undefined) style.paddingRight = resolveSpace(pr);

    if (m !== undefined) style.margin = resolveSpace(m);
    if (mx !== undefined) style.marginInline = resolveSpace(mx);
    if (my !== undefined) style.marginBlock = resolveSpace(my);
    if (mt !== undefined) style.marginTop = resolveSpace(mt);
    if (mb !== undefined) style.marginBottom = resolveSpace(mb);
    if (ml !== undefined) style.marginLeft = resolveSpace(ml);
    if (mr !== undefined) style.marginRight = resolveSpace(mr);
};
