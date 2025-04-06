import { users, type User, type InsertUser, bookings, type Booking, type InsertBooking } from "@shared/schema";
import { db } from "./index";
import { eq } from "drizzle-orm";
import { IStorage } from "../storage";
import { dbOperation } from "./operations";

/**
 * Database storage implementation using Drizzle ORM
 */
export class DatabaseStorage implements IStorage {
  /**
   * Get a user by ID
   */
  async getUser(id: number): Promise<User | undefined> {
    return await dbOperation("getUser", async (db) => {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || undefined;
    });
  }

  /**
   * Get a user by username
   */
  async getUserByUsername(username: string): Promise<User | undefined> {
    return await dbOperation("getUserByUsername", async (db) => {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user || undefined;
    });
  }

  /**
   * Create a new user
   */
  async createUser(insertUser: InsertUser): Promise<User> {
    return await dbOperation("createUser", async (db) => {
      const [user] = await db
        .insert(users)
        .values(insertUser)
        .returning();
      return user;
    });
  }

  /**
   * Create a new booking
   */
  async createBooking(booking: InsertBooking): Promise<Booking> {
    return await dbOperation("createBooking", async (db) => {
      const now = new Date();
      
      // Generate a booking reference if not provided
      const bookingReference = booking.bookingReference || 
        `HWW-${now.getTime().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
      
      const [newBooking] = await db
        .insert(bookings)
        .values({
          ...booking,
          status: "pending",
          createdAt: now,
          updatedAt: now,
          bookingReference
        })
        .returning();
      
      return newBooking;
    });
  }

  /**
   * Get all bookings
   */
  async getBookings(): Promise<Booking[]> {
    return await dbOperation("getBookings", async (db) => {
      return await db
        .select()
        .from(bookings)
        .orderBy(bookings.createdAt);
    });
  }

  /**
   * Get a booking by ID
   */
  async getBooking(id: number): Promise<Booking | undefined> {
    return await dbOperation("getBooking", async (db) => {
      const [booking] = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, id));
      
      return booking || undefined;
    });
  }

  /**
   * Update booking status
   */
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    return await dbOperation("updateBookingStatus", async (db) => {
      const now = new Date();
      
      const [updatedBooking] = await db
        .update(bookings)
        .set({ 
          status,
          updatedAt: now
        })
        .where(eq(bookings.id, id))
        .returning();
      
      return updatedBooking || undefined;
    });
  }
}

export const dbStorage = new DatabaseStorage();