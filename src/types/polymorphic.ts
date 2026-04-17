import React from 'react';

export type PolymorphicComponent<Props, Default extends React.ElementType> = {
    <C extends React.ElementType = Default>(
        props: Props & { as?: C } & Omit<React.ComponentPropsWithoutRef<C>, keyof Props | 'as'> & {
                ref?: React.ComponentPropsWithRef<C>['ref'];
            },
    ): React.ReactElement | null;

    displayName?: string;
};

// export function createPolymorphic<Props, Default extends React.ElementType>(
//     component: any,
//     displayName: string,
// ) {
//     const result = component as PolymorphicComponent<Props, Default>;
//     result.displayName = displayName;
//     return result;
// }

export function createPolymorphic<Props, Default extends React.ElementType = 'div'>(
    component: React.ForwardRefExoticComponent<any>,
    displayName?: string,
) {
    const result = component as unknown as PolymorphicComponent<Props, Default>;

    if (displayName) {
        (result as any).displayName = displayName;
    }

    return result;
}
