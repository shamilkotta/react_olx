import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

const initialData = {
  email: "",
  password: ""
}

function Login() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) setError("");
  }, [loading]);

  useEffect(() => {
    setError("");
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        setData(initialData);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === 'auth/wrong-password') {
          setError("Wrong credentials!");
        } else if (err.code === 'auth/user-not-found') {
          setError("Can't find the user");
        } else {
          setError("Something went wrong");
        }
      });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img alt='olx' width="200px" align="middle" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={(e) => { setData((prevs) => ({ ...prevs, email: e.target.value })); }}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={(e) => { setData((prevs) => ({ ...prevs, password: e.target.value })); }}
            required
          />
          <br />
          <br />
          <p style={{ color: "red" }}>{error}</p>
          {
            loading ?
              <button disabled>Loading...</button>
              :
              <button type='submit'>Login</button>
          }
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
