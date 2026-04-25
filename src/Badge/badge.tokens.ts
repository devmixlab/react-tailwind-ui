export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Size = (typeof sizes)[number];

export type Variant = 'solid' | 'base' | 'outlined' | 'ghost';
export type Intent = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
