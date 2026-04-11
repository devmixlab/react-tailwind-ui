import { StyleProp } from './styleProps';

export const styleAliasMap = {
    d: 'display',
    pos: 'position',

    z: 'zIndex',
    bg: 'backgroundColor',
    rounded: 'borderRadius',
    shadow: 'boxShadow',
    bc: 'borderColor',
    bst: 'borderStyle',
    bw: 'borderWidth',
    aspect: 'aspectRatio',

    ptr: 'pointerEvents',

    w: 'width',
    h: 'height',
    minW: 'minWidth',
    maxW: 'maxWidth',
    minH: 'minHeight',
    maxH: 'maxHeight',

    grow: 'flexGrow',
    shrink: 'flexShrink',
    basis: 'flexBasis',
    dir: 'flexDirection',
    justify: 'justifyContent',
    align: 'alignItems',
    wrap: 'flexWrap',
    colGap: 'columnGap',
    gridCol: 'gridColumn',

    fs: 'fontSize',
    fst: 'fontStyle',
    fw: 'fontWeight',
    lh: 'lineHeight',
    c: 'color',
    ta: 'textAlign',
    tt: 'textTransform',
    ls: 'letterSpacing',
    ff: 'fontFamily',
    td: 'textDecoration',

    ov: 'overflow',
    ovX: 'overflowX',
    ovY: 'overflowY',

    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',

    bgImg: 'backgroundImage',
    bgSize: 'backgroundSize',
    bgPos: 'backgroundPosition',
    bgRepeat: 'backgroundRepeat',

    p: 'padding',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    px: 'paddingInline',
    py: 'paddingBlock',

    m: 'margin',
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    mx: 'marginInline',
    my: 'marginBlock',
} satisfies Record<string, StyleProp>;

export const stylePropToAliasMap = Object.fromEntries(
    Object.entries(styleAliasMap).map(([alias, prop]) => [prop, alias]),
) as {
    [K in (typeof styleAliasMap)[keyof typeof styleAliasMap]]: keyof typeof styleAliasMap;
};

export type StyleAliasKey = keyof typeof styleAliasMap;

export type StyleAliasValue = (typeof styleAliasMap)[StyleAliasKey];
