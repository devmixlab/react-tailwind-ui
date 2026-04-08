// src/Box/__tests__/Box.grid.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Box } from '../Box';

vi.mock('../../hooks/useWindowWidth', () => ({
    useWindowWidth: () => 1280,
}));

vi.mock('../WindowWidthProvider', () => ({
    useWindowWidthContext: () => null,
}));

describe('Box — grid layout', () => {
    // ─── display: grid ───────────────────────────────────────────────

    it('sets display: grid', () => {
        const { container } = render(<Box display="grid">content</Box>);
        expect(container.firstChild).toHaveStyle({ display: 'grid' });
    });

    // ─── gridTemplateColumns (columns prop) ──────────────────────────

    it('defaults to 12 columns when columns prop is not set', () => {
        const { container } = render(<Box display="grid">content</Box>);
        expect(container.firstChild).toHaveStyle({
            gridTemplateColumns: 'repeat(12, 1fr)',
        });
    });

    it('defaults to 12 columns when columns is 0', () => {
        const { container } = render(
            <Box display="grid" columns={0}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            gridTemplateColumns: 'repeat(12, 1fr)',
        });
    });

    it('defaults to 12 columns when columns is negative', () => {
        const { container } = render(
            <Box display="grid" columns={-1}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            gridTemplateColumns: 'repeat(12, 1fr)',
        });
    });

    it('sets custom columns count', () => {
        const { container } = render(
            <Box display="grid" columns={4}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            gridTemplateColumns: 'repeat(4, 1fr)',
        });
    });

    it('sets 1 column', () => {
        const { container } = render(
            <Box display="grid" columns={1}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            gridTemplateColumns: 'repeat(1, 1fr)',
        });
    });

    // ─── gridAutoFlow ────────────────────────────────────────────────

    it('sets gridAutoFlow: row', () => {
        const { container } = render(
            <Box display="grid" gridAutoFlow="row">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ gridAutoFlow: 'row' });
    });

    it('sets gridAutoFlow: column', () => {
        const { container } = render(
            <Box display="grid" gridAutoFlow="column">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ gridAutoFlow: 'column' });
    });

    // ─── gridTemplateRows ────────────────────────────────────────────

    it('sets gridTemplateRows', () => {
        const { container } = render(
            <Box display="grid" gridTemplateRows="auto 1fr auto">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            gridTemplateRows: 'auto 1fr auto',
        });
    });

    // ─── gridTemplateAreas ───────────────────────────────────────────

    it('sets gridTemplateAreas', () => {
        const { container } = render(
            <Box display="grid" gridTemplateAreas='"header" "main" "footer"'>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({
            gridTemplateAreas: '"header" "main" "footer"',
        });
    });

    // ─── alignContent ────────────────────────────────────────────────

    it('sets alignContent: center', () => {
        const { container } = render(
            <Box display="grid" alignContent="center">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ alignContent: 'center' });
    });

    it('sets alignContent: space-between', () => {
        const { container } = render(
            <Box display="grid" alignContent="space-between">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ alignContent: 'space-between' });
    });

    // ─── placeItems vs justifyItems ──────────────────────────────────

    it('sets placeItems when provided', () => {
        const { container } = render(
            <Box display="grid" placeItems="center">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ placeItems: 'center' });
    });

    it('sets justifyItems when placeItems is not set', () => {
        const { container } = render(
            <Box display="grid" justifyItems="start">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ justifyItems: 'start' });
    });

    it('placeItems takes priority over justifyItems', () => {
        const { container } = render(
            <Box display="grid" placeItems="center" justifyItems="start">
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;
        expect(el.style.placeItems).toBe('center');
        // justifyItems should be skipped when placeItems is set
        expect(el.style.justifyItems).toBe('');
    });

    // ─── alignItems ──────────────────────────────────────────────────

    it('sets alignItems when placeItems is not set', () => {
        const { container } = render(
            <Box display="grid" alignItems="end">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ alignItems: 'end' });
    });

    it('does NOT set alignItems when placeItems is set', () => {
        const { container } = render(
            <Box display="grid" placeItems="center" alignItems="end">
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;
        // placeItems covers both align and justify, so alignItems should be skipped
        expect(el.style.alignItems).toBe('');
    });

    // ─── gridColumn / gridRow (grid item props) ───────────────────────

    it('sets gridColumn', () => {
        const { container } = render(<Box gridColumn="1 / 3">content</Box>);
        expect(container.firstChild).toHaveStyle({ gridColumn: '1 / 3' });
    });

    it('sets gridRow', () => {
        const { container } = render(<Box gridRow="2 / 4">content</Box>);
        expect(container.firstChild).toHaveStyle({ gridRow: '2 / 4' });
    });

    it('sets gridArea', () => {
        const { container } = render(
            <Box display="grid" gridArea="header">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ gridArea: 'header' });
    });

    // ─── justifyContent ──────────────────────────────────────────────

    it('sets justifyContent: center', () => {
        const { container } = render(
            <Box display="grid" justifyContent="center">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ justifyContent: 'center' });
    });

    // ─── gap ─────────────────────────────────────────────────────────

    it('sets gap', () => {
        const { container } = render(
            <Box display="grid" gap={16}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ gap: '16px' });
    });

    it('sets rowGap and columnGap separately', () => {
        const { container } = render(
            <Box display="grid" rowGap={8} columnGap={24}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ rowGap: '8px', columnGap: '24px' });
    });

    // ─── grid props NOT applied when display is not grid ─────────────

    it('does NOT set gridTemplateColumns when display is not grid', () => {
        const { container } = render(
            <Box display="flex" columns={4}>
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;
        expect(el.style.gridTemplateColumns).toBe('');
    });

    it('does NOT set gridAutoFlow when display is not grid', () => {
        const { container } = render(
            <Box display="flex" gridAutoFlow="column">
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;
        expect(el.style.gridAutoFlow).toBe('');
    });
});
