import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Stock Market Dashboard</h1>
        <p>Real-time stock data and AI predictions</p>
      </div>
    </header>
  );
};

export default Header;