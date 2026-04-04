import React from 'react';
import clsx from 'clsx';
import { cardStyles as cs } from './Card.styles';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    className?: string;
    placement?: 'top' | 'left' | 'right';
};

const CardImage = ({ className, placement = 'top', ...props }: ImageProps) => {
    return (
        <img className={clsx(cs.image.base, cs.image.placement[placement], className)} {...props} />
    );
};

CardImage.displayName = 'CardImage';

export { CardImage };
