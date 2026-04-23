import {
    CardTheme,
    defaultCardTheme,
    type CardThemePartial,
    type CardLightThemePartial,
    type CardDarkThemePartial,
} from './card.themes';

export const toCardVars = (theme: typeof defaultCardTheme) => {
    return {
        '--dru-card--surface-light': theme.light.surface,
        '--dru-card--surface-raised-light': theme.light.surfaceRaised,
        '--dru-card--surface-hover-light': theme.light.surfaceHover,
        '--dru-card--surface-raised-hover-light': theme.light.surfaceRaisedHover,

        '--dru-card--accent-light': theme.light.accent,
        '--dru-card--accent-disabled-light': theme.light.accentDisabled,

        '--dru-card--border-light': theme.light.border,
        '--dru-card--border-section-light': theme.light.borderSection,
        '--dru-card--ring-light': theme.light.ring,

        '--dru-card--icon-surface-light': theme.light.surfaceIcon,
        '--dru-card--icon-color-light': theme.light.icon,

        '--dru-card--text-light': theme.light.text,
        '--dru-card--text-muted-light': theme.light.textMuted,
        '--dru-card--text-disabled-light': theme.light.textDisabled,

        '--dru-card--surface-dark': theme.dark.surface,
        '--dru-card--surface-raised-dark': theme.dark.surfaceRaised,
        '--dru-card--surface-hover-dark': theme.dark.surfaceHover,
        '--dru-card--surface-raised-hover-dark': theme.dark.surfaceRaisedHover,

        '--dru-card--accent-dark': theme.dark.accent,
        '--dru-card--accent-disabled-dark': theme.dark.accentDisabled,

        '--dru-card--border-dark': theme.dark.border,
        '--dru-card--border-section-dark': theme.dark.borderSection,
        '--dru-card--ring-dark': theme.dark.ring,

        '--dru-card--icon-surface-dark': theme.dark.surfaceIcon,
        '--dru-card--icon-color-dark': theme.dark.icon,

        '--dru-card--text-dark': theme.dark.text,
        '--dru-card--text-muted-dark': theme.dark.textMuted,
        '--dru-card--text-disabled-dark': theme.dark.textDisabled,
    } as React.CSSProperties;
};

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export function deepMerge<T>(base: T, override: DeepPartial<T>): T {
    const result = { ...base };

    for (const key in override) {
        const baseValue = base[key];
        const overrideValue = override[key];

        if (
            typeof baseValue === 'object' &&
            baseValue !== null &&
            !Array.isArray(baseValue) &&
            typeof overrideValue === 'object' &&
            overrideValue !== null &&
            !Array.isArray(overrideValue)
        ) {
            result[key] = deepMerge(baseValue, overrideValue as any);
        } else if (overrideValue !== undefined) {
            result[key] = overrideValue as any;
        }
    }

    return result;
}

export const deriveThemeProps = (
    given: CardThemePartial,
    overrideLight?: (lightGiven: CardLightThemePartial) => CardLightThemePartial,
    overrideDark?: (given: CardDarkThemePartial) => CardDarkThemePartial,
) => {
    const finalOverride: CardThemePartial = {};

    if (given.light != null && overrideLight) {
        finalOverride.light = overrideLight(given.light);
    }

    if (given.dark != null && overrideDark) {
        finalOverride.dark = overrideDark(given.dark);
    }

    return deepMerge(given, finalOverride);
};

export function extendCardTheme(overrides: DeepPartial<CardTheme>): CardTheme {
    return deepMerge(defaultCardTheme, overrides);
}
