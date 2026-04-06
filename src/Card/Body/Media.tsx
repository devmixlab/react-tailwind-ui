import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useCardContext } from '../Card.context';
import { type SizeWithNone } from '../../tokens/card';
import { prefix as classPrefix } from '../Card';

type ContentProps = {
    children: React.ReactNode;
    className: string;
    size?: SizeWithNone;
};

const prefix = (name: string = '') => {
    return classPrefix(`__content${name}`);
};

const Media = ({ className, children, size: compSize }: ContentProps) => {
    const { size } = useCardContext();
    compSize = compSize || size || 'md';

    const cl = useMemo(
        () =>
            clsx(className, prefix(), {
                [prefix(`--${compSize}`)]: compSize && compSize !== 'none',
            }),
        [className, compSize],
    );

    return <div className={cl}>{children}</div>;
};
Media.displayName = 'Card.Body.Media';

export { Media };
