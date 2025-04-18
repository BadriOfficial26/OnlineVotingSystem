import React from 'react';
import Navbar from './Navbar';

function Home() {
  const backgroundStyle = {
    backgroundImage: 'url("https://t3.ftcdn.net/jpg/07/60/72/52/360_F_760725292_3ztmAm9RqImDc74VIb3H3jBPQznfOfOl.jpg")', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '91vh', // Ensure the background covers the full viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white', // Text color on top of the background image
  };

  return (
    <div>
      <Navbar/>
    <div style={backgroundStyle}>
      {/* Your content here */}
    </div>
    </div>
  );
}

export default Home;
