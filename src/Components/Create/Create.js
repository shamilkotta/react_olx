import React, { useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from '../../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../../App';

const initialForm = {
  name: "",
  category: "",
  price: "",
};

const Create = () => {
  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);
  const date = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image) {
      setLoading(false);
      setError("Please select a image");
      return;
    };
    const storageRef = ref(storage, `posts/${Date.now()}.png`);
    uploadBytes(storageRef, image)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => addDoc(collection(db, "posts"), { ...formData, image: url, userId: user.userId, createdAt: date.toLocaleDateString() }))
      .then((res) => {
        setLoading(false);
        setFormData(initialForm);
        setImage(null);
        setSuccess("Post added successfully");
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong");
      });
  };

  useEffect(() => {
    if (loading) setError("");
  }, [loading]);

  useEffect(() => {
    setError("");
  }, [formData, image]);



  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              defaultValue="John"
              value={formData.name}
              onChange={(e) => { setFormData(data => ({ ...data, name: e.target.value })); }}
              required
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              defaultValue="John"
              value={formData.category}
              onChange={(e) => { setFormData(data => ({ ...data, category: e.target.value })); }}
              required
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={(e) => { setFormData((data) => ({ ...data, price: e.target.value })); }}
              required
            />
            <br />
            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
            <br />
            <input type="file" required onChange={(e) => {
              setImage(e.target.files[0]);
            }} />
            <br />
            <p style={{ color: "red" }}>{error}</p>
            <p style={{ color: "green" }}>{success}</p>
            {
              loading ?
                <button className="uploadBtn" disabled>Loading...</button>
                :
                <button className="uploadBtn">Upload and Submit</button>
            }
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;
