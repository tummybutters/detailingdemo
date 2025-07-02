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
import { 
  syncBookingsToGoogleSheets, 
  addBookingToGoogleSheets, 
  checkGoogleSheetsCredentials,
  addContactToGoogleSheets 
} from "./googleSheetsSync";
import { dbHealthCheck } from "./db/health";
import { GoogleGenAI } from "@google/genai";

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
  
  // Database health check endpoint
  app.get('/api/health/database', dbHealthCheck);
  
  // General health check endpoint
  app.get('/api/health', async (req, res) => {
    try {
      // Return basic health information
      return res.status(200).json({
        status: "ok",
        message: "API server is running",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        storageType: global.appStorage?.storageType || "memory",
        version: "1.0.0" // Update with actual version when available
      });
    } catch (error) {
      console.error("Health check error:", error);
      return res.status(500).json({
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

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
      
      // Sync the booking with Google Sheets (don't await, do this in the background)
      addBookingToGoogleSheets(booking)
        .then(success => {
          if (success) {
            console.log(`Booking ${booking.id} successfully added to Google Sheets`);
          } else {
            console.warn(`Failed to add booking ${booking.id} to Google Sheets`);
          }
        })
        .catch(error => {
          console.error(`Error syncing booking ${booking.id} to Google Sheets:`, error);
        });
      
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
      return res.status(200).json({
        success: true,
        bookings: bookings
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching bookings'
      });
    }
  });
  
  // Get all unsynced bookings for Google Sheets - route with proper error handling
  app.get('/api/bookings/unsynced', async (req, res) => {
    try {
      console.log('Fetching unsynced bookings');
      const unsyncedBookings = await storage.getUnsyncedBookings();
      console.log(`Found ${unsyncedBookings.length} unsynced bookings`);
      
      // Success response - always return an array (even if empty)
      return res.status(200).json({
        success: true,
        bookings: unsyncedBookings || []
      });
    } catch (error) {
      console.error('Error fetching unsynced bookings:', error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while fetching unsynced bookings'
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

      return res.status(200).json({
        success: true,
        booking
      });
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
  
  // Endpoint to manually sync all bookings to Google Sheets
  app.post('/api/sync-bookings-to-sheets', async (req, res) => {
    try {
      const result = await syncBookingsToGoogleSheets();
      if (result) {
        return res.status(200).json({
          success: true,
          message: 'All bookings successfully synced to Google Sheets'
        });
      } else {
        return res.status(500).json({
          success: false,
          message: 'Failed to sync bookings to Google Sheets'
        });
      }
    } catch (error: any) {
      console.error('Error syncing bookings to Google Sheets:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error syncing bookings to Google Sheets'
      });
    }
  });
  
  // Contact form endpoint (with Google Sheets integration)
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email, firstName, lastName, phone, subject, message } = req.body;
      
      if (!email || !firstName) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          message: 'Email and name are required'
        });
      }
      
      // Store the contact form submission locally
      const contactSubmission = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        email,
        firstName,
        lastName: lastName || '',
        phone: phone || '',
        subject: subject || '',
        message: message || ''
      };
      
      console.log('Contact form submission received:', contactSubmission);
      
      // Add the contact submission to Google Sheets (don't await, do this in background)
      addContactToGoogleSheets(contactSubmission)
        .then(success => {
          if (success) {
            console.log(`Contact submission successfully added to Google Sheets`);
          } else {
            console.warn(`Failed to add contact submission to Google Sheets`);
          }
        })
        .catch(error => {
          console.error(`Error adding contact submission to Google Sheets:`, error);
        });
      
      return res.status(200).json({
        success: true,
        message: 'Your message has been received successfully',
        contactSubmission
      });
    } catch (error: any) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({
        error: 'Failed to process your request',
        message: error.message || 'An unexpected error occurred'
      });
    }
  });

  // Mark a booking as synced to Google Sheets
  app.patch('/api/bookings/:id/mark-synced', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          message: 'Invalid booking ID'
        });
      }

      const booking = await storage.markBookingAsSynced(id);
      if (!booking) {
        return res.status(404).json({
          message: 'Booking not found'
        });
      }

      return res.status(200).json({
        message: 'Booking marked as synced successfully',
        booking
      });
    } catch (error) {
      console.error('Error marking booking as synced:', error);
      return res.status(500).json({
        message: 'An error occurred while marking the booking as synced'
      });
    }
  });

  // AI Chat endpoint for Ask Ian chatbot with Gemini AI
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, chatHistory } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({
          error: 'Message is required'
        });
      }

      // Initialize Gemini AI
      if (!process.env.GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY not found in environment variables');
        throw new Error("GEMINI_API_KEY environment variable must be set");
      }

      console.log('GEMINI_API_KEY found, initializing Gemini AI...');
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      // System prompt for Ian's AI personality
      const systemPrompt = `You are Hardy's Wash N' Wax's AI concierge. You speak on behalf of Ian—the 23-year-old founder, UC Davis grad, substitute teacher, and certified detailer based in California. Ian specializes in ceramic coatings, paint correction, and high-end mobile detailing. Your tone is sharp, dry, slightly witty, and never bubbly or over-friendly. You never use emojis, exclamation marks, or filler phrases. Every reply must be no more than four short, high-information sentences.

Always highlight: we're fully insured, IDA certified, and offer 60-second online booking. We serve both Davis, CA and a wide range of Southern California areas—Newport, Irvine, Tustin, San Clemente, Huntington Beach, and more inland cities. We accept Zelle, card, and cash. There are no cancellation fees unless it's same-day.

We detail all vehicles: sedans, SUVs, trucks, exotics, boats, RVs, and 18-wheelers. We do require customer-supplied water and power at the location. If someone seems unsure, say: "It depends what kind of wash you're looking for—we're not always the right fit, but we might be." Emphasize we offer customizable subscriptions and many long-time clients book a week in advance.

When asked for results, always respond with: "You can see our latest work on Instagram @hardyswashnwaxllc." If asked for a quote, give the correct price range and recommend they book online or call (949) 734-0201. If a dry joke fits, use it (e.g., "We'll clean everything except your browser history."). Only mention add-ons (e.g. spray wax, trim restore, stain removal) if asked.

SERVICE SUMMARIES:
- Maintenance Detail: $149–$199, 1.5–2.5 hrs — Light vacuum, dash wipe-down, windows, wheel clean, exterior wash, tire shine.
- Interior Detail: $159–$229, 2–4 hrs — Deep vacuum, cabin restoration, plastics cleaned, leather conditioned.
- Exterior Detail: $99–$159, 1.5–3 hrs — Iron decon, foam/contact wash, towel dry, showroom finish.
- Full Interior + Exterior: $279–$379, 3–5 hrs — Full interior refresh + full exterior treatment.
- Ceramic Coating (7–10 years): $549–$849, 5–8 hrs — Paint correction + long-term ceramic protection.

PERSONALITY:
- Speak like a professional who knows detailing inside and out.
- Never break character or mention being an AI.
- If asked why we're better: "California has great detailers. What sets us apart is consistent results, transparent service, and satisfied clients—just check our page."

GUARDRAILS:
- If a prompt is off-topic, abusive, or inappropriate, respond: "I'm here to talk car detailing, not the mysteries of the universe. Let's stay on task."
- If asked for illegal, NSFW, or personal topics, reply: "No can do. I clean cars, not criminal records."
- Never answer questions about politics, relationships, health, or religion.

Always stay focused on helping the user understand our services and feel confident booking.`;

      // Build conversation context with chat history
      let conversationContext = systemPrompt + "\n\nConversation History:\n";
      
      if (chatHistory && Array.isArray(chatHistory)) {
        chatHistory.forEach((msg: any) => {
          conversationContext += `${msg.role === 'user' ? 'Customer' : 'Ian'}: ${msg.content}\n`;
        });
      }
      
      conversationContext += `Customer: ${message}\nIan:`;

      // Generate response using Gemini
      console.log('Calling Gemini API with context length:', conversationContext.length);
      
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: conversationContext,
      });

      console.log('Gemini API response received:', response.text?.substring(0, 100));
      const aiResponse = response.text || "I'm offline right now. Call us at (949) 734-0201.";

      return res.json({
        response: aiResponse,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Chat API error:', error);
      
      // Fallback to basic responses if AI fails
      const fallbackResponses = {
        cost: "Maintenance Detail runs $149-$199, Interior Detail $159-$229, Exterior Detail $99-$159. Full service is $279-$379. Ceramic coating with paint correction starts at $549.",
        pricing: "Maintenance Detail runs $149-$199, Interior Detail $159-$229, Exterior Detail $99-$159. Full service is $279-$379. Ceramic coating with paint correction starts at $549.",
        area: "We serve Davis, Woodland, Dixon, Winters, plus Newport, Irvine, Tustin, San Clemente, Huntington Beach. Basically Northern and Southern California mobile service.",
        book: "Book online in 60 seconds or call (949) 734-0201. We're fully insured, IDA certified. No cancellation fees unless same-day."
      };

      const { message } = req.body;
      const lowerMessage = message?.toLowerCase() || '';
      
      let fallbackResponse = "Ian here from Hardy's Wash N' Wax. UC Davis grad, certified detailer, fully insured. What can I help you with.";
      
      for (const [keyword, answer] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(keyword)) {
          fallbackResponse = answer;
          break;
        }
      }

      return res.json({
        response: fallbackResponse,
        timestamp: Date.now()
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
