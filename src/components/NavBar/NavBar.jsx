import React, { useState } from 'react';
import './Navbar.css'; // Archivo CSS para estilos personalizados

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const sections = [
    { id: 'home', label: 'Mathias Rodao' },
    { id: 'about-me', label: 'About Me' },
    { id: 'technical-skills', label: 'Technical Skills' },
    { id: 'my-projects', label: 'My Projects' },
    { id: 'professional-experience', label: 'Professional Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar-vertical">
      <ul className="nav flex-column">
        {sections.map(({ id, label }) => (
          <li
            key={id}
            className={`nav-item ${
              activeSection === id ? 'active' : ''
            }`}
            onClick={() => scrollToSection(id)}
          >
            <button className="nav-link btn">{label}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
