import * as THREE from 'three';

/**
 * Generates a high-contrast dark automotive/architectural softbox studio HDRI
 * environment map via PMREMGenerator so high-metalness anodized titanium
 * and frosted glass reflect crisp linear studio highlights.
 */
export function createStudioEnvironmentMap(renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x06070a);

  // Overhead primary architectural softbox strip (neutral-cool crisp highlight)
  const topStripMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(5.5, 5.8, 6.4) });
  const topStrip = new THREE.Mesh(new THREE.PlaneGeometry(18, 4.5), topStripMat);
  topStrip.position.set(0, 12, 0);
  topStrip.rotation.x = Math.PI / 2;
  envScene.add(topStrip);

  // Secondary parallel specular kicker strip
  const kickerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(3.4, 3.8, 4.4) });
  const kickerStrip = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.8), kickerMat);
  kickerStrip.position.set(0, 10, -8);
  kickerStrip.rotation.x = Math.PI / 3;
  envScene.add(kickerStrip);

  // Left cool-cyan studio rim softbox
  const coolRimMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.4, 3.6, 6.2) });
  const coolRimPanel = new THREE.Mesh(new THREE.PlaneGeometry(12, 9), coolRimMat);
  coolRimPanel.position.set(-14, 4, -4);
  coolRimPanel.lookAt(0, 0, 0);
  envScene.add(coolRimPanel);

  // Right warm-amber architectural rim softbox
  const warmRimMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(6.0, 3.6, 1.4) });
  const warmRimPanel = new THREE.Mesh(new THREE.PlaneGeometry(11, 8), warmRimMat);
  warmRimPanel.position.set(14, 3.5, 5);
  warmRimPanel.lookAt(0, 0, 0);
  envScene.add(warmRimPanel);

  // Subtle front horizon reflection bar for glass glazing readability
  const horizonBarMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.8, 2.0, 2.4) });
  const horizonBar = new THREE.Mesh(new THREE.PlaneGeometry(24, 1.4), horizonBarMat);
  horizonBar.position.set(0, 1.5, 14);
  horizonBar.lookAt(0, 1.5, 0);
  envScene.add(horizonBar);

  // Subtle metallic floor bounce
  const floorBounceMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.28, 0.34, 0.42) });
  const floorBounce = new THREE.Mesh(new THREE.CircleGeometry(14, 32), floorBounceMat);
  floorBounce.position.set(0, -10, 0);
  floorBounce.rotation.x = -Math.PI / 2;
  envScene.add(floorBounce);

  const renderTarget = pmremGenerator.fromScene(envScene, 0.035);
  pmremGenerator.dispose();

  return renderTarget.texture;
}

/**
 * Creates the Three-Point Studio Rim Lighting Rig with live preset handles.
 */
export function createStudioLights(scene) {
  const lightsGroup = new THREE.Group();
  lightsGroup.name = 'StudioLights';

  // Soft base hemisphere bounce
  const hemiLight = new THREE.HemisphereLight(0xcbd8f0, 0x0b0e14, 0.45);
  lightsGroup.add(hemiLight);

  // 1. Crisp Overhead Key Light
  const keyLight = new THREE.DirectionalLight(0xf3f7ff, 2.4);
  keyLight.position.set(5.5, 14, 7.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 32;
  const d = 10;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.bias = -0.0005;
  lightsGroup.add(keyLight);

  // 2. Cool Blue-Cyan Rim Light (sculpts left/back titanium chamfers)
  const coolRimLight = new THREE.DirectionalLight(0x4ea8ff, 2.8);
  coolRimLight.position.set(-10, 6.5, -7);
  lightsGroup.add(coolRimLight);

  // 3. Warm Amber/Gold Rim Light (sculpts right/front architectural profiles)
  const warmRimLight = new THREE.DirectionalLight(0xffa94d, 2.45);
  warmRimLight.position.set(10, 4.5, 5.5);
  lightsGroup.add(warmRimLight);

  // Localized warm retail podium glow light (accentuates Night Retail Glow)
  const retailPointLight = new THREE.PointLight(0xffa742, 3.2, 12, 1.6);
  retailPointLight.position.set(0.6, -1.2, 2.2);
  lightsGroup.add(retailPointLight);

  // Subtle under-rim cyan telemetry accent
  const underCyanLight = new THREE.PointLight(0x22d3ee, 1.4, 14, 1.8);
  underCyanLight.position.set(-2.5, -2.5, -1.5);
  lightsGroup.add(underCyanLight);

  scene.add(lightsGroup);

  return {
    group: lightsGroup,
    hemiLight,
    keyLight,
    coolRimLight,
    warmRimLight,
    retailPointLight,
    underCyanLight,
  };
}

/**
 * Creates the Dark Studio Architectural Datum Floor for Zone 1 & Zone 2:
 * A sleek matte obsidian shadow catcher with radially fading precision datum ticks
 * and subtle concentric architectural reference rings.
 */
export function createStudioDatumFloor() {
  const floorGroup = new THREE.Group();
  floorGroup.name = 'StudioDatumFloor';
  floorGroup.position.y = -2.45;

  // Transparent shadow catcher so the background stays pure infinite #07080A matte obsidian
  const shadowFloorMat = new THREE.ShadowMaterial({
    color: 0x000000,
    opacity: 0.65,
  });
  const floorDisc = new THREE.Mesh(new THREE.CircleGeometry(18, 64), shadowFloorMat);
  floorDisc.rotation.x = -Math.PI / 2;
  floorDisc.receiveShadow = true;
  floorGroup.add(floorDisc);

  // Subtle dark-anodized circular architectural turntable plinth directly beneath the tower
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x0b0d12,
    metalness: 0.72,
    roughness: 0.48,
    envMapIntensity: 0.75,
  });
  const plinthDisc = new THREE.Mesh(new THREE.CylinderGeometry(3.65, 3.8, 0.04, 72), plinthMat);
  plinthDisc.position.y = -0.025;
  plinthDisc.receiveShadow = true;
  floorGroup.add(plinthDisc);

  // Precision radially faded architectural grid lines dissolving completely into #07080A
  const gridSize = 9.5;
  const divisions = 20;
  const step = (gridSize * 2) / divisions;
  const positions = [];
  const colors = [];
  const baseColor = new THREE.Color(0x283344);
  const bgColor = new THREE.Color(0x07080a);

  const pushSegment = (x1, z1, x2, z2) => {
    const r1 = Math.hypot(x1, z1);
    const r2 = Math.hypot(x2, z2);
    const f1 = Math.max(0, 1 - r1 / 8.8);
    const f2 = Math.max(0, 1 - r2 / 8.8);
    if (f1 <= 0.01 && f2 <= 0.01) return;

    const c1 = bgColor.clone().lerp(baseColor, f1 * f1 * f1 * 0.8);
    const c2 = bgColor.clone().lerp(baseColor, f2 * f2 * f2 * 0.8);

    positions.push(x1, 0.008, z1, x2, 0.008, z2);
    colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
  };

  for (let i = -divisions / 2; i <= divisions / 2; i++) {
    const coord = i * step;
    const segs = 16;
    for (let s = 0; s < segs; s++) {
      const a = -gridSize + (s / segs) * (gridSize * 2);
      const b = -gridSize + ((s + 1) / segs) * (gridSize * 2);
      pushSegment(coord, a, coord, b);
      pushSegment(a, coord, b, coord);
    }
  }

  const gridGeom = new THREE.BufferGeometry();
  gridGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  gridGeom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const gridMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.72,
  });
  const gridLines = new THREE.LineSegments(gridGeom, gridMat);
  floorGroup.add(gridLines);

  // Two crisp architectural compass datum rings
  const ringMatOuter = new THREE.LineBasicMaterial({
    color: 0x475569,
    transparent: true,
    opacity: 0.35,
  });
  const ringMatInner = new THREE.LineBasicMaterial({
    color: 0xd49b4b,
    transparent: true,
    opacity: 0.42,
  });

  const makeRing = (radius, segs, mat) => {
    const pts = [];
    for (let i = 0; i <= segs; i++) {
      const theta = (i / segs) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0.014, Math.sin(theta) * radius));
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    return new THREE.Line(g, mat);
  };

  floorGroup.add(makeRing(3.55, 96, ringMatInner));
  floorGroup.add(makeRing(6.2, 96, ringMatOuter));

  // Precision radial tick marks around the inner datum ring
  const tickPts = [];
  for (let i = 0; i < 36; i++) {
    const theta = (i / 36) * Math.PI * 2;
    const isMajor = i % 9 === 0;
    const rIn = isMajor ? 3.35 : 3.47;
    const rOut = isMajor ? 3.78 : 3.63;
    tickPts.push(
      Math.cos(theta) * rIn, 0.015, Math.sin(theta) * rIn,
      Math.cos(theta) * rOut, 0.015, Math.sin(theta) * rOut
    );
  }
  const tickGeom = new THREE.BufferGeometry();
  tickGeom.setAttribute('position', new THREE.Float32BufferAttribute(tickPts, 3));
  floorGroup.add(new THREE.LineSegments(tickGeom, ringMatOuter));

  return {
    group: floorGroup,
    gridMat,
    ringMatInner,
    ringMatOuter,
    shadowFloorMat,
  };
}
