import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Mask() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh ref={ref} scale={1.6}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial color="#c5a36a" metalness={0.25} roughness={0.6} />
    </mesh>
  );
}
