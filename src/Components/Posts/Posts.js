import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../App';

import Heart from '../../assets/Heart';
import { db } from '../../firebase/config';
import './Post.css';

function Posts() {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { setPost } = useContext(PostContext);

  useEffect(() => {
    getDocs(collection(db, "posts"))
      .then((data) => {
        let arr = [];
        data.forEach((ele) => {
          arr.push(ele.data());
        });
        setPosts([...arr]);
      });

  }, []);


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            posts.map((ele) => 
              <div
                onClick={() => {
                  setPost(ele);
                  navigate("/viewpost");
                }}
                className="card"
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={ele.image} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {ele.price}</p>
                  <span className="kilometer">{ele.category}</span>
                  <p className="name"> {ele.name}</p>
                </div>
                <div className="date">
                  <span>{ele.createdAt}</span>
                </div>
              </div>
            )
          }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            posts.map((ele) =>
              <div
                onClick={() => {
                  setPost(ele);
                  navigate("/viewpost");
                }}
                className="card"
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={ele.image} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {ele.price}</p>
                  <span className="kilometer">{ele.category}</span>
                  <p className="name"> {ele.name}</p>
                </div>
                <div className="date">
                  <span>{ele.createdAt}</span>
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default Posts;
