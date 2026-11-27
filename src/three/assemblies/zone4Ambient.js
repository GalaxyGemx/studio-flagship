import * as THREE from 'three';

/**
 * Zone 4 — Ambient Low-Poly 3D Architectural Wireframe Background
 * Subtle, slow-orbiting architectural massing envelope & telemetry horizon rings
 * that add unmistakable live WebGL depth behind the Universal B2B Estimator App
 * without competing with UI typography or readability.
 */
export function buildZone4Ambient(materials) {
  const root = new THREE.Group();
  root.name = 'Zone4_AmbientWireframe';

  const towers = [
    { w: 2.2, h: 5.4, d: 2.2, x: -4.2, z: -3.2 },
    { w: 1.7, h: 3.8, d: 1.9, x: -1.8, z: -4.8 },
    { w: 2.6, h: 6.2, d: 2.4, x: 4.4, z: -3.5 },
    { w: 1.8, h: 3.2, d: 1.8, x: 2.0, z: -5.2 },
    { w: 3.4, h: 1.4, d: 2.6, x: 0, z: -4.2 },
  ];

  towers.forEach((t, idx) => {
    const geom = new THREE.BoxGeometry(t.w, t.h, t.d, 2, 4, 2);
    const edges = new THREE.EdgesGeometry(geom, 10);
    const mat = idx % 2 === 0 ? materials.ambientWireLine : materials.ambientGoldLine;
    const wire = new THREE.LineSegments(edges, mat);
    wire.position.set(t.x, t.h / 2 - 2.6, t.z);
    root.add(wire);
  });

  // Sweeping orbital telemetry rings
  const buildRing = (radius, y, mat) => {
    const pts = [];
    const segs = 96;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius));
    }
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
  };

  const outerRing = buildRing(7.6, -2.5, materials.ambientWireLine);
  const midRing = buildRing(5.4, -2.45, materials.ambientGoldLine);
  const topRing = buildRing(6.8, 2.2, materials.ambientWireLine);
  topRing.rotation.z = 0.08;
  root.add(outerRing, midRing, topRing);

  function update(elapsed) {
    root.rotation.y = elapsed * 0.045;
    topRing.rotation.y = -elapsed * 0.07;
  }

  return {
    group: root,
    update,
  };
}
