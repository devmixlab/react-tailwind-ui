export const shadows = ['sm', 'md', 'lg'] as const;
export type Shadow = (typeof shadows)[number];

export const views = ['solid', 'outlined'] as const;
export type View = (typeof views)[number];

export const groupRadii = ['sm', 'md', 'lg'] as const;
export type Radius = (typeof groupRadii)[number];
