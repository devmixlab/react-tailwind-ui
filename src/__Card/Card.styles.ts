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
import { CLASS_PREFIX } from '../constants';

const componentClassPrefix = (name: string = '') => {
    return classPrefix('__card' + name);
};

const variantList = mapToClassRecord(variants, { prefix: componentClassPrefix('--') });
const viewList = mapToClassRecord(views, { prefix: componentClassPrefix('--') });
const radiusList = mapToClassRecord(groupRadii, { prefix: componentClassPrefix('--rounded-') });
const placementList = mapToClassRecord(placements, { prefix: classPrefix('placement-') });
const directionList = mapToClassRecord(directions, { prefix: classPrefix('direction-') });
const sizeList = mapToClassRecord(sizes, { prefix: classPrefix('size-') });
const paddingSizeList = mapToClassRecord(sizes, { prefix: classPrefix('padding-size-') });
const imageRadiusList = mapToClassRecord(imageRadii, { prefix: classPrefix('image-rounded-') });
const imageShadowList = mapToClassRecord(shadows, { prefix: classPrefix('image-shadow-') });
const bodyDirectionList = mapToClassRecord(directions, {
    prefix: componentClassPrefix('body--direction-'),
});

type colFunc = (col?: string) => string;
type colFuncRequired = (col: string) => string;

export const cardStyles: {
    base: string;
    col: {
        base: colFunc;
        sm: colFuncRequired;
        md: colFuncRequired;
        lg: colFuncRequired;
        xl: colFuncRequired;
    };
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
        direction: Record<Direction, string>;
        content: {
            base: string;
        };
        // wrapper: {
        //     base: string;
        //     direction: Record<Direction, string>;
        // };
        // imageWrapper: {
        //     base: string;
        //     paddingSize: Record<Size, string>;
        //     placement: Record<Placement, string>;
        // };
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
    base: componentClassPrefix(),
    col: {
        base: (col) => componentClassPrefix(col ? `--col-${col}` : '--col'),
        sm: (col) => componentClassPrefix(`--col-sm-${col}`),
        md: (col) => componentClassPrefix(`--col-md-${col}`),
        lg: (col) => componentClassPrefix(`--col-lg-${col}`),
        xl: (col) => componentClassPrefix(`--col-xl-${col}`),
    },
    image: {
        base: classPrefix('__card-image'),
        wrapper: classPrefix('__card-image-wrapper'),
        rounded: imageRadiusList,
        shadow: imageShadowList,
        bordered: classPrefix('bordered'),
    },
    header: {
        base: classPrefix('__card-header'),
    },
    body: {
        base: componentClassPrefix('body'),
        direction: bodyDirectionList,
        content: {
            base: componentClassPrefix('body-content'),
        },
        // wrapper: {
        //     base: classPrefix('__card-body-wrapper'),
        //     direction: directionList,
        // },
        // imageWrapper: {
        //     base: classPrefix('__card-body-image-wrapper'),
        //     paddingSize: paddingSizeList,
        //     placement: placementList,
        // },
    },
    footer: {
        base: classPrefix('__card-footer'),
    },
    group: {
        base: classPrefix('__card-group'),
        grid: classPrefix('__card-grid'),
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
