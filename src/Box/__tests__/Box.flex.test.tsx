// src/components/Box/Box.flex.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Box } from '../Box';

// Mock hooks
vi.mock('../../hooks/useWindowWidth', () => ({
    useWindowWidth: () => 1280,
}));

vi.mock('../WindowWidthProvider', () => ({
    useWindowWidthContext: () => null,
}));

describe('Box — flex layout', () => {
    // ─── display: flex ───────────────────────────────────────────────

    it('sets display: flex', () => {
        const { container } = render(<Box display="flex">content</Box>);
        expect(container.firstChild).toHaveStyle({ display: 'flex' });
    });

    // ─── flexDirection ───────────────────────────────────────────────

    it('sets flexDirection: row', () => {
        const { container } = render(
            <Box display="flex" flexDirection="row">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ flexDirection: 'row' });
    });

    it('sets flexDirection: column', () => {
        const { container } = render(
            <Box display="flex" flexDirection="column">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ flexDirection: 'column' });
    });

    // ─── flexWrap ────────────────────────────────────────────────────

    it('sets flexWrap: wrap when true', () => {
        const { container } = render(
            <Box display="flex" flexWrap={true}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ flexWrap: 'wrap' });
    });

    it('does NOT set flexWrap when false', () => {
        const { container } = render(
            <Box display="flex" flexWrap={false}>
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;
        expect(el.style.flexWrap).toBe('');
    });

    it('sets flexWrap: nowrap as string value', () => {
        const { container } = render(
            <Box display="flex" flexWrap="nowrap">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ flexWrap: 'nowrap' });
    });

    // ─── alignItems ──────────────────────────────────────────────────

    it('sets alignItems: center', () => {
        const { container } = render(
            <Box display="flex" alignItems="center">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ alignItems: 'center' });
    });

    it('sets alignItems: flex-start', () => {
        const { container } = render(
            <Box display="flex" alignItems="flex-start">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ alignItems: 'flex-start' });
    });

    // ─── justifyContent ──────────────────────────────────────────────

    it('sets justifyContent: space-between', () => {
        const { container } = render(
            <Box display="flex" justifyContent="space-between">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ justifyContent: 'space-between' });
    });

    it('sets justifyContent: center', () => {
        const { container } = render(
            <Box display="flex" justifyContent="center">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ justifyContent: 'center' });
    });

    // ─── flex shorthand ──────────────────────────────────────────────

    it('sets flex shorthand', () => {
        const { container } = render(
            <Box display="flex" flex="1 1 auto">
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ flex: '1 1 auto' });
    });

    it('flex shorthand takes priority over flexGrow/flexShrink', () => {
        const { container } = render(
            <Box display="flex" flex="2" flexGrow={true} flexShrink={false}>
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;

        // jsdom expands "2" → "2 1 0%"
        expect(el.style.flex).toContain('2');

        // flexGrow={true} would have set "1" via boolean logic,
        // but "2" from the shorthand proves the else-branch was skipped
        expect(el.style.flexGrow).toBe('2');

        // flexShrink={false} would have set "0" via boolean logic,
        // but "1" from the shorthand proves the else-branch was skipped
        expect(el.style.flexShrink).toBe('1');
    });

    // ─── flexGrow / flexShrink (no flex shorthand) ───────────────────

    it('sets flexGrow: 1 when true', () => {
        const { container } = render(<Box flexGrow={true}>content</Box>);
        expect(container.firstChild).toHaveStyle({ flexGrow: 1 });
    });

    it('sets flexGrow: 0 when false', () => {
        const { container } = render(<Box flexGrow={false}>content</Box>);
        expect(container.firstChild).toHaveStyle({ flexGrow: 0 });
    });

    it('sets flexShrink: 1 when true', () => {
        const { container } = render(<Box flexShrink={true}>content</Box>);
        expect(container.firstChild).toHaveStyle({ flexShrink: 1 });
    });

    it('sets flexShrink: 0 when false', () => {
        const { container } = render(<Box flexShrink={false}>content</Box>);
        expect(container.firstChild).toHaveStyle({ flexShrink: 0 });
    });

    it('sets flexBasis', () => {
        const { container } = render(<Box flexBasis="50%">content</Box>);
        expect(container.firstChild).toHaveStyle({ flexBasis: '50%' });
    });

    // ─── alignSelf / justifySelf ─────────────────────────────────────

    it('sets alignSelf on a flex child', () => {
        const { container } = render(<Box alignSelf="flex-end">content</Box>);
        expect(container.firstChild).toHaveStyle({ alignSelf: 'flex-end' });
    });

    // ─── gap ─────────────────────────────────────────────────────────

    it('sets gap', () => {
        const { container } = render(
            <Box display="flex" gap={16}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ gap: '16px' });
    });

    it('sets rowGap and columnGap separately', () => {
        const { container } = render(
            <Box display="flex" rowGap={8} columnGap={16}>
                content
            </Box>,
        );
        expect(container.firstChild).toHaveStyle({ rowGap: '8px', columnGap: '16px' });
    });

    // ─── flex props NOT applied when display is NOT flex ─────────────

    it('does NOT apply flexDirection when display is not flex', () => {
        const { container } = render(
            <Box display="block" flexDirection="column">
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;
        expect(el.style.flexDirection).toBe('');
    });

    it('does NOT apply flexWrap when display is not flex', () => {
        const { container } = render(
            <Box display="block" flexWrap={true}>
                content
            </Box>,
        );
        const el = container.firstChild as HTMLElement;
        expect(el.style.flexWrap).toBe('');
    });
});
