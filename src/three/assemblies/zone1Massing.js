import * as THREE from 'three';
import {
  createArchitectMesh,
  createBeveledBox,
  createBeveledFrame,
  createBeveledRing,
  createCurtainWallPanel,
} from '../geometryBuilders.js';

/**
 * Zone 1 — Hero & Architectural Massing
 * 20 distinct beveled/chamfered procedural architectural pieces forming a flagship
 * Class-A mixed-use commercial tower & terraced retail podium complex.
 */
export function buildZone1Massing(materials) {
  const root = new THREE.Group();
  root.name = 'Zone1_ArchitecturalMassing';
  const parts = [];

  const registerPart = (obj, name, restPos, riseDelay = 0) => {
    obj.name = name;
    obj.position.set(restPos[0], restPos[1], restPos[2]);
    obj.userData.restPos = new THREE.Vector3(...restPos);
    obj.userData.riseDelay = riseDelay;
    obj.userData.riseDepth = 2.6 + riseDelay * 1.4;
    root.add(obj);
    parts.push(obj);
    return obj;
  };

  // 01. Subterranean Structural Plinth Slab
  registerPart(
    createArchitectMesh(
      createBeveledBox(5.6, 0.24, 4.4, { radius: 0.12, bevelSize: 0.03, bevelThickness: 0.03 }),
      materials.concreteBasalt,
      materials
    ),
    '01_SubterraneanPlinth',
    [0, -2.3, 0],
    0.0
  );

  // 02. Podium Plaza Datum Terrace
  registerPart(
    createArchitectMesh(
      createBeveledBox(5.1, 0.22, 3.9, { radius: 0.1, bevelSize: 0.025, bevelThickness: 0.025 }),
      materials.titaniumDark,
      materials
    ),
    '02_PodiumPlazaTerrace',
    [0, -2.06, 0],
    0.04
  );

  // 03. Ground-Level Retail Core (Illuminated Amber Retail Atrium)
  const retailCoreGroup = new THREE.Group();
  const retailGlowBody = new THREE.Mesh(
    createBeveledBox(4.35, 0.72, 3.15, { radius: 0.06, bevelSize: 0.02, bevelThickness: 0.02 }),
    materials.retailInteriorGlow
  );
  retailCoreGroup.add(retailGlowBody);
  // Crisp amber storefront light strip
  const retailTrim = new THREE.Mesh(
    createBeveledFrame(4.48, 3.28, 0.055, 0.06, { radius: 0.08, alignY: true, bevelSize: 0.008, bevelThickness: 0.008 }),
    materials.amberEmissive
  );
  retailTrim.position.y = 0.34;
  retailCoreGroup.add(retailTrim);
  registerPart(retailCoreGroup, '03_RetailAtriumGlow', [0, -1.58, 0], 0.08);

  // 04. Retail Podium Unitized Glazing Curtain Wrap
  const retailGlazing = new THREE.Group();
  const frontRetailGlass = createCurtainWallPanel(4.55, 0.76, 9, 1, materials);
  frontRetailGlass.position.z = 1.68;
  const backRetailGlass = createCurtainWallPanel(4.55, 0.76, 9, 1, materials);
  backRetailGlass.position.z = -1.68;
  const rightRetailGlass = createCurtainWallPanel(3.36, 0.76, 6, 1, materials);
  rightRetailGlass.rotation.y = Math.PI / 2;
  rightRetailGlass.position.x = 2.275;
  const leftRetailGlass = createCurtainWallPanel(3.36, 0.76, 6, 1, materials);
  leftRetailGlass.rotation.y = Math.PI / 2;
  leftRetailGlass.position.x = -2.275;
  retailGlazing.add(frontRetailGlass, backRetailGlass, rightRetailGlass, leftRetailGlass);
  registerPart(retailGlazing, '04_RetailGlazingWrap', [0, -1.58, 0], 0.12);

  // 05. Podium Overhang Canopy & Chamfered Titanium Fascia
  registerPart(
    createArchitectMesh(
      createBeveledBox(4.85, 0.18, 3.68, { radius: 0.08, bevelSize: 0.025, bevelThickness: 0.02 }),
      materials.titaniumDark,
      materials
    ),
    '05_PodiumCanopyFascia',
    [0, -1.12, 0],
    0.16
  );

  // 06. West Mixed-Use Hospitality Wing Body
  const westWing = new THREE.Group();
  westWing.add(
    createArchitectMesh(
      createBeveledBox(1.55, 1.85, 2.2, { radius: 0.06, bevelSize: 0.025, bevelThickness: 0.025 }),
      materials.titaniumGraphite,
      materials
    )
  );
  // Warm interior window slit accents
  const westGlow = new THREE.Mesh(
    new THREE.BoxGeometry(1.42, 1.56, 2.08),
    materials.retailInteriorGlow
  );
  westWing.add(westGlow);
  registerPart(westWing, '06_WestHospitalityWing', [-1.42, -0.1, -0.12], 0.2);

  // 07. West Wing Curtain-Wall Mullion Screen
  const westScreen = new THREE.Group();
  const wf = createCurtainWallPanel(1.58, 1.8, 4, 5, materials);
  wf.position.z = 1.13;
  const wl = createCurtainWallPanel(2.22, 1.8, 5, 5, materials);
  wl.rotation.y = Math.PI / 2;
  wl.position.x = -0.8;
  westScreen.add(wf, wl);
  registerPart(westScreen, '07_WestWingCurtainWall', [-1.42, -0.1, -0.12], 0.24);

  // 08. East Sky-Bridge & Amenity Terrace Connector
  const skyBridge = new THREE.Group();
  skyBridge.add(
    createArchitectMesh(
      createBeveledBox(1.5, 0.2, 1.45, { radius: 0.05, bevelSize: 0.02, bevelThickness: 0.02 }),
      materials.brushedAluminum,
      materials
    )
  );
  const bridgeGlow = new THREE.Mesh(
    new THREE.BoxGeometry(1.46, 0.035, 1.48),
    materials.cyanEmissive
  );
  bridgeGlow.position.y = -0.09;
  skyBridge.add(bridgeGlow);
  registerPart(skyBridge, '08_SkyBridgeTerrace', [-0.62, 0.72, 0.2], 0.28);

  // 09. Main Tower Structural Concrete & Elevator Core
  registerPart(
    createArchitectMesh(
      createBeveledBox(0.92, 4.35, 0.92, { radius: 0.04, bevelSize: 0.02, bevelThickness: 0.02 }),
      materials.concreteBasalt,
      materials
    ),
    '09_MainTowerCore',
    [0.82, 1.12, -0.05],
    0.32
  );

  // 10. Lower Commercial Floor Plate Stack (L04–L10)
  const lowerStack = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const slab = createArchitectMesh(
      createBeveledBox(2.26, 0.12, 2.26, { radius: 0.06, bevelSize: 0.018, bevelThickness: 0.016 }),
      materials.titaniumDark,
      materials
    );
    slab.position.y = -0.82 + i * 0.34;
    lowerStack.add(slab);
  }
  // Subtle illuminated interior office volume
  const lowerCoreGlow = new THREE.Mesh(
    new THREE.BoxGeometry(1.94, 1.85, 1.94),
    materials.retailInteriorGlow
  );
  lowerCoreGlow.position.y = 0.05;
  lowerStack.add(lowerCoreGlow);
  registerPart(lowerStack, '10_LowerOfficeStack', [0.82, -0.04, -0.05], 0.36);

  // 11. Main Tower Front & East Glass Curtain Wall
  const towerGlassFront = new THREE.Group();
  const tf = createCurtainWallPanel(2.3, 4.18, 6, 11, materials);
  tf.position.z = 1.15;
  const te = createCurtainWallPanel(2.3, 4.18, 6, 11, materials);
  te.rotation.y = Math.PI / 2;
  te.position.x = 1.15;
  towerGlassFront.add(tf, te);
  registerPart(towerGlassFront, '11_TowerCurtainWallFrontEast', [0.82, 1.06, -0.05], 0.4);

  // 12. Main Tower Rear & West Glass Curtain Wall
  const towerGlassBack = new THREE.Group();
  const tb = createCurtainWallPanel(2.3, 4.18, 6, 11, materials);
  tb.position.z = -1.15;
  const tw = createCurtainWallPanel(2.3, 4.18, 6, 11, materials);
  tw.rotation.y = Math.PI / 2;
  tw.position.x = -1.15;
  towerGlassBack.add(tb, tw);
  registerPart(towerGlassBack, '12_TowerCurtainWallRearWest', [0.82, 1.06, -0.05], 0.44);

  // 13. Level 12 Cantilevered Amenity Sky-Deck (Signature Amber Glowing Halo)
  const skyDeck = new THREE.Group();
  skyDeck.add(
    createArchitectMesh(
      createBeveledBox(2.74, 0.17, 2.74, { radius: 0.08, bevelSize: 0.022, bevelThickness: 0.02 }),
      materials.titaniumDark,
      materials
    )
  );
  const deckLightBand = new THREE.Mesh(
    createBeveledFrame(2.78, 2.78, 0.05, 0.05, { radius: 0.09, alignY: true, bevelSize: 0.008, bevelThickness: 0.008 }),
    materials.amberEmissive
  );
  deckLightBand.position.y = -0.02;
  skyDeck.add(deckLightBand);
  registerPart(skyDeck, '13_AmenitySkyDeckL12', [0.78, 1.18, -0.05], 0.48);

  // 14. Upper Executive Floor Plate Stack (L13–L21)
  const upperStack = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const slab = createArchitectMesh(
      createBeveledBox(2.14, 0.11, 2.14, { radius: 0.06, bevelSize: 0.016, bevelThickness: 0.014 }),
      materials.titaniumDark,
      materials
    );
    slab.position.y = -0.82 + i * 0.34;
    upperStack.add(slab);
  }
  const upperGlow = new THREE.Mesh(
    new THREE.BoxGeometry(1.86, 1.82, 1.86),
    materials.retailInteriorGlow
  );
  upperGlow.position.y = 0.05;
  upperStack.add(upperGlow);
  registerPart(upperStack, '14_UpperExecutiveStack', [0.82, 2.22, -0.05], 0.52);

  // 15. Chamfered Titanium Corner Exo-Fins (Architectural Silhouette Blades)
  const exoFins = new THREE.Group();
  const finGeom = createBeveledBox(0.16, 4.5, 0.24, { radius: 0.02, bevelSize: 0.015, bevelThickness: 0.015 });
  const offsets = [
    [1.18, 0, 1.18],
    [-1.18, 0, 1.18],
    [1.18, 0, -1.18],
    [-1.18, 0, -1.18],
  ];
  offsets.forEach(([fx, fy, fz]) => {
    const fin = createArchitectMesh(finGeom, materials.brushedAluminum, materials);
    fin.position.set(fx, fy, fz);
    exoFins.add(fin);
  });
  registerPart(exoFins, '15_TitaniumCornerExoFins', [0.82, 1.16, -0.05], 0.56);

  // 16. Mechanical Penthouse Louver Housing
  const penthouse = new THREE.Group();
  penthouse.add(
    createArchitectMesh(
      createBeveledBox(1.66, 0.48, 1.66, { radius: 0.06, bevelSize: 0.02, bevelThickness: 0.02 }),
      materials.titaniumGraphite,
      materials
    )
  );
  // Subtle cyan HVAC telemetry band
  const hvacBand = new THREE.Mesh(
    createBeveledFrame(1.7, 1.7, 0.04, 0.04, { radius: 0.07, alignY: true, bevelSize: 0.005, bevelThickness: 0.005 }),
    materials.cyanEmissive
  );
  hvacBand.position.y = 0.16;
  penthouse.add(hvacBand);
  registerPart(penthouse, '16_MechanicalPenthouse', [0.82, 3.38, -0.05], 0.6);

  // 17. Rooftop Architectural Crown & Beveled Halo Frame
  const crown = new THREE.Group();
  crown.add(
    createArchitectMesh(
      createBeveledFrame(2.38, 2.38, 0.28, 0.22, { radius: 0.08, alignY: true, bevelSize: 0.02, bevelThickness: 0.02 }),
      materials.titaniumDark,
      materials
    )
  );
  const crownLight = new THREE.Mesh(
    createBeveledFrame(2.42, 2.42, 0.045, 0.045, { radius: 0.09, alignY: true, bevelSize: 0.006, bevelThickness: 0.006 }),
    materials.amberEmissive
  );
  crownLight.position.y = 0.12;
  crown.add(crownLight);
  registerPart(crown, '17_ArchitecturalCrownHalo', [0.82, 3.68, -0.05], 0.64);

  // 18. Solar Canopy & Executive Helipad Roof Deck
  const roofDeck = new THREE.Group();
  roofDeck.add(
    createArchitectMesh(
      createBeveledBox(1.82, 0.09, 1.82, { radius: 0.05, bevelSize: 0.012, bevelThickness: 0.012 }),
      materials.brushedAluminum,
      materials
    )
  );
  const solarSlats = createBeveledBox(1.4, 0.04, 1.4, { radius: 0.03, bevelSize: 0.008, bevelThickness: 0.008 });
  const solarMesh = new THREE.Mesh(solarSlats, materials.pcbSubstrate);
  solarMesh.position.y = 0.06;
  roofDeck.add(solarMesh);
  registerPart(roofDeck, '18_SolarCanopyRoofDeck', [0.82, 3.84, -0.05], 0.68);

  // 19. Sculptural Entry Monument & Illuminated Wayfinding Fin
  const monument = new THREE.Group();
  monument.add(
    createArchitectMesh(
      createBeveledBox(0.28, 1.25, 0.62, { radius: 0.03, bevelSize: 0.016, bevelThickness: 0.016 }),
      materials.brushedAluminum,
      materials
    )
  );
  const monAccent = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.96, 0.06), materials.cyanEmissive);
  monAccent.position.set(0.14, 0, 0.24);
  monument.add(monAccent);
  registerPart(monument, '19_SculpturalEntryMonument', [-1.85, -1.36, 1.82], 0.72);

  // 20. Perimeter Telemetry Datum Ring (Floats flush above studio datum plane)
  const perimeterRing = new THREE.Group();
  const ringMesh = new THREE.Mesh(
    createBeveledRing(3.38, 3.31, 0.04, { segments: 72, bevelSize: 0.006, bevelThickness: 0.006 }),
    materials.brushedAluminum
  );
  ringMesh.rotation.x = Math.PI / 2;
  perimeterRing.add(ringMesh);
  // 4 cardinal glowing cyan beacon pips
  const pipGeom = new THREE.BoxGeometry(0.18, 0.05, 0.06);
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const pip = new THREE.Mesh(pipGeom, i % 2 === 0 ? materials.amberEmissive : materials.cyanEmissive);
    pip.position.set(Math.cos(angle) * 3.35, 0.02, Math.sin(angle) * 3.35);
    pip.rotation.y = -angle + Math.PI / 2;
    perimeterRing.add(pip);
  }
  registerPart(perimeterRing, '20_PerimeterTelemetryRing', [0, -2.38, 0], 0.76);

  /**
   * Drives staggered rising entrance of all 20 architectural pieces (0 = recessed, 1 = seated).
   */
  function setRiseProgress(progress) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    parts.forEach((part) => {
      const delay = part.userData.riseDelay * 0.42;
      const localT = THREE.MathUtils.clamp((p - delay) / (1 - delay), 0, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - localT, 3);
      part.position.y = part.userData.restPos.y - (1 - eased) * part.userData.riseDepth;
      const s = 0.84 + eased * 0.16;
      part.scale.setScalar(s);
    });
  }

  return {
    group: root,
    parts,
    partCount: parts.length,
    setRiseProgress,
  };
}
