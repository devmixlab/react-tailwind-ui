import React, { useMemo } from 'react';
import clsx from 'clsx';
import { cardStyles as cs } from './Card.styles';

type FooterProps = {
    children: React.ReactNode;
    className: string;
};

const Footer = ({ className, children }: FooterProps) => {
    const footerClass = useMemo(
        () =>
            clsx(className, cs.footer.base, {
                // [bs.pill]: pill,
                // [bs.iconOnly]: iconOnly,
                // [bs.textIcon]: textIcon,
                // [bs.interactive]: isInteractive,
            }),
        [className],
    );
    return <div className={footerClass}>{children}</div>;
};
Footer.displayName = 'Footer';

export { Footer };
