import React, { forwardRef } from 'react';
import { Section, type SectionOwnProps } from './Section';
import { createPolymorphic } from '../types/polymorphic';
import { BoxProps } from '../Box/Box';

export type BodyOwnProps = {
    direction?: BoxProps['direction'];
} & Omit<SectionOwnProps, 'type'>;

type BodyProps = BodyOwnProps;

export const BodyImpl = ({ direction = 'row', ...rest }: BodyOwnProps, ref: React.Ref<any>) => {
    return <Section direction={direction} ref={ref} {...rest} type="body" d="flex" />;
};

export const Body = createPolymorphic<BodyProps, 'div'>(forwardRef(BodyImpl), 'Card.Body');
