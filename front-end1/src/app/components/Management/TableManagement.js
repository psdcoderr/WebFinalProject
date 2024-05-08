// import Navbar from '../Navbar';
import NavbarManagement from './NavbarManagement';
import SidebarManagement from './SidebarManagement';
import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:4005/management';
const RECORDS_PER_PAGE = 5;

const Table = () => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getItems();
  }, [currentPage]);

  useEffect(() => {
    const endIndex = currentPage * RECORDS_PER_PAGE;
    const newDisplayedItems = items.slice(0, endIndex);
    setDisplayedItems(newDisplayedItems);
  }, [items, currentPage]);

  const getItems = () => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err))
  }

  const handleUpdate = (id) => {
    const itemToUpdate = items.find(item => item.id === id);
  
    // Open a popup/modal to update item
    const contributions = window.prompt("Enter Contributions:", itemToUpdate.Contributions);
    const points = window.prompt("Enter Points:", itemToUpdate.Points);
  
    // If contributions or points are null (user canceled the prompt), do nothing
    if (contributions === null || points === null) {
      return;
    }
  
    // Make PATCH request to update item
    fetch(`${API_BASE}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Contributions: contributions,
        Points: points
      })
    })
    .then(response => {
      if (response.ok) {
        // Update item in local state
        const updatedItems = items.map(item => {
          if (item.id === id) {
            return { ...item, Contributions: contributions, Points: points };
          }
          return item;
        });
        setItems(updatedItems);
        console.log(`Item with ID ${id} has been updated.`);
      } else {
        console.error(`Failed to update item with ID ${id}.`);
      }
    })
    .catch(err => console.error('Error:', err));
  }
  

  
  const handleDelete = (id) => {
    console.log("Delete button clicked for id:", id);
    fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        console.log(`Item with ID ${id} has been deleted.`);
      } else {
        console.error(`Failed to delete item with ID ${id}.`);
      }
    })
    .catch(err => console.error('Error:', err));
  }
    

  const handleShowMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  return (
    <>
      
      {/* <SidebarManagement/> */}
      {/* <Navbar/> */}
      <NavbarManagement/>
      <div>
          <table className="table">
            <thead>
              <tr>
                <th>Contributions</th>
                <th>Points</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.Contributions}</td>
                  <td>{item.Points}</td>
                  <td><button className="signup-btn" onClick={() => handleUpdate(item.id)}>Update</button></td>
                  <td><button className="login-btn" onClick={() => handleDelete(item.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table> 
          {items.length > currentPage * RECORDS_PER_PAGE && (
            <button onClick={handleShowMore}>Show More</button>
          )}
      </div>
       
    </>
  );
};

export default Table;
