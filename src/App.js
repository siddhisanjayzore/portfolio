// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Skills from './Skills';
import ContactMe from './ContactMe';
import Footer from './Footer';
import AdminDashboard from './AdminDashboard';
import Login from './Login';
import Blogs from './Blogs';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
