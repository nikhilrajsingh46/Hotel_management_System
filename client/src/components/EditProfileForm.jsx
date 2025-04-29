import React, { useState } from 'react';
import axios from 'axios';

const EditProfileForm = ({ userId, currentData, onUpdateSuccess }) => {
  const [form, setForm] = useState({
    firstName: currentData.firstName,
    lastName: currentData.lastName,
    email: currentData.email,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.put(`http://localhost:3001/auth/${userId}/update`, form);
      alert('Profile updated!');
      onUpdateSuccess();
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Internal CSS styles
  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    label: {
      fontWeight: 'bold',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#28a745',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    },
    buttonDisabled: {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed',
    },
    errorText: {
      color: 'red',
      fontWeight: 'bold',
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label style={styles.label}>First Name</label>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Last Name</label>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        style={styles.input}
      />

      {error && <p style={styles.errorText}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default EditProfileForm;
