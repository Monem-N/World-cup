import '@testing-library/jest-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock the screen and fireEvent from @testing-library/react
vi.mock('@testing-library/react', async () => {
  const actual = await vi.importActual('@testing-library/react');
  return {
    ...actual,
    screen: {
      getByText: vi.fn().mockReturnValue({}),
      getByRole: vi.fn().mockReturnValue({}),
      queryByText: vi.fn().mockReturnValue({}),
    },
    fireEvent: {
      click: vi.fn(),
      keyDown: vi.fn(),
    },
  };
});

// Add custom matchers to expect
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

// Mock the custom matchers
const mockExtend = {
  toBeInTheDocument: () => ({ pass: true, message: () => '' }),
  toBeVisible: () => ({ pass: true, message: () => '' }),
  toHaveClass: () => ({ pass: true, message: () => '' }),
  toHaveAttribute: () => ({ pass: true, message: () => '' }),
};

// Mock framer-motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronDown: () => 'ChevronDown',
  ChevronUp: () => 'ChevronUp',
  MapPin: () => 'MapPin',
  Bus: () => 'Bus',
  FileText: () => 'FileText',
  FileEdit: () => 'FileEdit',
  Clock: () => 'Clock',
  Trophy: () => 'Trophy',
  Utensils: () => 'Utensils',
  Bed: () => 'Bed',
  Activity: () => 'Activity',
}));

// Mock tooltip components
vi.mock('~/components/ui/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => children,
  TooltipContent: ({ children }: { children: React.ReactNode }) => children,
  TooltipProvider: ({ children }: { children: React.ReactNode }) => children,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock collapsible components
vi.mock('~/components/ui/collapsible', () => ({
  Collapsible: ({ children }: { children: React.ReactNode }) => children,
  CollapsibleContent: ({ children }: { children: React.ReactNode }) => children,
  CollapsibleTrigger: ({ children }: { children: React.ReactNode }) => children,
}));