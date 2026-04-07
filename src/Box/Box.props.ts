import React, { CSSProperties, ElementType } from 'react';
import { type Responsive } from './Box.helpers';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
    as?: ElementType;

    children?: React.ReactNode;
    className?: string;

    // layout
    display?: CSSProperties['display'];
    columns?: number;

    // overflow
    overflow?: Responsive<CSSProperties['overflow']>;
    overflowX?: Responsive<CSSProperties['overflowX']>;
    overflowY?: Responsive<CSSProperties['overflowY']>;
    whiteSpace?: Responsive<CSSProperties['whiteSpace']>;

    // visual / appearance
    borderRadius?: Responsive<CSSProperties['borderRadius']>;
    opacity?: Responsive<CSSProperties['opacity']>;
    background?: Responsive<CSSProperties['background']>;
    backgroundColor?: Responsive<CSSProperties['backgroundColor']>;
    border?: Responsive<CSSProperties['border']>;
    borderColor?: Responsive<CSSProperties['borderColor']>;
    borderStyle?: Responsive<CSSProperties['borderStyle']>;
    borderWidth?: Responsive<CSSProperties['borderWidth']>;
    boxShadow?: Responsive<CSSProperties['boxShadow']>;
    transition?: Responsive<CSSProperties['transition']>;

    // visual / interaction
    cursor?: Responsive<CSSProperties['cursor']>;
    pointerEvents?: Responsive<CSSProperties['pointerEvents'] | boolean>;

    // flex
    flex?: Responsive<CSSProperties['flex']>;
    grow?: Responsive<CSSProperties['flexGrow'] | boolean>;
    shrink?: Responsive<CSSProperties['flexShrink'] | boolean>;
    basis?: Responsive<CSSProperties['flexBasis']>;
    flexDirection?: CSSProperties['flexDirection'];
    gridAutoFlow?: CSSProperties['gridAutoFlow'];
    // align?: Responsive<CSSProperties['alignItems']>;
    justifyContent?: Responsive<CSSProperties['justifyContent']>;
    wrap?: Responsive<CSSProperties['flexWrap'] | boolean>;

    // grid
    gap?: number | string;
    rowGap?: number | string;
    columnGap?: number | string;
    col?: Responsive<number>;

    // grid container
    gridTemplateRows?: Responsive<CSSProperties['gridTemplateRows']>;
    gridTemplateAreas?: Responsive<CSSProperties['gridTemplateAreas']>;
    justifyItems?: Responsive<CSSProperties['justifyItems']>;
    alignItems?: Responsive<CSSProperties['alignItems']>;
    alignContent?: Responsive<CSSProperties['alignContent']>;
    placeItems?: Responsive<CSSProperties['placeItems']>;
    gridArea?: Responsive<CSSProperties['gridArea']>;

    // grid item
    columnSpan?: Responsive<number>;
    rowSpan?: Responsive<number>;
    justifySelf?: Responsive<CSSProperties['justifySelf']>;
    alignSelf?: Responsive<CSSProperties['alignSelf']>;

    // sizing
    width?: Responsive<number | string>;
    height?: Responsive<number | string>;
    minWidth?: Responsive<number | string>;
    maxWidth?: Responsive<number | string>;
    minHeight?: Responsive<number | string>;
    maxHeight?: Responsive<number | string>;
    aspectRatio?: Responsive<CSSProperties['aspectRatio']>;

    // positioning
    position?: Responsive<CSSProperties['position']>;
    top?: Responsive<number | string>;
    left?: Responsive<number | string>;
    right?: Responsive<number | string>;
    bottom?: Responsive<number | string>;
    zIndex?: Responsive<number>;

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
}
