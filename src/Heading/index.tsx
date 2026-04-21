import {
    Heading,
    type HeadingComponent,
    type HeadingsProps,
    type HeadingLevel,
    type HProps,
} from './Heading';
import React, { forwardRef } from 'react';
import { createPolymorphic } from '../types/polymorphic';

const createHeading = (level: HeadingLevel) => {
    const HeadingImpl = ({ as, ...props }: HProps, ref: React.Ref<any>) => (
        <Heading ref={ref} h={level} as={as ?? level} {...props} />
    );
    return createPolymorphic<HProps>(forwardRef(HeadingImpl), level.toUpperCase());
};

const H1 = createHeading('h1');
const H2 = createHeading('h2');
const H3 = createHeading('h3');
const H4 = createHeading('h4');
const H5 = createHeading('h5');
const H6 = createHeading('h6');

const CompHeading = Heading as typeof Heading & HeadingComponent;

CompHeading.H1 = H1;
CompHeading.H2 = H2;
CompHeading.H3 = H3;
CompHeading.H4 = H4;
CompHeading.H5 = H5;
CompHeading.H6 = H6;

export { CompHeading as Heading, H1, H2, H3, H4, H5, H6 };
