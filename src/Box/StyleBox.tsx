import React, { CSSProperties, ElementType } from 'react';
import { getActiveBreakpoint, Responsive, resolveResponsive } from './Box.helpers';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useWindowWidthContext } from './WindowWidthProvider';
import { styleProps, type StyleProp as StylePropKey } from '../tokens/styleProps';

const stylePropSet = new Set(styleProps);
const isStyleProp = (key: string): key is StylePropKey => stylePropSet.has(key as StylePropKey);

type StyleProps = {
    [K in StylePropKey]?: Responsive<React.CSSProperties[K]>;
};

export type StyleBoxProps<C extends ElementType = 'div'> = {
    as?: C;
} & StyleProps &
    Omit<React.ComponentPropsWithoutRef<C>, keyof StyleProps>;

const StyleBox = <C extends ElementType = 'div'>({
    as,
    children,
    className,
    style: userStyle,
    ...rest
}: StyleBoxProps<C>) => {
    const widthFromContext = useWindowWidthContext();
    const windowWidth = widthFromContext ?? useWindowWidth();
    const bp = getActiveBreakpoint(windowWidth);

    const Component = as || 'div';

    const style: CSSProperties = { ...userStyle };
    const props: Record<string, unknown> = {};

    for (const key in rest) {
        if (isStyleProp(key)) {
            const value = rest[key];
            if (value !== undefined) {
                const resolved = resolveResponsive(value, bp);
                if (resolved !== undefined) style[key] = resolved as any;
            }
        } else {
            props[key] = (rest as any)[key];
        }
    }

    return (
        <Component className={className} style={style} {...props}>
            {children}
        </Component>
    );
};

export { StyleBox };
