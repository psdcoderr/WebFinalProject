import React, { useState, useEffect } from 'react';
import NavbarSociety from './NavbarSociety';

const API_BASE = 'http://localhost:4006/society';

const TableSociety = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err))
  }

  const handleUpdate = (id) => {
    const itemToUpdate = items.find(item => item.id === id);

    const contributions = itemToUpdate.Contributions;

    const society = window.prompt("Enter Society:", itemToUpdate.Society);
    if (society === null) return;

    const mentor = window.prompt("Enter Mentor:", itemToUpdate.Mentor);
    if (mentor === null) return;

    const note = window.prompt("Enter Note:", itemToUpdate.Note);
    if (note === null) return;

    const updatedItem = {
      Society: society,
      Mentor: mentor,
      Note: note
    };

    fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
    .then(response => response.json())
    .then(data => {

      setItems(prevItems => prevItems.map(item => {
        if (item.id === id) {
          return data;
        }
        return item;
      }));
    })
    .catch(err => console.log(err));
  }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
    
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    })
    .catch(err => console.log(err));
  }
  

  return (
    <>
    <NavbarSociety/>
    
      <table className="table custom-width-table">
        <thead>
          <tr>
            <th>Contributions</th>
            <th>Points</th>
            <th>Society</th>
            <th>Mentor</th>
            <th>Status</th>
            <th>Note</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.Contributions}</td>
              <td>{item.Points}</td>
              <td>{item.Society}</td>
              <td>{item.Mentor}</td>
              <td>{item.Status}</td>
              <td>{item.Note}</td>
              <td><button className="signup-btn" onClick={() => handleUpdate(item.id)}>Update</button></td>
              <td><button className="login-btn" onClick={() => handleDelete(item.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableSociety;
