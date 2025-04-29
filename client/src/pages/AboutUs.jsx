import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AboutUs.scss';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="about-page">
        <div className="about-container">
          <div className="about-header">
            <h1>About HotelEase</h1>
            <p>Your trusted partner for finding the perfect stay since 2023</p>
          </div>

          <div className="about-content">
            <section className="about-section">
              <h2>Our Story</h2>
              <p>
                HotelEase was founded with a simple mission: to make finding and booking accommodations easier for
                travelers around the world. What started as a small project in Kathmandu, Nepal has grown into a
                platform connecting thousands of travelers with unique stays across the globe.
              </p>
              <p>
                Our journey began when a group of travel enthusiasts recognized the challenges of finding authentic,
                quality accommodations that matched their preferences and budget. We set out to create a solution that
                puts the traveler's experience first, combining technology with local expertise.
              </p>
            </section>

            <section className="about-section">
              <h2>Our Mission</h2>
              <p>
                At HotelEase, our mission is to connect travelers with unique and comfortable accommodations that feel
                like home, no matter where they are in the world. We strive to make the booking process transparent,
                simple, and stress-free, allowing you to focus on what truly matters – enjoying your journey.
              </p>
              <div className="mission-values">
                <div className="value-item">
                  <h3>Quality</h3>
                  <p>
                    We carefully vet every property to ensure it meets our high standards of comfort and authenticity.
                  </p>
                </div>
                <div className="value-item">
                  <h3>Trust</h3>
                  <p>
                    We build relationships based on transparency, honesty, and reliability with both hosts and guests.
                  </p>
                </div>
                <div className="value-item">
                  <h3>Innovation</h3>
                  <p>
                    We continuously improve our platform to make finding and booking accommodations easier and more
                    personalized.
                  </p>
                </div>
              </div>
            </section>

            <section className="about-section">
              <h2>Our Team</h2>
              <p>
                The heart of HotelEase is our diverse team of passionate individuals dedicated to transforming the way
                people travel. From experienced developers to seasoned travelers, each team member brings a unique
                perspective to create a service that truly understands the needs of modern explorers.
              </p>
              <div className="team-grid">
                <div className="team-member">
                  <img src="/assets/phucmai.png" alt="Founder & CEO" />
                  <h3>Alex Tamang</h3>
                  <p>Founder & CEO</p>
                </div>
                <div className="team-member">
                  <img src="/assets/denny.jpeg" alt="Chief Technology Officer" />
                  <h3>Priya Sharma</h3>
                  <p>Chief Technology Officer</p>
                </div>
                <div className="team-member">
                  <img src="/assets/John Smiths.jpg" alt="Head of Customer Experience" />
                  <h3>Raj Gurung</h3>
                  <p>Head of Customer Experience</p>
                </div>
              </div>
            </section>

            <section className="about-section cta-section">
              <h2>Join Our Journey</h2>
              <p>
                Whether you're looking for a place to stay on your next adventure or want to list your property,
                HotelEase is here to connect you with unforgettable experiences.
              </p>
              <div className="cta-buttons">
                <Link to="/" className="cta-button">
                  Explore Stays
                </Link>
                <Link to="/contact" className="cta-button secondary">
                  Contact Us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AboutUs;
