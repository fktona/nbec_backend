import fs from 'fs';
import path from 'path';
import nodemailer, { type Transporter } from 'nodemailer';
import handlebars from 'handlebars';

// Define the structure of email data that will be used in the template
interface EmailData {
  recipientName: string;
  subject: string;
  messageBody: string;
}

// Define the structure for the response of sending an email
interface SendEmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Gmail SMTP configuration with Nodemailer
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail address
    pass: 'your-app-password', // Replace with your Gmail app password
  },
});

// Function to load the template and render it using Handlebars
const generateEmailContent = (
  templateName: string,
  data: EmailData
): string => {
  // Load the base template (where the content will be injected)
  const baseTemplatePath = path.join(
    __dirname,
    '../templates',
    'base_template.hbs'
  );
  const baseTemplate = fs.readFileSync(baseTemplatePath, 'utf-8');
  const baseCompiled = handlebars.compile(baseTemplate);

  // Load the specific email template
  const emailTemplatePath = path.join(
    __dirname,
    'templates',
    'emails',
    `${templateName}.hbs`
  );
  const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
  const emailCompiled = handlebars.compile(emailTemplate);

  // Render the content of the specific template
  const content = emailCompiled(data);

  // Combine base template with content
  const htmlContent = baseCompiled({ subject: data.subject, content });

  return htmlContent;
};

// Function to send an email
const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  templateData: EmailData
): Promise<SendEmailResponse> => {
  const htmlContent = generateEmailContent(templateName, templateData); // Generate dynamic HTML content

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender email (must be your Gmail address)
    to, // Receiver email
    subject, // Email subject
    html: htmlContent, // Email body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error: error.message,
    };
  }
};

export default sendEmail;
