import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import User from "./pages/user";
import HardwareList from "./pages/hardware-list";


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
        </Routes>
    </BrowserRouter>
  );
}

export default App;
