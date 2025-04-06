import { Request, Response } from "express";
import { db, pool } from "./index";
import { sql } from "drizzle-orm";

/**
 * Health check for the database
 * Returns status information about the database connection
 */
export async function dbHealthCheck(req: Request, res: Response) {
  try {
    // Check database connection with a simple query
    const startTime = Date.now();
    await db.execute(sql`SELECT 1 as health_check`);
    const responseTime = Date.now() - startTime;
    
    // Get pool status
    const poolStatus = {
      totalCount: pool.totalCount,
      idleCount: pool.idleCount,
      waitingCount: pool.waitingCount,
    };
    
    // Return success with connection info
    return res.status(200).json({
      status: "ok",
      message: "Database connection successful",
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      poolInfo: poolStatus,
      result: "Query executed successfully",
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    
    // Return error with details
    return res.status(503).json({
      status: "error",
      message: "Database connection failed",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}