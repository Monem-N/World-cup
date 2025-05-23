import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useItineraryStoreActions } from "../../../stores/itinerary";

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

import type { Activity } from "~/lib/types";
import type { ActivityFormValues } from "~/lib/validations/activity-schema";

interface EditActivityDialogProps {
  activity: Activity;
  itineraryDate: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditActivityDialog({
  activity,
  itineraryDate,
  trigger,
  open,
  onOpenChange,
}: EditActivityDialogProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const queryClient = useQueryClient();
  const { setItinerary } = useItineraryStoreActions();
  const [isOpen, setIsOpen] = React.useState(false);

  // Convert Activity to form values
  const convertActivityToFormValues = (activity: Activity): ActivityFormValues => {
    return {
      type: activity.type,
      title: activity.title,
      time: activity.time,
      duration: activity.duration || "",
      status: activity.status,
      important: activity.important || false,
      requiresConfirmation: activity.requiresConfirmation || false,
      isGroupEvent: activity.isGroupEvent || false,
      notes: activity.notes || "",
      location: activity.location ? {
        name: activity.location.name,
        address: activity.location.address || "",
        lat: activity.location.lat,
        lng: activity.location.lng,
        contact: activity.location.contact || "",
        confirmationNumber: activity.location.confirmationNumber || "",
        website: activity.location.website || "",
        mapUrl: activity.location.mapUrl || "",
        venueType: activity.location.venueType || "",
      } : undefined,
      transport: activity.transport ? {
        mode: activity.transport.mode,
        carrier: activity.transport.carrier || "",
        bookingReference: activity.transport.bookingReference || "",
        pickup_time: activity.transport.pickup_time || "",
        pickup_location: activity.transport.pickup_location || "",
        estimated_cost: activity.transport.estimated_cost,
        notes: activity.transport.notes || "",
      } : undefined,
      attachments: activity.attachments || [],
    };
  };

  const handleSubmit = async (formValues: ActivityFormValues) => {
    setIsSubmitting(true);

    try {
      // Get the current itinerary from the cache
      const currentItinerary = queryClient.getQueryData(['itinerary', itineraryDate]) as any;

      if (currentItinerary) {
        // Update the activity in the items array
        const updatedItems = currentItinerary.items?.map((item: Activity) => {
          if (item.id === activity.id) {
            return {
              ...item,
              ...formValues,
              // Preserve the original ID
              id: activity.id,
            };
          }
          return item;
        }) || [];

        // Create the updated itinerary
        const updatedItinerary = {
          ...currentItinerary,
          date: currentItinerary.date || itineraryDate,
          title: currentItinerary.title || "Itinerary",
          summary: currentItinerary.summary || "",
          items: updatedItems,
        };

        // Update the cache
        queryClient.setQueryData(['itinerary', itineraryDate], updatedItinerary);

        // Update the store
        setItinerary(updatedItinerary);

        // Close the dialog
        if (onOpenChange) {
          onOpenChange(false);
        } else {
          setIsOpen(false);
        }
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use controlled or uncontrolled open state
  const dialogOpen = open !== undefined ? open : isOpen;
  const setDialogOpen = onOpenChange || setIsOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
          <DialogDescription>
            {t('itinerary.editActivityDescription', 'Make changes to the activity details below.')}
          </DialogDescription>
        </DialogHeader>
        <ActivityForm
          defaultValues={convertActivityToFormValues(activity)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          itineraryDate={itineraryDate}
        />
      </DialogContent>
    </Dialog>
  );
}
