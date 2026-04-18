export const kinds = ['filled', 'solid', 'soft', 'outlined', 'ghost'] as const;
export type Kind = (typeof kinds)[number];

export const density = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Density = (typeof density)[number];

export const densitySpacing = {
    xs: {
        header: { px: 'xs', py: '0' },
        body: { px: 'xs', py: 'xs' },
        footer: { px: 'xs', py: '0' },
    },
    sm: {
        header: { px: 'sm', py: 'xs' },
        body: { px: 'sm', py: 'sm' },
        footer: { px: 'sm', py: 'xs' },
    },
    md: {
        header: { px: 'md', py: 'sm' },
        body: { px: 'md', py: 'md' },
        footer: { px: 'md', py: 'sm' },
    },
    lg: {
        header: { px: 'lg', py: 'md' },
        body: { px: 'lg', py: 'lg' },
        footer: { px: 'lg', py: 'md' },
    },
    xl: {
        header: { px: 'xl', py: 'lg' },
        body: { px: 'xl', py: 'xl' },
        footer: { px: 'xl', py: 'lg' },
    },
} as const;
