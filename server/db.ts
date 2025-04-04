import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

// Create PostgreSQL connection
const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString, { max: 10 });

// Initialize Drizzle with our schema
export const db = drizzle(client, { schema });

// Export helper for migrations (to be used with drizzle-kit)
export const migrationClient = client;