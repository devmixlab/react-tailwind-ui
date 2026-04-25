// import { type LodaingPosition } from '../tokens/__button';
import { type Variant } from '../tokens/common';
import { variants } from '../tokens/common';
import { type Size, type View } from '../tokens/badge';

const b = (name: string) => `dru--${name}`;

export const badgeStyles: {
    // wrapper: string;
    base: string;
    // disabled: string;
    // active: string;
    // fixed: string;
    // fullWidth: string;
    pill: string;
    iconOnly: string;
    textIcon: string;
    interactive: string;
    // group: {
    //     group: string;
    //     groupItem: string;
    //     orientation: Record<'horizontal' | 'vertical', string>;
    // };
    // number: {
    //     base: string;
    //     big: string;
    // };
    // loading: {
    //     base: string;
    //     position: Record<LodaingPosition, string>;
    // };
    size: Record<Size, string>;
    view: Record<View, string>;
    variant: Record<Variant, string>;
} = {
    // wrapper: b('wrapper'),
    base: b('badge'),
    // disabled: b('disabled'),
    // active: b('active'),
    // fixed: b('fixed'),
    // fullWidth: b('full-width'),
    pill: b('pill'),
    iconOnly: b('icon-only'),
    textIcon: b('text-icon'),
    interactive: b('interactive'),

    size: {
        sm: b('sm'),
        lg: b('lg'),
    },

    view: {
        solid: b('solid'),
        outlined: b('outlined'),
    },

    variant: variants.reduce(
        (acc, v) => {
            acc[v] = b(v);
            return acc;
        },
        {} as Record<(typeof variants)[number], string>,
    ),
};
