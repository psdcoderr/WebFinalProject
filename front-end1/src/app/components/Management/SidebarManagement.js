import React from 'react';
import { Link } from 'react-router-dom';

const SidebarManagement = () => {
  return (
    <>
      <div className="sidebar">
        <header>Contribution System</header>
        <Link to="/Mainpage">
          <i className="fas fa-qrcode"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/AddContributions">
          <span>Contributions</span>
        </Link>
        <a href="#">
          <span>Credentials</span>
        </a>
      </div>
    </>
  );
};

export default SidebarManagement;
