import { z } from "zod";

// User Schema
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = InsertUser & { id: number };

// Booking Schema
export const insertBookingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  vehicleType: z.string(),
  serviceCategory: z.string(),
  mainService: z.string(),
  addOns: z.string().nullable().optional(),
  totalPrice: z.string(),
  totalDuration: z.string(),
  appointmentDate: z.string(),
  appointmentTime: z.string(),
  conditionNotes: z.string().nullable().optional(),
  bookingReference: z.string().nullable().optional(),
});

export const bookingFormSchema = insertBookingSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(5, "Please provide a complete address"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  serviceCategory: z.string().min(1, "Service category is required"),
  mainService: z.string().min(1, "Please select a service package"),
  totalPrice: z.string().min(1, "Total price is required"),
  totalDuration: z.string().min(1, "Total duration is required"),
  appointmentDate: z.string().min(1, "Date is required"),
  appointmentTime: z.string().min(1, "Time is required"),
  bookingReference: z.string().optional(),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = InsertBooking & {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  status: string | null;
  syncedToSheets: boolean | null;
};

// Contacts Schema
export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  subject: z.string().nullable().optional(),
  message: z.string(),
});

export const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = InsertContact & {
  id: number;
  createdAt: Date | null;
  syncedToSheets: boolean | null;
};

// Mock objects for compatibility if needed (though we removed usage)
export const users = {};
export const bookings = {};
export const contacts = {};
