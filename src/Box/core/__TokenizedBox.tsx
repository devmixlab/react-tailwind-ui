import React, { useMemo } from 'react';
import { AliasBox, AliasProps } from './AliasBox';
import clsx from 'clsx';
import { getActiveBreakpoint, type Responsive, resolveResponsive } from './helpers';
import { classPrefix } from '../../utils/classPrefix';
import {
    // Transform
    translates as translatesTokens,
    scales as scalesTokens,
    rotates as rotatesTokens,
} from './tokens';
import { useWindowWidthContext } from '../WindowWidthProvider';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { configLookup } from './config';
import { createPolymorphic } from '../../types/polymorphic';

export type TokenizedProps = {
    // transform
    tx?: Responsive<string>; // translateX
    ty?: Responsive<string>; // translateY
    scale?: Responsive<string>;
    rotate?: Responsive<string>;

    // transition
    transD?: Responsive<string>; // duration
    transE?: Responsive<string>; // easing
} & AliasProps;

export type TokenizedBoxProps = Props & AliasProps;

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

export const __TokenizedBox: React.FC<TokenizedBoxProps> = ({
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
    ): value is string => {
        return typeof value === 'string' && tokens.includes(value);
    };

    const restEntries = Object.entries(rest);

    const tokenizationResult = useMemo(() => {
        const classes: string[] = [];
        const tokenized = new Set<string>();
        const locked = new Set<string>();

        restEntries.forEach(([key, value]) => {
            if (value == null || locked.has(key)) return;

            const config = configLookup[key];
            if (!config) return;

            locked.add(config.key);
            if (config.alias) locked.add(config.alias);

            const resolved = resolveResponsive(value, bp);
            const isSpacing = typeof resolved === 'number' && config.type === 'spacing';

            if (isSpacing || isToken(resolved, config.tokens)) {
                const safeResolved =
                    typeof resolved === 'string' ? resolved.replace('/', '-') : resolved;
                classes.push(classPrefix(`--${config.prefix}-${safeResolved}`));
                tokenized.add(config.key);
                if (config.alias) tokenized.add(config.alias);
            }
        });

        return { classes: classes.join(' '), tokenized };
    }, [bp, rest]);

    const transforms = useMemo(() => {
        const transforms: string[] = [];
        const consumed = new Set<string>();

        const txVal = resolveResponsive(tx, bp);
        if (isToken(txVal, translatesTokens)) {
            transforms.push(`translateX(${mapTranslate(txVal)})`);
            consumed.add('tx');
        }

        const tyVal = resolveResponsive(ty, bp);
        if (isToken(tyVal, translatesTokens)) {
            transforms.push(`translateY(${mapTranslate(tyVal)})`);
            consumed.add('ty');
        }

        const scaleVal = resolveResponsive(scale, bp);
        if (isToken(scaleVal, scalesTokens)) {
            transforms.push(`scale(${Number(scaleVal) / 100})`);
            consumed.add('scale');
        }

        const rotateVal = resolveResponsive(rotate, bp);
        if (isToken(rotateVal, rotatesTokens)) {
            transforms.push(`rotate(${rotateVal}deg)`);
            consumed.add('rotate');
        }

        return { transform: transforms.length > 0 ? transforms.join(' ') : null, consumed };
    }, [tx, ty, scale, rotate]);

    const consumedKeys = new Set([...tokenizationResult.tokenized, ...transforms.consumed]);

    const cleanProps: Record<string, any> = Object.fromEntries(
        restEntries.filter(([key]) => !consumedKeys.has(key)),
    ) as AliasBoxProps;

    if (transforms.transform) cleanProps.transform = transforms.transform;

    return <AliasBox {...cleanProps} className={clsx(tokenizationResult.classes, className)} />;
};
