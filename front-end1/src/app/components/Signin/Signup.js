import React, { useState } from 'react';

export default function Signup() {
  const API_BASE = 'http://localhost:4003/users';

  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneno(event.target.value);
  };

  const handleEmailIdChange = (event) => {
    setEmailId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName,
          LastName,
          phoneno,
          emailid,
          password,
          role,
        }),
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
    <div className="Main-Container">
      <div className="Image-left">
        <form className="Signup-page">
          <div className="container Signup-Form-Design">
            <h1>Hello There! Sign up</h1>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                value={FirstName}
                onChange={handleFirstNameChange}
              />
              <label htmlFor="fname">First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Last Name"
                value={LastName}
                onChange={handleLastNameChange}
              />
              <label htmlFor="lname">Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="ID"
                value={emailid}
                onChange={handleEmailIdChange}
              />
              <label htmlFor="id">ID</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <label htmlFor="password">password</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="tel"
                id="phone"
                className="form-control"
                name="phone"
                placeholder="Phone"
                value={phoneno}
                onChange={handlePhoneChange}
                pattern="\+[0-9]{2}-[0-9]{3}-[0-9]{6}"
              />
              <label htmlFor="phone">Phone No:</label>
            </div>

            <div className="form-floating mb-3">
              <select
                id="role"
                className="form-control"
                name="role"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="">Select Role</option>
                <option value="management">Management</option>
                <option value="mentor">Mentor</option>
                <option value="society">Society</option>
              </select>
              <label htmlFor="role">Role:</label>
            </div>

            <button className="signup-btn" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}