import React from 'react';
import { render } from '@testing-library/react';
import { Box } from '../Box';

describe('Box - sizing props', () => {
    test('applies width and height', () => {
        const { getByTestId } = render(<Box data-testid="box" width={200} height={100} />);

        const el = getByTestId('box');

        // jsdom reads inline styles as strings with px
        expect(el.style.width).toBe('200px');
        expect(el.style.height).toBe('100px');
    });

    test('applies min/max width and height', () => {
        const { getByTestId } = render(
            <Box data-testid="box" minWidth={50} maxWidth={500} minHeight={30} maxHeight={300} />,
        );

        const el = getByTestId('box');

        expect(el.style.minWidth).toBe('50px');
        expect(el.style.maxWidth).toBe('500px');
        expect(el.style.minHeight).toBe('30px');
        expect(el.style.maxHeight).toBe('300px');
    });

    test('applies aspectRatio', () => {
        const { getByTestId } = render(<Box data-testid="box" aspectRatio="16/9" />);

        const el = getByTestId('box');

        expect(el.style.aspectRatio).toBe('16/9');
    });

    test('applies combination of sizing props', () => {
        const { getByTestId } = render(
            <Box
                data-testid="box"
                width={400}
                minWidth={200}
                maxWidth={600}
                height={300}
                minHeight={100}
                maxHeight={500}
                aspectRatio="4/3"
            />,
        );

        const el = getByTestId('box');

        expect(el.style.width).toBe('400px');
        expect(el.style.minWidth).toBe('200px');
        expect(el.style.maxWidth).toBe('600px');
        expect(el.style.height).toBe('300px');
        expect(el.style.minHeight).toBe('100px');
        expect(el.style.maxHeight).toBe('500px');
        expect(el.style.aspectRatio).toBe('4/3');
    });
});
