import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const { setUsername, setEmail, setPassword, setUsertype, register } =
    useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h2 className="auth-title">Create your AirVoyage account</h2>
        <p className="auth-subtitle">
          Choose your role and start booking or managing flights.
        </p>

        <form className="authForm" onSubmit={handleRegister}>
          <div className="form-floating mb-3 authFormInputs">
            <input
              type="text"
              className="form-control"
              id="registerName"
              placeholder="Full name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="registerName">Full name</label>
          </div>

          <div className="form-floating mb-3 authFormInputs">
            <input
              type="email"
              className="form-control"
              id="registerEmail"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="registerEmail">Email address</label>
          </div>

          <div className="form-floating mb-3 authFormInputs">
            <input
              type="password"
              className="form-control"
              id="registerPassword"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="registerPassword">Password</label>
          </div>

          <div className="form-floating mb-4">
            <select
              className="form-select"
              id="registerRole"
              defaultValue=""
              onChange={(e) => setUsertype(e.target.value)}
            >
              <option value="" disabled>
                Select account type
              </option>
              <option value="customer">Traveller</option>
              <option value="flight-operator">Flight operator</option>
              <option value="admin">Administrator</option>
            </select>
            <label htmlFor="registerRole">Role</label>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Sign up
          </button>

          <p className="auth-switch">
            Already have an account?{' '}
            <span onClick={() => setIsLogin(true)}>Sign in</span>
          </p>
        </form>
      </div>

      <div className="auth-side">
        <h3>One platform for everyone</h3>
        <p>Travellers, operators and admins work together smoothly here.</p>
      </div>
    </div>
  );
};

export default Register;
