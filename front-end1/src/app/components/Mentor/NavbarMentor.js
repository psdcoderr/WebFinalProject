import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarMentor() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <Link to="/mentor">
          <li className="nav-item"><a href="#">View All Contributions</a></li>
        </Link>
        <Link to="/Approval">
          <li className="nav-item"><a href="#">View Approved Contributions</a></li>
        </Link>
        <Link to="/">
          <li className="nav-item"><a href="#">Log Out</a></li>
        </Link>
      </ul>
    </nav>
  );
}
