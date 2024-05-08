import React, { useState, useEffect } from 'react';
import NavbarMentor from './NavbarMentor';

const API_BASE = 'http://localhost:4007/mentor';
const SOCIETY_API_BASE = 'http://localhost:4006/society';

const ApprovalTable = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(SOCIETY_API_BASE)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }

  const handleApprove = (id) => {
    updateStatus(id, 'Approved');
  }

  const handleDeny = (id) => {
    updateStatus(id, 'Denied');
  }

  const updateStatus = (id, status) => {
    fetch(`${SOCIETY_API_BASE}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Status: status })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Status updated:', data);
      getItems();
    })
    .catch(err => console.log(err));
  }

  return (
    <>
    <NavbarMentor/>
      <table className="table custom-width-table">
        <thead>
          <tr>
            <th>Contributions</th>
            <th>Points</th>
            <th>Society</th>
            <th>Approve</th>
            <th>Deny</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.Contributions}</td>
              <td>{item.Points}</td>
              <td>{item.Society}</td>
              <td>
                <button className='login-btn' onClick={() => handleApprove(item.id)}>Approve</button>
              </td>
              <td>
                <button className='signup-btn' onClick={() => handleDeny(item.id)}>Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ApprovalTable;
