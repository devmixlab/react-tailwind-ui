import React from 'react';
import { render } from '@testing-library/react';
import { Box } from '../Box';

describe('Box - spacing classes (with prefixes & responsive)', () => {
    test('applies single padding classes with prefix', () => {
        const { getByTestId } = render(<Box data-testid="box" p={10} py={5} />);

        const el = getByTestId('box');
        const classList = el.className;

        expect(classList).toContain('dru--p-10');
        expect(classList).toContain('dru--py-5');
    });

    test('applies single margin classes with prefix', () => {
        const { getByTestId } = render(<Box data-testid="box" m={3} mt={2} />);

        const el = getByTestId('box');
        const classList = el.className;

        expect(classList).toContain('dru--m-3');
        expect(classList).toContain('dru--mt-2');
    });

    test('applies responsive margin classes', () => {
        const { getByTestId } = render(<Box data-testid="box" m={{ base: 2, sm: 4, md: 6 }} />);

        const el = getByTestId('box');
        const classList = el.className;

        expect(classList).toContain('dru--base:m-2');
        expect(classList).toContain('dru--sm:m-4');
        expect(classList).toContain('dru--md:m-6');
    });

    test('combines user className with spacing classes', () => {
        const { getByTestId } = render(<Box data-testid="box" className="custom-class" p={2} />);

        const el = getByTestId('box');
        const classList = el.className;

        expect(classList).toContain('custom-class');
        expect(classList).toContain('dru--p-2');
    });
});
