import { users, type User, type InsertUser, bookings, type Booking, type InsertBooking } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookingsStore: Map<number, Booking>;
  currentUserId: number;
  currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.bookingsStore = new Map();
    this.currentUserId = 1;
    this.currentBookingId = 1;
    
    // Add a test booking
    this.addTestBooking();
  }
  
  // Helper method to add test booking data
  private addTestBooking() {
    // First test booking - pending
    const testBooking1: Booking = {
      id: this.currentBookingId++,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "123 Main St, Davis, CA 95616",
      vehicleType: "SUV",
      serviceCategory: "Premium",
      mainService: "Luxury Detail",
      addOns: "Interior Sanitization",
      totalPrice: "249.99",
      totalDuration: "180",
      appointmentDate: "2025-04-15",
      appointmentTime: "10:00 AM",
      conditionNotes: "Minor scratches on driver side door",
      createdAt: new Date(),
      status: "pending",
      bookingReference: `HWW-${Date.now().toString().slice(-6)}-001`
    };
    
    // Second test booking - confirmed
    const testBooking2: Booking = {
      id: this.currentBookingId++,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "(555) 987-6543",
      location: "456 Oak Ave, Irvine, CA 92617",
      vehicleType: "Sedan",
      serviceCategory: "Basic",
      mainService: "Express Detail",
      addOns: "Tire Shine",
      totalPrice: "149.99",
      totalDuration: "90",
      appointmentDate: "2025-04-10",
      appointmentTime: "2:30 PM",
      conditionNotes: "Pet hair throughout interior",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      status: "confirmed",
      bookingReference: `HWW-${Date.now().toString().slice(-6)}-002`
    };
    
    this.bookingsStore.set(testBooking1.id, testBooking1);
    this.bookingsStore.set(testBooking2.id, testBooking2);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const now = new Date();
    
    // Generate a booking reference if not provided
    const bookingReference = insertBooking.bookingReference || 
      `HWW-${now.getTime().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    
    // Handle null values for optional fields
    const addOns = insertBooking.addOns || null;
    const conditionNotes = insertBooking.conditionNotes || null;
    
    const booking: Booking = { 
      ...insertBooking,
      addOns,
      conditionNotes, 
      id, 
      createdAt: now, 
      status: "pending",
      bookingReference
    };
    
    this.bookingsStore.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookingsStore.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookingsStore.get(id);
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookingsStore.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookingsStore.set(id, updatedBooking);
    return updatedBooking;
  }
}

export const storage = new MemStorage();
