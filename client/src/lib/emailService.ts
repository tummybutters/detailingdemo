import emailjs from '@emailjs/browser';

// Initialize EmailJS with the public key
export const initEmailJS = () => {
  try {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY;
    
    if (!publicKey) {
      console.error('EmailJS public key not found');
      return false;
    }
    
    emailjs.init(publicKey);
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
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      throw new Error('EmailJS service ID or template ID not found');
    }

    // Create template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      phone: formData.phone || 'Not provided',
      subject: formData.subject || 'Contact Form Submission',
    };

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