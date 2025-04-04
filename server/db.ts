import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";

// Create postgres client
const queryClient = postgres(process.env.DATABASE_URL!);

// Create drizzle client
export const db = drizzle(queryClient, { schema });