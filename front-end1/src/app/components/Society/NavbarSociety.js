import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarSociety() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <Link to="/society">
          <li className="nav-item"><a href="#">View Contributions</a></li>
        </Link>
        <Link to="/Addstd">
          <li className="nav-item"><a href="#">Contribute</a></li>
        </Link>
        <Link to="/">
          <li className="nav-item"><a href="#">Log Out</a></li>
        </Link>
      </ul>
    </nav>
  );
}
