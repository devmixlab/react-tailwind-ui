import React, { CSSProperties, ElementType } from 'react';
import { type Responsive } from './Box.helpers';

export type BoxProps = {
    as?: ElementType;
    children?: React.ReactNode;
    className?: string;

    // layout
    display?: CSSProperties['display'];
    columns?: number;
    width?: Responsive<number | string>;
    height?: Responsive<number | string>;

    // flex
    flex?: CSSProperties['flex'];
    grow?: Responsive<boolean>;
    // shrink?: boolean;
    shrink?: Responsive<boolean>;
    basis?: number | string;
    flexDirection?: CSSProperties['flexDirection'];
    gridAutoFlow?: CSSProperties['gridAutoFlow'];
    // flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    // gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    wrap?: boolean;

    // grid
    gap?: number | string;
    rowGap?: number | string;
    columnGap?: number | string;
    col?: Responsive<number>;

    // spacing
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

    // style escape hatch
    style?: CSSProperties;
};
