import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userType') === 'admin') {
      navigate('/admin');
    } else if (localStorage.getItem('userType') === 'flight-operator') {
      navigate('/flight-admin');
    }
  }, [navigate]);

  const [Flights, setFlights] = useState([]);
  const fetchFlights = async () => {
    if (checkBox) {
      if (departure !== '' && destination !== '' && departureDate && returnDate) {
        const date = new Date();
        const date1 = new Date(departureDate);
        const date2 = new Date(returnDate);
        if (date1 > date && date2 > date1) {
          setError('');
          await axios.get('http://localhost:6001/fetch-flights').then((response) => {
            setFlights(response.data);
          });
        } else {
          setError('Please verify your journey and return dates.');
        }
      } else {
        setError('Please fill in all the journey details.');
      }
    } else {
      if (departure !== '' && destination !== '' && departureDate) {
        const date = new Date();
        const date1 = new Date(departureDate);
        if (date1 >= date) {
          setError('');
          await axios.get('http://localhost:6001/fetch-flights').then((response) => {
            setFlights(response.data);
          });
        } else {
          setError('Please select a valid future journey date.');
        }
      } else {
        setError('Please fill in all the journey details.');
      }
    }
  };

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  const handleTicketBooking = async (id, origin, destinationCity) => {
    if (userId) {
      if (origin === departure) {
        setTicketBookingDate(departureDate);
        navigate(`/book-flight/${id}`);
      } else if (destinationCity === departure) {
        setTicketBookingDate(returnDate);
        navigate(`/book-flight/${id}`);
      }
    } else {
      navigate('/auth');
    }
  };

  const cities = [
    'Chennai',
    'Banglore',
    'Hyderabad',
    'Mumbai',
    'Indore',
    'Delhi',
    'Pune',
    'Trivendrum',
    'Bhopal',
    'Kolkata',
    'varanasi',
    'Jaipur',
  ];

  return (
    <div className="landingPage">
      <div className="landing-hero-wrap">
        <div className="landingHero">
          <div className="landingHero-title">
            <h1 className="banner-h1">
              Find your next flight in just a few clicks.
            </h1>
            <p className="banner-p">
              Compare routes, check availability and lock in your seats with
              AirVoyage. Simple search, fast booking and clear details every time.
            </p>

            <ul className="banner-points">
              <li>No complex forms only key details</li>
              <li>Track all your bookings in one place</li>
              <li>Dedicated views for travellers, operators and admins</li>
            </ul>
          </div>

          <div className="landingHero-visual">
            <img
              src="https://th.bing.com/th/id/OIP.FxVHo8IuNRA24T12Ira4aAHaEo?w=285&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1"
              alt="Air travel illustration"
              className="hero-image"
            />
            <div className="hero-badge">
              <span>Live routes</span>
              <span>Instant confirmations</span>
            </div>
          </div>
        </div>

        {/* Search panel */}
        <div className="Flight-search-container input-container mb-4">
          <div className="search-header">
            <h3>Search flights</h3>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={(e) => setCheckBox(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Return journey
              </label>
            </div>
          </div>

          <div className="Flight-search-container-body">
            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                aria-label=".form-select-sm example"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelect">Departure city</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select form-select-sm mb-3"
                aria-label=".form-select-sm example"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <label htmlFor="floatingSelect">Destination city</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="date"
                className="form-control"
                id="floatingInputstartDate"
                value={departureDate || ''}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <label htmlFor="floatingInputstartDate">Journey date</label>
            </div>

            {checkBox && (
              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInputreturnDate"
                  value={returnDate || ''}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
                <label htmlFor="floatingInputreturnDate">Return date</label>
              </div>
            )}

            <div>
              <button className="btn btn-primary search-btn" onClick={fetchFlights}>
                Search flights
              </button>
            </div>
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>

      {/* Results */}
      {Flights.length > 0 && (
        <>
          {Flights.filter(
            (Flight) =>
              Flight.origin === departure && Flight.destination === destination
          ).length > 0 ? (
            <div className="availableFlightsContainer">
              <h1>Available options</h1>

              <div className="Flights">
                {checkBox ? (
                  <>
                    {Flights.filter(
                      (Flight) =>
                        (Flight.origin === departure &&
                          Flight.destination === destination) ||
                        (Flight.origin === destination &&
                          Flight.destination === departure)
                    ).map((Flight) => (
                      <div className="Flight card-flight" key={Flight._id}>
                        <div>
                          <p className="flight-title">
                            <b>{Flight.flightName}</b>
                          </p>
                          <p>
                            <b>Flight no:</b> {Flight.flightId}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>From:</b> {Flight.origin}
                          </p>
                          <p>
                            <b>Departure:</b> {Flight.departureTime}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>To:</b> {Flight.destination}
                          </p>
                          <p>
                            <b>Arrival:</b> {Flight.arrivalTime}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>Starting fare:</b> {Flight.basePrice}
                          </p>
                          <p>
                            <b>Seats left:</b> {Flight.totalSeats}
                          </p>
                        </div>
                        <button
                          className="button btn btn-primary"
                          onClick={() =>
                            handleTicketBooking(
                              Flight._id,
                              Flight.origin,
                              Flight.destination
                            )
                          }
                        >
                          Book seats
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {Flights.filter(
                      (Flight) =>
                        Flight.origin === departure &&
                        Flight.destination === destination
                    ).map((Flight) => (
                      <div className="Flight card-flight" key={Flight._id}>
                        <div>
                          <p className="flight-title">
                            <b>{Flight.flightName}</b>
                          </p>
                          <p>
                            <b>Flight no:</b> {Flight.flightId}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>From:</b> {Flight.origin}
                          </p>
                          <p>
                            <b>Departure:</b> {Flight.departureTime}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>To:</b> {Flight.destination}
                          </p>
                          <p>
                            <b>Arrival:</b> {Flight.arrivalTime}
                          </p>
                        </div>
                        <div>
                          <p>
                            <b>Starting fare:</b> {Flight.basePrice}
                          </p>
                          <p>
                            <b>Seats left:</b> {Flight.totalSeats}
                          </p>
                        </div>
                        <button
                          className="button btn btn-primary"
                          onClick={() =>
                            handleTicketBooking(
                              Flight._id,
                              Flight.origin,
                              Flight.destination
                            )
                          }
                        >
                          Book seats
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="availableFlightsContainer">
              <h1>No matching flights found</h1>
              <p>Try a different date or route.</p>
            </div>
          )}
        </>
      )}

      <section id="about" className="section-about p-4">
        <div className="container">
          <h2 className="section-title">Why AirVoyage?</h2>
          <p className="section-description">
            Our goal is to give you a clean, distraction-free way to search,
            compare and book flights. Whether it’s a quick city hop or a long
            journey, you can see routes, fares and timings in seconds.
          </p>
          <p className="section-description">
            Operators get a simple control panel to add routes, edit timings and
            view bookings. Admins can keep an eye on users, flights and overall
            activity without digging through complex menus.
          </p>
          <p className="section-description">
            From the first search to the final confirmation, AirVoyage keeps
            everything in one tidy place so you always know what’s next.
          </p>

          <span>
            <h5>2025 AirVoyage – &copy; All rights reserved</h5>
          </span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
