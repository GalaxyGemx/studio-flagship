import * as THREE from 'three';
import {
  createArchitectMesh,
  createBeveledBox,
  createBeveledFrame,
  createBeveledPlateZ,
  createBeveledRing,
} from '../geometryBuilders.js';
import { createKioskScreenTexture } from '../kioskScreenTexture.js';

/**
 * Zone 3 — Mini-Teardown #2: Smart Building & Investor Portal Hardware
 * 15 precision-machined modular kiosk/access-control hardware components
 * that explode cleanly along the Z-axis (McLaren / phone-case hardware aesthetic).
 */
export function buildZone3Hardware(materials) {
  const root = new THREE.Group();
  root.name = 'Zone3_SmartHardwareTeardown';

  const kioskScreen = createKioskScreenTexture();
  const layers = [];
  const anchorByKey = {};

  const registerLayer = (obj, { id, key, restZ, explodeZ, anchorLocal = [1.15, 0.2, 0] }) => {
    obj.name = id;
    obj.position.set(0, 0, restZ);
    obj.userData.restZ = restZ;
    obj.userData.explodeZ = explodeZ;
    obj.userData.key = key;

    const anchor = new THREE.Object3D();
    anchor.position.set(...anchorLocal);
    obj.add(anchor);
    obj.userData.anchor = anchor;

    if (key) {
      anchorByKey[key] = anchor;
    }

    root.add(obj);
    layers.push(obj);
    return obj;
  };

  const W = 2.05;
  const H = 3.25;

  // 01. Oleophobic Sapphire Glass Front Bezel
  const sapphireBezel = new THREE.Group();
  const glassPlate = new THREE.Mesh(
    createBeveledPlateZ(W, H, 0.055, { radius: 0.22, bevelSize: 0.025, bevelThickness: 0.02 }),
    materials.sapphireGlass
  );
  sapphireBezel.add(glassPlate);
  // Thin hairline metallic edge ring
  const bezelTrim = new THREE.Mesh(
    createBeveledFrame(W + 0.02, H + 0.02, 0.04, 0.045, { radius: 0.22, bevelSize: 0.008, bevelThickness: 0.008 }),
    materials.brushedAluminum
  );
  sapphireBezel.add(bezelTrim);
  registerLayer(sapphireBezel, {
    id: 'HW01_SapphireFrontBezel',
    key: 'sapphireBezel',
    restZ: 0.26,
    explodeZ: 2.68,
    anchorLocal: [1.05, 1.15, 0],
  });

  // 02. Edge-to-Edge Micro-OLED Interactive Display Matrix (live synced CanvasTexture!)
  const oledGroup = new THREE.Group();
  const oledMat = new THREE.MeshStandardMaterial({
    map: kioskScreen.texture,
    emissive: new THREE.Color(0xffffff),
    emissiveMap: kioskScreen.texture,
    emissiveIntensity: 0.95,
    roughness: 0.14,
    metalness: 0.1,
  });
  const oledPlane = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.18, H - 0.2), oledMat);
  oledPlane.position.z = 0.018;
  oledGroup.add(oledPlane);
  // Backing aluminum display carrier plate
  const oledBack = new THREE.Mesh(
    createBeveledPlateZ(W - 0.14, H - 0.16, 0.03, { radius: 0.16, bevelSize: 0.01, bevelThickness: 0.008 }),
    materials.titaniumDark
  );
  oledBack.position.z = -0.012;
  oledGroup.add(oledBack);
  registerLayer(oledGroup, {
    id: 'HW02_MicroOLEDMatrix',
    key: 'oledMatrix',
    restZ: 0.2,
    explodeZ: 2.15,
    anchorLocal: [-1.02, 0.72, 0],
  });

  // 03. Capacitive Touch Digitizer & Light Guide Film
  const digitizer = new THREE.Group();
  const film = new THREE.Mesh(
    createBeveledPlateZ(W - 0.2, H - 0.24, 0.02, { radius: 0.14, bevelSize: 0.006, bevelThickness: 0.005 }),
    materials.curtainGlass
  );
  digitizer.add(film);
  // Subtle copper flex ribbon tab at bottom
  const flexRibbon = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.26, 0.014),
    materials.machinedCopper
  );
  flexRibbon.position.set(0, -H / 2 + 0.08, -0.01);
  digitizer.add(flexRibbon);
  registerLayer(digitizer, {
    id: 'HW03_CapacitiveDigitizer',
    key: null,
    restZ: 0.16,
    explodeZ: 1.72,
  });

  // 04. Optical Biometric & LiDAR Proximity Sensor Ring (machined chamfered optics)
  const opticsGroup = new THREE.Group();
  const outerOptic = new THREE.Mesh(
    createBeveledRing(0.26, 0.17, 0.08, { segments: 40, bevelSize: 0.012, bevelThickness: 0.012 }),
    materials.brushedAluminum
  );
  const innerOptic = new THREE.Mesh(
    createBeveledRing(0.15, 0.08, 0.06, { segments: 32, bevelSize: 0.008, bevelThickness: 0.008 }),
    materials.cyanEmissive
  );
  const lensCore = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.04, 24),
    materials.sapphireGlass
  );
  lensCore.rotation.x = Math.PI / 2;
  opticsGroup.add(outerOptic, innerOptic, lensCore);
  opticsGroup.position.y = 1.24;
  // Note: maintain y offset inside a container so Z explosion doesn't zero Y
  const opticsWrapper = new THREE.Group();
  opticsWrapper.add(opticsGroup);
  registerLayer(opticsWrapper, {
    id: 'HW04_OpticalBiometricSensor',
    key: null,
    restZ: 0.12,
    explodeZ: 1.32,
  });

  // 05. Anodized Dark Titanium Unibody Mid-Frame (Precision Milled Chassis with Side Ribs)
  const chassisGroup = new THREE.Group();
  const frameMesh = createArchitectMesh(
    createBeveledFrame(W + 0.08, H + 0.08, 0.26, 0.16, { radius: 0.24, bevelSize: 0.025, bevelThickness: 0.022 }),
    materials.titaniumDark,
    materials
  );
  chassisGroup.add(frameMesh);
  // Internal milled stiffening crossbars
  const ribH1 = new THREE.Mesh(new THREE.BoxGeometry(W - 0.14, 0.07, 0.12), materials.titaniumGraphite);
  ribH1.position.y = 0.65;
  const ribH2 = new THREE.Mesh(new THREE.BoxGeometry(W - 0.14, 0.07, 0.12), materials.titaniumGraphite);
  ribH2.position.y = -0.65;
  const sideBtn1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.1), materials.brushedAluminum);
  sideBtn1.position.set(W / 2 + 0.06, 0.55, 0);
  const sideBtn2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.1), materials.amberEmissive);
  sideBtn2.position.set(W / 2 + 0.06, 0.16, 0);
  chassisGroup.add(ribH1, ribH2, sideBtn1, sideBtn2);
  registerLayer(chassisGroup, {
    id: 'HW05_TitaniumUnibodyChassis',
    key: 'titaniumFrame',
    restZ: 0.04,
    explodeZ: 0.78,
    anchorLocal: [1.14, 0.22, 0],
  });

  // 06. Machined Copper Vapor-Chamber Thermal Heatsink Plate
  const thermalGroup = new THREE.Group();
  const basePlate = createArchitectMesh(
    createBeveledPlateZ(W - 0.36, H - 0.72, 0.05, { radius: 0.1, bevelSize: 0.012, bevelThickness: 0.01 }),
    materials.machinedCopper,
    materials
  );
  thermalGroup.add(basePlate);
  // Precision milled thermal cooling fins
  const finGeom = new THREE.BoxGeometry(W - 0.52, 0.028, 0.08);
  for (let i = -7; i <= 7; i++) {
    const fin = new THREE.Mesh(finGeom, materials.machinedCopper);
    fin.position.set(0, i * 0.14, -0.04);
    thermalGroup.add(fin);
  }
  registerLayer(thermalGroup, {
    id: 'HW06_CopperVaporChamber',
    key: null,
    restZ: -0.01,
    explodeZ: 0.26,
  });

  // 07. Custom Edge-AI Compute SoC Module & EMI Shield Can
  const computeGroup = new THREE.Group();
  const socCarrier = createArchitectMesh(
    createBeveledPlateZ(1.26, 1.15, 0.055, { radius: 0.06, bevelSize: 0.012, bevelThickness: 0.01 }),
    materials.pcbSubstrate,
    materials
  );
  const shieldCan = createArchitectMesh(
    createBeveledPlateZ(0.68, 0.68, 0.08, { radius: 0.04, bevelSize: 0.012, bevelThickness: 0.01 }),
    materials.brushedAluminum,
    materials
  );
  shieldCan.position.z = 0.045;
  // Glowing cyan neural interconnect trace halo
  const traceHalo = new THREE.Mesh(
    createBeveledFrame(0.84, 0.84, 0.02, 0.03, { radius: 0.05, bevelSize: 0.004, bevelThickness: 0.004 }),
    materials.cyanEmissive
  );
  traceHalo.position.z = 0.032;
  computeGroup.add(socCarrier, shieldCan, traceHalo);
  const computeWrap = new THREE.Group();
  computeGroup.position.y = 0.35;
  computeWrap.add(computeGroup);
  registerLayer(computeWrap, {
    id: 'HW07_EdgeAIComputeSoC',
    key: 'aiCompute',
    restZ: -0.04,
    explodeZ: -0.22,
    anchorLocal: [0.85, 0.42, 0],
  });

  // 08. BACnet / BMS Building Telemetry Mainboard PCB
  const bmsGroup = new THREE.Group();
  bmsGroup.add(
    createArchitectMesh(
      createBeveledPlateZ(W - 0.32, H - 0.42, 0.05, { radius: 0.1, bevelSize: 0.01, bevelThickness: 0.008 }),
      materials.pcbSubstrate,
      materials
    )
  );
  // Precision SMD chips, gold bus headers & telemetry LEDs
  const chipGeom = new THREE.BoxGeometry(0.24, 0.24, 0.055);
  const chipCoords = [
    [-0.52, 0.95],
    [0.52, 0.95],
    [-0.5, -0.58],
    [0.48, -0.58],
    [0, -0.98],
  ];
  chipCoords.forEach(([cx, cy]) => {
    const chip = new THREE.Mesh(chipGeom, materials.titaniumGraphite);
    chip.position.set(cx, cy, 0.04);
    bmsGroup.add(chip);
  });
  // Glowing copper/amber bus traces
  const busBar = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.035, 0.03), materials.amberEmissive);
  busBar.position.set(0, -0.22, 0.034);
  const busBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.035, 2.1, 0.03), materials.cyanEmissive);
  busBar2.position.set(-0.62, 0, 0.034);
  bmsGroup.add(busBar, busBar2);
  registerLayer(bmsGroup, {
    id: 'HW08_BMSTelemetryPCB',
    key: 'bmsPcb',
    restZ: -0.07,
    explodeZ: -0.68,
    anchorLocal: [-0.92, -0.25, 0],
  });

  // 09. mmWave Occupancy & IAQ Environmental Sensor Bar
  const sensorBarWrap = new THREE.Group();
  const sensorBar = new THREE.Group();
  sensorBar.add(
    createArchitectMesh(
      createBeveledPlateZ(1.42, 0.24, 0.08, { radius: 0.05, bevelSize: 0.012, bevelThickness: 0.01 }),
      materials.brushedAluminum,
      materials
    )
  );
  for (let i = -2; i <= 2; i++) {
    const diode = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 12), materials.cyanEmissive);
    diode.rotation.x = Math.PI / 2;
    diode.position.set(i * 0.24, 0, 0.03);
    sensorBar.add(diode);
  }
  sensorBar.position.y = 1.18;
  sensorBarWrap.add(sensorBar);
  registerLayer(sensorBarWrap, {
    id: 'HW09_mmWaveSensorArray',
    key: null,
    restZ: -0.09,
    explodeZ: -1.04,
  });

  // 10. NFC / Ultra-Wideband Mobile Access Copper Coil Ring
  const uwbWrap = new THREE.Group();
  const uwbGroup = new THREE.Group();
  const coilOuter = new THREE.Mesh(
    createBeveledRing(0.56, 0.44, 0.05, { segments: 56, bevelSize: 0.01, bevelThickness: 0.008 }),
    materials.machinedCopper
  );
  const coilMid = new THREE.Mesh(
    createBeveledRing(0.39, 0.31, 0.04, { segments: 48, bevelSize: 0.008, bevelThickness: 0.008 }),
    materials.machinedCopper
  );
  const coilGlow = new THREE.Mesh(
    createBeveledRing(0.43, 0.405, 0.03, { segments: 56, bevelSize: 0.004, bevelThickness: 0.004 }),
    materials.amberEmissive
  );
  uwbGroup.add(coilOuter, coilMid, coilGlow);
  uwbGroup.position.y = -0.35;
  uwbWrap.add(uwbGroup);
  registerLayer(uwbWrap, {
    id: 'HW10_UWBMobileAccessCoil',
    key: 'uwbCoil',
    restZ: -0.11,
    explodeZ: -1.4,
    anchorLocal: [0.65, -0.35, 0],
  });

  // 11. PoE++ 60W Power Delivery & Surge Protection Block
  const poeWrap = new THREE.Group();
  const poeBlock = new THREE.Group();
  poeBlock.add(
    createArchitectMesh(
      createBeveledPlateZ(1.32, 0.48, 0.14, { radius: 0.06, bevelSize: 0.015, bevelThickness: 0.012 }),
      materials.titaniumGraphite,
      materials
    )
  );
  // RJ45 shielded metallic PoE port collar
  const rj45 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.18), materials.brushedAluminum);
  rj45.position.set(0.38, 0, -0.04);
  poeBlock.add(rj45);
  poeBlock.position.y = -1.04;
  poeWrap.add(poeBlock);
  registerLayer(poeWrap, {
    id: 'HW11_PoEPowerDeliveryBlock',
    key: null,
    restZ: -0.13,
    explodeZ: -1.72,
  });

  // 12. Acoustic Beamforming Speaker & Dual-Mic Array Bar
  const acousticWrap = new THREE.Group();
  const acousticBar = new THREE.Group();
  acousticBar.add(
    createArchitectMesh(
      createBeveledPlateZ(1.58, 0.22, 0.1, { radius: 0.05, bevelSize: 0.012, bevelThickness: 0.01 }),
      materials.titaniumDark,
      materials
    )
  );
  for (let i = -5; i <= 5; i++) {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.09, 0.11), materials.brushedAluminum);
    slot.position.set(i * 0.12, 0, 0.01);
    acousticBar.add(slot);
  }
  acousticBar.position.y = -1.36;
  acousticWrap.add(acousticBar);
  registerLayer(acousticWrap, {
    id: 'HW12_AcousticBeamformingBar',
    key: null,
    restZ: -0.14,
    explodeZ: -1.96,
  });

  // 13. Solid-State NVMe Local Digital-Twin Storage Module
  const nvmeWrap = new THREE.Group();
  const nvme = new THREE.Group();
  nvme.add(
    createArchitectMesh(
      createBeveledPlateZ(0.46, 0.92, 0.045, { radius: 0.03, bevelSize: 0.008, bevelThickness: 0.008 }),
      materials.pcbSubstrate,
      materials
    )
  );
  const nand = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.56, 0.06), materials.brushedAluminum);
  nvme.add(nand);
  nvme.position.set(-0.56, 0.12, 0);
  nvmeWrap.add(nvme);
  registerLayer(nvmeWrap, {
    id: 'HW13_NVMeDigitalTwinModule',
    key: null,
    restZ: -0.15,
    explodeZ: -2.18,
  });

  // 14. Machined Rear Titanium Backplate (Chamfered Vents & Corner Fasteners)
  const backplate = new THREE.Group();
  backplate.add(
    createArchitectMesh(
      createBeveledPlateZ(W + 0.04, H + 0.04, 0.09, { radius: 0.22, bevelSize: 0.022, bevelThickness: 0.02 }),
      materials.titaniumDark,
      materials
    )
  );
  // 4 machined stainless Torx fasteners at corners
  const screwGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.11, 16);
  const corners = [
    [-W / 2 + 0.24, H / 2 - 0.24],
    [W / 2 - 0.24, H / 2 - 0.24],
    [-W / 2 + 0.24, -H / 2 + 0.24],
    [W / 2 - 0.24, -H / 2 + 0.24],
  ];
  corners.forEach(([sx, sy]) => {
    const screw = new THREE.Mesh(screwGeom, materials.brushedAluminum);
    screw.rotation.x = Math.PI / 2;
    screw.position.set(sx, sy, 0);
    backplate.add(screw);
  });
  registerLayer(backplate, {
    id: 'HW14_MachinedRearBackplate',
    key: null,
    restZ: -0.18,
    explodeZ: -2.48,
  });

  // 15. Recessed Architectural Wall-Mount Magnetic Dock Bracket
  const dockBracket = new THREE.Group();
  dockBracket.add(
    createArchitectMesh(
      createBeveledFrame(1.48, 2.24, 0.1, 0.18, { radius: 0.12, bevelSize: 0.016, bevelThickness: 0.015 }),
      materials.brushedAluminum,
      materials
    )
  );
  // Magnetic alignment guide rail
  const magRail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.85, 0.08), materials.titaniumGraphite);
  dockBracket.add(magRail);
  registerLayer(dockBracket, {
    id: 'HW15_ArchitecturalWallDock',
    key: null,
    restZ: -0.24,
    explodeZ: -2.92,
  });

  /**
   * Smoothly scrubs all 15 smart-hardware components along the Z-axis (0 = sealed, 1 = full exploded teardown).
   */
  function setExplosionProgress(progress) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const eased = p * p * (3 - 2 * p);

    layers.forEach((layer) => {
      layer.position.z = THREE.MathUtils.lerp(
        layer.userData.restZ,
        layer.userData.explodeZ,
        eased
      );
    });

    // Dynamic 3/4 inspection rotation so user sees full Z-depth separation like an Apple product keynote
    root.rotation.y = THREE.MathUtils.lerp(-0.28, -0.78, eased);
    root.rotation.x = THREE.MathUtils.lerp(0.06, 0.14, eased);
  }

  function updatePortalDisplay(mode, state) {
    kioskScreen.render(mode, state);
  }

  function getAnchorWorldPosition(layerKey, target = new THREE.Vector3()) {
    const anchor = anchorByKey[layerKey];
    if (!anchor) return null;
    root.updateWorldMatrix(true, true);
    anchor.getWorldPosition(target);
    return target;
  }

  return {
    group: root,
    layers,
    layerCount: layers.length,
    setExplosionProgress,
    updatePortalDisplay,
    getAnchorWorldPosition,
  };
}
