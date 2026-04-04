export const shadows = ['sm', 'md', 'lg'] as const;
export type Shadow = (typeof shadows)[number];

export const views = ['solid', 'outlined'] as const;
export type View = (typeof views)[number];

export const groupRadii = ['sm', 'md', 'lg'] as const;
export type Radius = (typeof groupRadii)[number];
export type RadiusWithNone = Radius | 'none';

export const placements = ['top', 'left', 'right'] as const;
export type Placement = (typeof placements)[number];

export type Col = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

export const directions = ['horizontal', 'vertical'] as const;
export type Direction = (typeof directions)[number];

export const sizes = ['sm', 'md', 'lg'] as const;
export type Size = (typeof sizes)[number];
export type SizeWithNone = Size | 'none';
