import React, { CSSProperties, ElementType } from 'react';
import { type Responsive } from './Box.helpers';

export interface BoxProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
    as?: ElementType;

    children?: React.ReactNode;
    className?: string;

    // layout
    display?: CSSProperties['display'];
    columns?: number;

    // typography
    fontSize?: Responsive<number | string>;
    fontStyle?: Responsive<CSSProperties['fontStyle']>;
    fontWeight?: Responsive<CSSProperties['fontWeight']>;
    lineHeight?: Responsive<CSSProperties['lineHeight']>;
    color?: Responsive<CSSProperties['color']>;

    textAlign?: Responsive<CSSProperties['textAlign']>;
    textTransform?: Responsive<CSSProperties['textTransform']>;
    letterSpacing?: Responsive<CSSProperties['letterSpacing']>;

    fontFamily?: Responsive<CSSProperties['fontFamily']>;
    textDecoration?: Responsive<CSSProperties['textDecoration']>;

    // truncate?: boolean;

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
    transform?: Responsive<CSSProperties['transform']>;

    // visual / interaction
    cursor?: Responsive<CSSProperties['cursor']>;
    pointerEvents?: Responsive<CSSProperties['pointerEvents'] | boolean>;

    // flex
    flex?: Responsive<CSSProperties['flex']>;
    flexGrow?: Responsive<CSSProperties['flexGrow'] | boolean>;
    flexShrink?: Responsive<CSSProperties['flexShrink'] | boolean>;
    flexBasis?: Responsive<CSSProperties['flexBasis']>;
    flexDirection?: CSSProperties['flexDirection'];
    gridAutoFlow?: CSSProperties['gridAutoFlow'];
    justifyContent?: Responsive<CSSProperties['justifyContent']>;
    flexWrap?: Responsive<CSSProperties['flexWrap'] | boolean>;

    // grid
    gap?: Responsive<CSSProperties['gap']>;
    rowGap?: Responsive<CSSProperties['rowGap']>;
    columnGap?: Responsive<CSSProperties['columnGap']>;

    // grid container
    gridTemplateRows?: Responsive<CSSProperties['gridTemplateRows']>;
    gridTemplateAreas?: Responsive<CSSProperties['gridTemplateAreas']>;
    justifyItems?: Responsive<CSSProperties['justifyItems']>;
    alignItems?: Responsive<CSSProperties['alignItems']>;
    alignContent?: Responsive<CSSProperties['alignContent']>;
    placeItems?: Responsive<CSSProperties['placeItems']>;
    gridArea?: Responsive<CSSProperties['gridArea']>;

    // grid item
    gridColumn?: Responsive<CSSProperties['gridColumn']>;
    gridRow?: Responsive<CSSProperties['gridRow']>;
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
    p?: Responsive<number | string>;
    px?: Responsive<number | string>;
    py?: Responsive<number | string>;
    pt?: Responsive<number | string>;
    pb?: Responsive<number | string>;
    pl?: Responsive<number | string>;
    pr?: Responsive<number | string>;

    m?: Responsive<number | string>;
    mx?: Responsive<number | string>;
    my?: Responsive<number | string>;
    mt?: Responsive<number | string>;
    mb?: Responsive<number | string>;
    ml?: Responsive<number | string>;
    mr?: Responsive<number | string>;

    // style escape hatch
    style?: CSSProperties;
}
