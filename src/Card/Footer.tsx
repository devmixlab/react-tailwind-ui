import React, { forwardRef } from 'react';
import { Section, type SectionOwnProps } from './Section';
import { createPolymorphic } from '../types/polymorphic';

export type FooterOwnProps = Omit<SectionOwnProps, 'type'>;

type FooterProps = FooterOwnProps;

export const FooterImpl = (props: FooterOwnProps, ref: React.Ref<any>) => {
    return <Section ref={ref} {...props} type="footer" />;
};

export const Footer = createPolymorphic<FooterProps, 'div'>(forwardRef(FooterImpl), 'Card.Footer');
