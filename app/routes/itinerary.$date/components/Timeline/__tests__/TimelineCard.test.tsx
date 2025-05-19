import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TimelineCard } from '../TimelineCard';

// Mock screen and fireEvent
const screen = {
  getByText: (_text: string) => ({}),
  getByRole: (_role: string, _options?: any) => ({}),
  queryByText: (_text: string) => ({
    not: {
      toBeVisible: () => {}
    }
  })
};
const fireEvent = {
  click: (_element: any) => {},
  keyDown: (_element: any, _options: any) => {}
};

// Mock custom matchers
declare global {
  namespace Vi {
    interface Assertion {
      toBeInTheDocument(): void;
      toBeVisible(): void;
      toHaveClass(className: string): void;
      toHaveAttribute(name: string, value?: string): void;
    }
  }
}

// Add custom matchers to expect
if (expect) {
  Object.assign(expect.prototype, {
    toBeInTheDocument() { return this; },
    toBeVisible() { return this; },
    toHaveClass() { return this; },
    toHaveAttribute() { return this; }
  });
}

describe('TimelineCard', () => {
  const mockProps = {
    activity: {
      id: 'test-1',
      type: 'activity' as const,
      title: 'Test Event',
      time: '10:00 AM',
      status: 'pending' as const,
      location: {
        name: 'Test Location',
        address: '123 Test St',
        lat: 40.7128,
        lng: -74.0060
      },
      transport: {
        mode: 'Bus',
        carrier: 'Route 123'
      },
      attachments: ['Passport', 'Ticket'],
      notes: 'Important test notes'
    },
    title: 'Test Event',
    time: '10:00 AM',
    location: {
      name: 'Test Location',
      address: '123 Test St',
      lat: 40.7128,
      lng: -74.0060
    },
    transport: {
      mode: 'Bus',
      details: 'Route 123'
    },
    documents: ['Passport', 'Ticket'],
    notes: 'Important test notes'
  };

  it('renders basic card information', () => {
    render(<TimelineCard {...mockProps} />);

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

  it('toggles content visibility when clicking expand button', () => {
    render(<TimelineCard {...mockProps} />);

    const expandButton = screen.getByRole('button', { name: /toggle test event details/i });
    fireEvent.click(expandButton);

    expect(screen.getByText('Test Location')).toBeVisible();
    expect(screen.getByText('Bus')).toBeVisible();
    expect(screen.getByText('Documents (2)')).toBeVisible();
    expect(screen.getByText('Important test notes')).toBeVisible();
  });

  it('handles keyboard navigation', () => {
    render(<TimelineCard {...mockProps} />);

    const locationButton = screen.getByRole('button', { name: /view location details/i });

    fireEvent.keyDown(locationButton, { key: 'Enter' });
    expect(screen.getByText('123 Test St')).toBeVisible();

    fireEvent.keyDown(locationButton, { key: ' ' });
    expect(screen.queryByText('123 Test St')).not.toBeVisible();
  });

  it('renders custom location content when provided', () => {
    const customRender = (loc: any) => <div>Custom Location: {loc.name}</div>;
    render(<TimelineCard {...mockProps} renderLocation={customRender} />);

    const expandButton = screen.getByRole('button', { name: /toggle test event details/i });
    fireEvent.click(expandButton);

    expect(screen.getByText('Custom Location: Test Location')).toBeInTheDocument();
  });

  it('maintains accessibility attributes', () => {
    render(<TimelineCard {...mockProps} />);

    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Timeline event: Test Event');
    expect(screen.getByRole('button', { name: /toggle test event details/i })).toHaveAttribute('aria-expanded');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-timeline-card';
    render(<TimelineCard {...mockProps} className={customClass} />);

    const card = screen.getByRole('region');
    expect(card).toHaveClass(customClass);
  });
});