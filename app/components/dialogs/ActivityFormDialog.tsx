import React from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ActivityForm } from "~/components/forms/ActivityForm";
import { useActivityForm } from "~/hooks/useActivityForm";

import type { ActivityFormValues } from "~/lib/validations/activity-schema";

interface ActivityFormDialogProps {
  itineraryDate: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  activityType?: "activity" | "transport" | "match" | "meal" | "hotel";
}

export function ActivityFormDialog({
  itineraryDate,
  trigger,
  open,
  onOpenChange,
  activityType = "activity",
}: ActivityFormDialogProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Use the custom hook for form submission
  const { handleSubmit, isSubmitting, error } = useActivityForm({
    itineraryDate,
    onSuccess: () => {
      // Close the dialog on success
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        setIsOpen(false);
      }
    },
    onError: (error) => {
      console.error("Error creating activity:", error);
    },
  });
  
  // Default values based on activity type
  const getDefaultValues = (): Partial<ActivityFormValues> => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    return {
      type: activityType,
      time: currentTime,
      status: "pending",
    };
  };
  
  // Use controlled or uncontrolled open state
  const dialogOpen = open !== undefined ? open : isOpen;
  const setDialogOpen = onOpenChange || setIsOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription>
            {t('itinerary.addActivityDescription', 'Create a new activity for your itinerary.')}
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
            {error.message}
          </div>
        )}
        
        <ActivityForm
          defaultValues={getDefaultValues()}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          itineraryDate={itineraryDate}
        />
      </DialogContent>
    </Dialog>
  );
}
