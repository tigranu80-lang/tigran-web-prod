import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FadeIn } from './FadeIn';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [];
}

describe('FadeIn', () => {
  beforeEach(() => {
    // Setup IntersectionObserver mock
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('renders children correctly', () => {
    render(
      <FadeIn>
        <div>Test content</div>
      </FadeIn>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <FadeIn className="custom-class">
        <div>Test content</div>
      </FadeIn>
    );

    const element = screen.getByText('Test content').parentElement;
    expect(element).toHaveClass('custom-class');
  });

  it('starts with opacity 0', () => {
    render(
      <FadeIn>
        <div>Test content</div>
      </FadeIn>
    );

    const element = screen.getByText('Test content').parentElement;
    expect(element).toHaveStyle({ opacity: 0 });
  });

  it('applies correct transform for different directions', () => {
    const { rerender } = render(
      <FadeIn direction="up">
        <div>Test content</div>
      </FadeIn>
    );

    let element = screen.getByText('Test content').parentElement;
    expect(element).toHaveStyle({ transform: 'translate3d(0, 40px, 0)' });

    rerender(
      <FadeIn direction="down">
        <div>Test content</div>
      </FadeIn>
    );
    element = screen.getByText('Test content').parentElement;
    expect(element).toHaveStyle({ transform: 'translate3d(0, -40px, 0)' });

    rerender(
      <FadeIn direction="left">
        <div>Test content</div>
      </FadeIn>
    );
    element = screen.getByText('Test content').parentElement;
    expect(element).toHaveStyle({ transform: 'translate3d(40px, 0, 0)' });

    rerender(
      <FadeIn direction="right">
        <div>Test content</div>
      </FadeIn>
    );
    element = screen.getByText('Test content').parentElement;
    expect(element).toHaveStyle({ transform: 'translate3d(-40px, 0, 0)' });
  });

  it('applies custom duration and delay', () => {
    render(
      <FadeIn duration={1000} delay={500}>
        <div>Test content</div>
      </FadeIn>
    );

    const element = screen.getByText('Test content').parentElement;
    const style = element?.style;

    expect(style?.transition).toContain('1000ms');
    expect(style?.transition).toContain('500ms');
  });
});
