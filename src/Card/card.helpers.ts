import { defaultCardTheme } from './card.themes';

export const toCardVars = (theme: typeof defaultCardTheme) => {
    return {
        '--dru-card--surface-light': theme.light.surface,
        '--dru-card--surface-raised-light': theme.light.surfaceRaised,
        '--dru-card--surface-hover-light': theme.light.surfaceHover,
        '--dru-card--surface-raised-hover-light': theme.light.surfaceRaisedHover,

        '--dru-card--accent-light': theme.light.accent,
        '--dru-card--accent-disabled-light': theme.light.accentDisabled,

        '--dru-card--border-light': theme.light.border,
        '--dru-card--ring-light': theme.light.ring,

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
        '--dru-card--ring-dark': theme.dark.ring,

        '--dru-card--text-dark': theme.dark.text,
        '--dru-card--text-muted-dark': theme.dark.textMuted,
        '--dru-card--text-disabled-dark': theme.dark.textDisabled,
    } as React.CSSProperties;
};
