// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Siddhi's Portfolio</h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/projects">Projects</Link></li>
          <li className="nav-item"><Link to="/skills">Skills</Link></li>
          <li className="nav-item"><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


