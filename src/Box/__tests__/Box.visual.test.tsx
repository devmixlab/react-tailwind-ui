import React from 'react';
import { render } from '@testing-library/react';
import { Box } from '../Box';

describe('Box - border & visual appearance', () => {
    test('applies border shorthand', () => {
        const { getByTestId } = render(<Box data-testid="box" border="2px solid red" />);

        const el = getByTestId('box');
        expect(el.style.border).toBe('2px solid red');
    });

    test('applies individual border props when border shorthand is not set', () => {
        const { getByTestId } = render(
            <Box data-testid="box" borderColor="blue" borderStyle="dashed" borderWidth={3} />,
        );

        const el = getByTestId('box');
        expect(el.style.borderColor).toBe('blue');
        expect(el.style.borderStyle).toBe('dashed');
        expect(el.style.borderWidth).toBe('3px');
    });

    test('applies borderRadius', () => {
        const { getByTestId } = render(<Box data-testid="box" borderRadius={10} />);

        const el = getByTestId('box');
        expect(el.style.borderRadius).toBe('10px');
    });

    test('applies background and backgroundColor', () => {
        const { getByTestId } = render(
            <Box
                data-testid="box"
                background="linear-gradient(to right, red, yellow)"
                backgroundColor="green"
            />,
        );

        const el = getByTestId('box');

        expect(el.style.background).toContain('linear-gradient(to right, red, yellow)');
        expect(el.style.backgroundColor).toBe('green');
    });

    test('applies boxShadow', () => {
        const { getByTestId } = render(
            <Box data-testid="box" boxShadow="0 4px 6px rgba(0,0,0,0.1)" />,
        );

        const el = getByTestId('box');
        expect(el.style.boxShadow).toBe('0 4px 6px rgba(0,0,0,0.1)');
    });

    test('applies opacity', () => {
        const { getByTestId } = render(<Box data-testid="box" opacity={0.5} />);

        const el = getByTestId('box');
        expect(el.style.opacity).toBe('0.5');
    });

    test('applies transition', () => {
        const { getByTestId } = render(<Box data-testid="box" transition="all 0.3s ease" />);

        const el = getByTestId('box');
        expect(el.style.transition).toBe('all 0.3s ease');
    });

    test('applies combination of visual props', () => {
        const { getByTestId } = render(
            <Box
                data-testid="box"
                border="1px solid black"
                borderRadius={8}
                backgroundColor="red"
                boxShadow="0 2px 4px rgba(0,0,0,0.2)"
                opacity={0.8}
                transition="all 0.2s"
            />,
        );

        const el = getByTestId('box');
        expect(el.style.border).toBe('1px solid black');
        expect(el.style.borderRadius).toBe('8px');
        expect(el.style.backgroundColor).toBe('red');
        expect(el.style.boxShadow).toBe('0 2px 4px rgba(0,0,0,0.2)');
        expect(el.style.opacity).toBe('0.8');
        expect(el.style.transition).toBe('all 0.2s');
    });
});
