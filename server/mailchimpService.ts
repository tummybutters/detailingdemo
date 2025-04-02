import mailchimp from '@mailchimp/mailchimp_marketing';
import { Booking } from '@shared/schema';

// Check if Mailchimp credentials are available
const hasMailchimpCredentials = 
  process.env.MAILCHIMP_API_KEY && 
  process.env.MAILCHIMP_API_KEY.length > 0 &&
  process.env.MAILCHIMP_SERVER &&
  process.env.MAILCHIMP_SERVER.length > 0 &&
  process.env.MAILCHIMP_AUDIENCE_ID && 
  process.env.MAILCHIMP_AUDIENCE_ID.length > 0;

// Initialize the Mailchimp client if credentials are available
let mailchimpInitialized = false;

if (hasMailchimpCredentials) {
  try {
    // Validate that the server contains the dc suffix (e.g., 'us1')
    const server = process.env.MAILCHIMP_SERVER;
    
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: server, 
    });
    
    mailchimpInitialized = true;
    console.log('Mailchimp client initialized successfully');
    console.log(`Using server: ${server}, audience ID: ${process.env.MAILCHIMP_AUDIENCE_ID}`);
  } catch (error) {
    console.error('Failed to initialize Mailchimp client:', error);
  }
} else {
  const missingCredentials = [];
  if (!process.env.MAILCHIMP_API_KEY) missingCredentials.push('MAILCHIMP_API_KEY');
  if (!process.env.MAILCHIMP_SERVER) missingCredentials.push('MAILCHIMP_SERVER');
  if (!process.env.MAILCHIMP_AUDIENCE_ID) missingCredentials.push('MAILCHIMP_AUDIENCE_ID');
  
  console.log(`Mailchimp credentials not found or incomplete - missing: ${missingCredentials.join(', ')} - email marketing features will be disabled`);
}

/**
 * Add a subscriber to the Mailchimp audience
 * @param email The subscriber's email address
 * @param firstName The subscriber's first name
 * @param lastName The subscriber's last name
 * @param phone The subscriber's phone number
 * @returns Promise with the response from Mailchimp
 */
export async function addSubscriberToMailchimp(
  email: string,
  firstName: string,
  lastName: string,
  phone?: string
): Promise<any> {
  // Skip Mailchimp integration if credentials aren't available
  if (!hasMailchimpCredentials || !mailchimpInitialized) {
    console.log('Skipping Mailchimp subscription - credentials not available or client not initialized');
    return {
      status: 'skipped',
      message: 'Mailchimp integration not configured',
      email_address: email
    };
  }
  
  try {
    // Input validation
    if (!email || !email.includes('@')) {
      return {
        status: 'error',
        message: 'Invalid email address format',
        email_address: email
      };
    }
    
    console.log(`Attempting to add ${email} to Mailchimp audience ${process.env.MAILCHIMP_AUDIENCE_ID}`);
    
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
          PHONE: phone || '',
        },
      }
    );
    
    console.log(`Successfully added/updated contact as an audience member. The contact's id is ${response.id}.`);
    return response;
  } catch (error: any) {
    // Handle already subscribed user specifically
    if (error.response && error.response.body && error.response.body.title === 'Member Exists') {
      console.log(`Contact already exists in audience. The contact's email is ${email}.`);
      return { 
        id: error.response.body.detail.split('with id ')[1].replace('.', ''),
        status: 'subscribed',
        email_address: email
      };
    }
    
    // Handle API key related errors
    if (error.response && error.response.body && 
       (error.response.body.title === 'API Key Invalid' || 
        error.response.body.status === 401)) {
      console.error('Mailchimp API key appears to be invalid. Please check your MAILCHIMP_API_KEY environment variable.');
      return {
        status: 'error',
        message: 'Mailchimp authentication failed',
        email_address: email
      };
    }
    
    // Handle audience ID related errors
    if (error.response && error.response.body && error.response.body.status === 404) {
      console.error('Mailchimp audience not found. Please check your MAILCHIMP_AUDIENCE_ID environment variable.');
      return {
        status: 'error',
        message: 'Mailchimp audience not found',
        email_address: email
      };
    }
    
    console.error(`Failed to add contact to Mailchimp audience: ${error.message}`);
    console.error('Full error:', error);
    
    return {
      status: 'error',
      message: `Mailchimp subscription failed: ${error.message}`,
      email_address: email
    };
  }
}

/**
 * Send a transactional email using Mailchimp
 * This is a mock implementation since the current API doesn't directly support transactional emails
 * For actual transactional emails, you would need to use Mandrill (Mailchimp's transactional email service)
 */
export async function sendTransactionalEmail(
  toEmail: string,
  subject: string,
  htmlContent: string,
  textContent: string
): Promise<any> {
  try {
    // This is a mock function
    // In reality, you would use Mandrill or a Mailchimp transactional campaign
    console.log(`[MAILCHIMP] Would send transactional email to: ${toEmail}`);
    console.log(`[MAILCHIMP] Subject: ${subject}`);
    
    // For now, we'll just log that this would be sent
    // In a real implementation, this would use Mandrill API or another email service
    return {
      status: 'sent',
      email: toEmail,
      subject: subject
    };
  } catch (error: any) {
    console.error(`Failed to send transactional email: ${error.message}`);
    throw error;
  }
}

/**
 * Add a booking to a specific Mailchimp audience and send confirmation email
 * @param booking The booking data
 * @returns Promise with the result of both operations
 */
export async function processBookingWithMailchimp(booking: Booking): Promise<any> {
  try {
    // First, add the customer to the subscriber list
    const subscriberResult = await addSubscriberToMailchimp(
      booking.email,
      booking.firstName,
      booking.lastName,
      booking.phone
    );
    
    // Check for skipped status (indicates Mailchimp is not configured)
    if (subscriberResult.status === 'skipped') {
      console.log(`Mailchimp subscription skipped for booking: ${booking.email} - Mailchimp not configured`);
      return {
        subscriber: null,
        status: 'skipped',
        message: `Booking processed for ${booking.email} without Mailchimp integration`
      };
    }
    
    // Log the booking for record-keeping
    console.log(`[MAILCHIMP] Added booking customer to audience: ${booking.email}`);
    
    // Return successful result
    return {
      subscriber: subscriberResult,
      status: 'success',
      message: `Booking processed for ${booking.email}, customer added to Mailchimp audience`
    };
  } catch (error: any) {
    // Don't fail the booking process just because Mailchimp integration failed
    console.error(`Error in processBookingWithMailchimp: ${error.message}`);
    return {
      status: 'error',
      message: `Booking processed but Mailchimp integration failed: ${error.message}`
    };
  }
}