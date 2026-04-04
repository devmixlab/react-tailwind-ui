import React, { useMemo } from 'react';
import { cardStyles as cs } from './Card.styles';
import clsx from 'clsx';
import { useCardContext } from './Card.context';
import { type SizeWithNone, type Size } from '../tokens/card';

type HeaderProps = {
    children: React.ReactNode;
    className: string;
    size?: SizeWithNone;
};

const Header = ({ className, children, size: compSize }: HeaderProps) => {
    const { variant, view, size } = useCardContext();
    compSize = compSize || size || 'md';
    const headerClass = useMemo(
        () =>
            clsx(className, cs.header.base, {
                [cs.size[compSize as Size]]: compSize && compSize !== 'none',
                // [bs.iconOnly]: iconOnly,
                // [bs.textIcon]: textIcon,
                // [bs.interactive]: isInteractive,
            }),
        [className, compSize],
    );
    return <div className={headerClass}>{children}</div>;
};
Header.displayName = 'Header';

export { Header };
