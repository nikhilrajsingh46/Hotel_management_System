import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ContactUs.scss';
import { Email, Phone, LocationOn, AccessTime } from '@mui/icons-material';

const ContactUs = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Have questions about HotelEase? We're here to help!</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>

              <div className="info-item">
                <LocationOn className="icon" />
                <div>
                  <h3>Address</h3>
                  <p>HotelEase Headquarters</p>
                  <p>123 Boudhanath Marg, Boudha</p>
                  <p>Kathmandu 44600, Nepal</p>
                </div>
              </div>

              <div className="info-item">
                <Phone className="icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+977 1 4123456</p>
                  <p>+977 9876543210</p>
                </div>
              </div>

              <div className="info-item">
                <Email className="icon" />
                <div>
                  <h3>Email</h3>
                  <p>info@hotelease.com</p>
                  <p>support@hotelease.com</p>
                </div>
              </div>

              <div className="info-item">
                <AccessTime className="icon" />
                <div>
                  <h3>Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="map-container">
                <h3>Find Us</h3>
                <img
                  src="/assets/location.PNG"
                  alt="HotelEase office location in Boudha, Kathmandu"
                  className="location-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ContactUs;
