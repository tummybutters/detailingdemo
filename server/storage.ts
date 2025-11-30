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

  // Google Sheets sync methods
  markBookingAsSynced(id: number): Promise<Booking | undefined>;
  getUnsyncedBookings(): Promise<Booking[]>;
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
      updatedAt: new Date(),
      status: "pending",
      bookingReference: `HWW-${Date.now().toString().slice(-6)}-001`,
      syncedToSheets: true // Already synced
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
      updatedAt: new Date(Date.now() - 43200000), // 12 hours ago
      status: "confirmed",
      bookingReference: `HWW-${Date.now().toString().slice(-6)}-002`,
      syncedToSheets: true // Already synced
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
      updatedAt: now,
      status: "pending",
      bookingReference,
      syncedToSheets: false // New booking is not synced yet
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

    const updatedBooking = {
      ...booking,
      status,
      updatedAt: new Date()
    };
    this.bookingsStore.set(id, updatedBooking);
    return updatedBooking;
  }

  async markBookingAsSynced(id: number): Promise<Booking | undefined> {
    const booking = this.bookingsStore.get(id);
    if (!booking) return undefined;

    const updatedBooking = {
      ...booking,
      syncedToSheets: true,
      updatedAt: new Date()
    };
    this.bookingsStore.set(id, updatedBooking);
    return updatedBooking;
  }

  async getUnsyncedBookings(): Promise<Booking[]> {
    return Array.from(this.bookingsStore.values())
      .filter(booking => !booking.syncedToSheets);
  }
}

// DB Storage removed for demo
// import { dbStorage } from "./db/storage";
// import { checkDatabaseAvailability } from "./db/operations";

// Define a namespace for our global variables to avoid polluting global scope
declare global {
  var appStorage: {
    selectedStorage: IStorage | null;
    storageType: 'memory' | 'database';
  };
}

// Initialize the global namespace if not already set
global.appStorage = global.appStorage || {
  selectedStorage: null,
  storageType: 'memory'
};

// Initialize storage based on database availability
// This will be called when the server starts
async function initializeStorage() {
  console.log("Using in-memory storage for demo.");
  global.appStorage.selectedStorage = new MemStorage();
  global.appStorage.storageType = 'memory';
}

// Initialize storage
initializeStorage()
  .catch(err => {
    console.error("Failed to initialize storage:", err);
  });

// Create MemStorage instance to use initially and as fallback
const memStorage = new MemStorage();

// Storage proxy to dynamically route to the selected storage implementation
export const storage: IStorage = {
  // User functions
  getUser: async (id: number) => {
    return (global.appStorage.selectedStorage || memStorage).getUser(id);
  },

  getUserByUsername: async (username: string) => {
    return (global.appStorage.selectedStorage || memStorage).getUserByUsername(username);
  },

  createUser: async (user: InsertUser) => {
    return (global.appStorage.selectedStorage || memStorage).createUser(user);
  },

  // Booking functions
  createBooking: async (booking: InsertBooking) => {
    return (global.appStorage.selectedStorage || memStorage).createBooking(booking);
  },

  getBookings: async () => {
    return (global.appStorage.selectedStorage || memStorage).getBookings();
  },

  getBooking: async (id: number) => {
    return (global.appStorage.selectedStorage || memStorage).getBooking(id);
  },

  updateBookingStatus: async (id: number, status: string) => {
    return (global.appStorage.selectedStorage || memStorage).updateBookingStatus(id, status);
  },

  // Google Sheets sync methods
  markBookingAsSynced: async (id: number) => {
    return (global.appStorage.selectedStorage || memStorage).markBookingAsSynced(id);
  },

  getUnsyncedBookings: async () => {
    return (global.appStorage.selectedStorage || memStorage).getUnsyncedBookings();
  }
};
