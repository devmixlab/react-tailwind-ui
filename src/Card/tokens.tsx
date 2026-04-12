export const kinds = ['solid', 'outlined'] as const;

export type Kind = (typeof kinds)[number];
