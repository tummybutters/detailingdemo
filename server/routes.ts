import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { bookingFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { 
  prepareEmployeeEmailNotification, 
  prepareCustomerEmailConfirmation, 
  sendEmailNotification 
} from "./emailService";

// Type for enhanced booking data
interface EnhancedBookingData {
  reference?: string;
  status?: string;
  timestamp?: string;
  location?: string;
  coordinates?: [number, number];
  vehicleType?: string;
  vehicleTypeName?: string;
  vehicleCondition?: string;
  serviceCategory?: string;
  serviceCategoryName?: string;
  mainService?: string;
  mainServiceName?: string;
  mainServicePrice?: string;
  mainServiceDuration?: string;
  addOns?: string;
  addOnDetailsList?: Array<{id: string; name?: string; price?: string}>;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentTimeFormatted?: string;
  totalPrice?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  submittedFrom?: string;
  userAgent?: string;
  [key: string]: any; // Allow for additional properties
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Booking endpoints
  app.post('/api/bookings', async (req, res) => {
    try {
      // Extract the comprehensive tracking data if it exists
      const { bookingData, ...formData } = req.body;
      
      // Validate the core booking data
      const validatedData = bookingFormSchema.parse(formData);
      
      // Create the booking
      const booking = await storage.createBooking(validatedData);
      
      // Log comprehensive data if available
      if (bookingData) {
        console.log('===== COMPREHENSIVE BOOKING DATA =====');
        console.log(JSON.stringify(bookingData, null, 2));
        console.log('=====================================');
      }
      
      // Prepare and send employee notification email with the enhanced data
      const employeeEmailData = prepareEmployeeEmailNotification(booking);
      // If we have comprehensive data, add it to the email for the employees
      if (bookingData) {
        employeeEmailData.enhancedData = bookingData as EnhancedBookingData;
      }
      await sendEmailNotification(employeeEmailData);
      
      // Prepare and send customer confirmation email (without the enhanced data)
      const customerEmailData = prepareCustomerEmailConfirmation(booking);
      await sendEmailNotification(customerEmailData);
      
      // Log basic booking info
      console.log(`New booking (${booking.bookingReference}) created for ${booking.firstName} ${booking.lastName}`);
      console.log(`Vehicle: ${booking.vehicleType}, Service: ${booking.mainService}`);
      console.log(`Appointment: ${booking.appointmentDate} at ${booking.appointmentTime}`);
      console.log(`Location: ${booking.location}`);
      
      // Return the created booking
      return res.status(201).json({
        message: 'Booking created successfully',
        booking
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: 'Validation error',
          errors: validationError.message
        });
      }
      
      // Handle other errors
      console.error('Error creating booking:', error);
      return res.status(500).json({
        message: 'An error occurred while creating the booking'
      });
    }
  });

  // Get all bookings
  app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      return res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({
        message: 'An error occurred while fetching bookings'
      });
    }
  });

  // Get a single booking
  app.get('/api/bookings/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          message: 'Invalid booking ID'
        });
      }

      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({
          message: 'Booking not found'
        });
      }

      return res.status(200).json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      return res.status(500).json({
        message: 'An error occurred while fetching the booking'
      });
    }
  });

  // Update booking status
  app.patch('/api/bookings/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          message: 'Invalid booking ID'
        });
      }

      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({
          message: 'Invalid status'
        });
      }

      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({
          message: 'Booking not found'
        });
      }

      return res.status(200).json({
        message: 'Booking status updated successfully',
        booking
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      return res.status(500).json({
        message: 'An error occurred while updating the booking status'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
