import React from 'react';
import { useParams } from 'react-router-dom';
import hardwareData from '../mockData/hardwareData';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import './hardware-detail.css';

const HardwareDetail = () => {
  const { id } = useParams();  // ดึง ID จาก URL
  const hardware = hardwareData.find(item => item.id === parseInt(id));

  if (!hardware) {
    return <div>Item not found!</div>;
  }

  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="content-page">
          <div className="hardware-detail">
            <h2>{hardware.deviceName}</h2>
            <p><strong>Category:</strong> {hardware.category}</p>
            <p><strong>Total Quantity:</strong> {hardware.totalQuantity}</p>
            <p><strong>Borrowed Quantity:</strong> {hardware.borrowedQuantity}</p>
            <p><strong>Remaining Quantity:</strong> {hardware.totalQuantity - hardware.borrowedQuantity}</p>
            <p><strong>Price per Unit:</strong> ${hardware.pricePerUnit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareDetail;
