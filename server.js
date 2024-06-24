const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received data:', { name, email, message });

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log('Contact saved:', newContact);
    res.status(201).send('Contact saved');
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});