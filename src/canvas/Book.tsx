import { useGLTF } from '@react-three/drei';
import { GroupProps, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

function disposeClonedMaterials(root: THREE.Object3D) {
  root.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) {
      return;
    }

    const mesh = obj as THREE.Mesh;
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materials.forEach((material) => {
      material?.dispose();
    });
  });
}

export default function Book(props: GroupProps) {
  const { scene } = useGLTF('/models/Lunnaris3D.glb');
  const groupRef = useRef<THREE.Group>(null);

  const bookScene = useMemo(() => {
    const nextScene = scene.clone(true);
    const box = new THREE.Box3().setFromObject(nextScene);
    const center = box.getCenter(new THREE.Vector3());
    const minY = box.min.y;

    // Pivot under the book (bottom-center) so it rotates around its own axis.
    nextScene.position.set(-center.x, -minY, -center.z);

    // Reduce z-fighting on metallic details (e.g., letters) using polygon offset.
    nextScene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const meshName = mesh.name.toLowerCase();
        const nextMaterials = Array.isArray(mesh.material)
          ? mesh.material.map((material) => material?.clone())
          : mesh.material?.clone();

        mesh.material = nextMaterials;

        const materials = Array.isArray(nextMaterials) ? nextMaterials : [nextMaterials];

        materials.forEach((material) => {
          if (!material || typeof material !== 'object') return;

          const mat = material as THREE.MeshStandardMaterial;
          const matName = (mat.name || '').toLowerCase();
          const isSpine =
            meshName.includes('lomo') ||
            meshName.includes('spine') ||
            matName.includes('lomo') ||
            matName.includes('spine');
          const isLettering =
            meshName.includes('letra') ||
            meshName.includes('texto') ||
            meshName.includes('title') ||
            meshName.includes('text') ||
            meshName.includes('logo') ||
            meshName.includes('emblem') ||
            matName.includes('letra') ||
            matName.includes('texto') ||
            matName.includes('title') ||
            matName.includes('text') ||
            matName.includes('logo') ||
            matName.includes('emblem');

          if (isSpine && isLettering) {
            mat.map = null;
            mat.needsUpdate = true;
          }

          if (isLettering) {
            mat.polygonOffset = true;
            mat.polygonOffsetFactor = -2;
            mat.polygonOffsetUnits = -2;
            mat.depthWrite = false;
            mat.depthTest = true;
            mat.emissive = new THREE.Color('#ffd27a');
            mat.emissiveIntensity = 0.9;
            mat.metalness = 0;
            mat.roughness = 1;
            mat.envMapIntensity = 0;
            mat.toneMapped = false;
            mat.needsUpdate = true;
          }

          if (mat.map) {
            mat.map.anisotropy = 8;
            mat.map.generateMipmaps = true;
            mat.map.minFilter = THREE.LinearMipmapLinearFilter;
            mat.map.magFilter = THREE.LinearFilter;
            mat.map.needsUpdate = true;
          }

          if (mat.metalness !== undefined && mat.metalness > 0.4) {
            mat.polygonOffset = true;
            mat.polygonOffsetFactor = -1;
            mat.polygonOffsetUnits = -1;
            mat.needsUpdate = true;
          }
        });
      }
    });

    nextScene.updateMatrixWorld(true);
    return nextScene;
  }, [scene]);

  useEffect(() => {
    return () => {
      disposeClonedMaterials(bookScene);
    };
  }, [bookScene]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive object={bookScene} scale={1.2} rotation={[0, Math.PI * 0.15, 0]} />
    </group>
  );
}

useGLTF.preload('/models/Lunnaris3D.glb');
