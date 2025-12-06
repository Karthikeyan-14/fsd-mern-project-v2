import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to manage your trips and bookings.</p>

        <form className="authForm" onSubmit={handleLogin}>
          <div className="form-floating mb-3 authFormInputs">
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="loginEmail">Email address</label>
          </div>

          <div className="form-floating mb-3 authFormInputs">
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="loginPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Sign in
          </button>

          <p className="auth-switch">
            New to AirVoyage?{' '}
            <span onClick={() => setIsLogin(false)}>Create an account</span>
          </p>
        </form>
      </div>

      <div className="auth-side">
        <h3>Plan. Book. Fly.</h3>
        <p>Track your reservations and manage flights from a single place.</p>
      </div>
    </div>
  );
};

export default Login;
