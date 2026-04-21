import React from 'react';

/**
 * Polymorphic props with ref support
 */
type PolymorphicProps<C extends React.ElementType, Props> = Props & {
    as?: C;
} & Omit<React.ComponentPropsWithRef<C>, keyof Props | 'as'>;

/**
 * Polymorphic component type with ref
 */
export type PolymorphicComponent<Props, Default extends React.ElementType = 'div'> = {
    <C extends React.ElementType = Default>(
        props: PolymorphicProps<C, Props> & {
            ref?: React.ComponentPropsWithRef<C>['ref'];
        },
    ): React.ReactElement | null;

    displayName?: string;
};

/**
 * Factory
 */
export function createPolymorphic<Props, Default extends React.ElementType = 'div'>(
    component: React.ForwardRefExoticComponent<any> & {
        displayName?: string;
    },
    displayName?: string,
) {
    const result = component as unknown as PolymorphicComponent<Props, Default>;

    (result as any).displayName = displayName ?? component.displayName ?? component.name;

    return result;
}

// export type PolymorphicComponent<Props, Default extends React.ElementType> = {
//     <C extends React.ElementType = Default>(
//         props: Props & { as?: C } & Omit<React.ComponentPropsWithoutRef<C>, keyof Props | 'as'> & {
//                 ref?: React.ComponentPropsWithRef<C>['ref'];
//             },
//     ): React.ReactElement | null;
//
//     displayName?: string;
// };
//
// type PolymorphicProps<C extends React.ElementType, Props> = Props & { as?: C } & Omit<
//         React.ComponentPropsWithoutRef<C>,
//         keyof Props | 'as'
//     >;

// export type PolymorphicComponent<Props, Default extends React.ElementType = 'div'> = {
//     <C extends React.ElementType = Default>(
//         props: PolymorphicProps<C, Props>,
//     ): React.ReactElement | null;
//
//     displayName?: string;
// };
//
// export function createPolymorphic<Props, Default extends React.ElementType = 'div'>(
//     component: React.ForwardRefExoticComponent<any>,
//     displayName?: string,
// ) {
//     const result = component as unknown as PolymorphicComponent<Props, Default>;
//
//     if (displayName) {
//         (result as any).displayName = displayName;
//     }
//
//     return result;
// }

// Extracted for readability (no change, just clearer structure)
// type PolymorphicProps<C extends React.ElementType, Props> = Props & { as?: C } & Omit<
//         React.ComponentPropsWithoutRef<C>,
//         keyof Props | 'as'
//     >;
//
// export type PolymorphicComponent<Props, Default extends React.ElementType = 'div'> = {
//     <C extends React.ElementType = Default>(
//         props: PolymorphicProps<C, Props>,
//     ): React.ReactElement | null;
//
//     displayName?: string;
// };
//
// export function createPolymorphic<Props, Default extends React.ElementType = 'div'>(
//     // ✅ FIX 1: preserve displayName on input component type
//     component: React.ForwardRefExoticComponent<any> & {
//         displayName?: string;
//     },
//     displayName?: string,
// ) {
//     const result = component as unknown as PolymorphicComponent<Props, Default>;
//
//     // ✅ FIX 2: add fallback displayName (important for DevTools)
//     (result as any).displayName = displayName ?? component.displayName ?? component.name;
//
//     // ✅ FIX 3 (optional but good): always return same reference with name attached
//     return result;
// }
