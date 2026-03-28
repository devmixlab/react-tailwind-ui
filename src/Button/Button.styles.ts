import { type View, type LodaingPosition } from '@/tokens/button';
import { type Size, type Variant } from '@/tokens/common';
import { variants } from '../tokens/common';

const b = (name: string) => `dru--${name}`;

export const buttonStyles: {
    base: string;
    disabled: string;
    active: string;
    fixed: string;
    fullWidth: string;
    pill: string;
    iconOnly: string;
    textIcon: string;
    loading: {
        base: string;
        position: Record<LodaingPosition, string>;
    };
    size: Record<Size, string>;
    view: Record<View, string>;
    variant: Record<Variant, string>;
} = {
    base: b('button'),
    disabled: b('disabled'),
    active: b('active'),
    fixed: b('fixed'),
    fullWidth: b('full-width'),
    pill: b('pill'),
    iconOnly: b('icon-only'),
    textIcon: b('text-icon'),

    loading: {
        base: b('loading'),
        position: {
            start: b('loading-start'),
            center: b('loading-center'),
            end: b('loading-end'),
        },
    },

    size: {
        xs: b('xs'),
        sm: b('sm'),
        md: b('md'),
        lg: b('lg'),
    },

    view: {
        solid: b('solid'),
        outlined: b('outlined'),
        link: b('solid'),
        ghost: b('solid'),
    },

    variant: variants.reduce(
        (acc, v) => {
            acc[v] = b(v);
            return acc;
        },
        {} as Record<(typeof variants)[number], string>,
    ),
};
