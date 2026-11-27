import * as THREE from 'three';
import {
  createArchitectMesh,
  createBeveledBox,
  createBeveledFrame,
  createCurtainWallPanel,
  createDiagridCage,
} from '../geometryBuilders.js';

/**
 * Zone 2 — Mini-Teardown #1: Preconstruction & Structural Layers
 * 15 distinct architectural & engineering building layers that explode cleanly
 * along the vertical Y-axis (with radial glazing peel) on scroll scrub.
 * Includes live 3D world anchor points and layer highlight/isolation support.
 */
export function buildZone2Structural(materials) {
  const root = new THREE.Group();
  root.name = 'Zone2_StructuralTeardown';

  const layers = [];
  const layerGroupsByKey = {};

  const registerLayer = (obj, { id, key, restPos, explodeDelta, anchorLocal = [1.3, 0, 0.9] }) => {
    obj.name = id;
    obj.position.set(...restPos);
    obj.userData.key = key;
    obj.userData.restPos = new THREE.Vector3(...restPos);
    obj.userData.explodeDelta = new THREE.Vector3(...explodeDelta);

    const anchor = new THREE.Object3D();
    anchor.position.set(...anchorLocal);
    obj.add(anchor);
    obj.userData.anchor = anchor;

    // Cache original materials so Isolate/Highlight mode can cleanly restore them
    obj.traverse((child) => {
      if (child.isMesh && !child.userData.origMaterial) {
        child.userData.origMaterial = child.material;
      }
    });

    root.add(obj);
    layers.push(obj);
    if (!layerGroupsByKey[key]) layerGroupsByKey[key] = [];
    layerGroupsByKey[key].push(obj);
    return obj;
  };

  // Layer 01: Rooftop Architectural Crown & Bifacial Solar Canopy
  const crownGroup = new THREE.Group();
  crownGroup.add(
    createArchitectMesh(
      createBeveledFrame(2.45, 2.45, 0.24, 0.22, { radius: 0.08, alignY: true, bevelSize: 0.02, bevelThickness: 0.02 }),
      materials.titaniumDark,
      materials
    )
  );
  const solarCanopy = createArchitectMesh(
    createBeveledBox(1.88, 0.08, 1.88, { radius: 0.04, bevelSize: 0.01, bevelThickness: 0.01 }),
    materials.pcbSubstrate,
    materials
  );
  solarCanopy.position.y = 0.14;
  crownGroup.add(solarCanopy);
  const crownGlow = new THREE.Mesh(
    createBeveledFrame(2.5, 2.5, 0.045, 0.045, { radius: 0.09, alignY: true, bevelSize: 0.006, bevelThickness: 0.006 }),
    materials.amberEmissive
  );
  crownGlow.position.y = 0.11;
  crownGroup.add(crownGlow);
  registerLayer(crownGroup, {
    id: 'L01_CrownSolar',
    key: 'crown',
    restPos: [0, 2.58, 0],
    explodeDelta: [0, 2.55, 0],
    anchorLocal: [1.28, 0.12, 0.85],
  });

  // Layer 02: Mechanical Penthouse & Acoustic Chiller Plant
  const penthouseGroup = new THREE.Group();
  penthouseGroup.add(
    createArchitectMesh(
      createBeveledBox(1.72, 0.42, 1.72, { radius: 0.06, bevelSize: 0.02, bevelThickness: 0.02 }),
      materials.titaniumGraphite,
      materials
    )
  );
  // Twin rooftop chiller drums
  for (const offset of [-0.38, 0.38]) {
    const chiller = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.92, 16),
      materials.brushedAluminum
    );
    chiller.rotation.z = Math.PI / 2;
    chiller.position.set(0, 0.04, offset);
    penthouseGroup.add(chiller);
  }
  registerLayer(penthouseGroup, {
    id: 'L02_MechanicalPenthouse',
    key: 'crown',
    restPos: [0, 2.22, 0],
    explodeDelta: [0, 1.98, 0],
    anchorLocal: [0.9, 0.1, 0.7],
  });

  // Layer 03: Unitized Curtain Wall Glazing — North/East Façade (peels out +X/+Z on explode!)
  const curtainNE = new THREE.Group();
  const frontCW = createCurtainWallPanel(2.38, 2.9, 6, 8, materials);
  frontCW.position.z = 1.19;
  const eastCW = createCurtainWallPanel(2.38, 2.9, 6, 8, materials);
  eastCW.rotation.y = Math.PI / 2;
  eastCW.position.x = 1.19;
  curtainNE.add(frontCW, eastCW);
  registerLayer(curtainNE, {
    id: 'L03_CurtainWallNE',
    key: 'curtainWall',
    restPos: [0, 0.65, 0],
    explodeDelta: [1.15, 0.82, 0.92],
    anchorLocal: [1.2, 0.75, 1.15],
  });

  // Layer 04: Unitized Curtain Wall Glazing — South/West Façade (peels out -X/-Z)
  const curtainSW = new THREE.Group();
  const backCW = createCurtainWallPanel(2.38, 2.9, 6, 8, materials);
  backCW.position.z = -1.19;
  const westCW = createCurtainWallPanel(2.38, 2.9, 6, 8, materials);
  westCW.rotation.y = Math.PI / 2;
  westCW.position.x = -1.19;
  curtainSW.add(backCW, westCW);
  registerLayer(curtainSW, {
    id: 'L04_CurtainWallSW',
    key: 'curtainWall',
    restPos: [0, 0.65, 0],
    explodeDelta: [-1.15, 0.72, -0.88],
    anchorLocal: [-1.15, 0.7, -1.1],
  });

  // Layer 05: Executive Penthouse Floor Plate Stack (L18–L21)
  const execPlates = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const plate = createArchitectMesh(
      createBeveledBox(2.18, 0.1, 2.18, { radius: 0.06, bevelSize: 0.015, bevelThickness: 0.015 }),
      materials.titaniumDark,
      materials
    );
    plate.position.y = (i - 1) * 0.28;
    execPlates.add(plate);
  }
  registerLayer(execPlates, {
    id: 'L05_ExecutivePlates',
    key: 'floorPlates',
    restPos: [0, 1.62, 0],
    explodeDelta: [0, 1.4, 0],
    anchorLocal: [1.1, 0.1, 0.7],
  });

  // Layer 06: Upper Perimeter Structural Steel Diagrid Cage
  const upperSteel = createDiagridCage(2.26, 1.55, 2.26, 3, 3, 3, materials);
  registerLayer(upperSteel, {
    id: 'L06_UpperSteelDiagrid',
    key: 'steelFrame',
    restPos: [0, 1.18, 0],
    explodeDelta: [-0.42, 0.88, 0.35],
    anchorLocal: [-1.12, 0.1, 1.12],
  });

  // Layer 07: Level 12 Cantilevered Amenity Sky-Deck (Glowing Amber Rim)
  const skyDeck = new THREE.Group();
  skyDeck.add(
    createArchitectMesh(
      createBeveledBox(2.68, 0.15, 2.68, { radius: 0.08, bevelSize: 0.02, bevelThickness: 0.02 }),
      materials.titaniumDark,
      materials
    )
  );
  const deckAmber = new THREE.Mesh(
    createBeveledFrame(2.72, 2.72, 0.045, 0.05, { radius: 0.09, alignY: true, bevelSize: 0.006, bevelThickness: 0.006 }),
    materials.amberEmissive
  );
  skyDeck.add(deckAmber);
  registerLayer(skyDeck, {
    id: 'L07_AmenitySkyDeck',
    key: 'floorPlates',
    restPos: [0, 0.88, 0],
    explodeDelta: [0, 0.62, 0],
    anchorLocal: [1.36, 0.04, 1.15],
  });

  // Layer 08: Class-A Office Floor Plate Stack (L06–L11)
  const officePlates = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const slab = createArchitectMesh(
      createBeveledBox(2.22, 0.1, 2.22, { radius: 0.06, bevelSize: 0.015, bevelThickness: 0.015 }),
      materials.titaniumGraphite,
      materials
    );
    slab.position.y = (i - 1.5) * 0.28;
    officePlates.add(slab);

    // Thin edge telemetry trim on each floor plate
    if (i % 2 === 0) {
      const strip = new THREE.Mesh(
        createBeveledFrame(2.26, 2.26, 0.025, 0.03, { radius: 0.065, alignY: true, bevelSize: 0.004, bevelThickness: 0.004 }),
        materials.amberEmissive
      );
      strip.position.y = slab.position.y;
      officePlates.add(strip);
    }
  }
  registerLayer(officePlates, {
    id: 'L08_OfficeFloorStack',
    key: 'floorPlates',
    restPos: [0, 0.16, 0],
    explodeDelta: [0, 0.05, 0],
    anchorLocal: [1.14, 0.18, 0.85],
  });

  // Layer 09: Central Glowing MEP / HVAC Vertical Riser Core & Ductwork
  const mepGroup = new THREE.Group();
  const riserPositions = [
    [-0.36, 0, -0.36],
    [0.36, 0, -0.36],
    [-0.36, 0, 0.36],
    [0.36, 0, 0.36],
  ];
  riserPositions.forEach(([rx, ry, rz], idx) => {
    const pipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 2.55, 16),
      idx % 2 === 0 ? materials.cyanEmissive : materials.amberEmissive
    );
    pipe.position.set(rx, ry, rz);
    mepGroup.add(pipe);
  });
  // Horizontal HVAC manifold collar rings
  for (let m = -2; m <= 2; m++) {
    const manifold = new THREE.Mesh(
      createBeveledFrame(1.24, 1.24, 0.06, 0.08, { radius: 0.06, alignY: true, bevelSize: 0.008, bevelThickness: 0.008 }),
      m === 0 ? materials.cyanEmissive : materials.brushedAluminum
    );
    manifold.position.y = m * 0.48;
    mepGroup.add(manifold);
  }
  registerLayer(mepGroup, {
    id: 'L09_MEPHvacCore',
    key: 'mepCore',
    restPos: [0, 0.6, 0],
    explodeDelta: [0.58, -0.18, -0.45],
    anchorLocal: [0.64, 0.25, 0.42],
  });

  // Layer 10: Reinforced Elevator & Shear Concrete Core Shaft
  const shearCore = createArchitectMesh(
    createBeveledBox(0.84, 2.75, 0.84, { radius: 0.04, bevelSize: 0.02, bevelThickness: 0.02 }),
    materials.concreteBasalt,
    materials
  );
  registerLayer(shearCore, {
    id: 'L10_ShearConcreteCore',
    key: 'mepCore',
    restPos: [0, 0.55, 0],
    explodeDelta: [-0.45, -0.35, -0.35],
    anchorLocal: [0.45, 0.1, 0.45],
  });

  // Layer 11: Level 4 Long-Span Transfer Truss & Structural Moment Frame
  const transferTruss = createDiagridCage(2.65, 0.52, 2.65, 4, 4, 1, materials);
  registerLayer(transferTruss, {
    id: 'L11_TransferTrussL04',
    key: 'steelFrame',
    restPos: [0, -0.72, 0],
    explodeDelta: [0, -0.75, 0],
    anchorLocal: [-1.34, 0.05, 1.12],
  });

  // Layer 12: Retail Podium Glazing & Warm Amber Storefront Bays
  const retailPodium = new THREE.Group();
  const rInner = new THREE.Mesh(
    createBeveledBox(2.96, 0.64, 2.96, { radius: 0.06, bevelSize: 0.018, bevelThickness: 0.018 }),
    materials.retailInteriorGlow
  );
  retailPodium.add(rInner);
  const rGlassFront = createCurtainWallPanel(3.18, 0.68, 7, 1, materials);
  rGlassFront.position.z = 1.59;
  const rGlassRight = createCurtainWallPanel(3.18, 0.68, 7, 1, materials);
  rGlassRight.rotation.y = Math.PI / 2;
  rGlassRight.position.x = 1.59;
  retailPodium.add(rGlassFront, rGlassRight);
  registerLayer(retailPodium, {
    id: 'L12_RetailPodiumBays',
    key: 'curtainWall',
    restPos: [0, -1.26, 0],
    explodeDelta: [0, -1.16, 0],
    anchorLocal: [1.58, 0.0, 1.2],
  });

  // Layer 13: Podium Structural Plaza Slab & Architectural Canopy
  const podiumDeck = createArchitectMesh(
    createBeveledBox(3.65, 0.18, 3.65, { radius: 0.1, bevelSize: 0.025, bevelThickness: 0.02 }),
    materials.titaniumDark,
    materials
  );
  registerLayer(podiumDeck, {
    id: 'L13_PodiumPlazaDeck',
    key: 'steelFrame',
    restPos: [0, -1.66, 0],
    explodeDelta: [0, -1.56, 0],
    anchorLocal: [1.8, 0.04, 1.4],
  });

  // Layer 14: Below-Grade Structured Parking Vault (3 Levels)
  const parkingVault = new THREE.Group();
  for (let p = 0; p < 2; p++) {
    const deck = createArchitectMesh(
      createBeveledBox(3.4, 0.12, 3.4, { radius: 0.08, bevelSize: 0.018, bevelThickness: 0.016 }),
      materials.concreteBasalt,
      materials
    );
    deck.position.y = p * 0.28 - 0.14;
    parkingVault.add(deck);
  }
  // Subgrade EV lighting strips
  const evStrip = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.03, 0.06), materials.cyanEmissive);
  evStrip.position.set(0, 0.02, 1.62);
  parkingVault.add(evStrip);
  registerLayer(parkingVault, {
    id: 'L14_SubgradeParkingVault',
    key: 'foundation',
    restPos: [0, -2.04, 0],
    explodeDelta: [0, -1.96, 0],
    anchorLocal: [1.72, 0.02, 1.25],
  });

  // Layer 15: Deep Foundation Mat Slab & Drilled Granite Caisson Pilings
  const foundation = new THREE.Group();
  foundation.add(
    createArchitectMesh(
      createBeveledBox(3.75, 0.2, 3.75, { radius: 0.1, bevelSize: 0.025, bevelThickness: 0.025 }),
      materials.concreteBasalt,
      materials
    )
  );
  const pilingGeom = new THREE.CylinderGeometry(0.11, 0.09, 0.72, 12);
  for (const px of [-1.25, 0, 1.25]) {
    for (const pz of [-1.25, 0, 1.25]) {
      const piling = new THREE.Mesh(pilingGeom, materials.structuralSteel);
      piling.position.set(px, -0.44, pz);
      foundation.add(piling);
    }
  }
  registerLayer(foundation, {
    id: 'L15_DeepMatCaissons',
    key: 'foundation',
    restPos: [0, -2.42, 0],
    explodeDelta: [0, -2.38, 0],
    anchorLocal: [1.85, -0.1, 1.35],
  });

  let currentActiveKey = 'mepCore';
  let isIsolated = false;

  /**
   * Smoothly scrubs all 15 structural building layers from assembled (0) to exploded (1).
   */
  function setExplosionProgress(progress) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    // Smooth architectural S-curve ease
    const eased = p * p * (3 - 2 * p);

    layers.forEach((layer, idx) => {
      // Subtle micro-stagger so upper & outer assemblies lead with weighted momentum
      const stagger = (idx / layers.length) * 0.14;
      const localP = THREE.MathUtils.clamp((eased - stagger * 0.5) / (1 - stagger * 0.5), 0, 1);
      layer.position.lerpVectors(
        layer.userData.restPos,
        layer.userData.restPos.clone().add(layer.userData.explodeDelta),
        localP
      );
    });
  }

  /**
   * Highlights the clicked 3D hotspot layer and optionally ghosts non-selected layers.
   */
  function setActiveLayer(layerKey, isolate = false) {
    currentActiveKey = layerKey;
    isIsolated = isolate;

    layers.forEach((layer) => {
      const isSelected = layer.userData.key === currentActiveKey;
      layer.traverse((child) => {
        if (!child.isMesh || !child.userData.origMaterial) return;
        const orig = child.userData.origMaterial;

        if (isIsolated && !isSelected) {
          child.visible = true;
          if (!child.userData.ghostMat) {
            child.userData.ghostMat = new THREE.MeshBasicMaterial({
              color: 0x1e293b,
              transparent: true,
              opacity: 0.12,
              wireframe: true,
            });
          }
          child.material = child.userData.ghostMat;
        } else {
          child.visible = true;
          child.material = orig;
        }
      });

      // Subtle scale emphasis on selected layer
      const targetScale = isSelected ? 1.035 : 1.0;
      layer.scale.setScalar(targetScale);
    });
  }

  /**
   * Returns current 3D world position for a given hotspot layerKey.
   */
  function getAnchorWorldPosition(layerKey, target = new THREE.Vector3()) {
    const matching = layerGroupsByKey[layerKey];
    if (!matching || matching.length === 0) return null;
    // Prefer the primary representative layer for each group
    const primary = matching[0];
    primary.updateWorldMatrix(true, false);
    primary.userData.anchor.getWorldPosition(target);
    return target;
  }

  return {
    group: root,
    layers,
    layerCount: layers.length,
    setExplosionProgress,
    setActiveLayer,
    getAnchorWorldPosition,
  };
}
