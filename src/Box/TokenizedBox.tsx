import React, { useMemo } from 'react';
// import { UIBox } from './UIBox';
import { UIBox, UIBoxProps } from './UIBox';
import clsx from 'clsx';
import {
    toSize,
    getResponsiveClasses,
    isResponsiveObject,
    breakpoints,
    getActiveBreakpoint,
    Responsive,
    resolveResponsive,
} from './Box.helpers';
import { classPrefix } from '../utils/classPrefix';
import {
    colors,
    shadows,
    radii,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    borderWidths,
} from './Box.tokens';
import { useWindowWidthContext } from './WindowWidthProvider';
import { useWindowWidth } from '../hooks/useWindowWidth';

export interface TokenizedBoxProps extends UIBoxProps {}

type Prop = {
    key: keyof UIBoxProps;
    prefix: string;
    originalKey: string;
    isOriginalKey: boolean;
};

export const TokenizedBox: React.FC<TokenizedBoxProps> = ({ className, ...rest }) => {
    const widthFromContext = useWindowWidthContext();
    const windowWidth = widthFromContext || useWindowWidth();
    const bp = getActiveBreakpoint(windowWidth);

    const uiBoxProps = { ...rest };

    // console.log('breakpoint:');
    // console.log(bp);

    const isToken = (value: string | undefined, tokens: readonly string[]): value is string =>
        typeof value === 'string' && tokens.includes(value);

    const getClasses = (props: Prop[], tokens: readonly string[]) => {
        const classes: string[] = [];

        props.forEach((prop) => {
            const v = uiBoxProps[prop.key as keyof typeof uiBoxProps];
            const p = prop.prefix;
            const cl = resolveResponsive(v, bp);
            if (prop.key === 'fw') {
                console.log('resolved:');
                console.log(cl);
                console.log(isToken(cl, tokens));
                console.log(uiBoxProps);
            }
            // if (typeof cl === 'string' && (tokens as readonly string[]).includes(cl as any)) {
            if (isToken(cl, tokens)) {
                classes.push(classPrefix(`--${p}-${cl}`));
                delete uiBoxProps[prop.key as keyof typeof uiBoxProps];
                delete uiBoxProps[prop.originalKey as keyof typeof uiBoxProps];
                // if (!prop.isOriginalKey) {
                //     delete uiBoxProps[prop.originalKey as keyof typeof uiBoxProps];
                // }

                // if (prop.key === 'fw') {
                //     console.log('resolved:');
                //     console.log(cl);
                //     console.log(uiBoxProps);
                // }
            }
        });

        return classes.join(' ');
    };

    const { backgroundColor, bg, borderColor, bc, color, c } = uiBoxProps;

    const colorProps: Prop[] = [
        {
            key: bg ? 'bg' : 'backgroundColor',
            prefix: 'bg',
            originalKey: 'backgroundColor',
            isOriginalKey: !bg,
        },
        {
            key: bc ? 'bc' : 'borderColor',
            prefix: 'border',
            originalKey: 'borderColor',
            isOriginalKey: !bc,
        },
        {
            key: c ? 'c' : 'color',
            prefix: 'text',
            originalKey: 'color',
            isOriginalKey: !c,
        },
    ];

    const colorClasses = useMemo(
        () => getClasses(colorProps, colors),
        [bp, backgroundColor, bg, borderColor, bc, color, c],
    );

    const { boxShadow, shadow } = uiBoxProps;
    const shadowProps: Prop[] = [
        {
            key: shadow ? 'shadow' : 'boxShadow',
            prefix: 'shadow',
            originalKey: 'boxShadow',
            isOriginalKey: !shadow,
        },
    ];
    const shadowClasses = useMemo(() => getClasses(shadowProps, shadows), [bp, boxShadow, shadow]);

    const { borderRadius, radius } = uiBoxProps;
    const radiusProps: Prop[] = [
        {
            key: radius ? 'radius' : 'borderRadius',
            prefix: 'radius',
            originalKey: 'borderRadius',
            isOriginalKey: !radius,
        },
    ];
    const radiusClasses = useMemo(() => getClasses(radiusProps, radii), [bp, borderRadius, radius]);

    const { fontSize, fs, fontWeight, fw, lineHeight, lh, letterSpacing, ls } = uiBoxProps;
    // const typographyProps: Prop[] = [
    //     {
    //         key: fs ? 'fs' : 'fontSize',
    //         prefix: 'fs',
    //         originalKey: 'fontSize',
    //         isOriginalKey: !fs,
    //     },
    //     {
    //         key: fw ? 'fw' : 'fontWeight',
    //         prefix: 'fw',
    //         originalKey: 'fontWeight',
    //         isOriginalKey: !fw,
    //     },
    //     {
    //         key: lh ? 'lh' : 'lineHeight',
    //         prefix: 'lh',
    //         originalKey: 'lineHeight',
    //         isOriginalKey: !lh,
    //     },
    //     {
    //         key: ls ? 'ls' : 'letterSpacing',
    //         prefix: 'ls',
    //         originalKey: 'letterSpacing',
    //         isOriginalKey: !ls,
    //     },
    // ];

    const typographyProps: Prop[] = [
        {
            key: fs ? 'fs' : 'fontSize',
            prefix: 'fs',
            originalKey: 'fontSize',
            isOriginalKey: !fs,
        },
        {
            key: fw ? 'fw' : 'fontWeight',
            prefix: 'fw',
            originalKey: 'fontWeight',
            isOriginalKey: !fw,
        },
        {
            key: lh ? 'lh' : 'lineHeight',
            prefix: 'lh',
            originalKey: 'lineHeight',
            isOriginalKey: !lh,
        },
        {
            key: ls ? 'ls' : 'letterSpacing',
            prefix: 'ls',
            originalKey: 'letterSpacing',
            isOriginalKey: !ls,
        },
    ];

    const typographyClasses = useMemo(
        () =>
            clsx(
                getClasses([typographyProps[0]], fontSizes),
                getClasses([typographyProps[1]], fontWeights),
                getClasses([typographyProps[2]], lineHeights),
                getClasses([typographyProps[3]], letterSpacings),
            ),
        [bp, fontSize, fs, fontWeight, fw, lineHeight, lh, letterSpacing, ls],
    );

    // const typographyClasses = useMemo(
    //     () => getClasses(typographyProps, fontWeights),
    //     [bp, boxShadow, shadow],
    // );

    const { borderWidth, bw } = uiBoxProps;
    const borderWidthProps: Prop[] = [
        {
            key: bw ? 'bw' : 'borderWidth',
            prefix: 'bw',
            originalKey: 'borderWidth',
            isOriginalKey: !bw,
        },
    ];
    const borderWidthClasses = useMemo(
        () => getClasses(borderWidthProps, borderWidths),
        [bp, borderWidth, bw],
    );

    return (
        <UIBox
            {...uiBoxProps}
            className={clsx(
                colorClasses,
                shadowClasses,
                radiusClasses,
                typographyClasses,
                borderWidthClasses,
                className,
            )}
        />
    );
};
