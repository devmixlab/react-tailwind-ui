// import { type LodaingPosition } from '../tokens/button';
import { type Variant } from '../tokens/common';
import { variants } from '../tokens/common';
import { groupRadii, type Radius, type View, views } from '../tokens/card';
//
const b = (name: string) => `dru--${name}`;

const variantList = variants.reduce(
    (acc, v) => {
        acc[v] = b(v);
        return acc;
    },
    {} as Record<(typeof variants)[number], string>,
);

const viewList = views.reduce(
    (acc, v) => {
        acc[v] = b(v);
        return acc;
    },
    {} as Record<(typeof views)[number], string>,
);

const radiusList = groupRadii.reduce(
    (acc, v) => {
        acc[v] = b('rounded-' + v);
        return acc;
    },
    {} as Record<(typeof groupRadii)[number], string>,
);

export const cardStyles: {
    // wrapper: string;
    base: string;
    header: {
        base: string;
    };
    body: {
        base: string;
    };
    footer: {
        base: string;
    };
    group: {
        base: string;
        wrapper: string;
    };
    collapse: {
        base: string;
        rounded: Record<Radius, string>;
        variant: Record<Variant, string>;
    };
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
    view: Record<View, string>;
    variant: Record<Variant, string>;
} = {
    // wrapper: b('wrapper'),
    base: b('card'),
    header: {
        base: b('header'),
    },
    body: {
        base: b('body'),
    },
    footer: {
        base: b('footer'),
    },
    group: {
        base: b('card-group'),
        wrapper: b('card-group-wrapper'),
    },
    collapse: {
        base: b('collapse'),
        rounded: radiusList,
        variant: variantList,
    },
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

    view: viewList,
    variant: variantList,
};
