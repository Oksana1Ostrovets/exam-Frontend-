import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav> 
      <Link to="/" style={{ marginRight: '15px' }}>Головна</Link>
      <Link to="/horizontal" style={{ marginRight: '15px' }}> Світлофор</Link>
    </nav>
  );
};

export default Header;