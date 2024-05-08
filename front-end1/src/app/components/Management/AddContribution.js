import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Link,useNavigate } from 'react-router-dom';
import NavbarManagement from './NavbarManagement';

import { useRouter } from 'next/router';


export default function AddContribution() {

  const API_BASE = 'http://localhost:4005/management';

  const [Contributions, setContribution] = useState('');
  const [Points, setPoints] = useState('');

  const handleContributionChange = (event) => {
    setContribution(event.target.value);
  };

  const handlePointsChange = (event) => {
    setPoints(event.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Contributions, Points }),
      });
  
      if (response.ok) {
        console.log('Data stored successfully.');
        console.log(response);
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  
  return (
    
    <div class="Main-Container">
      <NavbarManagement/>
      
      <div class="Signup-page">
        <div class="container Signup-Form-Design">
        <h1 className='heading'>Add New Contribution</h1>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="contribution" placeholder="Contribution" value={Contributions} onChange={handleContributionChange}/>
            <label for="contribution">Contribution</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="points" placeholder="Points" value={Points} onChange={handlePointsChange}/>
            <label for="points">Points</label>
          </div>

          <button className='login-btn' onClick={handleSubmit}>Send</button>

        </div>
      </div>
    </div>
  );
}
