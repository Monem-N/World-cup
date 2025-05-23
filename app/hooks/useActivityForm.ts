import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useItineraryStoreActions } from "../../stores/itinerary";
import { createActivity } from "~/api/activityApi";
import type { ActivityFormValues } from "~/lib/validations/activity-schema";
import type { Activity } from "~/lib/types";

interface UseActivityFormProps {
  itineraryDate: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useActivityForm({
  itineraryDate,
  onSuccess,
  onError
}: UseActivityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { setItinerary } = useItineraryStoreActions();

  // Convert form values to Activity object
  const convertFormToActivity = (formValues: ActivityFormValues): Activity => {
    return {
      id: uuidv4(),
      type: formValues.type,
      title: formValues.title,
      time: formValues.time,
      duration: formValues.duration,
      status: formValues.status,
      important: formValues.important,
      requiresConfirmation: formValues.requiresConfirmation,
      isGroupEvent: formValues.isGroupEvent,
      notes: formValues.notes,
      location: formValues.location ? {
        name: formValues.location.name,
        lat: formValues.location.lat || 0,
        lng: formValues.location.lng || 0,
        address: formValues.location.address,
        contact: formValues.location.contact,
        confirmationNumber: formValues.location.confirmationNumber,
        website: formValues.location.website,
        mapUrl: formValues.location.mapUrl,
        venueType: formValues.location.venueType,
      } : undefined,
      transport: formValues.transport ? {
        mode: formValues.transport.mode,
        carrier: formValues.transport.carrier,
        bookingReference: formValues.transport.bookingReference,
        pickup_time: formValues.transport.pickup_time,
        pickup_location: formValues.transport.pickup_location,
        estimated_cost: formValues.transport.estimated_cost,
        notes: formValues.transport.notes,
      } : undefined,
      attachments: formValues.attachments,
    };
  };

  // Create mutation for adding a new activity
  const mutation = useMutation({
    mutationFn: async (formValues: ActivityFormValues) => {
      setIsSubmitting(true);

      try {
        // For now, we'll just add the activity to the local state
        // In a real app, we would call the API to save to the database
        const newActivity = convertFormToActivity(formValues);

        // Get the current itinerary from the cache
        const currentItinerary = queryClient.getQueryData(['itinerary', itineraryDate]) as any;

        if (currentItinerary) {
          // Update the cache with the new activity
          const updatedItinerary = {
            ...currentItinerary,
            date: currentItinerary.date || itineraryDate,
            title: currentItinerary.title || "Itinerary",
            summary: currentItinerary.summary || "",
            items: [...(currentItinerary.items || []), newActivity],
          };

          // Update the cache
          queryClient.setQueryData(['itinerary', itineraryDate], updatedItinerary);

          // Update the store
          setItinerary(updatedItinerary);
        }

        return newActivity;
      } catch (error) {
        console.error('Error creating activity:', error);
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: () => {
      // Invalidate the itinerary query to refetch the data
      queryClient.invalidateQueries({ queryKey: ['itinerary', itineraryDate] });

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      console.error('Error creating activity:', error);

      if (onError) {
        onError(error);
      }
    },
  });

  const handleSubmit = (formValues: ActivityFormValues) => {
    mutation.mutate(formValues);
  };

  return {
    handleSubmit,
    isSubmitting: isSubmitting || mutation.isPending,
    error: mutation.error,
  };
}
