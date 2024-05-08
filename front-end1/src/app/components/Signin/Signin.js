import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:4003/users';

export default function Signin() {
    const [emailid, setemailId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleemailIdChange = (event) => {
        setemailId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const login = async () => {
        const data = { emailid, password };
        try {
            const response = await axios.post(`${API_BASE}/signin`, data, { withCredentials: true });
    
            if (response.status === 200) {
                const { role, token } = response.data;
                switch (role) {
                    case 'management':
                        navigate('/Mainpage');
                        break;
                    case 'society':
                        navigate('/society');
                        break;
                    case 'mentor':
                        navigate('/Mentor');
                        break;
                    default:
                        navigate('/DefaultPage');
                        break;
                }
                localStorage.setItem('role', role);
                localStorage.setItem('token', token); // Store the token securely
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    return (
        <div>
            <div className="Signin-page">
                <div className="container Signin-Form-Design">
                    <h1 className="heading">Welcome to <br/> Contribution System</h1>
                    <hr className="divider"/>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="id" placeholder="ID" value={emailid} onChange={handleemailIdChange} />
                        <label htmlFor="id">ID</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="button-container">
                        <button className="login-btn" onClick={login}>Login</button>
                        <button className="signup-btn">
                            <Link className="linkxxx" to="/Signup">Sign Up</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );      
}
