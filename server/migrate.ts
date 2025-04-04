import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, migrationClient } from "./db";
import { log } from "./vite";

/**
 * Push the schema to the database
 * This is a simple migration strategy for development and small production apps
 */
export async function migrateDatabase(): Promise<boolean> {
  try {
    log("Running database schema push...", "database");
    
    // Use the SQL builder to create tables directly instead of using migrate
    // Create users table if not exists
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);
    
    // Create bookings table if not exists
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        location TEXT NOT NULL,
        vehicle_type TEXT NOT NULL,
        service_category TEXT NOT NULL,
        main_service TEXT NOT NULL,
        add_ons TEXT,
        total_price TEXT NOT NULL,
        total_duration TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        condition_notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        status TEXT DEFAULT 'pending',
        booking_reference TEXT
      )
    `);
    
    log("Database schema push completed successfully", "database");
    return true;
  } catch (error) {
    console.error("Database schema push failed:", error);
    return false;
  }
}

/**
 * Check if database connection is working
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Try to connect and run a simple query
    const result = await db.execute(sql`SELECT 1 as connected`);
    if (result?.[0]?.connected === 1) {
      log("Database connection successful", "database");
      return true;
    }
    log("Database connection check failed", "database");
    return false;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}

// Add SQL import
import { sql } from "drizzle-orm";

/**
 * Clean up database connection when shutting down
 */
export async function closeDatabaseConnection(): Promise<void> {
  try {
    await migrationClient.end();
    log("Database connection closed", "database");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
}