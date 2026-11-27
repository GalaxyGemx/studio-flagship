import * as THREE from 'three';

/**
 * Creates a rounded-rectangle chamfered/beveled box centered at (0,0,0).
 * Every extruded bevel catches McLaren-style specular rim light.
 */
export function createBeveledBox(
  width,
  height,
  depth,
  { radius = 0.04, bevelSize = 0.025, bevelThickness = 0.025, bevelSegments = 2 } = {}
) {
  const safeR = Math.min(radius, width * 0.4, depth * 0.4);
  const w = Math.max(0.02, width - bevelSize * 2);
  const d = Math.max(0.02, depth - bevelSize * 2);
  const hw = w / 2;
  const hd = d / 2;

  const shape = new THREE.Shape();
  shape.moveTo(-hw + safeR, -hd);
  shape.lineTo(hw - safeR, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + safeR);
  shape.lineTo(hw, hd - safeR);
  shape.quadraticCurveTo(hw, hd, hw - safeR, hd);
  shape.lineTo(-hw + safeR, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - safeR);
  shape.lineTo(-hw, -hd + safeR);
  shape.quadraticCurveTo(-hw, -hd, -hw + safeR, -hd);

  const extrudeDepth = Math.max(0.01, height - bevelThickness * 2);
  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: extrudeDepth,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments,
    curveSegments: 5,
  });

  // Extrude builds along +Z; rotate so `height` aligns along Y axis, then center
  geom.rotateX(-Math.PI / 2);
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a chamfered vertical panel extruded along Z (ideal for smart hardware chassis layers).
 */
export function createBeveledPlateZ(
  width,
  height,
  thickness,
  { radius = 0.14, bevelSize = 0.025, bevelThickness = 0.02, bevelSegments = 2 } = {}
) {
  const safeR = Math.min(radius, width * 0.35, height * 0.35);
  const w = Math.max(0.04, width - bevelSize * 2);
  const h = Math.max(0.04, height - bevelSize * 2);
  const hw = w / 2;
  const hh = h / 2;

  const shape = new THREE.Shape();
  shape.moveTo(-hw + safeR, -hh);
  shape.lineTo(hw - safeR, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + safeR);
  shape.lineTo(hw, hh - safeR);
  shape.quadraticCurveTo(hw, hh, hw - safeR, hh);
  shape.lineTo(-hw + safeR, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - safeR);
  shape.lineTo(-hw, -hh + safeR);
  shape.quadraticCurveTo(-hw, -hh, -hw + safeR, -hh);

  const depth = Math.max(0.008, thickness - bevelThickness * 2);
  const geom = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments,
    curveSegments: 6,
  });

  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a hollow beveled rectangular frame (for architectural crowns, mullions, hardware unibody chassis).
 */
export function createBeveledFrame(
  outerW,
  outerH,
  thickness,
  frameWidth,
  { radius = 0.14, bevelSize = 0.02, bevelThickness = 0.02, alignY = false } = {}
) {
  const hw = outerW / 2;
  const hh = outerH / 2;
  const r = Math.min(radius, hw * 0.4, hh * 0.4);

  const outer = new THREE.Shape();
  outer.moveTo(-hw + r, -hh);
  outer.lineTo(hw - r, -hh);
  outer.quadraticCurveTo(hw, -hh, hw, -hh + r);
  outer.lineTo(hw, hh - r);
  outer.quadraticCurveTo(hw, hh, hw - r, hh);
  outer.lineTo(-hw + r, hh);
  outer.quadraticCurveTo(-hw, hh, -hw, hh - r);
  outer.lineTo(-hw, -hh + r);
  outer.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  const ihw = Math.max(0.05, hw - frameWidth);
  const ihh = Math.max(0.05, hh - frameWidth);
  const ir = Math.max(0.02, r - frameWidth * 0.5);

  const hole = new THREE.Path();
  hole.moveTo(-ihw + ir, -ihh);
  hole.lineTo(ihw - ir, -ihh);
  hole.quadraticCurveTo(ihw, -ihh, ihw, -ihh + ir);
  hole.lineTo(ihw, ihh - ir);
  hole.quadraticCurveTo(ihw, ihh, ihw - ir, ihh);
  hole.lineTo(-ihw + ir, ihh);
  hole.quadraticCurveTo(-ihw, ihh, -ihw, ihh - ir);
  hole.lineTo(-ihw, -ihh + ir);
  hole.quadraticCurveTo(-ihw, -ihh, -ihw + ir, -ihh);
  outer.holes.push(hole);

  const geom = new THREE.ExtrudeGeometry(outer, {
    depth: Math.max(0.01, thickness - bevelThickness * 2),
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments: 2,
    curveSegments: 6,
  });

  if (alignY) {
    geom.rotateX(-Math.PI / 2);
  }
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a machined chamfered circular ring (optical sensor lens, UWB coil, emblem ring).
 */
export function createBeveledRing(
  outerR,
  innerR,
  depth,
  { segments = 48, bevelSize = 0.014, bevelThickness = 0.014 } = {}
) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);

  const hole = new THREE.Path();
  hole.absarc(0, 0, Math.max(0.02, innerR), 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.01, depth - bevelThickness * 2),
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments: 2,
    curveSegments: segments,
  });

  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Wraps a mesh with CAD edge contour lines + BIM wireframe overlay lines
 * so both studio solid mode and Structural Wireframe mode look razor-sharp.
 */
export function createArchitectMesh(geometry, material, materials, { castShadow = true, receiveShadow = true } = {}) {
  const group = new THREE.Group();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  mesh.userData.isSolidArch = true;
  group.add(mesh);

  const edgesGeom = new THREE.EdgesGeometry(geometry, 26);
  const cadEdges = new THREE.LineSegments(edgesGeom, materials.cadEdgeLine);
  cadEdges.userData.isCadEdge = true;
  group.add(cadEdges);

  const bimEdges = new THREE.LineSegments(edgesGeom, materials.bimWireframeLine);
  bimEdges.userData.isBimEdge = true;
  group.add(bimEdges);

  return group;
}

/**
 * Builds a realistic unitized glass curtain wall assembly with recessed
 * brushed aluminum vertical mullions and horizontal spandrel transoms.
 */
export function createCurtainWallPanel(width, height, cols, rows, materials) {
  const panel = new THREE.Group();

  // Glass pane
  const glassMesh = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.04, height - 0.04, 0.032),
    materials.curtainGlass
  );
  glassMesh.userData.isGlass = true;
  panel.add(glassMesh);

  // Vertical mullions (fins projecting slightly forward for crisp rim reflection)
  const mullionGeom = new THREE.BoxGeometry(0.032, height, 0.075);
  for (let c = 0; c <= cols; c++) {
    const x = -width / 2 + (c / cols) * width;
    const fin = new THREE.Mesh(mullionGeom, materials.brushedAluminum);
    fin.position.set(x, 0, 0.015);
    panel.add(fin);
  }

  // Horizontal transoms / spandrel rails
  const transomGeom = new THREE.BoxGeometry(width, 0.036, 0.06);
  for (let r = 0; r <= rows; r++) {
    const y = -height / 2 + (r / rows) * height;
    const rail = new THREE.Mesh(transomGeom, materials.titaniumGraphite);
    rail.position.set(0, y, 0.01);
    panel.add(rail);
  }

  // BIM contour edge
  const outlineGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(width, height, 0.07));
  const bimLine = new THREE.LineSegments(outlineGeom, materials.bimWireframeLine);
  panel.add(bimLine);

  return panel;
}

/**
 * Builds a perimeter structural steel diagrid / moment frame cage.
 */
export function createDiagridCage(width, height, depth, baysX, baysZ, stories, materials) {
  const cage = new THREE.Group();
  const colMat = materials.structuralSteel;
  const colThick = 0.055;

  // Perimeter vertical H-columns
  const colGeom = new THREE.BoxGeometry(colThick, height, colThick);
  for (let ix = 0; ix <= baysX; ix++) {
    const x = -width / 2 + (ix / baysX) * width;
    for (const z of [-depth / 2, depth / 2]) {
      const col = new THREE.Mesh(colGeom, colMat);
      col.position.set(x, 0, z);
      cage.add(col);
    }
  }
  for (let iz = 1; iz < baysZ; iz++) {
    const z = -depth / 2 + (iz / baysZ) * depth;
    for (const x of [-width / 2, width / 2]) {
      const col = new THREE.Mesh(colGeom, colMat);
      col.position.set(x, 0, z);
      cage.add(col);
    }
  }

  // Horizontal ring beams per story
  const beamXGeom = new THREE.BoxGeometry(width, 0.05, 0.05);
  const beamZGeom = new THREE.BoxGeometry(0.05, 0.05, depth);
  for (let s = 0; s <= stories; s++) {
    const y = -height / 2 + (s / stories) * height;
    for (const z of [-depth / 2, depth / 2]) {
      const bx = new THREE.Mesh(beamXGeom, colMat);
      bx.position.set(0, y, z);
      cage.add(bx);
    }
    for (const x of [-width / 2, width / 2]) {
      const bz = new THREE.Mesh(beamZGeom, colMat);
      bz.position.set(x, y, 0);
      cage.add(bz);
    }
  }

  // Diagonal architectural cross-bracing on front & back elevations
  const bayW = width / baysX;
  const storyH = height / stories;
  const diagLen = Math.hypot(bayW, storyH);
  const diagAngle = Math.atan2(storyH, bayW);
  const diagGeom = new THREE.BoxGeometry(diagLen, 0.026, 0.026);

  for (let s = 0; s < stories; s++) {
    const cy = -height / 2 + (s + 0.5) * storyH;
    for (let ix = 0; ix < baysX; ix++) {
      const cx = -width / 2 + (ix + 0.5) * bayW;
      const dir = (s + ix) % 2 === 0 ? 1 : -1;
      for (const z of [-depth / 2, depth / 2]) {
        const brace = new THREE.Mesh(diagGeom, materials.brushedAluminum);
        brace.position.set(cx, cy, z);
        brace.rotation.z = dir * diagAngle;
        cage.add(brace);
      }
    }
  }

  return cage;
}
