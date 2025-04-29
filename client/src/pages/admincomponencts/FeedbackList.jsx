import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/feedback/all');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`http://localhost:3001/feedback/${id}`);
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((fb) => fb._id !== id));
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Feedback List</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Comment</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} style={styles.tr}>
                <td style={styles.td}>
                  {feedback.customerId?.firstName} {feedback.customerId?.lastName}
                </td>
                <td style={styles.td}>{feedback.customerId?.email}</td>
                <td style={styles.td}>{feedback.rating}</td>
                <td style={styles.td}>{feedback.comment}</td>
                <td style={styles.td}>
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </td>
                <td style={styles.td}>
                 
                  <button style={{ ...styles.button, ...styles.deleteButton }} onClick={() => handleDelete(feedback._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {feedbacks.length === 0 && (
              <tr>
                <td colSpan="6" style={styles.noData}>No feedbacks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    border: '1px solid #dddddd',
  },
  th: {
    padding: '12px',
    backgroundColor: '#f2f2f2',
    borderBottom: '1px solid #dddddd',
    textAlign: 'left',
  },
  tr: {
    textAlign: 'center',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #dddddd',
  },
  button: {
    padding: '6px 12px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: '#ffffff',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#ffffff',
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    color: '#888888',
  },
};

export default FeedbackList;
