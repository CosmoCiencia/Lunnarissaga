import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, Sparkles, Stars } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import MarketCapsule from './MarketCapsule';

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

  useEffect(() => {
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

export default function MarketStage3D() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  /* CONFIGURACION BASE DE LA ESCENA */

  const defaults = useMemo(
    () => ({
      /* POSICION CAPSULA */

      posX: -2.2,
      posY: -0.55,
      posZ: 0,

      scale: 1.2,

      /* CAMARA */

      camX: 1.3,
      camY: 1.8,
      camZ: 5.8,

      targetX: -2.0,
      targetY: 1.0,
      targetZ: 0,
    }),
    []
  );

  const bookPosition: [number, number, number] = [
    defaults.posX,
    isMobile ? 0.19 : defaults.posY,
    defaults.posZ,
  ];

  const cameraPosition: [number, number, number] = [defaults.camX, defaults.camY, defaults.camZ];

  const cameraTarget: [number, number, number] = [
    defaults.targetX,
    defaults.targetY,
    defaults.targetZ,
  ];

  const responsiveScale = isMobile ? defaults.scale * 0.85 : defaults.scale;

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
      camera={{
        position: cameraPosition,
        fov: 45,
        near: 0.1,
        far: 300,
      }}
    >
      {/* BACKGROUND */}

      <color attach="background" args={['#02030a']} />

      <fog attach="fog" args={['#05050f', 6, 22]} />

      {/* SKY SPHERE */}

      <mesh scale={120}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#05050f" side={THREE.BackSide} />
      </mesh>

      {/* STARS */}

      <Stars radius={160} depth={80} count={3200} factor={3.5} saturation={0} fade speed={0.7} />

      {/* PARTICLES */}

      <Sparkles count={260} scale={[12, 8, 12]} size={4} speed={0.6} color="#9ae6ff" />

      <Sparkles count={160} scale={[8, 6, 8]} size={6} speed={0.45} color="#b18cff" />

      {/* LIGHTING */}

      <ambientLight intensity={0.38} color="#a8c6ff" />

      <directionalLight position={[4.5, 6, 3]} intensity={1.25} color="#b6ccff" />

      <directionalLight position={[-3, 3, -4]} intensity={0.55} color="#6ef3ff" />

      <directionalLight position={[-4, 2, 3]} intensity={0.75} color="#ffe4b8" />

      <pointLight position={[0, 2.6, 1.6]} intensity={1.4} color="#ffe1a6" distance={10} />

      <spotLight
        position={[0, 3.8, 2.2]}
        intensity={3.4}
        angle={0.38}
        penumbra={0.75}
        distance={12}
        color="#ffe8b8"
      />

      <Environment preset="night" environmentIntensity={1} background={false} />

      {/* CAPSULE */}

      <MarketCapsule
        scale={responsiveScale}
        position={bookPosition}
        rotation={[Math.PI * -0.15, Math.PI * 0.95, 0]}
      />

      {/* CAMERA RIG */}

      <CameraRig position={cameraPosition} target={cameraTarget} controlsRef={controlsRef} />

      {/* CONTROLS */}

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
