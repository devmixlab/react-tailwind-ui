import React from 'react';
import { DerivedBoxProps, DerivedBox } from './core/DerivedBox';
import clsx from 'clsx';
import { getActiveBreakpoint, type Responsive, resolveResponsive } from './core/helpers';
import { classPrefix } from '../utils/classPrefix';
import { typedEntries } from '../utils/ts';
import { useWindowWidthContext } from './WindowWidthProvider';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { configLookup } from './core/config';

type Responsiveify<T> = {
    [K in keyof T]?: Responsive<T[K]>;
};

export type Props = {};

export type BoxProps = Props & DerivedBoxProps;

export type ResponsiveBoxProps = Responsiveify<BoxProps>;

export const Box: React.FC<ResponsiveBoxProps> = ({ className, ...rest }) => {
    const widthFromContext = useWindowWidthContext();
    const windowWidth = widthFromContext || useWindowWidth();
    const bp = getActiveBreakpoint(windowWidth);

    const restProps = rest;

    // const restEntries = Object.entries(rest);
    const restEntries = typedEntries(rest);

    const classes: string[] = [];
    const locked = new Set<string>();
    const propsToPassNext: Partial<Record<keyof BoxProps, any>> = {};

    const passNext = (key: string, val: any) => {
        propsToPassNext[key as keyof BoxProps] = val;
    };

    restEntries.forEach(([key, value]) => {
        if (locked.has(key)) return;

        const resolved = resolveResponsive(value, bp);

        if (resolved == null) return;

        const config = configLookup[key];
        if (!config) {
            passNext(key, resolved);
            return;
        }

        locked.add(config.key);
        if (config.alias) locked.add(config.alias);

        const finalResolved = config.map !== undefined ? config.map[resolved] : resolved;

        const configCheck = config.check
            ? config.check({ props: restProps, key, value: finalResolved })
            : true;

        if (config.resolveInStyle) {
            if (!configCheck) {
                passNext(key, finalResolved);
                return;
            }

            passNext(
                key,
                config.resolveInStyle({
                    value: finalResolved,
                }),
            );

            return;
        }

        if (config.isToken && config.isToken(finalResolved) && configCheck) {
            const safeResolved =
                typeof finalResolved === 'string'
                    ? finalResolved.replace(/\//g, '-')
                    : finalResolved;
            classes.push(classPrefix(`--${config.prefix}-${safeResolved}`));
        } else {
            passNext(key, finalResolved);
        }
    });

    return <DerivedBox {...propsToPassNext} className={clsx(classes, className)} />;
};
