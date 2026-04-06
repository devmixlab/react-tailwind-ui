import React, { CSSProperties } from 'react';

export type BoxProps = {
    children?: React.ReactNode;
    className?: string;

    // layout
    display?: CSSProperties['display'];
    width?: number | string;
    height?: number | string;

    // flex
    flex?: CSSProperties['flex'];
    grow?: boolean;
    shrink?: boolean;
    basis?: number | string;
    flexDirection?: CSSProperties['flexDirection'];
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    wrap?: boolean;
    gap?: number | string;
    rowGap?: number | string;
    columnGap?: number | string;

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
