import React, { useMemo } from 'react';
import clsx from 'clsx';
import { cardStyles as cs } from './Card.styles';
import { useCardContext } from './Card.context';
import { type Placement, type SizeWithNone, type Size } from '../tokens/card';

type BodyProps = {
    children: React.ReactNode;
    wrapperClassName: string;
    className: string;
    image?: React.ReactNode;
    imagePlacement?: Placement;
    imageWidth?: string | number;
    size?: SizeWithNone;
    imagePadding?: SizeWithNone;
};

const Body = ({
    className,
    children,
    wrapperClassName,
    image,
    imagePadding = 'sm',
    imagePlacement = 'left',
    imageWidth = 200,
    size: compSize,
}: BodyProps) => {
    const { size } = useCardContext();
    compSize = compSize || size || 'md';

    // Horizontal layout if image is left or right
    const isHorizontal = imagePlacement === 'left' || imagePlacement === 'right';

    const wrapperClass = useMemo(
        () =>
            clsx(
                wrapperClassName,
                cs.body.wrapper.base,
                cs.body.wrapper.direction[isHorizontal ? 'horizontal' : 'vertical'],
                // {
                //     [cs.size[imagePadding as Size]]: imagePadding && imagePadding !== 'none',
                // },
            ),
        [wrapperClassName, isHorizontal],
    );

    const bodyClass = useMemo(
        () =>
            clsx(className, cs.body.base, {
                [cs.size[compSize as Size]]: compSize && compSize !== 'none',
            }),
        [className, compSize],
    );

    const imageWrapperClass = useMemo(
        () =>
            clsx(cs.body.imageWrapper.base, {
                [cs.body.imageWrapper.placement[imagePlacement]]: image,
                [cs.body.imageWrapper.paddingSize[imagePadding as Size]]:
                    imagePadding && imagePadding !== 'none',
            }),
        [image, imagePlacement, imagePadding],
    );

    // const imageClass = useMemo(
    //     () =>
    //         clsx(cs.body.image.base, {
    //             [cs.body.image.placement[imagePlacement]]: image,
    //         }),
    //     [image, imagePlacement],
    // );

    const drawImage = () => {
        return (
            <div
                className={imageWrapperClass}
                style={{
                    width:
                        imagePlacement === 'top'
                            ? '100%'
                            : typeof imageWidth === 'number'
                              ? `${imageWidth}px`
                              : imageWidth || '30%',
                }}
            >
                {image}
                {/*<img*/}
                {/*    // style={{*/}
                {/*    //     width:*/}
                {/*    //         typeof imageWidth === 'number'*/}
                {/*    //             ? `${imageWidth}px`*/}
                {/*    //             : imageWidth || '30%',*/}
                {/*    // }}*/}
                {/*    src={image}*/}
                {/*    alt=""*/}
                {/*    className={imageClass}*/}
                {/*/>*/}
            </div>
        );
    };

    return (
        <div className={wrapperClass}>
            {image && (imagePlacement === 'top' || imagePlacement === 'left') && drawImage()}

            <div className={bodyClass}>{children}</div>

            {image && imagePlacement === 'right' && drawImage()}
        </div>
    );
};
Body.displayName = 'Body';

export { Body };
