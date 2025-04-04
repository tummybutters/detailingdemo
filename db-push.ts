// Script to push database schema changes to the database
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "./shared/schema";

// Get database connection string from environment variables
const dbConnectionString = process.env.DATABASE_URL;

async function pushSchema() {
  if (!dbConnectionString) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  // Connect to the database
  console.log("Connecting to the database...");
  const queryClient = postgres(dbConnectionString);

  // Create drizzle instance
  const db = drizzle(queryClient, { schema });

  try {
    // Push the schema
    console.log("Pushing schema to the database...");
    
    // Use the migrate method from drizzle-orm
    await migrate(db, { migrationsFolder: "./migrations" });
    
    console.log("Schema pushed successfully!");
  } catch (error) {
    console.error("Error pushing schema to the database:", error);
    process.exit(1);
  } finally {
    // Close the connection
    await queryClient.end();
  }
}

// Run the schema push
pushSchema();