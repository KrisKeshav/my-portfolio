import { Resend } from 'resend';

// Initialize Resend with the API key.
const key = process.env.RESEND_API_KEY || 're_xxxxxxxxx';
const resend = new Resend(key);

console.log('Sending test email...');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'kriskeshv99@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
})
.then(response => {
  console.log('Email response:', response);
  if (response.error) {
    console.error('Error from Resend:', response.error.message);
  } else {
    console.log('Test email sent successfully! Check your inbox.');
  }
})
.catch(error => {
  console.error('Failed to send email:', error);
});
