import React from 'react';

import '../styles/components/loading.css';

const Loading:React.FC = () => {
  
  return (
    <div id="loading-container">
      <div className="load-spinner"></div>
      <h1>Loading</h1>
    </div>
  )
}

export default Loading;