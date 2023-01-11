import React from 'react';

import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
