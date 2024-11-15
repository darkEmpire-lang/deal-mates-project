import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        {/* Left section: Copyright */}
        <div style={footerTextStyle}>
          <p style={{ fontSize: '16px', color: '#fff', margin: 0 }}>
            © {currentYear} Pasindu. All Rights Reserved.
          </p>
        </div>

        {/* Center section: Quick Links or About */}
        <div style={footerLinksStyle}>
          <p style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Deal Mates</p>
          <p style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Contact: 0740815990</p>
          <p style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Email: contact@dealmates.com</p>
        </div>

        {/* Right section: Social Media Links */}
        <div style={socialMediaStyle}>
          <a href="https://wa.me/94740815990" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaWhatsapp />
          </a>
          <a href="https://facebook.com/dealmates" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaFacebook />
          </a>
          <a href="https://instagram.com/dealmates" target="_blank" rel="noopener noreferrer" style={iconStyle}>
            <FaInstagram />
          </a>
          <a href="tel:0740815990" style={iconStyle}>
            <FaPhoneAlt />
          </a>
          <a href="mailto:contact@dealmates.com" style={iconStyle}>
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

// CSS in JS for styling the footer
const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px 0',
  position: 'relative',
  width: '100%',
  textAlign: 'center',
  zIndex: 1000,
  boxSizing: 'border-box',
};

const footerContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  flexWrap: 'wrap',
};

const footerTextStyle = {
  fontSize: '14px',
  marginBottom: '10px',
};

const footerLinksStyle = {
  marginBottom: '10px',
};

const socialMediaStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginTop: '10px',
};

const iconStyle = {
  color: '#fff',
  fontSize: '24px',
  transition: 'color 0.3s ease',
};

iconStyle[':hover'] = {
  color: '#ff5722',
};

export default Footer;
