import { create } from 'zustand';
import type { DayProgram, Activity, ActivityStatus } from './itinerary.types'; // Import types
 // Import types

// Define the internal store structure including actions
interface InternalItineraryState {
  currentItinerary: DayProgram | null;
  actions: {
    setItinerary: (data: DayProgram) => void;
    updateActivityStatus: (activityId: string, status: ActivityStatus) => void;
    // ... other actions
  }
}

const useInternalItineraryStore = create<InternalItineraryState>((set) => ({
  currentItinerary: null,
  actions: {
    setItinerary: (data) => set({ currentItinerary: data }),
    updateActivityStatus: (activityId, status) =>
      set(state => ({
        currentItinerary: state.currentItinerary ? {
          ...state.currentItinerary,
          items: state.currentItinerary.items.map((item: Activity) => // Use Activity type here
            item.id === activityId ? { ...item, status } : item
          )
        } : null
      }))
  }
}));

// Export a hook to select state (use with selectors for performance)
export const useItineraryStore = <T,>(selector: (state: InternalItineraryState) => T) =>
  useInternalItineraryStore(selector);

// Export a hook specifically for actions
export const useItineraryStoreActions = () => useInternalItineraryStore(state => state.actions);

// Optionally, a hook to get the whole state (use cautiously)
export const useItineraryFullState = () => useInternalItineraryStore(state => state);
