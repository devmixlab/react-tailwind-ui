import React, { useMemo } from 'react';
import clsx from 'clsx';
import { cardStyles as cs } from './Card.styles';
import { useCardContext } from './Card.context';
import { type SizeWithNone, type Size } from '../tokens/card';

type FooterProps = {
    children: React.ReactNode;
    className: string;
    size?: SizeWithNone;
};

const Footer = ({ className, children, size: compSize }: FooterProps) => {
    const { size } = useCardContext();
    compSize = compSize || size || 'md';

    const footerClass = useMemo(
        () =>
            clsx(className, cs.footer.base, {
                [cs.size[compSize as Size]]: compSize && compSize !== 'none',
            }),
        [className, compSize],
    );
    return <div className={footerClass}>{children}</div>;
};
Footer.displayName = 'Footer';

export { Footer };
