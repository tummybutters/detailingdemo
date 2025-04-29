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
    // Hardcoded service and template IDs (these values are meant to be public)
    const serviceId = 'service_9o6a9hq';
    const templateId = 'template_njn095q';

    console.log('Sending email with service ID:', serviceId);
    console.log('Sending email with template ID:', templateId);

    // Create template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      phone: formData.phone || 'Not provided',
      subject: formData.subject || 'Contact Form Submission',
    };
    
    console.log('Email template params:', templateParams);

    // Send the email
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    return {
      success: true,
      status: response.status,
      text: response.text
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};