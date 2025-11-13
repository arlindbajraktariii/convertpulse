const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure email transporter (using Ethereal for demo, replace with real email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// Alternative: Using Ethereal (for testing without real email)
const createTestTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
};

// POST: Submit email for early access
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // For production, use real email service
    let mailTransporter = transporter;

    // For development/demo, use Ethereal test account
    if (!process.env.EMAIL_USER) {
      mailTransporter = await createTestTransporter();
    }

    // Email to ConvertPulse team
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@convertpulse.com',
      to: 'emails@domain.com',
      subject: `🚀 New Early Access Signup: ${email}`,
      html: `
        <h2>New Early Access Signup!</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <p>This user is interested in ConvertPulse early access.</p>
      `,
      replyTo: email,
    };

    // Confirmation email to user
    const confirmationEmail = {
      from: process.env.EMAIL_USER || 'noreply@convertpulse.com',
      to: email,
      subject: '🎉 You\'re on the Early Access List!',
      html: `
        <h2>Thanks for signing up, ${name ? name.split(' ')[0] : 'there'}! 🚀</h2>
        <p>You're now on our exclusive early access list for ConvertPulse.</p>
        <p>We'll notify you soon with:</p>
        <ul>
          <li>Exclusive access to the platform</li>
          <li>Secret optimization tips & templates</li>
          <li>Lifetime discount (only for early adopters)</li>
          <li>Direct support from our team</li>
        </ul>
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <strong>ConvertPulse Team</strong><br />
          Making landing page optimization simple for everyone.
        </p>
      `,
    };

    // Send both emails
    await mailTransporter.sendMail(mailOptions);
    await mailTransporter.sendMail(confirmationEmail);

    res.json({
      success: true,
      message: 'Email submitted successfully! Check your inbox for confirmation.',
      email: email,
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      error: 'Failed to submit email. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;
