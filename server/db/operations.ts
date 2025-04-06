import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import { sql } from "drizzle-orm";

type DB = NodePgDatabase<typeof schema>;

/**
 * Check if the database is available
 * @returns Promise that resolves to true if database is available, false otherwise
 */
export async function checkDatabaseAvailability(): Promise<boolean> {
  try {
    // Import dynamically to avoid circular dependencies
    const { db } = await import("./index");
    
    // Try a simple query to check if DB is responsive
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error("Database availability check failed:", error);
    return false;
  }
}

/**
 * Generic database operation wrapper with logging and error handling
 * @param operationName Name of the operation for logging
 * @param operation The database operation to execute
 * @param fallbackFn Optional fallback function to run if database is unavailable
 */
export async function dbOperation<T>(
  operationName: string,
  operation: (db: DB) => Promise<T>,
  fallbackFn?: () => Promise<T>
): Promise<T> {
  try {
    // Import dynamically to avoid circular dependencies
    const { db } = await import("./index");
    
    // Log operation start for debugging
    console.log(`Starting DB operation: ${operationName}`);
    
    // Execute the operation
    const result = await operation(db);
    
    // Log operation success
    console.log(`DB operation completed: ${operationName}`);
    
    return result;
  } catch (error) {
    // Log the error
    console.error(`DB operation failed: ${operationName}`, error);
    
    // If fallback is provided, use it
    if (fallbackFn) {
      console.log(`Using fallback for operation: ${operationName}`);
      return await fallbackFn();
    }
    
    // Re-throw the error if no fallback
    throw error;
  }
}

/**
 * Execute a database transaction
 * @param operationName Name of the operation for logging
 * @param transaction The transaction function to execute
 * @param fallbackFn Optional fallback function to run if database is unavailable
 */
export async function dbTransaction<T>(
  operationName: string,
  transaction: (db: DB) => Promise<T>,
  fallbackFn?: () => Promise<T>
): Promise<T> {
  try {
    // Import dynamically to avoid circular dependencies
    const { pool } = await import("./index");
    
    // Log transaction start
    console.log(`Starting DB transaction: ${operationName}`);
    
    // Begin a new transaction
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Create a drizzle instance with the transaction client
      const transactionDb = drizzle(client, { schema });
      
      // Execute the transaction
      let result: T;
      try {
        result = await transaction(transactionDb);
        await client.query('COMMIT');
      } catch (error) {
        // Rollback on error
        await client.query('ROLLBACK');
        throw error;
      }
      
      // Log transaction success
      console.log(`DB transaction completed: ${operationName}`);
      
      return result;
    } finally {
      // Always release the client back to the pool
      client.release();
    }
  } catch (error) {
    // Log the error
    console.error(`DB transaction failed: ${operationName}`, error);
    
    // If fallback is provided, use it
    if (fallbackFn) {
      console.log(`Using fallback for transaction: ${operationName}`);
      return await fallbackFn();
    }
    
    // Re-throw the error if no fallback
    throw error;
  }
}