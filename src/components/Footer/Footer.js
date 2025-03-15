import React from 'react';

const Footer = () => {
  return (
    <div style={styles.footer}>
      <p style={styles.text}>© 2025 CopyRight. All rights reserved.</p>
      <p style={styles.detail}>
        Made by ❤️ NIKHIL
      </p>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  footer: {
    backgroundColor: '#343a40', // Dark gray background
    padding: '20px 0', // Increased padding for more height
    textAlign: 'center', // Center-align text
    borderTop: '1px solid #495057', // Slightly darker border at the top
    marginTop: 'auto', // Push footer to the bottom of the page
  },
  text: {
    margin: '0 0 10px 0', // Add some margin below the copyright text
    color: '#f8f9fa', // Light gray text color
    fontSize: '14px', // Small font size
  },
  detail: {
    margin: 0, // Remove default margin
    color: '#f8f9fa', // Light gray text color
    fontSize: '14px', // Small font size
  },
  link: {
    color: '#4dabf7', // Light blue link color
    textDecoration: 'none', // Remove underline
    fontWeight: 'bold', // Make the link bold
  },
};

export default Footer;