import React, { useMemo } from 'react';
import { cardStyles as cs } from './Card.styles';
import clsx from 'clsx';

type HeaderProps = {
    children: React.ReactNode;
    className: string;
};

const Header = ({ className, children }: HeaderProps) => {
    const headerClass = useMemo(
        () =>
            clsx(className, cs.header.base, {
                // [bs.pill]: pill,
                // [bs.iconOnly]: iconOnly,
                // [bs.textIcon]: textIcon,
                // [bs.interactive]: isInteractive,
            }),
        [className],
    );
    return <div className={headerClass}>{children}</div>;
};
Header.displayName = 'Header';

export { Header };
