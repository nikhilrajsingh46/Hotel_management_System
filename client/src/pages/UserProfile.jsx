import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ProfileDetails from '../components/ProfileDetails';
import EditProfileForm from '../components/EditProfileForm';
import ServicePage from '../components/ServicePage';
import Bookinglist from '../components/Bookinglist';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}/userdetails`);
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (loading) return <p style={{ color: '#000000' }}>Loading...</p>;
  if (!userData) return <p style={{ color: '#000000' }}>User not found</p>;

  // Internal CSS (React way)
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#000000', // Added to force black text
    },
    profileHeader: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#000000', // Added to force black text
    },
    profileImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px',
    },
    tabButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#eee',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
      color: '#000000', // Added to force black text
    },
    activeButton: {
      backgroundColor: '#007BFF',
      color: 'white',
    },
    tabContent: {
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '5px',
      color: '#000000', // Added to force black text
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img
          src={`http://localhost:3001/${userData.profileImagePath.replace('public', '')}`}
          alt="Profile"
          style={styles.profileImage}
        />
        <h2 style={{ color: '#000000' }}>{userData.firstName} {userData.lastName}</h2>
        <p style={{ color: '#000000' }}>{userData.email}</p>
      </div>

      <div style={styles.tabButtons}>
        <button
          style={activeTab === 'profile' ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          style={activeTab === 'edit' ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </button>
        <button
          style={activeTab === 'password' ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
        <button
          style={activeTab === 'roomService' ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActiveTab('roomService')}
        >
          Room Service Requests
        </button>
        <button
          style={activeTab === 'booking' ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActiveTab('booking')}
        >
          Booking
        </button>
      </div>

      <div style={styles.tabContent}>
        {activeTab === 'profile' && <ProfileDetails userData={userData} />}
        {activeTab === 'edit' && (
          <EditProfileForm
            userId={userId}
            currentData={userData}
            onUpdateSuccess={fetchUserDetails}
          />
        )}
        {activeTab === 'password' && <ChangePasswordForm userId={userId} />}
        {activeTab === 'roomService' && (
          <div>
            <ServicePage userId={userId} />
           </div>
        )}
        {activeTab === 'booking' && (
          <div>
            <Bookinglist userId={userId} />
           </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;