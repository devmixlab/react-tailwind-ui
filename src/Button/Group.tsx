import React from 'react';
import clsx from 'clsx';
// import { ButtonColor, defaultButtonColor } from './Button';
// import { type Size } from '@/Components/UI/tokens/size';
import { type View } from '@/tokens/button';
import { type Size, type Variant } from '@/tokens/common';
import { buttonStyles as bs } from './Button.styles';
// import { type Variant } from '@/Components/UI/tokens/variant';
// import { type View } from '@/Components/UI/Buttons/StyledButton';

// const borderColors: Record<Variant, string> = {
//     primary: 'focus:border-blue-500 dark:focus:border-blue-400',
//     secondary: 'focus:border-slate-500 dark:focus:border-slate-400',
//     light: 'focus:border-gray-500 dark:focus:border-gray-400',
//     dark: 'focus:border-zinc-500 dark:focus:border-zinc-400',
//     danger: 'focus:border-red-500 dark:focus:border-red-400',
//     warning: 'focus:border-amber-500 dark:focus:border-amber-400',
//     success: 'focus:border-emerald-500 dark:focus:border-emerald-400',
//     info: 'focus:border-sky-500 dark:focus:border-sky-400',
// };

// const borderColors: Record<Variant, string> = {
//     primary: 'focus:border-blue-500 dark:focus:border-blue-500',
//     secondary: 'focus:border-slate-400 dark:focus:border-slate-500',
//     success: 'focus:border-emerald-500 dark:focus:border-emerald-500',
//     danger: 'focus:border-red-500 dark:focus:border-red-500',
//     warning: 'focus:border-amber-500 dark:focus:border-amber-400',
//     info: 'focus:border-sky-500 dark:focus:border-sky-500',
//     light: 'focus:border-slate-200 dark:focus:border-slate-800',
//     dark: 'focus:border-stone-500 dark:focus:border-stone-700',
// };

type GroupProps = {
    children: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    variant?: Variant;
    view?: View;
    size?: Size;
};

export default function Group({
    children,
    orientation = 'horizontal',
    className,
    variant = 'primary',
    view = 'solid',
    size = 'md',
}: GroupProps) {
    const items = React.Children.toArray(children).filter(React.isValidElement);

    console.log('items:');
    console.log(items);

    return (
        <div
            role="group"
            className={clsx(bs.group.group, bs.group.orientation[orientation])}
            // className={clsx(
            //     'inline-flex',
            //     orientation === 'horizontal' ? 'flex-row' : 'flex-col',
            //     className,
            // )}
        >
            {items.map((child: any, index) => {
                const isFirst = index === 0;
                const isLast = index === items.length - 1;

                // const childVariant: Variant = child.props.variant ?? variant ?? 'primary';

                // console.log(child.props);

                return React.cloneElement(child, {
                    ...child.props,
                    groupItem: true,
                    variant: child.props.variant ?? variant ?? 'primary',
                    view: child.props.view ?? view ?? 'solid',
                    size: child.props.size ?? size ?? 'md',
                    fullWidth: orientation === 'vertical',
                    className: clsx(child.props.className),
                });
            })}
        </div>
    );
}
