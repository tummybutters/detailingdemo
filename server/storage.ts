import { users, type User, type InsertUser, bookings, type Booking, type InsertBooking } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results.length > 0 ? results[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results.length > 0 ? results[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const inserted = await db.insert(users).values(insertUser).returning();
    return inserted[0];
  }
  
  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const now = new Date();
    
    // Generate a booking reference if not provided
    const bookingReference = insertBooking.bookingReference || 
      `HWW-${now.getTime().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    
    // Handle null values for optional fields
    const addOns = insertBooking.addOns || null;
    const conditionNotes = insertBooking.conditionNotes || null;
    
    const bookingData = {
      ...insertBooking,
      addOns,
      conditionNotes,
      bookingReference,
      status: "pending"
    };
    
    const inserted = await db.insert(bookings).values(bookingData).returning();
    return inserted[0];
  }
  
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    const results = await db.select().from(bookings).where(eq(bookings.id, id));
    return results.length > 0 ? results[0] : undefined;
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const updated = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    
    return updated.length > 0 ? updated[0] : undefined;
  }
}

export const storage = new DatabaseStorage();
