export function typedEntries<T extends object>(obj: T) {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function typedKeys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
}

export function hasKey<O extends object>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
}
