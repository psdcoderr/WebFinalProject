'use client'

import Signup from "./components/Signin/Signup";
import Signin from "./components/Signin/Signin";
import Mainpage from "./components/Management/Mainpage";
import { BrowserRouter as Router, Route, Routes, Link, Switch } from 'react-router-dom';
import { useEffect, useState } from "react";
import Mentor from "./components/Mentor/Mentor";
import Society from "./components/Society/Society";
import AddContribution from "./components/Management/AddContribution";

import Add from "./components/Society/Add";

import ApprovalTable from "./components/Mentor/Approval";




// Give server.js port and route.
const API_BASE = 'http://localhost:4003/users';

export default function Home() {

  // Items me DB data stored. Will be sent as props.
    const [items, setItems] = useState([]);
  
    // Getting data When component reloads/loads
    //useEffect(function(), data(optional));
    useEffect(() => {
      GetTodos();
    }, []);
  
  
    // fetch = get command.
    const GetTodos = () => {
      fetch(API_BASE)
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(err => console.log(err))
    }
  
  
  
  
  return (
    <>


      <Router>

        <Routes>
          <Route path="/" element={<Signin/>}/>
        </Routes>

        <Routes>
          <Route path="/Management" element={<Mainpage/>}/>
        </Routes>

        <Routes>
          <Route path="/Approval" element={<ApprovalTable/>}/>
        </Routes>

        <Routes>
          <Route path="/Addstd" element={<Add/>}/>
        </Routes>

        
        <Routes>
          <Route path="/AddContributions" element={<AddContribution/>}/>
        </Routes>

        <Routes>
          <Route path="/society" element={<Society/>}/>
        </Routes>

        <Routes>
          <Route path="/mentor" element={<Mentor/>}/>
        </Routes>

        <Routes>
          <Route path="/Signup" element={<Signup/>}/>
        </Routes>

        <Routes>
          <Route path="/Mainpage" element={<Mainpage setItems={setItems} items={items} />} />
        </Routes>

      </Router>
    </>
  );
}
