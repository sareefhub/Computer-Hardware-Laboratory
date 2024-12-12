import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const ArduinoModel = () => {
  const { scene } = useGLTF(process.env.PUBLIC_URL + '/models/Arduino.gltf');
  
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.005;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={[4, 4, 4]} />;
};

export default ArduinoModel;
