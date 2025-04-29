"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"
import "../styles/admin.scss"
import StatCard from "./admincomponencts/StatCard"
import PropertiesList from "./admincomponencts/PropertiesList"
import TripsList from "./admincomponencts/TripsList"
import ReservationsList from "./admincomponencts/ReservationsList"
import ReviewsList from "./admincomponencts/ReviewsList"
import FeedbackList from "./admincomponencts/FeedbackList"
import UsersList from "./admincomponencts/UsersList"
import ServiceRequestsList from "./admincomponencts/ServiceRequestsList"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

// Import components

const Admin = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Stats data
  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    trips: 0,
    reservations: 0,
    reviews: 0,
    feedback: 0,
    serviceRequests: 0,
  })

  // Data for different sections
  const [users, setUsers] = useState([])
  const [properties, setProperties] = useState([])
  const [trips, setTrips] = useState([])
  const [reservations, setReservations] = useState([])
  const [reviews, setReviews] = useState([])
  const [feedback, setFeedback] = useState([])
  const [serviceRequests, setServiceRequests] = useState([])

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}/userdetails`)
      setUserData(response.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching user:", err)
      setLoading(false)
    }
  }

  // Fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true)

      // Fetch users
      const usersResponse = await axios.get("http://localhost:3001/users")
      setUsers(usersResponse.data)
      console.log("first", usersResponse.data.length)
      setStats((prev) => ({ ...prev, users: usersResponse.data.length }))

      // Fetch properties/listings
      const propertiesResponse = await axios.get("http://localhost:3001/properties/")
      setProperties(propertiesResponse.data)
      console.log("sec", propertiesResponse.data.length)
      setStats((prev) => ({ ...prev, properties: propertiesResponse.data.length }))

      // Fetch trips
      const tripsResponse = await axios.get(`http://localhost:3001/users/${userId}/trips`)
      setTrips(tripsResponse.data)
      console.log("third", tripsResponse.data.length)
      setStats((prev) => ({ ...prev, trips: tripsResponse.data.length }))

      // Fetch reservations
      const reservationsResponse = await axios.get(`http://localhost:3001/bookings`)
      setReservations(reservationsResponse.data)
      console.log("fourth", reservationsResponse.data.length)
      setStats((prev) => ({ ...prev, reservations: reservationsResponse.data.length }))

      // Fetch feedback
      const feedbackResponse = await axios.get("http://localhost:3001/feedback/all")
      setFeedback(feedbackResponse.data)
      console.log("fifth", feedbackResponse.data.length)
      setStats((prev) => ({ ...prev, feedback: feedbackResponse.data.length }))
      
     
     // These endpoints weren't clear in the provided code
      setReviews([])
      setServiceRequests([])

      setLoading(false)
    } catch (err) {
      console.error("Error fetching data:", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserDetails()
    fetchAllData()
  }, [userId])

  // Chart data for dashboard
  const chartData = {
    labels: ["Users", "Properties", "Trips", "Reservations", "Reviews", "Feedback"],
    datasets: [
      {
        label: "Total Count",
        data: [stats.users, stats.properties, stats.trips, stats.reservations, stats.reviews, stats.feedback],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Monthly data for line chart
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Bookings",
        data: [12, 19, 3, 5, 2, 3, 20, 33, 27, 15, 9, 11],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
      },
      {
        label: "Revenue",
        data: [32, 29, 13, 25, 22, 13, 40, 53, 47, 35, 29, 31],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
    ],
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <ul>
            <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
              Dashboard
            </li>
            <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
              Users
            </li>
            <li className={activeTab === "properties" ? "active" : ""} onClick={() => setActiveTab("properties")}>
              Properties
            </li>
            <li className={activeTab === "trips" ? "active" : ""} onClick={() => setActiveTab("trips")}>
              Trips
            </li>
            <li className={activeTab === "reservations" ? "active" : ""} onClick={() => setActiveTab("reservations")}>
              Reservations
            </li>
            {/* <li className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
              Reviews
            </li> */}
            <li className={activeTab === "feedback" ? "active" : ""} onClick={() => setActiveTab("feedback")}>
              Feedback
            </li>
            <li
              className={activeTab === "service-requests" ? "active" : ""}
              onClick={() => setActiveTab("service-requests")}
            >
              Service Requests
            </li>
            
          </ul>
        </nav>
        <div className="admin-user-info">
          <div className="admin-avatar">
            {userData?.profileImagePath ? (
              <img src={`http://localhost:3001/uploads/${userData.profileImagePath}`} alt="Admin" />
            ) : (
              <div className="avatar-placeholder">
                {userData?.firstName?.charAt(0)}
                {userData?.lastName?.charAt(0)}
              </div>
            )}
          </div>
          <div className="admin-user-details">
            <h4>
              {userData?.firstName} {userData?.lastName}
            </h4>
            <p>{userData?.email}</p>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>
            {activeTab === "dashboard" && "Dashboard Overview"}
            {activeTab === "users" && "User Management"}
            {activeTab === "properties" && "Property Management"}
            {activeTab === "trips" && "Trip Management"}
            {activeTab === "reservations" && "Reservation Management"}
            {/* {activeTab === "reviews" && "Review Management"} */}
            {activeTab === "feedback" && "Feedback Management"}
            {activeTab === "service-requests" && "Service Request Management"}
          </h1>
          <div className="admin-actions">
            <button className="refresh-btn" onClick={fetchAllData}>
              Refresh Data
            </button>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === "dashboard" && (
            <div className="dashboard-content">
              <div className="stats-cards">
                <StatCard title="Users" count={stats.users} icon="users" />
                <StatCard title="Properties" count={stats.properties} icon="building" />
                <StatCard title="Trips" count={stats.trips} icon="plane" />
                <StatCard title="Reservations" count={stats.reservations} icon="calendar" />
                <StatCard title="Reviews" count={stats.reviews} icon="star" />
                <StatCard title="Feedback" count={stats.feedback} icon="comment" />
              </div>

              <div className="chart-container">
                <div className="chart-card">
                  <h3>Overview Statistics</h3>
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Platform Statistics",
                        },
                      },
                    }}
                  />
                </div>
                <div className="chart-card">
                  <h3>Monthly Trends</h3>
                  <Line
                    data={monthlyData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Monthly Booking & Revenue Trends",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {/* This would be populated with real data in a production environment */}
                  <div className="activity-item">
                    <div className="activity-icon booking"></div>
                    <div className="activity-details">
                      <p>
                        New booking from <strong>John Doe</strong>
                      </p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon user"></div>
                    <div className="activity-details">
                      <p>
                        New user registered: <strong>Sarah Smith</strong>
                      </p>
                      <span className="activity-time">5 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon property"></div>
                    <div className="activity-details">
                      <p>
                        New property listed by <strong>Mike Johnson</strong>
                      </p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon feedback"></div>
                    <div className="activity-details">
                      <p>
                        New feedback received for <strong>Seaside Villa</strong>
                      </p>
                      <span className="activity-time">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && <UsersList users={users} onRefresh={fetchAllData} />}

          {activeTab === "properties" && <PropertiesList properties={properties} onRefresh={fetchAllData} />}

          {activeTab === "trips" && <TripsList onRefresh={fetchAllData} />}

          {activeTab === "reservations" && <ReservationsList reservations={reservations} onRefresh={fetchAllData} />}

          {/* {activeTab === "reviews" && <ReviewsList reviews={reviews} onRefresh={fetchAllData} />} */}

          {activeTab === "feedback" && <FeedbackList onRefresh={fetchAllData} />}

          {activeTab === "service-requests" && (
            <ServiceRequestsList  onRefresh={fetchAllData} />
          )}
        </div>
      </main>
    </div>
  )
}

export default Admin
