import React from 'react';
import { AliasBox, AliasBoxProps } from './AliasBox';

export type Props = {
    // transform
    tx?: string; // translateX
    ty?: string; // translateY
    scale?: string;
    scaleX?: string;
    scaleY?: string;
    rotate?: string | number;
    flip?: boolean;
    flipX?: boolean;
    flipY?: boolean;

    // transition
    transD?: string; // duration
    transE?: string; // easing
    transP?: string; // property

    // grid
    col?: number | string;
    size?: number | string;

    origin?: string;
    inset?: number | string;

    center?: boolean;
    centerX?: boolean;
    centerY?: boolean;
    fill?: boolean;
    scrollY?: boolean;
    scrollX?: boolean;
    clickable?: boolean;
};

export type DerivedBoxProps = Props & AliasBoxProps;

export const DerivedBox: React.FC<DerivedBoxProps> = ({
    className,
    tx,
    ty,
    scale,
    scaleX,
    scaleY,
    rotate,
    flip,
    flipX,
    flipY,
    transD,
    transE,
    transP,
    col,
    size,
    origin,
    inset,
    center,
    centerX,
    centerY,
    fill,
    scrollY,
    scrollX,
    clickable,
    ...rest
}) => {
    const derivedProps: Array<[keyof AliasBoxProps, any]> = [];

    if (col !== undefined && rest.gridCol === undefined && rest.gridColumn === undefined) {
        derivedProps.push(['gridCol', `span ${col}`]);
    }

    if (size !== undefined && rest.width === undefined && rest.height === undefined) {
        derivedProps.push(['width', size], ['height', size]);
    }

    if (rest.transform === undefined) {
        const transforms: string[] = [];

        if (tx !== undefined) transforms.push(`translateX(${tx})`);
        if (ty !== undefined) transforms.push(`translateY(${ty})`);

        if (scale !== undefined) transforms.push(`scale(${scale})`);

        // scaleX / flipX / flip
        if (scaleX !== undefined) {
            transforms.push(`scaleX(${scaleX})`);
        } else if (flipX) {
            transforms.push(`scaleX(-1)`);
        } else if (flip) {
            transforms.push(`scaleX(-1)`);
        }

        // scaleY / flipY / flip
        if (scaleY !== undefined) {
            transforms.push(`scaleY(${scaleY})`);
        } else if (flipY) {
            transforms.push(`scaleY(-1)`);
        } else if (flip) {
            transforms.push(`scaleY(-1)`);
        }

        if (rotate !== undefined) {
            const value =
                typeof rotate === 'string' && /[a-z%]+$/i.test(rotate) ? rotate : `${rotate}deg`;

            transforms.push(`rotate(${value})`);
        }

        if (transforms.length > 0) {
            derivedProps.push(['transform', transforms.join(' ')]);
        }
    }

    if (rest.transition === undefined) {
        const transitionParts: string[] = [];

        if (transD !== undefined) transitionParts.push(transD);
        if (transE !== undefined) transitionParts.push(transE);

        if (transitionParts.length > 0) {
            const property = transP ?? 'all';
            derivedProps.push(['transition', `${property} ${transitionParts.join(' ')}`]);
        }
    }

    if (origin !== undefined && rest.transformOrigin === undefined) {
        derivedProps.push(['transformOrigin', origin]);
    }

    if (fill && rest.position === undefined && rest.pos === undefined) {
        derivedProps.push(['position', 'absolute']);
    }

    const finalInset = inset ?? (fill ? 0 : undefined);
    if (finalInset !== undefined) {
        if (rest.top === undefined && rest.t === undefined) derivedProps.push(['top', finalInset]);
        if (rest.right === undefined && rest.r === undefined)
            derivedProps.push(['right', finalInset]);
        if (rest.bottom === undefined && rest.b === undefined)
            derivedProps.push(['bottom', finalInset]);
        if (rest.left === undefined && rest.l === undefined)
            derivedProps.push(['left', finalInset]);
    }

    const finalCenterX = center || centerX;
    const finalCenterY = center || centerY;

    if (finalCenterX || finalCenterY) {
        // ensure flex only if not already set
        if (rest.display === undefined && rest.d === undefined) {
            derivedProps.push(['display', 'flex']);
        }

        if (finalCenterX) {
            if (rest.justifyContent === undefined && rest.justify === undefined) {
                derivedProps.push(['justifyContent', 'center']);
            }
        }

        if (finalCenterY) {
            if (rest.alignItems === undefined && rest.align === undefined) {
                derivedProps.push(['alignItems', 'center']);
            }
        }
    }

    if (scrollY) {
        if (
            rest.overflow === undefined &&
            rest.ov === undefined &&
            rest.overflowY === undefined &&
            rest.ovY === undefined
        ) {
            derivedProps.push(['overflowY', 'auto']);
        }
    }

    if (scrollX) {
        if (
            rest.overflow === undefined &&
            rest.ov === undefined &&
            rest.overflowX === undefined &&
            rest.ovX === undefined
        ) {
            derivedProps.push(['overflowX', 'auto']);
        }
    }

    if (clickable) {
        if (rest.cursor === undefined) {
            derivedProps.push(['cursor', 'pointer']);
        }
    }

    const restProps = { ...rest } as AliasBoxProps;
    derivedProps.forEach(([key, value]) => (restProps[key] = value));

    return <AliasBox {...restProps} className={className} />;
};
