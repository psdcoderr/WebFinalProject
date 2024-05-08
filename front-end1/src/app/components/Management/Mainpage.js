import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Table from './TableManagement';

export default function Mainpage(props) {
  const {setItems,items} = props;
  

  return (
    <>
        <Table/>
    </>
  )
}
