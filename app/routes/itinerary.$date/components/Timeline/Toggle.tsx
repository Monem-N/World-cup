import React, { useId } from 'react'; // Import useId hook
import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  // Optional: Allow parent to provide a specific ID if needed
  // id?: string;
}

export default function Toggle({ label, value, onChange /*, id: parentId */ }: ToggleProps) {
  // Generate a unique ID for the switch and label pairing using React's useId hook
  // This ensures accessibility benefits of linking label and control are robust
  const generatedId = useId();
  // const switchId = parentId || generatedId; // Use parentId if provided, otherwise generated

  return (
    <div className="flex items-center space-x-2">
      {/* Link the Switch and Label using the generated unique ID */}
      <Switch
        id={generatedId} // Use the generated ID
        checked={value}
        onCheckedChange={onChange}
        // Add any necessary Tailwind classes for styling the switch itself if needed
      />
      <Label
        htmlFor={generatedId} // Link label to the switch using the same ID
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          // Add any other label specific styling
        )}
      >
        {label}
      </Label>
    </div>
  );
}
