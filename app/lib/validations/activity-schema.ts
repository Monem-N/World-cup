import { z } from "zod";

export const activityFormSchema = z.object({
  type: z.enum(["transport", "match", "meal", "hotel", "activity"], {
    required_error: "Activity type is required",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Time must be in 24-hour format (HH:MM).",
  }),
  duration: z.string().optional(),
  status: z.enum(["pending", "confirmed", "completed"], {
    required_error: "Status is required",
  }).default("pending"),
  important: z.boolean().default(false),
  requiresConfirmation: z.boolean().default(false),
  isGroupEvent: z.boolean().default(false),
  notes: z.string().optional(),
  
  // Location fields
  location: z.object({
    name: z.string().min(2, {
      message: "Location name must be at least 2 characters.",
    }),
    address: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    contact: z.string().optional(),
    confirmationNumber: z.string().optional(),
    website: z.string().optional(),
    mapUrl: z.string().optional(),
    venueType: z.string().optional(),
  }).optional(),
  
  // Transport fields
  transport: z.object({
    mode: z.string().min(2, {
      message: "Transport mode must be at least 2 characters.",
    }),
    carrier: z.string().optional(),
    bookingReference: z.string().optional(),
    pickup_time: z.string().optional(),
    pickup_location: z.string().optional(),
    estimated_cost: z.number().optional(),
    notes: z.string().optional(),
  }).optional(),
  
  // Attachments
  attachments: z.array(z.string()).optional(),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;
