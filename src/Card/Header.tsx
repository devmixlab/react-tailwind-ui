import React, { forwardRef } from 'react';
import { Section, type SectionOwnProps } from './Section';
import { createPolymorphic } from '../types/polymorphic';

export type HeaderOwnProps = Omit<SectionOwnProps, 'type'>;

type HeaderProps = HeaderOwnProps;

export const HeaderImpl = (props: HeaderOwnProps, ref: React.Ref<any>) => {
    return <Section ref={ref} {...props} type="header" />;
};

export const Header = createPolymorphic<HeaderProps, 'div'>(forwardRef(HeaderImpl), 'Card.Header');
