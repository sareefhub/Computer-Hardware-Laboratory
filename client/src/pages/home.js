import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import ArduinoModel from '../models/arduinomodel';
import './home.css';

const Home = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="home-content-page">
          <div className="canvas-container">
            <Canvas>
              <Suspense fallback={null}>
                <ambientLight />
                <ArduinoModel />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>
          <div className="rule">
            <h1>กฎในการยืมของ</h1>
            <ul>
              <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit et maxime blanditiis voluptatem animi tempora temporibus aperiam minima, veritatis velit?</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, dolore!</li>
              <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, veniam molestias. Laborum voluptas cum officiis, ipsam pariatur eos nihil consequatur!</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, eaque?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
