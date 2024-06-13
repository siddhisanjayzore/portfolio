// src/ContactMe.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContactInfo } from './actions';
import ContactForm from './ContactForm';

const ContactMe = () => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);

  const [formData, setFormData] = useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setContactInfo(formData));
  };

  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ContactMe;

