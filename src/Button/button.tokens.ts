export type LoadingPosition = 'start' | 'center' | 'end';

export const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Size = (typeof sizes)[number];

export type Variant = 'base' | 'solid' | 'outlined' | 'subtle' | 'ghost' | 'link';
export type Intent = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
