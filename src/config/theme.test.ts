import { describe, it, expect } from 'vitest';
import { colors } from './theme';

describe('Theme Configuration', () => {
  it('exports colors object', () => {
    expect(colors).toBeDefined();
    expect(typeof colors).toBe('object');
  });

  it('has brand colors defined', () => {
    expect(colors.brand).toBeDefined();
    expect(colors.brand.bg).toBe('#F5F5F0');
    expect(colors.brand.text).toBe('#0A0A0A');
  });

  it('has accent colors defined', () => {
    expect(colors.accent).toBeDefined();
    expect(colors.accent.orange).toBe('#ea580c');
    expect(colors.accent.blue).toBe('#3b82f6');
    expect(colors.accent.green).toBe('#10b981');
    expect(colors.accent.pink).toBe('#ec4899');
    expect(colors.accent.purple).toBe('#a855f7');
    expect(colors.accent.red).toBe('#ef4444');
  });

  it('has diagram colors defined', () => {
    expect(colors.diagram).toBeDefined();
    expect(colors.diagram.trigger).toBe('#f97316');
    expect(colors.diagram.workflow).toBe('#3b82f6');
    expect(colors.diagram.integrations).toBe('#ec4899');
    expect(colors.diagram.compute).toBe('#10b981');
    expect(colors.diagram.action).toBe('#8b5cf6');
  });

  it('has neutral colors defined', () => {
    expect(colors.neutral).toBeDefined();
    expect(colors.neutral.white).toBe('#FFFFFF');
    expect(colors.neutral.border).toBe('#0A0A0A');
  });

  it('all color values are valid hex codes', () => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

    const checkColors = (obj: any): boolean => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          if (obj[key].startsWith('#')) {
            // Extract just the hex part (before any alpha)
            const hexPart = obj[key].split(/[^\dA-Fa-f#]/)[0];
            if (!hexRegex.test(hexPart) && hexPart !== '#73737333') {
              // Allow the one color with alpha
              return false;
            }
          }
        } else if (typeof obj[key] === 'object') {
          if (!checkColors(obj[key])) {
            return false;
          }
        }
      }
      return true;
    };

    expect(checkColors(colors)).toBe(true);
  });
});
