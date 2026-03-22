import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';
import fs from 'fs';
import path from 'path';

// ================================
// CONFIGURACIÓN DEL LIBRO (PARÁMETROS)
// ================================

const BOOK = {
  width: 0.21, // ancho portada (m)
  height: 0.29, // alto libro
  coverThickness: 0.003, // grosor tapas
  spineWidth: 0.03, // ancho lomo
  pagesThickness: 0.02, // grosor páginas
};

// ================================
// ESCENA
// ================================

const scene = new THREE.Scene();

// Material neutro (placeholder)
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});

// ================================
// HELPERS
// ================================

function createBox(w, h, d, name) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, baseMaterial.clone());
  mesh.name = name;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  return mesh;
}

// ================================
// PIEZAS DEL LIBRO
// ================================

// Portada
const coverFront = createBox(BOOK.width, BOOK.height, BOOK.coverThickness, 'Cover_Front');

// Contraportada
const coverBack = createBox(BOOK.width, BOOK.height, BOOK.coverThickness, 'Cover_Back');

// Lomo
const spine = createBox(BOOK.spineWidth, BOOK.height, BOOK.coverThickness, 'Spine');

// Bloque de páginas
const pages = createBox(BOOK.width - 0.01, BOOK.height - 0.01, BOOK.pagesThickness, 'Pages_Block');

// ================================
// POSICIONAMIENTO
// ================================

const halfBook = BOOK.spineWidth / 2 + BOOK.coverThickness / 2;

coverFront.position.x = halfBook + BOOK.coverThickness;
coverBack.position.x = -halfBook - BOOK.coverThickness;

spine.position.x = 0;
pages.position.x = 0;

// ================================
// GRUPO RAÍZ (BOOK ROOT)
// ================================

const bookRoot = new THREE.Group();
bookRoot.name = 'Book_Root';

bookRoot.add(coverFront);
bookRoot.add(spine);
bookRoot.add(coverBack);
bookRoot.add(pages);

scene.add(bookRoot);

// ================================
// EXPORTAR A GLB (GDB)
// ================================

const exporter = new GLTFExporter();

exporter.parse(
  scene,
  (glb) => {
    const outputDir = './output';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const filePath = path.join(outputDir, 'Book_GDB.glb');
    const buffer = Buffer.from(new Uint8Array(glb));
    fs.writeFileSync(filePath, buffer);

    console.log('✅ Book_GDB.glb generado correctamente');
  },
  { binary: true }
);
