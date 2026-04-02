export const views = ['solid', 'outlined'] as const;
export type View = (typeof views)[number];
