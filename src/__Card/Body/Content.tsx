import React, { useMemo, CSSProperties } from 'react';
import clsx from 'clsx';
import { prefix as classPrefix } from '../Card';

type ContentProps = {
    children: React.ReactNode;
    className?: string;
    width?: number | string;
    grow?: boolean;
    shrink?: boolean;
    basis?: number | string | 'auto';
};

const prefix = (name: string = '') => {
    return classPrefix(`__content${name}`);
};

const toSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

const Content = ({ className, children, width, grow, shrink, basis }: ContentProps) => {
    const cl = useMemo(() => clsx(className, prefix()), [className]);

    const style: React.CSSProperties = useMemo(() => {
        const style: CSSProperties = {};

        // width (independent)
        if (width) {
            const w = toSize(width);
            style.width = w;
            style.maxWidth = w;
        }

        // flex behavior
        if (grow !== undefined) {
            style.flexGrow = grow ? 1 : 0;
        }

        if (shrink !== undefined) {
            style.flexShrink = shrink ? 1 : 0;
        }

        if (basis !== undefined) {
            style.flexBasis = basis === 'auto' ? 'auto' : toSize(basis);
        }

        return style;
    }, [width]);

    return (
        <div className={cl} style={style}>
            {children}
        </div>
    );
};
Content.displayName = '__Card.Body.Content';

export { Content };
