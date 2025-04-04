import { users, type User, type InsertUser, bookings, type Booking, type InsertBooking } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { importBookingsFromGoogleSheets } from "./googleSheetsSync";

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
  
  // Data recovery method
  restoreBookingsFromGoogleSheets(): Promise<number>;
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
  
  /**
   * Restores booking data from Google Sheets if the database is empty
   * This is crucial for preserving booking data across redeployments
   * @returns The number of bookings restored from Google Sheets
   */
  async restoreBookingsFromGoogleSheets(): Promise<number> {
    try {
      // First, check if we have any bookings in the database
      const existingBookings = await this.getBookings();
      
      if (existingBookings.length > 0) {
        console.log(`Database already contains ${existingBookings.length} bookings. No need to restore from Google Sheets.`);
        return 0;
      }
      
      // If no bookings exist in the database, fetch them from Google Sheets
      console.log('No bookings found in database. Attempting to restore from Google Sheets...');
      const sheetsBookings = await importBookingsFromGoogleSheets();
      
      if (sheetsBookings.length === 0) {
        console.log('No bookings found in Google Sheets to restore.');
        return 0;
      }
      
      // Insert each booking from Google Sheets into the database
      let restoredCount = 0;
      for (const bookingData of sheetsBookings) {
        try {
          // Prepare the booking data for insertion
          const insertData: InsertBooking = {
            firstName: bookingData.firstName,
            lastName: bookingData.lastName,
            email: bookingData.email,
            phone: bookingData.phone,
            location: bookingData.location,
            vehicleType: bookingData.vehicleType,
            serviceCategory: bookingData.serviceCategory,
            mainService: bookingData.mainService,
            addOns: bookingData.addOns,
            totalPrice: bookingData.totalPrice,
            totalDuration: bookingData.totalDuration,
            appointmentDate: bookingData.appointmentDate,
            appointmentTime: bookingData.appointmentTime,
            conditionNotes: bookingData.conditionNotes,
            bookingReference: bookingData.bookingReference
          };
          
          // Insert the booking into the database
          await db.insert(bookings).values({
            ...insertData,
            status: bookingData.status || 'pending',
            createdAt: bookingData.createdAt,
          });
          
          restoredCount++;
        } catch (error) {
          console.error(`Error restoring booking ${bookingData.id || 'unknown'} from Google Sheets:`, error);
          // Continue with the next booking even if one fails
        }
      }
      
      console.log(`Successfully restored ${restoredCount} bookings from Google Sheets.`);
      return restoredCount;
    } catch (error) {
      console.error('Error restoring bookings from Google Sheets:', error);
      return 0;
    }
  }
}

export const storage = new DatabaseStorage();
