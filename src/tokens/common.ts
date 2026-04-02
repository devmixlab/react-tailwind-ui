export const sizes = ['xs', 'sm', 'md', 'lg'] as const;

export type Size = (typeof sizes)[number];

export const radiuses = ['sm', 'md', 'lg', 'full'] as const;

export type Radius = (typeof radiuses)[number];

export const baseVariants = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
] as const;

// Tailwind base colors
export const tailwindColors = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
] as const;

// Merge them for button variants
export const variants = [...baseVariants, ...tailwindColors] as const;

// Type for Variant
export type Variant = (typeof variants)[number];
