import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Booking Schema
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  // Customer details
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  
  // Location details
  location: text("location").notNull(),
  
  // Vehicle details
  vehicleType: text("vehicle_type").notNull(),
  
  // Service details
  serviceCategory: text("service_category").notNull(),
  mainService: text("main_service").notNull(),
  addOns: text("add_ons"),
  totalPrice: text("total_price").notNull(),
  totalDuration: text("total_duration").notNull(),
  
  // Appointment details
  appointmentDate: text("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),
  
  // Additional information
  conditionNotes: text("condition_notes"),
  
  // System fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  status: text("status").default("pending"),
  bookingReference: text("booking_reference"),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
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
export type Booking = typeof bookings.$inferSelect;
