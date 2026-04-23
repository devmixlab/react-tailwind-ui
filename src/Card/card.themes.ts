export const defaultCardTheme = {
    light: {
        // surfaces
        surface: '#ffffff',
        surfaceRaised: '#f8fafc',
        surfaceHover: '#f1f5f9',
        surfaceRaisedHover: '#e2e8f0',

        // borders & rings
        border: '#e2e8f0',
        borderSection: '#e5e7eb',
        ring: '#cbd5f5',

        // accents
        accent: '#6366f1', // indigo-500 (neutral but expressive)
        accentDisabled: '#c7d2fe',

        // icons
        surfaceIcon: '#f1f5f9',
        icon: '#64748b',

        // text
        text: '#0f172a',
        textMuted: '#64748b',
        textDisabled: '#94a3b8',
    },

    dark: {
        // surfaces
        surface: '#0b1220',
        surfaceRaised: '#111827',
        surfaceHover: '#1f2937',
        surfaceRaisedHover: '#374151',

        // borders & rings
        border: '#1f2937',
        borderSection: '#273244',
        ring: '#6366f1',

        // accents
        accent: '#818cf8', // indigo-400
        accentDisabled: '#4f46e5',

        // icons
        surfaceIcon: '#111827',
        icon: '#6b7280',

        // text
        text: '#e5e7eb',
        textMuted: '#9ca3af',
        textDisabled: '#6b7280',
    },
};

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type CardTheme = typeof defaultCardTheme;
export type CardLightTheme = typeof defaultCardTheme.light;
export type CardDarkTheme = typeof defaultCardTheme.dark;

export type CardThemePartial = DeepPartial<CardTheme>;
export type CardLightThemePartial = Partial<CardLightTheme>;
export type CardDarkThemePartial = Partial<CardDarkTheme>;
