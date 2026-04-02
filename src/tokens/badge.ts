export const views = ['solid', 'outlined'] as const;
export type View = (typeof views)[number];

export const sizes = ['sm', 'lg'] as const;
export type Size = (typeof sizes)[number];
