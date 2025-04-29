import '../styles/Footer.scss';
import {
  LocationOn,
  LocalPhone,
  Email,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Language,
  CreditCard,
  Help,
  Policy,
  Apartment,
  Home,
  Security,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const Footer = () => {
  
  //check if the url is start form admin then hide the footer
  const isAdminUrl = window.location.pathname.startsWith('/admin');
  if (isAdminUrl) {
    return null; // Don't render the footer if on admin page
  }

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="brand">
            <div className="brand-container">
              <HomeIcon className="home-icon" />
              <span>HotelEase</span>
            </div>
          </h3>
          <p>
            Discover the perfect accommodations for your next adventure. From cozy apartments to luxury villas,
            HotelEase offers a world of possibilities for every traveler.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedIn />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>
              <Link to="/">
                <Home /> Home
              </Link>
            </li>
            <li>
              <Link to="/about">
                <Apartment /> About Us
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <LocalPhone /> Contact Us
              </Link>
            </li>
            <li>
              <Link to="/terms">
                <Policy /> Terms and Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy">
                <Security /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/help">
                <Help /> Help Center
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <Link to="/contact">
                <LocalPhone /> +977 1 4123456
              </Link>
            </li>
            <li>
              <a href="mailto:info@hotelease.com">
                <Email /> info@hotelease.com
              </a>
            </li>
            <li>
              <Link to="/contact">
                <LocationOn /> 123 Boudhanath Marg, Boudha, Kathmandu
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <Language /> English, नेपाली, हिन्दी
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <CreditCard /> We accept all major credit cards
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HotelEase. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
