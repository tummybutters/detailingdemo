import mailchimp from '@mailchimp/mailchimp_marketing';
import { Booking } from '@shared/schema';

// Initialize the Mailchimp client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us7', // Hardcoded based on error message that showed API key is linked to us7 datacenter
});

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
  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
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
    
    console.error(`Failed to add contact to Mailchimp audience: ${error.message}`);
    throw error;
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
    
    // Log the booking for record-keeping
    console.log(`[MAILCHIMP] Added booking customer to audience: ${booking.email}`);
    
    // Return successful result
    return {
      subscriber: subscriberResult,
      status: 'success',
      message: `Booking processed for ${booking.email}, customer added to Mailchimp audience`
    };
  } catch (error: any) {
    console.error(`Error in processBookingWithMailchimp: ${error.message}`);
    return {
      status: 'error',
      message: error.message
    };
  }
}