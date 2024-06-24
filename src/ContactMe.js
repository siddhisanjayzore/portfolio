// ContactMe.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './ContactMe.css';

const ContactMe = () => {
  const dispatch = useDispatch();
  const contactForm = useSelector((state) => state.contactForm);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: contactForm?.name || '', // Ensure these fields match your initial state structure
      email: contactForm?.email || '',
      message: contactForm?.message || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:5000/api/contact', values); // Adjust the URL as per your backend API
        dispatch({ type: 'SET_CONTACT_FORM', payload: values });
        console.log('Form data', values);
        resetForm();
      } catch (error) {
        console.error('Error submitting the form', error);
      }
    },
  });

  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="error-message">{formik.errors.name}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="error-message">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            required
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <p className="error-message">{formik.errors.message}</p>
          ) : null}
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default ContactMe;
