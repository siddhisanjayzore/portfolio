import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();

  // Create an axios instance with a base URL
  const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Ensure this matches your backend URL
  });

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  }, [api]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      navigate('/Login');
    } else {
      fetchBlogs();
    }
  }, [navigate, fetchBlogs]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/blogs/${currentId}`, formData);
      } else {
        await api.post('/blogs', formData);
      }
      setFormData({ title: '', content: '', author: '' });
      setEditMode(false);
      fetchBlogs();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleEdit = (blog) => {
    setFormData({ title: blog.title, content: blog.content, author: blog.author });
    setEditMode(true);
    setCurrentId(blog._id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            rows="4"
            onChange={handleChange}
            value={formData.content}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={handleChange}
            value={formData.author}
            required
          />
        </div>
        <button type="submit">{editMode ? 'Update' : 'Create' } Blog</button>
      </form>
      <div className="blogs-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p><strong>{blog.author}</strong></p>
            <button onClick={() => handleEdit(blog)}>Edit</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;