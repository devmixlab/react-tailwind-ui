import React, { CSSProperties } from 'react';
import { Box } from './Box';
import { BoxProps } from './Box.props';
import type { Responsive } from './Box.helpers';

export interface UIBoxProps extends BoxProps {
    /** Visual / appearance aliases */
    z?: BoxProps['zIndex'];
    bg?: BoxProps['backgroundColor'];
    radius?: BoxProps['borderRadius'];
    shadow?: BoxProps['boxShadow'];
    bc?: BoxProps['borderColor'];
    bst?: BoxProps['borderStyle'];
    bw?: BoxProps['borderWidth'];
    aspect?: BoxProps['aspectRatio'];

    // visual / interaction
    ptr?: BoxProps['pointerEvents'];

    /** Sizing aliases */
    w?: BoxProps['width'];
    h?: BoxProps['height'];
    minW?: BoxProps['minWidth'];
    maxW?: BoxProps['maxWidth'];
    minH?: BoxProps['minHeight'];
    maxH?: BoxProps['maxHeight'];

    /** Flex / layout shortcuts */
    grow?: BoxProps['flexGrow'];
    shrink?: BoxProps['flexShrink'];
    basis?: BoxProps['flexBasis'];
    dir?: BoxProps['flexDirection'];
    justify?: BoxProps['justifyContent'];
    align?: BoxProps['alignItems'];
    wrap?: BoxProps['flexWrap'];
    colGap?: BoxProps['columnGap'];
    gridCol?: BoxProps['gridColumn'];

    // typography
    fs?: BoxProps['fontSize'];
    fst?: BoxProps['fontStyle'];
    fw?: BoxProps['fontWeight'];
    lh?: BoxProps['lineHeight'];
    c?: BoxProps['color'];
    ta?: BoxProps['textAlign'];
    tt?: BoxProps['textTransform'];
    ls?: BoxProps['letterSpacing'];
    ff?: BoxProps['fontFamily'];
    td?: BoxProps['textDecoration'];
}

export const UIBox: React.FC<UIBoxProps> = ({
    z,
    bg,
    radius,
    shadow,
    bc,
    bst,
    bw,
    aspect,
    ptr,
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
    grow,
    shrink,
    basis,
    dir,
    justify,
    align,
    wrap,
    colGap,
    gridCol,

    // typography
    fs,
    fst,
    fw,
    lh,
    c,
    ta,
    tt,
    ls,
    ff,
    td,

    ...rest
}) => {
    const applyAliases = <T extends Record<string, any>>(aliases: T): Partial<T> =>
        Object.fromEntries(
            Object.entries(aliases).filter(([_, v]) => v !== undefined),
        ) as Partial<T>;

    return (
        <Box
            {...rest}
            {...applyAliases({
                zIndex: z,
                backgroundColor: bg,
                borderRadius: radius,
                boxShadow: shadow,
                borderColor: bc,
                borderStyle: bst,
                borderWidth: bw,
                aspectRatio: aspect,
                pointerEvents: ptr,
                width: w,
                height: h,
                minWidth: minW,
                maxWidth: maxW,
                minHeight: minH,
                maxHeight: maxH,
                flexGrow: grow,
                flexShrink: shrink,
                flexBasis: basis,
                flexDirection: dir,
                justifyContent: justify,
                alignItems: align,
                flexWrap: wrap,
                columnGap: colGap,
                gridColumn: gridCol,

                // typography
                fontSize: fs,
                fontStyle: fst,
                fontWeight: fw,
                lineHeight: lh,
                color: c,
                textAlign: ta,
                textTransform: tt,
                letterSpacing: ls,
                fontFamily: ff,
                textDecoration: td,
            })}
        />
    );
};
