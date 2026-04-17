import React, { forwardRef } from 'react';
import { Section, type SectionOwnProps } from './Section';
import { createPolymorphic } from '../types/polymorphic';
import { BoxProps } from '../Box/Box';

export type BodyOwnProps = {
    dir?: BoxProps['dir'];
} & Omit<SectionOwnProps, 'type'>;

type BodyProps = BodyOwnProps;

export const BodyImpl = ({ dir = 'row', ...rest }: BodyOwnProps, ref: React.Ref<any>) => {
    return <Section dir={dir} ref={ref} {...rest} type="body" d="flex" />;
};

export const Body = createPolymorphic<BodyProps, 'div'>(forwardRef(BodyImpl), 'Card.Body');
