import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Using date-fns for date formatting

// Assuming shadcn/ui components are available at these paths
import { Calendar } from '~/components/ui/calendar'; // shadcn/ui Calendar component
import { Button } from '~/components/ui/button'; // shadcn/ui Button component
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'; // shadcn/ui Popover for the date picker
import { CalendarIcon } from 'lucide-react'; // Icon for the calendar trigger
import { cn } from '~/lib/utils'; // Utility for conditional class names

export default function ItineraryDateSelectorPage() {
  // State to hold the selected date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handler for when a date is selected in the calendar
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Handler for the "View Itinerary" button click
  const handleViewItinerary = () => {
    if (selectedDate) {
      // Format the date to YYYY-MM-DD to match the dynamic route parameter
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      // Navigate to the DayProgramPage route with the selected date
      navigate(`/itinerary/${formattedDate}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Select a Date to View Itinerary</h1>

      {/* Date Picker using shadcn/ui Calendar and Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {/* The Calendar component */}
          <Calendar
            mode="single" // Allow selecting a single date
            selected={selectedDate} // Bind the selected date state
            onSelect={handleDateSelect} // Handle date selection
            initialFocus // Focus the calendar when the popover opens
          />
        </PopoverContent>
      </Popover>

      {/* Button to view the itinerary */}
      <Button
        onClick={handleViewItinerary}
        disabled={!selectedDate} // Disable button if no date is selected
        className="mt-4"
      >
        View Itinerary
      </Button>
    </div>
  );
}
