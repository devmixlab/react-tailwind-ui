import React, { useMemo } from 'react';
import clsx from 'clsx';
import { cardStyles as cs } from './Card.styles';

type BodyProps = {
    children: React.ReactNode;
    className: string;
};

const Body = ({ className, children }: BodyProps) => {
    const bodyClass = useMemo(
        () =>
            clsx(className, cs.body.base, {
                // [bs.pill]: pill,
                // [bs.iconOnly]: iconOnly,
                // [bs.textIcon]: textIcon,
                // [bs.interactive]: isInteractive,
            }),
        [className],
    );

    return <div className={bodyClass}>{children}</div>;
};
Body.displayName = 'Body';

export { Body };
