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
} from './tokens';
import { Props } from '../Box';
import { StyleAliasKey, stylePropToAliasMap } from '../../tokens/styleAliasMap';
import type { StyleProp } from '../../tokens/styleProps';

export type OriginProp = (StyleProp | keyof Props) & string;

export type OriginPropConfig = {
    key: OriginProp;
    prefix: string;
    tokens: readonly string[];
    alias?: StyleAliasKey;
    type?: 'spacing';
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
