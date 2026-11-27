import * as THREE from 'three';
import {
  createArchitectMesh,
  createBeveledBox,
  createBeveledRing,
} from '../geometryBuilders.js';

/**
 * Zone 5 — Magnetic Reassembly & Unified Studio Emblem
 * 24 precision architectural shards (anodized titanium blades, frosted glass core
 * facets, brushed aluminum compass bars, and warm amber/cyan meridian rings)
 * scatter in helical space and magnetically lock together as the user scrolls
 * into the final studio engagement zone.
 */
export function buildZone5Emblem(materials) {
  const root = new THREE.Group();
  root.name = 'Zone5_MagneticStudioEmblem';

  const shards = [];

  const registerShard = (mesh, restPos, restRot, scatterVec, scatterRot, delay = 0) => {
    mesh.userData.restPos = new THREE.Vector3(...restPos);
    mesh.userData.restRot = new THREE.Euler(...restRot);
    mesh.userData.scatterPos = new THREE.Vector3(...scatterVec);
    mesh.userData.scatterRot = new THREE.Euler(...scatterRot);
    mesh.userData.delay = delay;
    root.add(mesh);
    shards.push(mesh);
    return mesh;
  };

  // 1. Inner Cyan Telemetry Energy Core (Octahedron heart)
  const coreGeom = new THREE.OctahedronGeometry(0.46, 0);
  const coreMesh = new THREE.Mesh(coreGeom, materials.cyanEmissive);
  registerShard(coreMesh, [0, 0, 0], [0, 0, 0], [0, 3.2, -2.5], [1.8, 2.2, 0.8], 0.0);

  // 2. Frosted Crystal Inner Octa-Prism Shell (2 opposing pyramids)
  const pyrGeom = new THREE.ConeGeometry(0.86, 1.05, 4);
  const topPyr = new THREE.Mesh(pyrGeom, materials.sapphireGlass);
  registerShard(topPyr, [0, 0.56, 0], [0, Math.PI / 4, 0], [-2.8, 3.8, 1.8], [1.2, -1.5, 0.9], 0.06);

  const botPyr = new THREE.Mesh(pyrGeom, materials.sapphireGlass);
  registerShard(botPyr, [0, -0.56, 0], [Math.PI, Math.PI / 4, 0], [2.6, -3.6, 1.6], [-1.1, 1.7, -0.8], 0.08);

  // 3. 8 Chamfered Anodized Titanium Compass Blades (forming the architectural monolith silhouette)
  const bladeGeom = createBeveledBox(0.24, 1.68, 0.42, { radius: 0.03, bevelSize: 0.02, bevelThickness: 0.02 });
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const isCardinal = i % 2 === 0;
    const r = isCardinal ? 1.18 : 0.96;
    const blade = createArchitectMesh(
      bladeGeom,
      isCardinal ? materials.titaniumDark : materials.titaniumGraphite,
      materials
    );
    const rx = Math.cos(angle) * r;
    const rz = Math.sin(angle) * r;
    const ry = isCardinal ? 0 : (i % 4 === 1 ? 0.22 : -0.22);

    const scatterR = 4.6 + (i % 3) * 1.1;
    const scatterY = (i % 2 === 0 ? 1 : -1) * (2.2 + (i % 3) * 0.8);

    registerShard(
      blade,
      [rx, ry, rz],
      [0, -angle, isCardinal ? 0.14 : -0.18],
      [Math.cos(angle + 0.9) * scatterR, scatterY, Math.sin(angle + 0.9) * scatterR],
      [angle * 0.7, angle * 1.4, (i % 2 ? 1 : -1) * 1.2],
      0.1 + i * 0.03
    );
  }

  // 4. 4 Brushed Aluminum Cardinal Spire Fins (North / South / East / West architectural pointers)
  const spireGeom = createBeveledBox(0.14, 0.92, 0.18, { radius: 0.02, bevelSize: 0.014, bevelThickness: 0.014 });
  const cardinalDirs = [
    { pos: [0, 1.56, 0], rot: [0, 0, 0], scatter: [0.4, 5.2, -1.8] },
    { pos: [0, -1.56, 0], rot: [0, 0, Math.PI], scatter: [-0.6, -5.0, 2.0] },
    { pos: [1.68, 0, 0], rot: [0, 0, -Math.PI / 2], scatter: [5.4, 1.2, -2.2] },
    { pos: [-1.68, 0, 0], rot: [0, 0, Math.PI / 2], scatter: [-5.4, -1.2, 2.2] },
  ];
  cardinalDirs.forEach((d, idx) => {
    const spire = createArchitectMesh(spireGeom, materials.brushedAluminum, materials);
    registerShard(
      spire,
      d.pos,
      d.rot,
      d.scatter,
      [1.4 - idx * 0.5, 2.1, -1.3],
      0.24 + idx * 0.04
    );
  });

  // 5. Equatorial Warm Amber Meridian Ring (split into 4 precision arc quadrants that magnetically snap!)
  const ringSegGeom = new THREE.TorusGeometry(1.76, 0.045, 16, 28, Math.PI / 2 - 0.14);
  for (let q = 0; q < 4; q++) {
    const startAngle = q * (Math.PI / 2) + 0.07;
    const arc = new THREE.Mesh(ringSegGeom, materials.amberEmissive);
    const wrapper = new THREE.Group();
    arc.rotation.z = startAngle;
    wrapper.add(arc);

    const outAngle = startAngle + Math.PI / 4;
    registerShard(
      wrapper,
      [0, 0, 0],
      [Math.PI / 2.25, 0, 0],
      [Math.cos(outAngle) * 4.2, (q % 2 === 0 ? 2.6 : -2.6), Math.sin(outAngle) * 4.2],
      [Math.PI / 2 + 1.1, outAngle, -0.8],
      0.34 + q * 0.03
    );
  }

  // 6. Outer Machined Titanium Gimbal Ring + 4 Precision Corner Telemetry Nodes
  const outerGimbal = new THREE.Mesh(
    createBeveledRing(2.14, 2.02, 0.1, { segments: 72, bevelSize: 0.015, bevelThickness: 0.015 }),
    materials.titaniumDark
  );
  registerShard(
    outerGimbal,
    [0, 0, 0],
    [0.35, -0.25, 0],
    [0, -4.4, -3.5],
    [1.8, 1.2, 0.9],
    0.42
  );

  const nodeGeom = createBeveledBox(0.22, 0.22, 0.22, { radius: 0.03, bevelSize: 0.016, bevelThickness: 0.016 });
  for (let n = 0; n < 4; n++) {
    const a = (n / 4) * Math.PI * 2 + Math.PI / 4;
    const node = createArchitectMesh(nodeGeom, n % 2 === 0 ? materials.brushedAluminum : materials.amberEmissive, materials);
    registerShard(
      node,
      [Math.cos(a) * 2.08, Math.sin(a) * 0.52, Math.sin(a) * 2.08],
      [0.4, a, 0.4],
      [Math.cos(a) * 6.2, (n % 2 === 0 ? 3.5 : -3.5), Math.sin(a) * 6.2],
      [2.1, -1.6, 1.2],
      0.46 + n * 0.02
    );
  }

  /**
   * Drives magnetic reassembly:
   * progress = 0 (scattered in architectural space) -> progress = 1 (magnetically snapped studio emblem).
   */
  function setReassemblyProgress(progress) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    shards.forEach((shard) => {
      const delay = shard.userData.delay * 0.35;
      const localT = THREE.MathUtils.clamp((p - delay) / (1 - delay), 0, 1);
      // Magnetic snap cubic-out with subtle overshoot settle feel
      const eased = 1 - Math.pow(1 - localT, 3.2);

      // Curved helical magnetic pull
      const arcSwirl = Math.sin(localT * Math.PI) * 0.75 * (1 - eased);
      shard.position.lerpVectors(shard.userData.scatterPos, shard.userData.restPos, eased);
      shard.position.x += Math.cos(localT * 4.0) * arcSwirl;
      shard.position.z += Math.sin(localT * 4.0) * arcSwirl;

      shard.rotation.x = THREE.MathUtils.lerp(shard.userData.scatterRot.x, shard.userData.restRot.x, eased);
      shard.rotation.y = THREE.MathUtils.lerp(shard.userData.scatterRot.y, shard.userData.restRot.y, eased);
      shard.rotation.z = THREE.MathUtils.lerp(shard.userData.scatterRot.z, shard.userData.restRot.z, eased);
    });
  }

  function update(elapsed, reassemblyProgress) {
    // Graceful architectural poise rotation once locked together
    const spinSpeed = 0.22 + (1 - reassemblyProgress) * 0.15;
    root.rotation.y = elapsed * spinSpeed;
    root.position.y = Math.sin(elapsed * 1.1) * 0.08 * reassemblyProgress;
  }

  setReassemblyProgress(0);

  return {
    group: root,
    shardCount: shards.length,
    setReassemblyProgress,
    update,
  };
}
