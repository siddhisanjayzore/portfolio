import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs'); // Ensure this URL matches your backend
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blogs">
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog">
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p><strong>{blog.author}</strong></p>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
