import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarManagement() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <Link to="/Mainpage">
          <li className="nav-item"><a href="#">View Contributions</a></li>
        </Link>
        <Link to="/AddContributions">
          <li className="nav-item"><a href="#">Add Contributions</a></li>
        </Link>
        <Link to="/">
          <li className="nav-item"><a href="#">Log Out</a></li>
        </Link>
      </ul>
    </nav>
  );
}
