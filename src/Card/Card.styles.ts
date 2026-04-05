// import { type LodaingPosition } from '../tokens/button';
import { type Variant } from '../tokens/common';
import { variants } from '../tokens/common';
import { mapToClassRecord } from '../utils/mapToClassRecord';
import {
    groupRadii,
    type Radius,
    type View,
    views,
    type Placement,
    placements,
    type Direction,
    directions,
    type Size,
    sizes,
    type ImageRadius,
    imageRadii,
    type Shadow,
    shadows,
} from '../tokens/card';
import { classPrefix } from '../utils/classPrefix';

const variantList = mapToClassRecord(variants, { prefix: classPrefix() });
const viewList = mapToClassRecord(views, { prefix: classPrefix() });
const radiusList = mapToClassRecord(groupRadii, { prefix: classPrefix('rounded-') });
const placementList = mapToClassRecord(placements, { prefix: classPrefix('placement-') });
const directionList = mapToClassRecord(directions, { prefix: classPrefix('direction-') });
const sizeList = mapToClassRecord(sizes, { prefix: classPrefix('size-') });
const paddingSizeList = mapToClassRecord(sizes, { prefix: classPrefix('padding-size-') });
const imageRadiusList = mapToClassRecord(imageRadii, { prefix: classPrefix('image-rounded-') });
const imageShadowList = mapToClassRecord(shadows, { prefix: classPrefix('image-shadow-') });

export const cardStyles: {
    base: string;

    image: {
        base: string;
        wrapper: string;
        rounded: Record<ImageRadius, string>;
        shadow: Record<Shadow, string>;
        bordered: string;
    };
    header: {
        base: string;
    };
    body: {
        base: string;
        wrapper: {
            base: string;
            direction: Record<Direction, string>;
        };
        imageWrapper: {
            base: string;
            paddingSize: Record<Size, string>;
            placement: Record<Placement, string>;
        };
    };
    footer: {
        base: string;
    };
    group: {
        base: string;
        grid: string;
        collapse: {
            base: string;
            rounded: Record<Radius, string>;
            variant: Record<Variant, string>;
        };
    };

    rounded: Record<Radius, string>;
    size: Record<Size, string>;
    view: Record<View, string>;
    variant: Record<Variant, string>;
} = {
    base: classPrefix('card'),
    image: {
        base: classPrefix('card-image'),
        wrapper: classPrefix('card-image-wrapper'),
        rounded: imageRadiusList,
        shadow: imageShadowList,
        bordered: classPrefix('bordered'),
    },
    header: {
        base: classPrefix('card-header'),
    },
    body: {
        base: classPrefix('card-body'),
        wrapper: {
            base: classPrefix('card-body-wrapper'),
            direction: directionList,
        },
        imageWrapper: {
            base: classPrefix('card-body-image-wrapper'),
            paddingSize: paddingSizeList,
            placement: placementList,
        },
    },
    footer: {
        base: classPrefix('card-footer'),
    },
    group: {
        base: classPrefix('card-group'),
        grid: classPrefix('card-grid'),
        collapse: {
            base: classPrefix('collapse'),
            rounded: radiusList,
            variant: variantList,
        },
    },

    rounded: radiusList,
    size: sizeList,
    view: viewList,
    variant: variantList,
};
