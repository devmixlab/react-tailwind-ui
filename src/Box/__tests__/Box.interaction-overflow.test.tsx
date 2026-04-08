import React from 'react';
import { render } from '@testing-library/react';
import { Box } from '../Box';

describe('Box - cursor, pointerEvents, and overflow', () => {
    test('applies cursor', () => {
        const { getByTestId } = render(<Box data-testid="box" cursor="pointer" />);
        const el = getByTestId('box');
        expect(el.style.cursor).toBe('pointer');
    });

    test('applies pointerEvents as string', () => {
        const { getByTestId } = render(<Box data-testid="box" pointerEvents="none" />);
        const el = getByTestId('box');
        expect(el.style.pointerEvents).toBe('none');
    });

    test('applies pointerEvents as boolean', () => {
        const { getByTestId } = render(<Box data-testid="box" pointerEvents={true} />);
        const el = getByTestId('box');
        expect(el.style.pointerEvents).toBe('auto');

        const { getByTestId: getByTestId2 } = render(
            <Box data-testid="box2" pointerEvents={false} />,
        );
        const el2 = getByTestId2('box2');
        expect(el2.style.pointerEvents).toBe('none');
    });

    test('applies overflow properties', () => {
        const { getByTestId } = render(
            <Box
                data-testid="box"
                overflow="auto"
                overflowX="scroll"
                overflowY="hidden"
                whiteSpace="nowrap"
            />,
        );

        const el = getByTestId('box');
        expect(el.style.overflow).toBe('auto');
        expect(el.style.overflowX).toBe('scroll');
        expect(el.style.overflowY).toBe('hidden');
        expect(el.style.whiteSpace).toBe('nowrap');
    });

    test('combination of cursor, pointerEvents, and overflow', () => {
        const { getByTestId } = render(
            <Box
                data-testid="box"
                cursor="move"
                pointerEvents={false}
                overflow="visible"
                overflowX="auto"
                overflowY="scroll"
                whiteSpace="pre"
            />,
        );

        const el = getByTestId('box');
        expect(el.style.cursor).toBe('move');
        expect(el.style.pointerEvents).toBe('none');
        expect(el.style.overflow).toBe('visible');
        expect(el.style.overflowX).toBe('auto');
        expect(el.style.overflowY).toBe('scroll');
        expect(el.style.whiteSpace).toBe('pre');
    });
});
