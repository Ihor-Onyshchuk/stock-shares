import React from 'react';

import loadingSpiner from '../../assets/loading-spiner.gif';
import './LoadingSpiner.scss'

const LoadingSpiner = () => (
  <div className="d-inline-block load-indicator">
      <img className="load-img" src={loadingSpiner} />
      <div className="load-bg"></div>
  </div>
);

export default LoadingSpiner;