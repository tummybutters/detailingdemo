CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"location" text NOT NULL,
	"vehicle_type" text NOT NULL,
	"service_category" text NOT NULL,
	"main_service" text NOT NULL,
	"add_ons" text,
	"total_price" text NOT NULL,
	"total_duration" text NOT NULL,
	"appointment_date" text NOT NULL,
	"appointment_time" text NOT NULL,
	"condition_notes" text,
	"created_at" timestamp DEFAULT now(),
	"status" text DEFAULT 'pending',
	"booking_reference" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
