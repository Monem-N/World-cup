import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useItineraryStoreActions } from "../../../stores/itinerary";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

import type { Activity } from "~/lib/types";

interface DeleteConfirmationDialogProps {
  activity: Activity;
  itineraryDate: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeleteConfirmationDialog({
  activity,
  itineraryDate,
  trigger,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const queryClient = useQueryClient();
  const { setItinerary } = useItineraryStoreActions();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      // Get the current itinerary from the cache
      const currentItinerary = queryClient.getQueryData(['itinerary', itineraryDate]) as any;

      if (currentItinerary) {
        // Filter out the activity to delete
        const updatedItems = currentItinerary.items?.filter(
          (item: Activity) => item.id !== activity.id
        ) || [];

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
      console.error('Error deleting activity:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Use controlled or uncontrolled open state
  const dialogOpen = open !== undefined ? open : isOpen;
  const setDialogOpen = onOpenChange || setIsOpen;

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {t('itinerary.deleteActivityConfirmation',
              'This will permanently delete the activity "{title}". This action cannot be undone.',
              { title: activity.title }
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
