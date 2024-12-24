import fs from 'fs';
import path from 'path';
import nodemailer, { type Transporter } from 'nodemailer';
import handlebars from 'handlebars';

// Define the structure for the response of sending an email
interface SendEmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Gmail SMTP configuration with Nodemailer
const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465, // Use 587 for TLS
  secure: true, // true for SSL, false for TLS
  auth: {
    user: process.env.ZOHO_EMAIL, // Zoho email address
    pass: process.env.ZOHO_PASSWORD, // App Password
  },
});

// Helper function to safely read a file
const readFileSafely = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error: any) {
    console.error(`Error reading file at ${filePath}:`, error.message);
    throw new Error(`Template file not found at ${filePath}`);
  }
};

const baseTemplatePath = path.resolve('src', 'templates', 'base_template.hbs');
const baseTemplate = readFileSafely(baseTemplatePath);
handlebars.registerPartial('base_template', baseTemplate);

const generateEmailContent = (
  templateName: string,
  data: { [key: string]: any }
): string => {
  try {
    const emailTemplatePath = path.resolve(
      'src',
      'templates',
      `${templateName}.hbs`
    );
    const emailTemplate = readFileSafely(emailTemplatePath);
    const emailCompiled = handlebars.compile(emailTemplate);

    return emailCompiled(data);
  } catch (error: any) {
    console.error('Error generating email content:', error.message);
    throw new Error('Failed to generate email content');
  }
};

// Function to send an email
const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
}: {
  to: string;
  subject: string;
  templateName: string;
  templateData: { [key: string]: any };
}): Promise<SendEmailResponse> => {
  try {
    const htmlContent = generateEmailContent(templateName, templateData); // Generate dynamic HTML content

    const mailOptions = {
      from: process.env.ZOHO_EMAIL, // Sender email
      to, // Receiver email
      subject, // Email subject
      html: htmlContent, // Email body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    return {
      success: false,
      message: 'Failed to send email',
      error: error.message,
    };
  }
};

export default sendEmail;
