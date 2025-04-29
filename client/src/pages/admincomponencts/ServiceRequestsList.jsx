import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceRequestsList = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServiceRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/services/getall');
      setServiceRequests(response.data);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (!id || !newStatus) {
      console.error("Missing service ID or new status")
      return
    }
    try {
      await axios.patch(`http://localhost:3001/services/update/${id}`, { status: newStatus })
      fetchServiceRequests()
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = async (id) => {
    if (!id) {
      console.error("Missing service ID")
      return
    }
    try {
      await axios.patch(`http://localhost:3001/services/cancel/${id}`)
      fetchServiceRequests()
    }
  catch (error) {
      console.error('Error cancelling request:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    if (!id) {
      console.error("Missing service ID")
      return
    }
    try {
      await axios.delete(`http://localhost:3001/services/delete/${id}`)
      fetchServiceRequests()
    }
  catch (error) {
      console.error('Error deleting request:', error);
    }  finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading service requests...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Service Requests</h2>
      {serviceRequests.length === 0 ? (
        <p>No service requests found.</p>
      ) : (
        <ul style={styles.list}>
          {serviceRequests.map((request) => (
            <li key={request._id} style={styles.listItem}>
              <h3 style={styles.title}>{request.serviceName}</h3>
              <p><strong>Description:</strong> {request.description}</p>
              <p><strong>User:</strong> {request.user.email}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Created At:</strong> {new Date(request.createdAt).toLocaleString()}</p>

              <div style={styles.buttonGroup}>
                <select
                  style={styles.select}
                  value={request.status}
                  onChange={(e) => updateStatus(request._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => cancelRequest(request._id)}
                  style={{ ...styles.button, ...styles.cancelButton }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteRequest(request._id)}
                  style={{ ...styles.button, ...styles.deleteButton }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  buttonGroup: {
    marginTop: '15px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  select: {
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  button: {
    padding: '8px 14px',
    fontSize: '16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f0ad4e',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    color: 'white',
  },
  loading: {
    fontSize: '24px',
    textAlign: 'center',
    marginTop: '50px',
  }
};

export default ServiceRequestsList;
