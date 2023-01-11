import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../App';
import { db } from '../../firebase/config';

import './View.css';
function View() {

  const { post } = useContext(PostContext);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(post);
    const q = query(collection(db, "users"), where("user", "==", post.userId));
    let userinfo;
    getDocs(q)
      .then((res) => {
        res.forEach(ele => {
          userinfo = ele.data();
        });
        setData({ ...post, userName: userinfo.name, phone: userinfo.phone });
      });

  }, [post])


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={data.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {250000} </p>
          <span>{data.name}</span>
          <p>{data.category}</p>
          <span>{data.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{data.userName}</p>
          <p>{data.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
