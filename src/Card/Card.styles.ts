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
} from '../tokens/card';
import { classPrefix } from '../utils/classPrefix';

const variantList = mapToClassRecord(variants, { prefix: classPrefix() });
const viewList = mapToClassRecord(views, { prefix: classPrefix() });
const radiusList = mapToClassRecord(groupRadii, { prefix: classPrefix('rounded-') });
const placementList = mapToClassRecord(placements, { prefix: classPrefix('placement-') });
const directionList = mapToClassRecord(directions, { prefix: classPrefix('direction-') });
const sizeList = mapToClassRecord(sizes, { prefix: classPrefix('size-') });

export const cardStyles: {
    // wrapper: string;
    base: string;

    image: {
        base: string;
        wrapper: string;
        placement: Record<Placement, string>;
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
        image: {
            base: string;
            wrapper: string;
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
    // collapse: {
    //     base: string;
    //     rounded: Record<Radius, string>;
    //     variant: Record<Variant, string>;
    // };
    // disabled: string;
    // active: string;
    // fixed: string;
    // fullWidth: string;
    // pill: string;
    // iconOnly: string;
    // textIcon: string;
    // interactive: string;
    // group: {
    //     group: string;
    //     groupItem: string;
    //     orientation: Record<'horizontal' | 'vertical', string>;
    // };
    // number: {
    //     base: string;
    //     big: string;
    // };
    // icon: {
    //     base: string;
    //     icon: string;
    // };
    // size: Record<Size, string>;
    // dismissible: string;
    // accent: string;
    rounded: Record<Radius, string>;
    size: Record<Size, string>;
    view: Record<View, string>;
    variant: Record<Variant, string>;
} = {
    // wrapper: b('wrapper'),
    base: classPrefix('card'),
    image: {
        base: classPrefix('card-image'),
        placement: placementList,
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
        image: {
            base: classPrefix('card-body-image'),
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
    // collapse: {
    //     base: b('collapse'),
    //     rounded: radiusList,
    //     variant: variantList,
    // },
    // disabled: b('disabled'),
    // active: b('active'),
    // fixed: b('fixed'),
    // fullWidth: b('full-width'),
    // pill: b('pill'),
    // iconOnly: b('icon-only'),
    // textIcon: b('text-icon'),
    // interactive: b('interactive'),

    // size: {
    //     sm: b('sm'),
    //     lg: b('lg'),
    // },

    // dismissible: b('dismissible'),
    // accent: b('accent'),

    // icon: {
    //     base: b('with-icon'),
    //     icon: b('icon'),
    // },

    rounded: radiusList,
    size: sizeList,
    view: viewList,
    variant: variantList,
};
