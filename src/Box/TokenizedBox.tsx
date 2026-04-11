import React, { useMemo } from 'react';
import { UIBox, UIBoxProps } from './UIBox';
import {
    StyleAliasKey,
    styleAliasMap,
    StyleAliasValue,
    stylePropToAliasMap,
} from '../tokens/styleAliasMap';
import { type StyleProp } from '../tokens/styleProps';
import clsx from 'clsx';
import { getActiveBreakpoint, type Responsive, resolveResponsive } from './Box.helpers';
import { classPrefix } from '../utils/classPrefix';
import {
    colors as colorsTokens,
    shadows as shadowsTokens,
    radii as radiiTokens,
    fontSizes as fontSizesTokens,
    fontWeights as fontWeightsTokens,
    lineHeights as lineHeightsTokens,
    letterSpacings as letterSpacingsTokens,
    borderWidths as borderWidthsTokens,
    spacing as spacingTokens,

    // Flex
    flexDirections as flexDirectionsTokens,
    justifyContents as justifyContentsTokens,
    alignItems as alignItemsTokens,
    flexWraps as flexWrapsTokens,

    // Size
    sizes as sizesTokens,
    aspects as aspectsTokens,

    // Cursor/Pointer Events
    cursors as cursorsTokens,
    pointerEvents as pointerEventsTokens,

    // Position
    positions as positionsTokens,
    insets as insetsTokens,

    // Transform
    translates as translatesTokens,
    scales as scalesTokens,
    rotates as rotatesTokens,

    // Transition
    transitionDurations as transitionDurationsTokens,
    transitionEasings as transitionEasingsTokens,

    // Others
    zIndexes as zIndexesTokens,
    displays as displaysTokens,
    overflows as overflowsTokens,
    gaps as gapsTokens,
} from './Box.tokens';
import { useWindowWidthContext } from './WindowWidthProvider';
import { useWindowWidth } from '../hooks/useWindowWidth';

export const spacingProps = [
    'padding',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingInline',
    'paddingBlock',

    'margin',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginInline',
    'marginBlock',
].map((key) => ({
    key,
    alias: stylePropToAliasMap[key as keyof typeof stylePropToAliasMap],
}));

const spacingLookup = new Set<string>(spacingProps.flatMap(({ key, alias }) => [key, alias]));

export type TokenizedProps = {
    // transform
    tx?: Responsive<string>; // translateX
    ty?: Responsive<string>; // translateY
    scale?: Responsive<string>;
    rotate?: Responsive<string>;

    // transition
    transD?: Responsive<string>; // duration
    transE?: Responsive<string>; // easing
};

export type TokenizedBoxProps = TokenizedProps & UIBoxProps;

// type TokenizedStyleProp = TokenizedProps & StyleProp;
type TokenizedStyleProp = StyleProp | keyof TokenizedProps;

type Prop<K extends TokenizedStyleProp = TokenizedStyleProp> = {
    key: K;
    prefix?: string;
    tokens: readonly string[];
    alias?: StyleAliasKey;
};

const props: Prop[] = [
    { key: 'boxShadow', prefix: 'shadow', tokens: shadowsTokens },
    { key: 'borderRadius', prefix: 'rounded', tokens: radiiTokens },

    // Typography
    { key: 'fontSize', prefix: 'fs', tokens: fontSizesTokens },
    { key: 'fontWeight', prefix: 'fw', tokens: fontWeightsTokens },
    { key: 'lineHeight', prefix: 'lh', tokens: lineHeightsTokens },
    { key: 'letterSpacing', prefix: 'ls', tokens: letterSpacingsTokens },

    { key: 'borderWidth', prefix: 'bw', tokens: borderWidthsTokens },

    // Flex
    { key: 'flexDirection', prefix: 'dir', tokens: flexDirectionsTokens },
    { key: 'justifyContent', prefix: 'justify', tokens: justifyContentsTokens },
    { key: 'alignItems', prefix: 'align', tokens: alignItemsTokens },
    { key: 'flexWrap', prefix: 'wrap', tokens: flexWrapsTokens },

    { key: 'aspectRatio', prefix: 'aspect', tokens: aspectsTokens },

    // Cursor & Pointer Events
    { key: 'cursor', prefix: 'cursor', tokens: cursorsTokens },
    { key: 'pointerEvents', prefix: 'ptr', tokens: pointerEventsTokens },

    // transition
    { key: 'transD', prefix: 'trans-d', tokens: transitionDurationsTokens },
    { key: 'transE', prefix: 'trans-e', tokens: transitionEasingsTokens },

    // others
    { key: 'zIndex', prefix: 'z', tokens: zIndexesTokens },
    { key: 'display', prefix: 'd', tokens: displaysTokens },

    ...[['gap'], ['rowGap', 'row-gap'], ['columnGap', 'col-gap']].map(([key, prefix]) => ({
        key: key as TokenizedStyleProp,
        prefix: prefix ?? key,
        tokens: gapsTokens,
    })),

    ...[
        ['backgroundColor', 'bg'],
        ['borderColor', 'bc'],
        ['color', 'c'],
    ].map(([key, prefix]) => ({
        key: key as TokenizedStyleProp,
        prefix,
        tokens: colorsTokens,
    })),

    // Positioning
    { key: 'position', prefix: 'pos', tokens: positionsTokens },
    ...[
        ['top', 't'],
        ['left', 'l'],
        ['right', 'r'],
        ['bottom', 'b'],
    ].map(([key, prefix]) => ({
        key: key as TokenizedStyleProp,
        prefix,
        tokens: insetsTokens,
    })),

    // Overflow
    ...[
        ['overflow', 'ov'],
        ['overflowX', 'ov-x'],
        ['overflowY', 'ov-y'],
    ].map(([key, prefix]) => ({
        key: key as TokenizedStyleProp,
        prefix,
        tokens: overflowsTokens,
    })),

    // Spacing
    ...spacingProps.map(({ key, alias }) => ({
        key: key as TokenizedStyleProp,
        prefix: alias,
        tokens: spacingTokens,
    })),

    // Sizing
    ...[
        ['width', 'w'],
        ['height', 'h'],
        ['minWidth', 'min-w'],
        ['maxWidth', 'max-w'],
        ['minHeight', 'min-h'],
        ['maxHeight', 'max-h'],
    ].map(([key, prefix]) => ({
        key: key as TokenizedStyleProp,
        prefix,
        tokens: sizesTokens,
    })),
];

const propsLookup = Object.fromEntries(
    props.flatMap((prop) => {
        const aliasKey = stylePropToAliasMap[prop.key as keyof typeof stylePropToAliasMap];
        const assignProp = aliasKey ? { ...prop, ...{ alias: aliasKey } } : prop;
        const entries: [string, typeof prop][] = [[prop.key, assignProp]];

        if (aliasKey !== undefined) {
            entries.push([aliasKey, assignProp]);
        }

        return entries;
    }),
);

export const TokenizedBox: React.FC<TokenizedBoxProps> = ({
    className,
    tx,
    ty,
    scale,
    rotate,
    ...rest
}) => {
    const widthFromContext = useWindowWidthContext();
    const windowWidth = widthFromContext || useWindowWidth();
    const bp = getActiveBreakpoint(windowWidth);

    // const tokenizedBoxProps = { ...rest };

    const isToken = (
        value: number | string | undefined,
        tokens: readonly string[],
    ): value is TokenizedStyleProp => {
        return typeof value === 'string' && tokens.includes(value);
    };

    const consumedProps = new Set();
    const passedProps = Object.entries(rest)
        .map(([key, value]) => {
            if (consumedProps.has(key)) return undefined;
            const prop = propsLookup[key];
            if (prop) {
                consumedProps.add(prop.key);
                if (prop.alias) consumedProps.add(prop.alias);
                return prop;
            }
            return undefined;
        })
        .filter((itm) => itm !== undefined);

    console.log(passedProps);

    const tokenized = useMemo(() => {
        const classes: string[] = [];
        const consumed: string[] = [];

        passedProps.forEach((prop) => {
            const alias = prop.alias;
            const originPropValue = rest[prop.key as keyof typeof rest];
            const aliasPropValue = alias === undefined ? null : rest[alias];
            const value = aliasPropValue ?? originPropValue;
            if (value !== undefined) {
                const prefix = prop.prefix ?? prop.key;
                const tokens = prop.tokens;
                const resolved = resolveResponsive(value, bp);

                const isSpacing =
                    typeof resolved === 'number' &&
                    (spacingLookup.has(prop.key as string) || (alias && spacingLookup.has(alias)));

                if (isSpacing || isToken(resolved, tokens)) {
                    const safeResolved =
                        typeof resolved === 'string' ? resolved.replace('/', '-') : resolved;
                    classes.push(classPrefix(`--${prefix}-${safeResolved}`));
                    consumed.push(prop.key as string);
                    if (alias !== undefined) consumed.push(alias);
                }
            }
        });

        return { classes: classes.join(' '), consumed };
    }, [bp, rest]);

    const mapTranslate = (v: string) => {
        switch (v) {
            case '1/2':
                return '50%';
            case '-1/2':
                return '-50%';
            case 'full':
                return '100%';
            case '-full':
                return '-100%';
            default:
                return v;
        }
    };

    const transforms = useMemo(() => {
        const transforms: string[] = [];
        const consumed: string[] = [];

        const txVal = resolveResponsive(tx, bp);
        if (isToken(txVal, translatesTokens)) {
            transforms.push(`translateX(${mapTranslate(txVal)})`);
            consumed.push('tx');
        }

        const tyVal = resolveResponsive(ty, bp);
        if (isToken(tyVal, translatesTokens)) {
            transforms.push(`translateY(${mapTranslate(tyVal)})`);
            consumed.push('ty');
        }

        const scaleVal = resolveResponsive(scale, bp);
        if (isToken(scaleVal, scalesTokens)) {
            transforms.push(`scale(${Number(scaleVal) / 100})`);
            consumed.push('scale');
        }

        const rotateVal = resolveResponsive(rotate, bp);
        if (isToken(rotateVal, rotatesTokens)) {
            transforms.push(`rotate(${rotateVal}deg)`);
            consumed.push('rotate');
        }

        return { transform: transforms.length > 0 ? transforms.join(' ') : null, consumed };
    }, [tx, ty, scale, rotate]);

    const consumedKeys = new Set([...tokenized.consumed, ...transforms.consumed]);

    const cleanProps = Object.fromEntries(
        Object.entries(rest).filter(([key]) => !consumedKeys.has(key)),
    ) as UIBoxProps;

    if (transforms.transform) cleanProps.transform = transforms.transform;

    return <UIBox {...cleanProps} className={clsx(tokenized.classes, className)} />;
};
