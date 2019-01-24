import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>No encontramos esta página</h1>
    <Link to="/">Ir al Home</Link>
  </div>
);

export default NotFound;
