import React, { useMemo } from 'react';
import clsx from 'clsx';
import { cardStyles as cs } from '../Card.styles';
import {
    imageRadii,
    type ImageRadiusWithNone,
    type Radius,
    type ShadowWithNone,
    type Shadow,
    type Size,
} from '../../tokens/card';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    className?: string;
    wrapperClassName?: string;
    rounded?: ImageRadiusWithNone;
    size?: number | string;
    shadow?: ShadowWithNone;
    bordered?: boolean;
};

const BodyImage = ({
    className,
    wrapperClassName,
    rounded = 'none',
    shadow = 'none',
    bordered = false,
    size,
    ...props
}: ImageProps) => {
    const wrapperClass = useMemo(
        () => clsx(cs.image.wrapper, wrapperClassName),
        [wrapperClassName],
    );

    const imageClass = useMemo(
        () =>
            clsx(cs.image.base, className, {
                [cs.image.rounded[rounded as Radius]]: rounded && rounded !== 'none',
                [cs.image.shadow[shadow as Shadow]]: shadow && shadow !== 'none',
                [cs.image.bordered]: bordered,
            }),
        [rounded, className],
    );

    return (
        <div className={wrapperClass}>
            <img
                style={
                    size
                        ? {
                              width: typeof size === 'number' ? `${size}px` : size,
                              height: typeof size === 'number' ? `${size}px` : size,
                          }
                        : undefined
                }
                className={imageClass}
                {...props}
            />
        </div>
    );
};

BodyImage.displayName = 'BodyImage';

export { BodyImage };
