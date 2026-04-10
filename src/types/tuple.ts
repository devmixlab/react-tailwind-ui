import type { CSSProperties } from 'react';

export type UniqueTuple<T extends readonly unknown[], Seen = never> = T extends readonly [
    infer Head,
    ...infer Tail,
]
    ? Head extends Seen
        ? never
        : UniqueTuple<Tail, Seen | Head>
    : unknown;

export const defineUniqueTuple = <T extends readonly unknown[]>(arr: T & UniqueTuple<T>) => arr;

type CSSProp = keyof CSSProperties;
export const defineStyleProps = <T extends readonly CSSProp[]>(arr: T & UniqueTuple<T>) => arr;
