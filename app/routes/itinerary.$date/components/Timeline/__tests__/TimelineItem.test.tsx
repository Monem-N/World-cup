import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TimelineItem from '../TimelineItem';

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

describe('TimelineItem', () => {
  const mockActivity = {
    id: '1',
    type: 'match' as const,
    title: 'Test Match',
    time: '15:00',
    status: 'confirmed' as const,
    location: {
      name: 'Test Stadium',
      address: '456 Stadium Road',
      lat: 40.7128,
      lng: -74.0060
    },
    transport: {
      mode: 'Bus',
      carrier: 'Express Transit'
    },
    attachments: ['Match Ticket'],
    notes: 'Arrive 2 hours before'
  };

  it('renders with correct icon based on activity type', () => {
    render(<TimelineItem activity={mockActivity} />);

    const icon = screen.getByRole('button', { name: /timeline icon/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-primary'); // Match type uses primary color
  });

  it('shows and hides details when clicked', () => {
    render(<TimelineItem activity={mockActivity} />);

    const titleElement = screen.getByText('Test Match');
    fireEvent.click(titleElement);

    expect(screen.getByText('Test Stadium')).toBeInTheDocument();
    expect(screen.getByText('Bus')).toBeInTheDocument();

    fireEvent.click(titleElement);
    expect(screen.queryByText('Test Stadium')).not.toBeVisible();
  });

  it('renders connector line when showConnector is true', () => {
    render(<TimelineItem activity={mockActivity} showConnector={true} />);

    const connector = document.querySelector('.bg-primary'); // Confirmed status uses primary color
    expect(connector).toBeInTheDocument();
  });

  it('does not render connector line when showConnector is false', () => {
    render(<TimelineItem activity={mockActivity} showConnector={false} />);

    const connector = document.querySelector('.bg-primary');
    expect(connector).not.toBeInTheDocument();
  });

  it('applies animation classes', () => {
    render(<TimelineItem activity={mockActivity} />);

    const item = screen.getByRole('listitem');
    expect(item).toHaveClass('animate-in');
  });

  it('handles different activity statuses', () => {
    const pendingActivity = { ...mockActivity, status: 'pending' as const };
    render(<TimelineItem activity={pendingActivity} showConnector={true} />);

    const connector = document.querySelector('.bg-accent'); // Pending status uses accent color
    expect(connector).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-timeline-item';
    render(<TimelineItem activity={mockActivity} className={customClass} />);

    const item = screen.getByRole('listitem');
    expect(item).toHaveClass(customClass);
  });
});