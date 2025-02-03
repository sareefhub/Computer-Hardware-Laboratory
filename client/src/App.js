import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import User from "./pages/user";
import HardwareList from "./pages/hardware-list";
import BorrowEquipment from './pages/borrow-equipment';
import BorrowingHistory from "./pages/borrowing-history";
import HardwareDetail from './pages/hardware-detail';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/hardware-list' element={<HardwareList/>}/>
          <Route path='/borrow-equipment' element={<BorrowEquipment/>}/>
          <Route path='/borrowing-history' element={<BorrowingHistory/>}/>
          <Route path="/hardware-detail/:id" element={<HardwareDetail />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
