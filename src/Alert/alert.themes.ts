import type { CardTheme, DeepPartial } from '../Card/card.themes';
import { deriveThemeProps, extendCardTheme } from '../Card/card.helpers';

const primaryBase: DeepPartial<CardTheme> = {
    light: {
        accent: '#2563eb', // slightly stronger (blue-600)
        accentDisabled: '#93c5fd', // blue-300
        ring: '#60a5fa', // blue-400

        // 👇 more visible __alert background
        surface: '#dbeafe', // blue-100 (stronger than before)
        surfaceRaised: '#bfdbfe', // blue-200
        surfaceHover: '#93c5fd', // blue-300
        surfaceRaisedHover: '#60a5fa', // blue-400

        border: '#60a5fa', // clearer edge
    },

    dark: {
        accent: '#60a5fa', // blue-400 (good contrast)
        accentDisabled: '#1d4ed8', // blue-700
        ring: '#3b82f6', // blue-500

        // 👇 more readable dark __alert
        surface: '#172554', // blue-900 (less black, more blue)
        surfaceRaised: '#1e3a8a', // blue-800
        surfaceHover: '#1e40af', // blue-700
        surfaceRaisedHover: '#2563eb', // blue-600

        border: '#3b82f6', // visible but not harsh
    },
};

const primarySolid = deriveThemeProps(
    primaryBase,
    (light) => {
        return {
            surface: light.accent,
            surfaceRaised: light.accent,

            // subtle hover (optional but nice)
            surfaceHover: light.accentDisabled,
            surfaceRaisedHover: light.accentDisabled,

            // 👇 strong contrast
            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',

            // 👇 avoid losing accent meaning
            accent: '#fff',

            // 👇 blend border
            border: light.accent,
        };
    },
    (dark) => {
        return {
            surface: dark.accent,
            surfaceRaised: dark.accent,

            surfaceHover: dark.accentDisabled,
            surfaceRaisedHover: dark.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: dark.accent,
        };
    },
);

const primaryThemes: Record<string, CardTheme> = {
    base: extendCardTheme(primaryBase),
    solid: extendCardTheme(primarySolid),
};

const secondaryBase: DeepPartial<CardTheme> = {
    light: {
        accent: '#475569', // slate-600
        accentDisabled: '#cbd5f5', // slate-200
        ring: '#94a3b8', // slate-400

        // 👇 neutral __alert background
        surface: '#f1f5f9', // slate-100
        surfaceRaised: '#e2e8f0', // slate-200
        surfaceHover: '#cbd5f5', // slate-300
        surfaceRaisedHover: '#94a3b8', // slate-400

        border: '#cbd5f5',
    },

    dark: {
        accent: '#94a3b8', // slate-400
        accentDisabled: '#475569', // slate-600
        ring: '#64748b', // slate-500

        surface: '#0f172a', // slate-900
        surfaceRaised: '#1e293b', // slate-800
        surfaceHover: '#334155', // slate-700
        surfaceRaisedHover: '#475569', // slate-600

        border: '#334155',
    },
};

const secondarySolid = deriveThemeProps(
    secondaryBase,
    (light) => {
        return {
            surface: light.accent,
            surfaceRaised: light.accent,

            surfaceHover: light.accentDisabled,
            surfaceRaisedHover: light.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: light.accent,
        };
    },
    (dark) => {
        return {
            surface: dark.accent,
            surfaceRaised: dark.accent,

            surfaceHover: dark.accentDisabled,
            surfaceRaisedHover: dark.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: dark.accent,
        };
    },
);

const secondaryThemes: Record<string, CardTheme> = {
    base: extendCardTheme(secondaryBase),
    solid: extendCardTheme(secondarySolid),
};

const successBase: DeepPartial<CardTheme> = {
    light: {
        accent: '#16a34a', // green-600
        accentDisabled: '#86efac', // green-300
        ring: '#4ade80', // green-400

        // 👇 visible but soft success background
        surface: '#dcfce7', // green-100
        surfaceRaised: '#bbf7d0', // green-200
        surfaceHover: '#86efac', // green-300
        surfaceRaisedHover: '#4ade80', // green-400

        border: '#4ade80',
    },

    dark: {
        accent: '#4ade80', // green-400
        accentDisabled: '#166534', // green-800
        ring: '#22c55e', // green-500

        surface: '#052e16', // green-950
        surfaceRaised: '#064e3b', // green-900
        surfaceHover: '#065f46', // green-800
        surfaceRaisedHover: '#047857', // green-700

        border: '#22c55e',
    },
};

const successSolid = deriveThemeProps(
    successBase,
    (light) => {
        return {
            surface: light.accent,
            surfaceRaised: light.accent,

            surfaceHover: light.accentDisabled,
            surfaceRaisedHover: light.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: light.accent,
        };
    },
    (dark) => {
        return {
            surface: dark.accent,
            surfaceRaised: dark.accent,

            surfaceHover: dark.accentDisabled,
            surfaceRaisedHover: dark.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: dark.accent,
        };
    },
);

const successThemes: Record<string, CardTheme> = {
    base: extendCardTheme(successBase),
    solid: extendCardTheme(successSolid),
};

const warningBase: DeepPartial<CardTheme> = {
    light: {
        accent: '#d97706', // amber-600 (not too bright)
        accentDisabled: '#fcd34d', // amber-300
        ring: '#f59e0b', // amber-500

        // 👇 visible but not blinding
        surface: '#fef3c7', // amber-100
        surfaceRaised: '#fde68a', // amber-200
        surfaceHover: '#fcd34d', // amber-300
        surfaceRaisedHover: '#fbbf24', // amber-400

        border: '#f59e0b',
    },

    dark: {
        accent: '#fbbf24', // amber-400
        accentDisabled: '#78350f', // amber-900
        ring: '#f59e0b', // amber-500

        surface: '#451a03', // amber-950
        surfaceRaised: '#78350f', // amber-900
        surfaceHover: '#92400e', // amber-800
        surfaceRaisedHover: '#b45309', // amber-700

        border: '#f59e0b',
    },
};

const warningSolid = deriveThemeProps(
    warningBase,
    (light) => {
        return {
            surface: light.accent,
            surfaceRaised: light.accent,

            surfaceHover: light.accentDisabled,
            surfaceRaisedHover: light.accentDisabled,

            text: '#fff', // safe because accent is dark enough
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: light.accent,
        };
    },
    (dark) => {
        return {
            surface: dark.accent,
            surfaceRaised: dark.accent,

            surfaceHover: dark.accentDisabled,
            surfaceRaisedHover: dark.accentDisabled,

            text: '#000', // 👈 important difference!
            textMuted: 'rgba(0,0,0,0.7)',
            icon: '#000',
            accent: '#000',

            border: dark.accent,
        };
    },
);

const warningThemes: Record<string, CardTheme> = {
    base: extendCardTheme(warningBase),
    solid: extendCardTheme(warningSolid),
};

const infoBase: DeepPartial<CardTheme> = {
    light: {
        accent: '#0284c7', // sky-600
        accentDisabled: '#7dd3fc', // sky-300
        ring: '#38bdf8', // sky-400

        // 👇 slightly stronger but still light
        surface: '#e0f2fe', // sky-100
        surfaceRaised: '#bae6fd', // sky-200
        surfaceHover: '#7dd3fc', // sky-300
        surfaceRaisedHover: '#38bdf8', // sky-400

        border: '#38bdf8',
    },

    dark: {
        accent: '#38bdf8', // sky-400
        accentDisabled: '#075985', // sky-800
        ring: '#0ea5e9', // sky-500

        surface: '#082f49', // sky-950
        surfaceRaised: '#0c4a6e', // sky-900
        surfaceHover: '#075985', // sky-800
        surfaceRaisedHover: '#0369a1', // sky-700

        border: '#0ea5e9',
    },
};

const infoSolid = deriveThemeProps(
    infoBase,
    (light) => {
        return {
            surface: light.accent,
            surfaceRaised: light.accent,

            surfaceHover: light.accentDisabled,
            surfaceRaisedHover: light.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: light.accent,
        };
    },
    (dark) => {
        return {
            surface: dark.accent,
            surfaceRaised: dark.accent,

            surfaceHover: dark.accentDisabled,
            surfaceRaisedHover: dark.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: dark.accent,
        };
    },
);

const infoThemes: Record<string, CardTheme> = {
    base: extendCardTheme(infoBase),
    solid: extendCardTheme(infoSolid),
};

const dangerBase: DeepPartial<CardTheme> = {
    light: {
        accent: '#dc2626', // red-600 (strong, not too bright)
        accentDisabled: '#fca5a5', // red-300
        ring: '#ef4444', // red-500

        // 👇 clear but not overwhelming
        surface: '#fee2e2', // red-100
        surfaceRaised: '#fecaca', // red-200
        surfaceHover: '#fca5a5', // red-300
        surfaceRaisedHover: '#f87171', // red-400

        border: '#ef4444',
    },

    dark: {
        accent: '#f87171', // red-400
        accentDisabled: '#7f1d1d', // red-900
        ring: '#ef4444', // red-500

        surface: '#450a0a', // red-950
        surfaceRaised: '#7f1d1d', // red-900
        surfaceHover: '#991b1b', // red-800
        surfaceRaisedHover: '#b91c1c', // red-700

        border: '#ef4444',
    },
};

const dangerSolid = deriveThemeProps(
    dangerBase,
    (light) => {
        return {
            surface: light.accent,
            surfaceRaised: light.accent,

            surfaceHover: light.accentDisabled,
            surfaceRaisedHover: light.accentDisabled,

            text: '#fff',
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: light.accent,
        };
    },
    (dark) => {
        return {
            surface: dark.accent,
            surfaceRaised: dark.accent,

            surfaceHover: dark.accentDisabled,
            surfaceRaisedHover: dark.accentDisabled,

            text: '#fff', // 👈 stays white for red (important)
            textMuted: 'rgba(255,255,255,0.85)',
            icon: '#fff',
            accent: '#fff',

            border: dark.accent,
        };
    },
);

const dangerThemes: Record<string, CardTheme> = {
    base: extendCardTheme(dangerBase),
    solid: extendCardTheme(dangerSolid),
};

export const themes = {
    primary: primaryThemes,
    secondary: secondaryThemes,
    info: infoThemes,
    success: successThemes,
    warning: warningThemes,
    danger: dangerThemes,
} as const;
