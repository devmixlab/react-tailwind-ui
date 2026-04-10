import React from 'react';
import { styleAliasMap } from '../tokens/styleAliasMap';
import { Box, BoxProps } from './Box';

type AliasMap = typeof styleAliasMap;

type AliasProps = {
    [K in keyof AliasMap]?: BoxProps[AliasMap[K]];
};

export type UIBoxProps = BoxProps & AliasProps;

export const UIBox: React.FC<UIBoxProps> = (props) => {
    const mapped: Record<string, any> = {};

    for (const key in props) {
        const value = (props as any)[key];
        if (value === undefined) continue;

        const mappedKey = (styleAliasMap as Record<string, string>)[key] ?? key;

        mapped[mappedKey] = value;
    }

    return <Box {...mapped} />;
};
