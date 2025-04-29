import { IconButton } from '@mui/material';
import { Search, Person, Menu } from '@mui/icons-material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { setLogout } from '../redux/state';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  //check if the url is start form admin then hide the navbar
  const isAdminUrl = window.location.pathname.startsWith('/admin');
  if (isAdminUrl) {
    return null; // Don't render the navbar if the URL starts with '/admin'
  }

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="left">
          <Link to="/" className="logo">
            <HomeIcon />
            <span>HotelEase</span>
          </Link>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search for stays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton
            disabled={search === ''}
            onClick={() => {
              navigate(`/properties/search/${search}`);
            }}>
            <Search className="search-icon" />
          </IconButton>
        </div>

        <div className="right">
          {user ? (
            <Link to="/create-listing" className="host-btn">
              Become A Host
            </Link>
          ) : (
            <Link to="/login" className="host-btn">
              Become A Host
            </Link>
          )}

          <div className="user" onClick={() => setDropdownMenu(!dropdownMenu)}>
            <Menu />
            {!user ? (
              <Person />
            ) : (
              <img src={`http://localhost:3001/${user.profileImagePath.replace('public', '')}`} alt="Profile" />
            )}

            {dropdownMenu && !user && (
              <div className="menu">
                <Link to="/login" className="menu-item">
                  Log In
                </Link>
                <Link to="/register" className="menu-item">
                  Sign Up
                </Link>
                <Link to="/about" className="menu-item">
                  About Us
                </Link>
                <Link to="/contact" className="menu-item">
                  Contact Us
                </Link>
              </div>
            )}

            {dropdownMenu && user && (
              <div className="menu">
                <Link to={`/${user._id}/trips`} className="menu-item">
                  Trip List
                </Link>
                <Link to={`/${user._id}/wishList`} className="menu-item">
                  Wish List
                </Link>
                <Link to={`/${user._id}/properties`} className="menu-item">
                  Property List
                </Link>
                <Link to={`/${user._id}/reservations`} className="menu-item">
                  Reservation List
                </Link>
                <Link to="/create-listing" className="menu-item">
                  Become A Host
                </Link>
                <Link to="/about" className="menu-item">
                  About Us
                </Link>
                <Link to="/contact" className="menu-item">
                  Contact Us
                </Link>
                <Link to={`/${user._id}/userprofile`} className="menu-item">
                  profile
                </Link>
                <Link
                  to="/login"
                  className="menu-item"
                  onClick={() => {
                    dispatch(setLogout());
                  }}>
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
