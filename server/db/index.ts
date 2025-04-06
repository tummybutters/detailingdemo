import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

// Get database connection string from environment
const connectionString = process.env.DATABASE_URL;

// Create a connection pool
export const pool = new pg.Pool({ 
  connectionString,
  // Connection pool configuration for optimal performance
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000 // Return an error after 2 seconds if connection couldn't be established
});

// Create Drizzle ORM instance with the connection pool
export const db = drizzle(pool, { schema });

// Set up graceful shutdown to close database connections
process.on('SIGINT', () => {
  console.log('Closing database pool connections');
  pool.end().then(() => {
    console.log('Database pool successfully closed');
    process.exit(0);
  }).catch(err => {
    console.error('Error closing database pool', err);
    process.exit(1);
  });
});