import React from 'react';
import { styleAliasMap } from '../../tokens/styleAliasMap';
import { StyleBox, StyleBoxProps } from './StyleBox';

type AliasMap = typeof styleAliasMap;

type AliasProps = {
    [K in keyof AliasMap]?: StyleBoxProps[AliasMap[K]];
};

export type AliasBoxProps = StyleBoxProps & AliasProps;

export const AliasBox: React.FC<AliasBoxProps> = (props) => {
    const mapped: Record<string, any> = {};

    for (const key in props) {
        const value = (props as any)[key];
        if (value === undefined) continue;

        const mappedKey = (styleAliasMap as Record<string, string>)[key] ?? key;

        mapped[mappedKey] = value;
    }

    return <StyleBox {...mapped} />;
};
