import { useGLTF } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function MarketCapsule(props: GroupProps) {
  const groupRef = useRef<THREE.Group>(null);

  const capsuleUrl = `${import.meta.env.BASE_URL}models/capsula.glb`;
  const winrarUrl = `${import.meta.env.BASE_URL}models/winrar.glb`;

  const { scene: capsuleScene } = useGLTF(capsuleUrl);
  const { scene: winrarOriginal } = useGLTF(winrarUrl);

  /* CLONAMOS LOS MODELOS (ESTO ARREGLA EL BUG) */

  const scene = useMemo(() => capsuleScene.clone(true), [capsuleScene]);
  const winrarScene = useMemo(() => winrarOriginal.clone(true), [winrarOriginal]);

  /* POSICION BASE PARA FLOTACION */

  const baseY = useRef(0);

  useEffect(() => {
    /* OCULTAR CRISTALES */

    scene.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;

      const mesh = obj as THREE.Mesh;
      const meshName = (mesh.name || '').toLowerCase();

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      const hasCrystalMaterial = materials.some((material) => {
        if (!material || typeof material !== 'object') return false;

        const materialName = ((material as THREE.Material).name || '').toLowerCase();

        return materialName.includes('crystal') || materialName.includes('cristal');
      });

      if (
        meshName.includes('crystal') ||
        meshName.includes('cristal') ||
        meshName.includes('gem') ||
        hasCrystalMaterial
      ) {
        mesh.visible = false;
      }
    });

    /* CENTRAR CAPSULA */

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const minY = box.min.y;

    scene.position.set(-center.x, -minY, -center.z);

    /* POSICION BASE DEL GRUPO */

    if (groupRef.current) {
      baseY.current = groupRef.current.position.y;
    }

    /* CONFIGURAR WINRAR */

    winrarScene.scale.set(0.22, 0.22, 0.22);

    /* CENTRAR WINRAR */

    const winrarBox = new THREE.Box3().setFromObject(winrarScene);
    const winrarCenter = winrarBox.getCenter(new THREE.Vector3());

    winrarScene.position.set(-winrarCenter.x, -winrarCenter.y + 1.3, -winrarCenter.z);

    scene.updateMatrixWorld(true);
  }, [scene, winrarScene]);

  /* ANIMACION */

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    /* FLOTACION */

    groupRef.current.position.y = baseY.current + Math.sin(t * 0.6) * 0.05;

    /* ROTACION */

    groupRef.current.rotation.y += 0.0015;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* CAPSULA */}

      <primitive object={scene} scale={2.5} rotation={[0, Math.PI * 0.15, 0]} />

      {/* WINRAR */}

      <primitive object={winrarScene} />
    </group>
  );
}

/* PRELOAD */

useGLTF.preload(`${import.meta.env.BASE_URL}models/capsula.glb`);
useGLTF.preload(`${import.meta.env.BASE_URL}models/winrar.glb`);
