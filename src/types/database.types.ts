// Database types for the World Cup Itinerary application
// Generated to match the Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      trips: {
        Row: {
          id: string
          user_id: string
          title: string
          destination: string
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          destination: string
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          destination?: string
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      itinerary_days: {
        Row: {
          id: string
          trip_id: string
          date: string
          title: string
          summary: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          date: string
          title: string
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          date?: string
          title?: string
          summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_trip_id_fkey"
            columns: ["trip_id"]
            referencedRelation: "trips"
            referencedColumns: ["id"]
          }
        ]
      }
      activities: {
        Row: {
          id: string
          itinerary_day_id: string
          type: "transport" | "match" | "meal" | "hotel" | "activity"
          title: string
          time: string
          duration: string | null
          notes: string | null
          status: "pending" | "confirmed" | "completed"
          important: boolean | null
          requires_confirmation: boolean | null
          is_group_event: boolean | null
          sequence_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          itinerary_day_id: string
          type: "transport" | "match" | "meal" | "hotel" | "activity"
          title: string
          time: string
          duration?: string | null
          notes?: string | null
          status?: "pending" | "confirmed" | "completed"
          important?: boolean | null
          requires_confirmation?: boolean | null
          is_group_event?: boolean | null
          sequence_order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          itinerary_day_id?: string
          type?: "transport" | "match" | "meal" | "hotel" | "activity"
          title?: string
          time?: string
          duration?: string | null
          notes?: string | null
          status?: "pending" | "confirmed" | "completed"
          important?: boolean | null
          requires_confirmation?: boolean | null
          is_group_event?: boolean | null
          sequence_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_itinerary_day_id_fkey"
            columns: ["itinerary_day_id"]
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          }
        ]
      }
      // Additional tables would follow the same pattern
    }
    Functions: {
      get_itinerary_day: {
        Args: {
          day_id: string
        }
        Returns: Json
      }
      user_owns_activity: {
        Args: {
          activity_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      activity_type: "transport" | "match" | "meal" | "hotel" | "activity"
      activity_status: "pending" | "confirmed" | "completed"
    }
  }
}

// Helper types for better type safety in the application
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Trip = Database['public']['Tables']['trips']['Row']
export type ItineraryDay = Database['public']['Tables']['itinerary_days']['Row']
export type Activity = Database['public']['Tables']['activities']['Row']

// Type for the complete itinerary day with all related data
export interface CompleteItineraryDay {
  id: string
  date: string
  title: string
  summary: string | null
  weather?: {
    temperature: number
    condition: string
    icon: string
  }
  reminders?: string[]
  docs?: string[]
  items: CompleteActivity[]
}

export interface CompleteActivity {
  id: string
  type: "transport" | "match" | "meal" | "hotel" | "activity"
  title: string
  time: string
  duration?: string
  notes?: string
  status: "pending" | "confirmed" | "completed"
  important?: boolean
  requires_confirmation?: boolean
  is_group_event?: boolean
  location?: {
    name: string
    address?: string
    lat: number
    lng: number
    contact?: string
    confirmation_number?: string
    website?: string
    map_url?: string
    venue_type?: string
  }
  transport?: {
    mode: string
    carrier?: string
    booking_reference?: string
    pickup_time?: string
    pickup_location?: string
    estimated_cost?: number
    notes?: string
    seat_map?: Record<string, string>
    shared_with?: string[]
  }
  attachments?: string[]
}
