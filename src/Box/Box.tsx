import React, { useMemo } from 'react';
import { DerivedBoxProps, DerivedBox } from './core/DerivedBox';
import clsx from 'clsx';
import { getActiveBreakpoint, type Responsive, resolveResponsive } from './core/helpers';
import { classPrefix } from '../utils/classPrefix';
import {
    // Transform
    translates as translatesTokens,
    scales as scalesTokens,
    rotates as rotatesTokens,
} from './core/tokens';
import { useWindowWidthContext } from './WindowWidthProvider';
import { useWindowWidth } from '../hooks/useWindowWidth';
import {
    configLookup,
    transformLookup,
    resolveTransformScale,
    resolveTransformTranslate,
    resolveTransformRotate,
} from './core/config';

type Responsiveify<T> = {
    [K in keyof T]?: Responsive<T[K]>;
};

export type Props = {};

export type BoxProps = Props & Responsiveify<DerivedBoxProps>;

export const Box: React.FC<BoxProps> = ({ className, ...rest }) => {
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
        const locked = new Set<string>();
        const resolvedProps: Partial<Record<keyof BoxProps, any>> = {};

        restEntries.forEach(([key, value]) => {
            const resolved = resolveResponsive(value, bp);

            if (resolved == null || locked.has(key)) return;

            const config = configLookup[key];
            if (!config) {
                resolvedProps[key as keyof BoxProps] = resolved;
                return;
            }

            locked.add(config.key);
            if (config.alias) locked.add(config.alias);

            const isSpacing = typeof resolved === 'number' && config.type === 'spacing';

            if (config.type === 'transform') {
                if (config.key === 'tx' || config.key === 'ty') {
                    resolvedProps[key as keyof BoxProps] = resolveTransformTranslate(resolved);
                } else if (
                    config.key === 'scale' ||
                    config.key === 'scaleX' ||
                    config.key === 'scaleY'
                ) {
                    resolvedProps[key as keyof BoxProps] = resolveTransformScale(resolved);
                } else if (config.key === 'rotate') {
                    resolvedProps[key as keyof BoxProps] = resolveTransformRotate(resolved);
                }
            } else if (
                isSpacing ||
                (config.tokens !== undefined && isToken(resolved, config.tokens))
            ) {
                const safeResolved =
                    typeof resolved === 'string' ? resolved.replace('/', '-') : resolved;
                classes.push(classPrefix(`--${config.prefix}-${safeResolved}`));
            } else {
                resolvedProps[key as keyof BoxProps] = resolved;
            }
        });

        return { classes: classes.join(' '), resolved: resolvedProps };
    }, [bp, rest]);

    // const transforms = useMemo(() => {
    //     const transforms: string[] = [];
    //     const consumed = new Set<string>();
    //
    //     const txVal = resolveResponsive(tx, bp);
    //     if (isToken(txVal, translatesTokens)) {
    //         transforms.push(`translateX(${mapTranslate(txVal)})`);
    //         consumed.add('tx');
    //     }
    //
    //     const tyVal = resolveResponsive(ty, bp);
    //     if (isToken(tyVal, translatesTokens)) {
    //         transforms.push(`translateY(${mapTranslate(tyVal)})`);
    //         consumed.add('ty');
    //     }
    //
    //     const scaleVal = resolveResponsive(scale, bp);
    //     if (isToken(scaleVal, scalesTokens)) {
    //         transforms.push(`scale(${Number(scaleVal) / 100})`);
    //         consumed.add('scale');
    //     }
    //
    //     const rotateVal = resolveResponsive(rotate, bp);
    //     if (isToken(rotateVal, rotatesTokens)) {
    //         transforms.push(`rotate(${rotateVal}deg)`);
    //         consumed.add('rotate');
    //     }
    //
    //     return { transform: transforms.length > 0 ? transforms.join(' ') : null, consumed };
    // }, [tx, ty, scale, rotate]);

    // const consumedKeys = new Set([...tokenizationResult.tokenized, ...transforms.consumed]);

    // const cleanProps: Record<string, any> = Object.fromEntries(
    //     restEntries.filter(([key]) => !consumedKeys.has(key)),
    // ) as DerivedBoxProps;

    // if (transforms.transform) cleanProps.transform = transforms.transform;

    return (
        <DerivedBox
            {...tokenizationResult.resolved}
            className={clsx(tokenizationResult.classes, className)}
        />
    );
};
