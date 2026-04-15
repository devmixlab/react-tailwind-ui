import React from 'react';
import { Section, type SectionProps } from './Section';

type HeaderProps = Omit<SectionProps, 'type'>;

// export const Header = (props: HeaderProps) => {
//     return <Section {...props} type="header" />;
// };

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
    return <Section ref={ref} {...props} type="header" />;
});

Header.displayName = 'Card.Header';
