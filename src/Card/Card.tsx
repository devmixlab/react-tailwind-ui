// import React from 'react';
import React, { useMemo, ElementType, ComponentPropsWithoutRef } from 'react';
import { type Shadow, type View } from '../tokens/card';
import { type Size, type Variant, type Radius } from '../tokens/common';
import { cardStyles as cs } from './Card.styles';
import clsx from 'clsx';
import { CardProvider } from './Card.context';

type Col = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

type CardOwnProps = {
    children: React.ReactNode;
    className?: string;
    shadow?: Shadow;
    variant?: Variant;
    view?: View;
    col?: Col;
    smCol?: Col;
    mdCol?: Col;
    lgCol?: Col;
    xlCol?: Col;
    // borderAccent?: 'left' | 'top' | 'none';
    // padding?: 'sm' | 'md' | 'lg';
    // hoverEffect?: boolean;
    // as?: React.ReactElement; // for polymorphism, like alerts
};

type CardProps<T extends ElementType> = CardOwnProps & {
    as?: T;
} & ComponentPropsWithoutRef<T>;

// export type TableComponent = React.FC<CardProps<'div'>> & {
//     // Head: React.FC<CardProps>;
//     // Body: React.FC<CardProps>;
//     Header: React.FC<any>;
//     // Cell: React.FC<any>;
//     // HeaderCell: React.FC<any>;
//     // SortableHeaderCell: React.FC<any>;
// };

export type CardComponent<T extends React.ElementType = 'div'> = React.FC<CardProps<T>> & {
    Header: React.FC<any>;
    Body: React.FC<any>;
    Footer: React.FC<any>;
    Group: React.FC<any>;
};

const Card = <T extends ElementType = 'div'>({
    className,
    children,
    shadow,
    variant = 'primary',
    view = 'solid',
    col,
    smCol,
    mdCol,
    lgCol,
    xlCol,
}: CardProps<T>) => {
    const cardClass = useMemo(
        () =>
            clsx(className, cs.base, cs.view[view], cs.variant[variant], {
                ['col-' + col]: col,
                ['sm-col-' + smCol]: smCol,
                ['md-col-' + mdCol]: mdCol,
                ['lg-col-' + lgCol]: lgCol,
                ['xl-col-' + xlCol]: xlCol,
                // [bs.pill]: pill,
                // [bs.iconOnly]: iconOnly,
                // [bs.textIcon]: textIcon,
                // [bs.interactive]: isInteractive,
            }),
        [className, view, variant, col, smCol, mdCol, lgCol, xlCol],
    );

    return (
        <CardProvider value={{ variant, view }}>
            <div className={cardClass}>{children}</div>
        </CardProvider>
    );
};
Card.displayName = 'Card';

export { Card };
