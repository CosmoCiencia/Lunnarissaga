import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, Sparkles, Stars } from '@react-three/drei';
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import type { MobileLayoutConfig } from '../config/mobileLayout';
import Book from './Book';

function CameraRig({
  position,
  target,
  controlsRef,
}: {
  position: [number, number, number];
  target: [number, number, number];
  controlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
}) {
  const { camera } = useThree();

  useLayoutEffect(() => {
    const isValid = [...position, ...target].every((value) => Number.isFinite(value));
    if (!isValid) return;

    camera.position.set(...position);
    camera.lookAt(...target);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.set(...target);
      controlsRef.current.update();
    }
  }, [camera, position, target, controlsRef]);

  return null;
}

type StageProps = {
  mobileLayout: MobileLayoutConfig;
};

export default function Stage({ mobileLayout }: StageProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const pedestalPosition: [number, number, number] = isMobile
    ? [0, mobileLayout.stage.pedestalY, 0]
    : [0, 0.45, 0];

  const bookPosition: [number, number, number] = isMobile
    ? [0, mobileLayout.stage.bookY, 0]
    : [0, 0.8, 0];

  const cameraPosition: [number, number, number] = isMobile
    ? [0, mobileLayout.stage.cameraY, mobileLayout.stage.cameraZ]
    : [0, 1.9, 6.5];

  const cameraTarget: [number, number, number] = isMobile
    ? [0, mobileLayout.stage.targetY, 0]
    : [0, 1, 0];

  const cameraFov = isMobile ? mobileLayout.stage.fov : 45;

  const baseScale = 0.7;
  const responsiveScale = isMobile ? baseScale * mobileLayout.stage.scale : baseScale;

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: cameraPosition, fov: cameraFov, near: 0.1, far: 246 }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#05050f', 8, 26]} />

      {/* 🔥 cielo base */}
      <mesh scale={120} frustumCulled={false}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#05050f" side={THREE.BackSide} />
      </mesh>

      {/* 🔥 estrellas */}
      <Stars radius={140} depth={80} count={2600} factor={3.2} saturation={0} fade speed={0.6} />

      {/* 🔥 partículas */}
      <Sparkles count={220} scale={[18, 10, 18]} size={4} speed={0.6} color="#9ae6ff" />
      <Sparkles count={140} scale={[10, 6, 10]} size={6} speed={0.4} color="#b18cff" />

      {/* 🔥 pedestal */}
      {!isMobile || mobileLayout.stage.pedestalVisibleMobile ? (
        <group position={pedestalPosition} scale={0.5}>
          <mesh receiveShadow>
            <cylinderGeometry args={[1.6, 1.85, 0.4, 64]} />
            <meshStandardMaterial
              color="#14132e"
              metalness={0.5}
              roughness={0.45}
              emissive="#2a2a55"
              emissiveIntensity={0.25}
            />
          </mesh>

          <mesh position={[0, 0.24, 0]} receiveShadow>
            <cylinderGeometry args={[1.35, 1.4, 0.12, 64]} />
            <meshStandardMaterial
              color="#1b1a3b"
              metalness={0.7}
              roughness={0.3}
              emissive="#3a2d78"
              emissiveIntensity={0.4}
            />
          </mesh>

          <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.05, 64]} />
            <meshBasicMaterial
              color="#7fd3ff"
              transparent
              opacity={0.18}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh position={[0, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.75, 64]} />
            <meshBasicMaterial
              color="#b18cff"
              transparent
              opacity={0.22}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.9, 1.05, 128]} />
            <meshStandardMaterial
              color="#2c2b55"
              emissive="#6ef3ff"
              emissiveIntensity={0.6}
              metalness={0.2}
              roughness={0.3}
              transparent
              opacity={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ) : null}

      {/* 🔥 luces (igual) */}
      <ambientLight intensity={0.35} color="#a8c6ff" />
      <directionalLight position={[4.5, 6, 3]} intensity={1.25} color="#b6ccff" />
      <directionalLight position={[-3, 3, -4]} intensity={0.5} color="#6ef3ff" />
      <directionalLight position={[-4, 2, 3]} intensity={0.7} color="#ffe4b8" />
      <pointLight position={[-0.8, 1.2, -0.2]} intensity={0.6} color="#ffd8a8" distance={3} />
      <hemisphereLight intensity={0.45} color="#a9b4ff" groundColor="#0b0f2a" />
      <pointLight position={[0, 2.6, 1.6]} intensity={1.4} color="#ffe1a6" distance={10} />
      <pointLight position={[0, -1.2, 2.2]} intensity={0.6} color="#7fd3ff" />

      <spotLight
        position={[0, 3.8, 2.2]}
        intensity={3.2}
        angle={0.38}
        penumbra={0.75}
        distance={12}
        color="#ffe8b8"
      />
      <spotLight
        position={[-2.5, 2.6, 1.5]}
        intensity={1.6}
        angle={0.6}
        penumbra={0.8}
        distance={10}
        color="#ffd8a8"
      />
      <spotLight
        position={[2.8, 2.4, 1.8]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.8}
        distance={10}
        color="#fff2c5"
      />
      <spotLight
        position={[0, -1, 0.8]}
        intensity={5}
        angle={0.55}
        penumbra={0.9}
        distance={6}
        color="#ffd8a8"
      />

      <pointLight position={[0, 2.2, -3.5]} intensity={0.5} color="#b18cff" />

      {/* 🔥 environment igual */}
      <Environment preset="night" environmentIntensity={0.9} background={false} />

      {/* 🔥 libro (ya optimizado desde Book.tsx) */}
      <Suspense fallback={null}>
        <Book scale={responsiveScale} position={bookPosition} rotation={[0, Math.PI, 0]} />
      </Suspense>

      <CameraRig position={cameraPosition} target={cameraTarget} controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2.2}
        target={cameraTarget}
      />
    </Canvas>
  );
}
