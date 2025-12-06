import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const { logout } = useContext(GeneralContext);

  const brandClick = () => {
    if (usertype === 'admin') {
      navigate('/admin');
    } else if (usertype === 'flight-operator') {
      navigate('/flight-admin');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="nav-root">
      <div className="nav-inner">
        <div className="nav-left" onClick={brandClick}>
          <div className="nav-logo-circle">✈</div>
          <div className="nav-brand">
            <span className="nav-brand-main">AirVoyage</span>
            <span className="nav-brand-sub">Smart travel planner</span>
          </div>
        </div>

        {!usertype ? (
          <nav className="nav-links">
            <button className="nav-link" onClick={() => navigate('/')}>
              Explore
            </button>
            <button className="nav-link primary" onClick={() => navigate('/auth')}>
              Sign in
            </button>
          </nav>
        ) : (
          <>
            {usertype === 'customer' && (
              <nav className="nav-links">
                <button className="nav-link" onClick={() => navigate('/')}>
                  Search flights
                </button>
                <button className="nav-link" onClick={() => navigate('/bookings')}>
                  My trips
                </button>
                <button className="nav-link danger" onClick={logout}>
                  Log out
                </button>
              </nav>
            )}

            {usertype === 'admin' && (
              <nav className="nav-links">
                <span className="nav-pill">Admin console</span>
                <button className="nav-link" onClick={() => navigate('/admin')}>
                  Overview
                </button>
                <button className="nav-link" onClick={() => navigate('/all-users')}>
                  Travellers
                </button>
                <button className="nav-link" onClick={() => navigate('/all-bookings')}>
                  All bookings
                </button>
                <button className="nav-link" onClick={() => navigate('/all-flights')}>
                  Flight catalog
                </button>
                <button className="nav-link danger" onClick={logout}>
                  Log out
                </button>
              </nav>
            )}

            {usertype === 'flight-operator' && (
              <nav className="nav-links">
                <span className="nav-pill">Operator space</span>
                <button className="nav-link" onClick={() => navigate('/flight-admin')}>
                  Dashboard
                </button>
                <button className="nav-link" onClick={() => navigate('/flight-bookings')}>
                  Flight bookings
                </button>
                <button className="nav-link" onClick={() => navigate('/flights')}>
                  My flights
                </button>
                <button className="nav-link" onClick={() => navigate('/new-flight')}>
                  Add route
                </button>
                <button className="nav-link danger" onClick={logout}>
                  Log out
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
