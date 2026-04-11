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
    spacing,

    // Flex
    flexDirections,
    justifyContents,
    alignItemsTokens,
    flexWraps,

    // Size
    sizeTokens,
    aspectTokens,

    // Cursor/Pointer Events
    cursors,
    pointerEvents as pointerEventsTokens,

    // Position
    positions,
    insetTokens,

    // Transform
    translates,
    scales,
    rotates,

    // Transition
    transitionDurations,
    transitionEasings,

    // Others
    zIndexes,
    displays,
    overflowTokens,
    gapTokens,
} from './Box.tokens';
import { useWindowWidthContext } from './WindowWidthProvider';
import { useWindowWidth } from '../hooks/useWindowWidth';

export interface TokenizedBoxProps extends UIBoxProps {}

type Prop = {
    key: keyof UIBoxProps;
    prefix?: string;
    originalKey?: string;
    tokens: readonly string[];
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

    const {
        backgroundColor,
        bg,
        borderColor,
        bc,
        color,
        c,

        boxShadow,
        shadow,

        borderRadius,
        radius,

        fontSize,
        fs,
        fontWeight,
        fw,
        lineHeight,
        lh,
        letterSpacing,
        ls,

        borderWidth,
        bw,

        // Space props
        p,
        pt,
        pb,
        pl,
        pr,
        px,
        py,
        m,
        mt,
        mb,
        ml,
        mr,
        mx,
        my,

        // Flex
        flexDirection,
        dir,
        justifyContent,
        justify,
        alignItems,
        align,
        flexWrap,
        wrap,

        // Sizes
        width,
        w,
        height,
        h,
        minWidth,
        minW,
        maxWidth,
        maxW,
        minHeight,
        minH,
        maxHeight,
        maxH,
        aspectRatio,
        aspect,

        // Cursor & Pointer Events
        cursor,
        pointerEvents,
        ptr,

        // Position
        position,
        pos,
        top,
        bottom,
        left,
        right,

        // transform
        tx,
        ty,
        scale,
        rotate,

        // transition
        transD,
        transE,

        // others
        zIndex,
        z,
        display,
        d,
        overflow,
        overflowX,
        overflowY,
        gap,
        rowGap,
        columnGap,
        colGap,
    } = uiBoxProps;

    const props: Prop[] = [
        {
            key: bg ? 'bg' : 'backgroundColor',
            prefix: 'bg',
            originalKey: 'backgroundColor',
            tokens: colors,
        },
        {
            key: bc ? 'bc' : 'borderColor',
            prefix: 'border',
            originalKey: 'borderColor',
            tokens: colors,
        },
        {
            key: c ? 'c' : 'color',
            prefix: 'text',
            originalKey: 'color',
            tokens: colors,
        },

        {
            key: shadow ? 'shadow' : 'boxShadow',
            prefix: 'shadow',
            originalKey: 'boxShadow',
            tokens: shadows,
        },

        {
            key: radius ? 'radius' : 'borderRadius',
            prefix: 'radius',
            originalKey: 'borderRadius',
            tokens: radii,
        },

        {
            key: fs ? 'fs' : 'fontSize',
            prefix: 'fs',
            originalKey: 'fontSize',
            tokens: fontSizes,
        },
        {
            key: fw ? 'fw' : 'fontWeight',
            prefix: 'fw',
            originalKey: 'fontWeight',
            tokens: fontWeights,
        },
        {
            key: lh ? 'lh' : 'lineHeight',
            prefix: 'lh',
            originalKey: 'lineHeight',
            tokens: lineHeights,
        },
        {
            key: ls ? 'ls' : 'letterSpacing',
            prefix: 'ls',
            originalKey: 'letterSpacing',
            tokens: letterSpacings,
        },

        {
            key: bw ? 'bw' : 'borderWidth',
            prefix: 'bw',
            originalKey: 'borderWidth',
            tokens: borderWidths,
        },

        // Sizing
        { key: 'p', tokens: spacing },
        { key: 'pt', tokens: spacing },
        { key: 'pb', tokens: spacing },
        { key: 'pl', tokens: spacing },
        { key: 'pr', tokens: spacing },
        { key: 'px', tokens: spacing },
        { key: 'py', tokens: spacing },

        { key: 'm', tokens: spacing },
        { key: 'mt', tokens: spacing },
        { key: 'mb', tokens: spacing },
        { key: 'ml', tokens: spacing },
        { key: 'mr', tokens: spacing },
        { key: 'mx', tokens: spacing },
        { key: 'my', tokens: spacing },

        // Flex
        {
            key: dir ? 'dir' : 'flexDirection',
            prefix: 'dir',
            originalKey: 'flexDirection',
            tokens: flexDirections,
        },
        {
            key: justify ? 'justify' : 'justifyContent',
            prefix: 'justify',
            originalKey: 'justifyContent',
            tokens: justifyContents,
        },
        {
            key: align ? 'align' : 'alignItems',
            prefix: 'align',
            originalKey: 'alignItems',
            tokens: alignItemsTokens,
        },
        {
            key: wrap ? 'wrap' : 'flexWrap',
            prefix: 'wrap',
            originalKey: 'flexWrap',
            tokens: flexWraps,
        },

        // Sizes
        {
            key: w ? 'w' : 'width',
            prefix: 'w',
            originalKey: 'width',
            tokens: sizeTokens,
        },
        {
            key: h ? 'h' : 'height',
            prefix: 'h',
            originalKey: 'height',
            tokens: sizeTokens,
        },
        {
            key: minW ? 'minW' : 'minWidth',
            prefix: 'min-w',
            originalKey: 'minWidth',
            tokens: sizeTokens,
        },
        {
            key: maxW ? 'maxW' : 'maxWidth',
            prefix: 'max-w',
            originalKey: 'maxWidth',
            tokens: sizeTokens,
        },
        {
            key: minH ? 'minH' : 'minHeight',
            prefix: 'min-h',
            originalKey: 'minHeight',
            tokens: sizeTokens,
        },
        {
            key: maxH ? 'maxH' : 'maxHeight',
            prefix: 'max-h',
            originalKey: 'maxHeight',
            tokens: sizeTokens,
        },
        {
            key: aspect ? 'aspect' : 'aspectRatio',
            prefix: 'aspect',
            originalKey: 'aspectRatio',
            tokens: aspectTokens,
        },

        // Cursor & Pointer Events
        { key: 'cursor', tokens: cursors },
        {
            key: ptr ? 'ptr' : 'pointerEvents',
            prefix: 'ptr',
            originalKey: 'pointerEvents',
            tokens: pointerEventsTokens,
        },

        // Position
        {
            key: pos ? 'pos' : 'position',
            prefix: 'pos',
            originalKey: 'position',
            tokens: positions,
        },
        { key: 'top', tokens: insetTokens },
        { key: 'left', tokens: insetTokens },
        { key: 'right', tokens: insetTokens },
        { key: 'bottom', tokens: insetTokens },

        // transition
        { key: 'transD', prefix: 'trans-d', tokens: transitionDurations },
        { key: 'transE', prefix: 'trans-d', tokens: transitionEasings },

        // others
        {
            key: z ? 'z' : 'zIndex',
            prefix: 'z',
            originalKey: 'zIndex',
            tokens: zIndexes,
        },
        {
            key: d ? 'd' : 'display',
            prefix: 'd',
            originalKey: 'display',
            tokens: displays,
        },
        { key: 'overflow', tokens: overflowTokens },
        { key: 'overflowX', prefix: 'overflow-x', tokens: overflowTokens },
        { key: 'overflowY', prefix: 'overflow-y', tokens: overflowTokens },

        { key: 'gap', tokens: gapTokens },
        { key: 'rowGap', prefix: 'row-gap', tokens: gapTokens },
        {
            key: colGap ? 'colGap' : 'columnGap',
            prefix: 'col-gap',
            originalKey: 'columnGap',
            tokens: gapTokens,
        },
    ];

    const tokenized = useMemo(() => {
        const classes: string[] = [];
        const consumed: string[] = [];

        props.forEach((prop) => {
            const value = uiBoxProps[prop.key as keyof typeof uiBoxProps];
            const prefix = prop.prefix ?? prop.key;
            const tokens = prop.tokens;
            const resolved = resolveResponsive(value, bp);
            if (prop.key === 'mb') {
                console.log('resolved:');
                console.log(resolved);
                console.log(isToken(resolved, tokens));
                // console.log(uiBoxProps);
            }
            if (isToken(resolved, tokens)) {
                const safeResolved = resolved.replace('/', '-');
                classes.push(classPrefix(`--${prefix}-${safeResolved}`));
                consumed.push(prop.key as string);
                if (prop.originalKey) consumed.push(prop.originalKey);

                // if (prop.key === 'fw') {
                //     console.log('resolved:');
                //     console.log(cl);
                //     console.log(uiBoxProps);
                // }
            }
        });

        return { classes: classes.join(' '), consumed };
    }, [
        bp,

        backgroundColor,
        bg,
        borderColor,
        bc,
        color,
        c,

        boxShadow,
        shadow,

        borderRadius,
        radius,

        fontSize,
        fs,
        fontWeight,
        fw,
        lineHeight,
        lh,
        letterSpacing,
        ls,

        borderWidth,
        bw,

        // Spacing
        p,
        pt,
        pb,
        pl,
        pr,
        px,
        py,
        m,
        mt,
        mb,
        ml,
        mr,
        mx,
        my,

        // Flex
        flexDirection,
        dir,
        justifyContent,
        justify,
        alignItems,
        align,
        flexWrap,
        wrap,

        // Sizes
        width,
        w,
        height,
        h,
        minWidth,
        minW,
        maxWidth,
        maxW,
        minHeight,
        minH,
        maxHeight,
        maxH,
        aspectRatio,
        aspect,

        // Cursor & Pointer Events
        cursor,
        pointerEvents,
        ptr,

        // Position
        position,
        pos,
        top,
        bottom,
        left,
        right,

        // transition
        transD,
        transE,

        // others
        zIndex,
        z,
        display,
        d,
        overflow,
        overflowX,
        overflowY,
        gap,
        rowGap,
        columnGap,
        colGap,
    ]);

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

        const txVal = resolveResponsive(uiBoxProps.tx, bp);
        if (isToken(txVal, translates)) {
            transforms.push(`translateX(${mapTranslate(txVal)})`);
            consumed.push('tx');
        }

        const tyVal = resolveResponsive(uiBoxProps.ty, bp);
        if (isToken(tyVal, translates)) {
            transforms.push(`translateY(${mapTranslate(tyVal)})`);
            consumed.push('ty');
        }

        const scaleVal = resolveResponsive(uiBoxProps.scale, bp);
        if (isToken(scaleVal, scales)) {
            transforms.push(`scale(${Number(scaleVal) / 100})`);
            consumed.push('scale');
        }

        const rotateVal = resolveResponsive(uiBoxProps.rotate, bp);
        if (isToken(rotateVal, rotates)) {
            transforms.push(`rotate(${rotateVal}deg)`);
            consumed.push('rotate');
        }

        return { transform: transforms.length > 0 ? transforms.join(' ') : null, consumed };
    }, [tx, ty, scale, rotate]);

    const consumedKeys = new Set([...tokenized.consumed, ...transforms.consumed]);

    const cleanProps = Object.fromEntries(
        Object.entries(uiBoxProps).filter(([key]) => !consumedKeys.has(key)),
    ) as UIBoxProps;

    if (transforms.transform) cleanProps.transform = transforms.transform;

    return <UIBox {...cleanProps} className={clsx(tokenized.classes, className)} />;
};
