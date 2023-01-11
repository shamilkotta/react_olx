import React, { useEffect, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';

const initialData = {
  name: "",
  email: "",
  phone: "",
  password: ""
}

export default function Signup() {
  const auth = getAuth();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      setError("");
    }
  }, [loading]);

  useEffect(() => {
    setError("");
  }, [data]);



  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => updateProfile(auth.currentUser, { displayName: data.name }))
      .then(() => addDoc(collection(db, "users"), { user: auth.currentUser.uid, email: data.email, phone: data.phone }))
      .then(() => {
        setData(initialData);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code === 'auth/email-already-in-use' ? "User already exist" : "Something went wrong");
      });
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img alt='olx' width="200px" align="middle" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => { setData((prevs) => ({ ...prevs, name: e.target.value })); }}
            required
          />
          <br />
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
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={(e) => { setData((prevs) => ({ ...prevs, phone: e.target.value })); }}
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
              <button type='submit'>Signup</button>
          }
        </form>
        <Link to="/login" >Login</Link>
      </div>
    </div>
  );
}
