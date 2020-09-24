import React from 'react';

import './app-header.css';

const AppHeader = ({allPosts, likedPosts}) => {
  return ( 
      <div className="app-header d-flex">
        <h1>Andrei Maniukevich</h1>
        <h2>{allPosts} posts, {likedPosts} liked</h2>
      </div>
  )
}

export default AppHeader;