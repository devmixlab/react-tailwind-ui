import {
    alignItems as alignItemsTokens,
    aspects as aspectsTokens,
    borderWidths as borderWidthsTokens,
    colors as colorsTokens,
    cursors as cursorsTokens,
    displays as displaysTokens,
    flexDirections as flexDirectionsTokens,
    flexWraps as flexWrapsTokens,
    fontSizes as fontSizesTokens,
    fontWeights as fontWeightsTokens,
    gaps as gapsTokens,
    insets as insetsTokens,
    justifyContents as justifyContentsTokens,
    letterSpacings as letterSpacingsTokens,
    lineHeights as lineHeightsTokens,
    overflows as overflowsTokens,
    pointerEvents as pointerEventsTokens,
    positions as positionsTokens,
    radii as radiiTokens,
    shadows as shadowsTokens,
    sizes as sizesTokens,
    spacing as spacingTokens,
    transitionDurations as transitionDurationsTokens,
    transitionEasings as transitionEasingsTokens,
    zIndexes as zIndexesTokens,
    translates as translatesTokens,
    scales as scalesTokens,
    rotates as rotatesTokens,
} from './tokens';
import { BoxProps } from '../Box';
import { StyleAliasKey, stylePropToAliasMap } from '../../tokens/styleAliasMap';
import type { StyleProp } from '../../tokens/styleProps';

export type OriginProp = (StyleProp | keyof BoxProps) & string;

export type OriginPropConfig = {
    key: OriginProp;
    prefix?: string;
    tokens?: readonly string[];
    alias?: StyleAliasKey;
    type?: 'spacing' | 'transform';
};

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

export const spacingLookup = new Set<string>(
    spacingProps.flatMap(({ key, alias }) => [key, alias]),
);

export const transformLookup = new Set<string>(['tx', 'ty', 'scale', 'rotate']);

export const rotateMap = {
    xs: '5deg',
    sm: '15deg',
    md: '45deg',
    lg: '90deg',
    xl: '180deg',
} as const;

export const resolveTransformRotate = (value: unknown): string => {
    // 1. semantic tokens (with optional minus)
    if (typeof value === 'string') {
        const isNegative = value.startsWith('-');
        const key = isNegative ? value.slice(1) : value;

        if (key in rotateMap) {
            const base = rotateMap[key as keyof typeof rotateMap];
            return isNegative ? `-${base}` : base;
        }
    }

    // 2. number → deg
    if (typeof value === 'number') {
        return `${value}deg`;
    }

    // 3. string with unit (deg, rad, turn, etc.)
    if (typeof value === 'string' && /[a-z%]+$/i.test(value)) {
        return value;
    }

    // 4. numeric string → deg
    const num = Number(value);
    if (!Number.isNaN(num)) {
        return `${num}deg`;
    }

    // 5. fallback
    return String(value);
};

export const scaleMap = {
    xs: 0.75,
    sm: 0.875,
    md: 1,
    lg: 1.25,
    xl: 1.5,
} as const;

export const resolveTransformScale = (value: unknown): string => {
    if (typeof value === 'string') {
        const isNegative = value.startsWith('-');
        const key = isNegative ? value.slice(1) : value;

        // 1. semantic tokens
        if (key in scaleMap) {
            const base = scaleMap[key as keyof typeof scaleMap];
            return String(isNegative ? -base : base);
        }

        // 2. numeric string
        const num = Number(value);
        if (!Number.isNaN(num)) {
            const normalized = num > 10 ? num / 100 : num;
            return String(normalized);
        }

        // 3. fallback
        return value;
    }

    // 4. number
    if (typeof value === 'number') {
        return String(value > 10 ? value / 100 : value);
    }

    return String(value);
};

export const resolveTransformTranslate = (v: string) => {
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

export const durationMap = {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
} as const;

export const easingMap = {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const resolveTransitionDuration = (value: unknown): string => {
    if (typeof value === 'string' && value in durationMap) {
        return durationMap[value as keyof typeof durationMap];
    }

    return String(value);
};

export const resolveTransitionEasing = (value: unknown): string => {
    if (typeof value === 'string' && value in easingMap) {
        return easingMap[value as keyof typeof easingMap];
    }

    return String(value);
};

export const config: OriginPropConfig[] = [
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

    // transform
    { key: 'tx', type: 'transform' },
    { key: 'ty', type: 'transform' },
    { key: 'scale', type: 'transform' },
    { key: 'scaleX', type: 'transform' },
    { key: 'scaleY', type: 'transform' },
    { key: 'rotate', type: 'transform' },

    // { key: 'transD', prefix: 'trans-d', tokens: transitionDurationsTokens },
    // { key: 'transE', prefix: 'trans-e', tokens: transitionEasingsTokens },

    ...[['gap'], ['rowGap', 'row-gap'], ['columnGap', 'col-gap']].map(([key, prefix]) => ({
        key: key as OriginProp,
        prefix: prefix ?? key,
        tokens: gapsTokens,
    })),

    ...[
        ['backgroundColor', 'bg'],
        ['borderColor', 'bc'],
        ['color', 'c'],
    ].map(([key, prefix]) => ({
        key: key as OriginProp,
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
        key: key as OriginProp,
        prefix,
        tokens: insetsTokens,
    })),

    // Overflow
    ...[
        ['overflow', 'ov'],
        ['overflowX', 'ov-x'],
        ['overflowY', 'ov-y'],
    ].map(([key, prefix]) => ({
        key: key as OriginProp,
        prefix,
        tokens: overflowsTokens,
    })),

    // Spacing
    ...spacingProps.map(({ key, alias }) => ({
        key: key as OriginProp,
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
        key: key as OriginProp,
        prefix,
        tokens: sizesTokens,
    })),
];

export const configLookup = Object.fromEntries(
    config.flatMap((c) => {
        const aliasKey = stylePropToAliasMap[c.key as keyof typeof stylePropToAliasMap];
        const assignProp = c;
        if (spacingLookup.has(c.key as string)) assignProp.type = 'spacing';
        if (aliasKey) assignProp.alias = aliasKey;

        const entries: [string, typeof assignProp][] = [[c.key, assignProp]];

        if (aliasKey !== undefined) {
            entries.push([aliasKey, assignProp]);
        }

        return entries;
    }),
);
