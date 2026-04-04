export function mapToClassRecord<T extends readonly string[]>(
    values: T,
    options?: {
        prefix?: string;
        postfix?: string;
        builder?: (cls: string) => string;
    },
): Record<T[number], string> {
    const { prefix = '', postfix = '', builder = (v: string) => v } = options || {};

    return values.reduce(
        (acc, v) => {
            acc[v as T[number]] = builder(`${prefix}${v}${postfix}`);
            return acc;
        },
        {} as Record<T[number], string>,
    );
}
