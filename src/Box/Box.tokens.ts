export const semanticColors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
] as const;

export const extendedColors = [
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

export const colors = [...semanticColors, ...extendedColors] as const;

export type SemanticColor = (typeof semanticColors)[number];
export type ExtendedColor = (typeof extendedColors)[number];
export type Color = (typeof colors)[number];

export const shadows = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Shadow = (typeof shadows)[number];

export const radii = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
export type Radius = (typeof radii)[number];

export const fontSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
export type FontSize = (typeof fontSizes)[number];

export const fontWeights = ['thin', 'light', 'normal', 'medium', 'semibold', 'bold'] as const;
export type FontWeight = (typeof fontWeights)[number];

export const lineHeights = ['tight', 'normal', 'relaxed'] as const;
export type LineHeights = (typeof lineHeights)[number];

export const letterSpacings = ['tight', 'normal', 'wide'] as const;
export type LetterSpacing = (typeof letterSpacings)[number];

export const borderWidths = ['none', 'thin', 'normal', 'thick'] as const;
export type BorderWidth = (typeof borderWidths)[number];
