import emailjs from '@emailjs/browser';

// Initialize EmailJS with the public key
export const initEmailJS = () => {
  try {
    // Using the public key directly since it's already meant to be public
    const publicKey = 'k6KdWLBsB-i4uUIa8';
    
    console.log('Initializing EmailJS with public key:', publicKey);
    emailjs.init(publicKey);
    console.log('EmailJS initialization successful');
    return true;
  } catch (error) {
    console.error('Error initializing EmailJS:', error);
    return false;
  }
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

export const sendContactEmail = async (formData: ContactFormData) => {
  try {
    // Using the specific service ID and template ID you provided
    const serviceId = 'hardy_serviceid';
    const templateId = 'hardyww_contactus_temp';
    const userId = 'k6KdWLBsB-i4uUIa8'; // Public key

    console.log('Sending email with service ID:', serviceId);
    console.log('Sending email with template ID:', templateId);
    console.log('Using user ID:', userId);

    // Create data object according to EmailJS API format
    const data = {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'Contact Form Submission',
      }
    };
    
    console.log('Email data:', data);

    // Send the email using fetch directly to the EmailJS API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return {
        success: true,
        status: response.status,
        text: await response.text()
      };
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};