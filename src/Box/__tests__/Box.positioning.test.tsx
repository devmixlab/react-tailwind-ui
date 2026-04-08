// src/Box/__tests__/Box.positioning.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Box } from '../Box';

vi.mock('../../hooks/useWindowWidth', () => ({
    useWindowWidth: () => 1280,
}));

vi.mock('../WindowWidthProvider', () => ({
    useWindowWidthContext: () => null,
}));

describe('Box — positioning', () => {
    // ─── position ────────────────────────────────────────────────────

    it('sets position: relative', () => {
        const { container } = render(<Box position="relative">content</Box>);
        expect(container.firstChild).toHaveStyle({ position: 'relative' });
    });

    it('sets position: absolute', () => {
        const { container } = render(<Box position="absolute">content</Box>);
        expect(container.firstChild).toHaveStyle({ position: 'absolute' });
    });

    it('sets position: fixed', () => {
        const { container } = render(<Box position="fixed">content</Box>);
        expect(container.firstChild).toHaveStyle({ position: 'fixed' });
    });

    it('sets position: sticky', () => {
        const { container } = render(<Box position="sticky">content</Box>);
        expect(container.firstChild).toHaveStyle({ position: 'sticky' });
    });

    it('sets position: static', () => {
        const { container } = render(<Box position="static">content</Box>);
        expect(container.firstChild).toHaveStyle({ position: 'static' });
    });

    // ─── top / left / right / bottom (toSize conversion) ─────────────

    it('sets top as number (px)', () => {
        const { container } = render(<Box top={10}>content</Box>);
        expect(container.firstChild).toHaveStyle({ top: '10px' });
    });

    it('sets top as string', () => {
        const { container } = render(<Box top="50%">content</Box>);
        expect(container.firstChild).toHaveStyle({ top: '50%' });
    });

    it('sets left as number (px)', () => {
        const { container } = render(<Box left={20}>content</Box>);
        expect(container.firstChild).toHaveStyle({ left: '20px' });
    });

    it('sets left as string', () => {
        const { container } = render(<Box left="1rem">content</Box>);
        expect(container.firstChild).toHaveStyle({ left: '1rem' });
    });

    it('sets right as number (px)', () => {
        const { container } = render(<Box right={0}>content</Box>);
        expect(container.firstChild).toHaveStyle({ right: '0px' });
    });

    it('sets right as string', () => {
        const { container } = render(<Box right="auto">content</Box>);
        expect(container.firstChild).toHaveStyle({ right: 'auto' });
    });

    it('sets bottom as number (px)', () => {
        const { container } = render(<Box bottom={32}>content</Box>);
        expect(container.firstChild).toHaveStyle({ bottom: '32px' });
    });

    it('sets bottom as string', () => {
        const { container } = render(<Box bottom="10vh">content</Box>);
        expect(container.firstChild).toHaveStyle({ bottom: '10vh' });
    });

    // ─── all four offsets together ────────────────────────────────────

    it('sets all four offsets at once', () => {
        const { container } = render(
            <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
        });
    });

    // ─── zIndex ───────────────────────────────────────────────────────

    it('sets zIndex as number', () => {
        const { container } = render(<Box zIndex={10}>content</Box>);
        expect(container.firstChild).toHaveStyle({ zIndex: 10 });
    });

    it('sets zIndex: 0', () => {
        const { container } = render(<Box zIndex={0}>content</Box>);
        expect(container.firstChild).toHaveStyle({ zIndex: 0 });
    });

    it('sets zIndex as negative number', () => {
        const { container } = render(<Box zIndex={-1}>content</Box>);
        expect(container.firstChild).toHaveStyle({ zIndex: -1 });
    });

    // ─── common patterns ──────────────────────────────────────────────

    it('absolutely positioned overlay (fill parent)', () => {
        const { container } = render(
            <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={10}>
                overlay
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            zIndex: 10,
        });
    });

    it('sticky header with zIndex', () => {
        const { container } = render(
            <Box position="sticky" top={0} zIndex={100}>
                header
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            position: 'sticky',
            top: '0px',
            zIndex: 100,
        });
    });

    it('fixed bottom bar', () => {
        const { container } = render(
            <Box position="fixed" bottom={0} left={0} right={0} zIndex={50}>
                bottom bar
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            right: '0px',
            zIndex: 50,
        });
    });

    // ─── no position set ──────────────────────────────────────────────

    it('does not set position by default', () => {
        const { container } = render(<Box>content</Box>);
        const el = container.firstChild as HTMLElement;
        expect(el.style.position).toBe('');
    });

    it('does not set top/left/right/bottom by default', () => {
        const { container } = render(<Box>content</Box>);
        const el = container.firstChild as HTMLElement;
        expect(el.style.top).toBe('');
        expect(el.style.left).toBe('');
        expect(el.style.right).toBe('');
        expect(el.style.bottom).toBe('');
    });

    it('does not set zIndex by default', () => {
        const { container } = render(<Box>content</Box>);
        const el = container.firstChild as HTMLElement;
        expect(el.style.zIndex).toBe('');
    });
});
