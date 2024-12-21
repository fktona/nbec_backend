// viewTemplate.js
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Load the template

const baseTemplateSource = fs.readFileSync(
  path.join(__dirname, 'templates', 'base_template.hbs'),
  'utf8'
);
handlebars.registerPartial('base_template', baseTemplateSource);
const templatesDir = path.join(__dirname, 'templates');
const generateEmailContent = (templateName, data) => {
  const templatePath = path.join(templatesDir, `${templateName}.hbs`);
  const emailTemplate = fs.readFileSync(templatePath, 'utf8');
  const compiledTemplate = handlebars.compile(emailTemplate);
  return compiledTemplate(data);
};

// Example data to populate the template
const templateData = {
  studentName: 'John Doe',
  studentGrade: '11th Grade',
  studentSubjects: 'Math, Science, English',
  companyName: 'New Breed Educational Centre',
  currentYear: '2024',
};

// View the "application_received" template
const emailContent = generateEmailContent(
  'registration-received',
  templateData
);

// Define the path for the output file
const outputPath = path.join(__dirname, 'output', 'email_preview.html');

// Ensure the output directory exists
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

// Save the generated HTML content to the file
fs.writeFileSync(outputPath, emailContent, 'utf8');

console.log(`Template rendered and saved to: ${outputPath}`);
