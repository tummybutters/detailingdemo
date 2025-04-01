import { Booking } from '@shared/schema';

/**
 * Formats a booking for email content
 * @param booking The booking data to format
 * @returns HTML string with formatted booking data
 */
export function formatBookingForEmail(booking: Booking): string {
  // Create a booking reference if not already set
  const bookingRef = booking.bookingReference || `HWW-${booking.id}-${Date.now().toString().substring(6)}`;
  
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #EE432C; color: white; padding: 15px; text-align: center; }
          .booking-details { background-color: #f9f9f9; padding: 20px; border-radius: 5px; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: bold; color: #EE432C; margin-bottom: 5px; }
          .item { margin-bottom: 10px; }
          .label { font-weight: bold; }
          .price { font-size: 1.2em; color: #EE432C; font-weight: bold; }
          .footer { margin-top: 30px; font-size: 0.8em; color: #777; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Booking Confirmation</h1>
            <h2>Booking #${bookingRef}</h2>
          </div>
          
          <div class="booking-details">
            <div class="section">
              <div class="section-title">Customer Information</div>
              <div class="item"><span class="label">Name:</span> ${booking.firstName} ${booking.lastName}</div>
              <div class="item"><span class="label">Email:</span> ${booking.email}</div>
              <div class="item"><span class="label">Phone:</span> ${booking.phone}</div>
            </div>
            
            <div class="section">
              <div class="section-title">Appointment Details</div>
              <div class="item"><span class="label">Date:</span> ${booking.appointmentDate}</div>
              <div class="item"><span class="label">Time:</span> ${booking.appointmentTime}</div>
              <div class="item"><span class="label">Location:</span> ${booking.location}</div>
            </div>
            
            <div class="section">
              <div class="section-title">Service Information</div>
              <div class="item"><span class="label">Vehicle Type:</span> ${booking.vehicleType}</div>
              <div class="item"><span class="label">Service Category:</span> ${booking.serviceCategory}</div>
              <div class="item"><span class="label">Selected Package:</span> ${booking.mainService}</div>
              ${booking.addOns ? `<div class="item"><span class="label">Add-ons:</span> ${booking.addOns}</div>` : ''}
              <div class="item"><span class="label">Estimated Duration:</span> ${booking.totalDuration}</div>
              ${booking.conditionNotes ? `<div class="item"><span class="label">Vehicle Condition Notes:</span> ${booking.conditionNotes}</div>` : ''}
            </div>
            
            <div class="section">
              <div class="item"><span class="label">Total Price:</span> <span class="price">${booking.totalPrice}</span></div>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from Hardys Wash N' Wax. Please review this booking and contact the customer to confirm details.</p>
            <p>Booking Time: ${new Date(booking.createdAt || Date.now()).toLocaleString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Formats a booking as plain text for email content 
 * Useful for email clients that don't support HTML
 */
export function formatBookingForPlainTextEmail(booking: Booking): string {
  const bookingRef = booking.bookingReference || `HWW-${booking.id}-${Date.now().toString().substring(6)}`;
  
  return `
HARDYS WASH N' WAX - NEW BOOKING CONFIRMATION
Booking #${bookingRef}

CUSTOMER INFORMATION
-------------------
Name: ${booking.firstName} ${booking.lastName}
Email: ${booking.email}
Phone: ${booking.phone}

APPOINTMENT DETAILS
------------------
Date: ${booking.appointmentDate}
Time: ${booking.appointmentTime}
Location: ${booking.location}

SERVICE INFORMATION
------------------
Vehicle Type: ${booking.vehicleType}
Service Category: ${booking.serviceCategory}
Selected Package: ${booking.mainService}
${booking.addOns ? `Add-ons: ${booking.addOns}` : ''}
Estimated Duration: ${booking.totalDuration}
${booking.conditionNotes ? `Vehicle Condition Notes: ${booking.conditionNotes}` : ''}

PRICING
-------
Total Price: ${booking.totalPrice}

This is an automated notification from Hardys Wash N' Wax. 
Please review this booking and contact the customer to confirm details.
Booking Time: ${new Date(booking.createdAt || Date.now()).toLocaleString()}
  `;
}

// Define an interface for our email data structure
interface EmailData {
  to: string;
  subject: string;
  html: string;
  text: string;
  booking: Booking;
  enhancedData?: any; // Optional field for enriched booking data
}

/**
 * Prepares the email content for an employee notification
 */
export function prepareEmployeeEmailNotification(booking: Booking): EmailData {
  return {
    to: 'hardyswashnwax@gmail.com', // Staff email address
    subject: `New Booking Alert: ${booking.serviceCategory} for ${booking.firstName} ${booking.lastName}`,
    html: formatBookingForEmail(booking),
    text: formatBookingForPlainTextEmail(booking), // Fallback for email clients that don't support HTML
    booking: booking, // Include full booking data for any additional processing
    enhancedData: undefined // Will be populated in routes.ts when necessary
  };
}

/**
 * Prepares the email content for a customer confirmation
 */
export function prepareCustomerEmailConfirmation(booking: Booking): EmailData {
  return {
    to: booking.email,
    subject: `Your Hardys Wash N' Wax Booking Confirmation`,
    html: formatBookingForEmail(booking),
    text: formatBookingForPlainTextEmail(booking),
    booking: booking
  };
}

/**
 * In a production environment, this would connect to an email service like SendGrid, Mailgun, etc.
 * For this demo, we'll just log the email content
 */
export function sendEmailNotification(emailData: EmailData): Promise<boolean> {
  // In a real implementation, this would use something like:
  // return sendgridClient.send(emailData);
  
  console.log('========== EMAIL NOTIFICATION WOULD BE SENT ==========');
  console.log(`To: ${emailData.to}`);
  console.log(`Subject: ${emailData.subject}`);
  console.log(`Booking ID: ${emailData.booking.id}`);
  console.log(`Customer: ${emailData.booking.firstName} ${emailData.booking.lastName}`);
  console.log(`Service: ${emailData.booking.mainService}`);
  console.log(`Appointment: ${emailData.booking.appointmentDate} at ${emailData.booking.appointmentTime}`);
  
  // Log enhanced data if available (for employee emails only)
  if (emailData.enhancedData) {
    console.log('\n--- ENHANCED BOOKING DATA ---');
    console.log('Vehicle Type:', emailData.enhancedData.vehicleTypeName || emailData.booking.vehicleType);
    console.log('Service Category:', emailData.enhancedData.serviceCategoryName || emailData.booking.serviceCategory);
    console.log('Selected Service:', emailData.enhancedData.mainServiceName || emailData.booking.mainService);
    
    if (emailData.enhancedData.addOnDetailsList && emailData.enhancedData.addOnDetailsList.length > 0) {
      console.log('\nSelected Add-ons:');
      emailData.enhancedData.addOnDetailsList.forEach((addon: any) => {
        console.log(`- ${addon.name} (${addon.price})`);
      });
    }
    
    if (emailData.enhancedData.coordinates) {
      console.log('\nLocation Coordinates:', emailData.enhancedData.coordinates.join(', '));
    }
    
    console.log('\nTotal Price:', emailData.enhancedData.totalPrice || emailData.booking.totalPrice);
    console.log('---------------------------');
  }
  
  console.log('=======================================================');
  
  // Return a successful promise for demo purposes
  return Promise.resolve(true);
}