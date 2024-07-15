const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes'); // Adjust the path as needed

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api', blogRoutes); // Ensure this matches your frontend requests

// Define the contact schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with transporter configuration:', error);
  } else {
    console.log('Transporter is configured correctly');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received data:', { name, email, message });

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('Contact saved:', newContact);

    // Send notification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).send('Contact saved');
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

