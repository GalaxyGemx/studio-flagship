import * as THREE from 'three';

/**
 * Generates a subtle procedural brushed-metal canvas texture for authentic
 * anisotropic micro-grain on satin aluminum and dark anodized titanium.
 */
function createBrushedMetalTexture(width = 256, height = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, width, height);

  // Horizontal brushed hairline streaks
  for (let y = 0; y < height; y++) {
    const shade = 112 + Math.floor(Math.random() * 34);
    ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    ctx.fillRect(0, y, width, 1);

    // Occasional finer metallic micro-scratch
    if (Math.random() > 0.65) {
      const bright = 148 + Math.floor(Math.random() * 28);
      const xStart = Math.floor(Math.random() * width);
      const segLen = 28 + Math.floor(Math.random() * 90);
      ctx.fillStyle = `rgba(${bright},${bright},${bright},0.35)`;
      ctx.fillRect(xStart, y, segLen, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

/**
 * Generates subtle illuminated architectural window blinds/office strip texture
 * for interior floor cores so Night Retail Glow feels alive and inhabited.
 */
function createInteriorGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#14110c';
  ctx.fillRect(0, 0, 256, 256);

  const rows = 8;
  const cols = 12;
  const cellW = 256 / cols;
  const cellH = 256 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = (r * 7 + c * 13) % 5 !== 0;
      if (!lit) continue;
      const warmth = (r + c) % 3 === 0 ? 'rgba(255, 214, 146, 0.85)' : 'rgba(236, 178, 96, 0.62)';
      ctx.fillStyle = warmth;
      ctx.fillRect(c * cellW + 3, r * cellH + 5, cellW - 6, cellH - 10);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Creates the full PBR Studio Material Library shared across all 5 zones.
 */
export function createStudioMaterials(isMobile = false) {
  const brushedMap = createBrushedMetalTexture();
  const interiorGlowMap = createInteriorGlowTexture();

  // Primary Anodized Dark Titanium (McLaren / Pro Hardware chassis & spandrels)
  const titaniumDark = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x181c24),
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.42,
    clearcoatRoughness: 0.16,
    bumpMap: brushedMap,
    bumpScale: 0.003,
    envMapIntensity: 1.9,
  });

  // Secondary Graphite Anodized Titanium (subtle tonal contrast on secondary fins)
  const titaniumGraphite = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x252b36),
    metalness: 0.88,
    roughness: 0.24,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    bumpMap: brushedMap,
    bumpScale: 0.004,
    envMapIntensity: 1.65,
  });

  // Brushed Satin Aluminum (mullions, structural collars, fasteners, trim)
  const brushedAluminum = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x6e7887),
    metalness: 0.92,
    roughness: 0.24,
    clearcoat: 0.35,
    clearcoatRoughness: 0.18,
    bumpMap: brushedMap,
    bumpScale: 0.005,
    envMapIntensity: 1.65,
  });

  // Frosted Smoked Architectural Curtain-Wall Glass (Transmission 0.85)
  const curtainGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x526b82),
    metalness: 0.08,
    roughness: 0.08,
    transmission: isMobile ? 0.74 : 0.85,
    ior: 1.52,
    thickness: 0.42,
    attenuationColor: new THREE.Color(0x3a6484),
    attenuationDistance: 3.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.92,
    envMapIntensity: 1.9,
    side: THREE.DoubleSide,
  });

  // Sapphire / Smoked Optical Hardware Glass (Zone 3 front bezel)
  const sapphireGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x88adc8),
    metalness: 0.06,
    roughness: 0.04,
    transmission: isMobile ? 0.75 : 0.86,
    ior: 1.76,
    thickness: 0.32,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.9,
    envMapIntensity: 2.2,
  });

  // Architectural Basalt / Reinforced Concrete Foundation
  const concreteBasalt = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x1a1e26),
    metalness: 0.16,
    roughness: 0.78,
    envMapIntensity: 0.8,
  });

  // Structural Grade-50 Steel Frame
  const structuralSteel = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x4b5563),
    metalness: 0.86,
    roughness: 0.3,
    envMapIntensity: 1.45,
  });

  // Machined Copper Vapor Chamber & UWB Coil
  const machinedCopper = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xc97b49),
    metalness: 0.94,
    roughness: 0.2,
    clearcoat: 0.35,
    clearcoatRoughness: 0.16,
    bumpMap: brushedMap,
    bumpScale: 0.003,
    envMapIntensity: 1.85,
  });

  // High-Density PCB Matte Dark Substrate
  const pcbSubstrate = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0b141c),
    metalness: 0.38,
    roughness: 0.38,
    envMapIntensity: 1.15,
  });

  // Warm Architectural Amber Emissive (retail podium, sky-deck edge, accent seams)
  const amberEmissive = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xf4b860),
    emissive: new THREE.Color(0xe08d2a),
    emissiveIntensity: 1.55,
    roughness: 0.2,
    metalness: 0.25,
    toneMapped: false,
  });

  // Precision Telemetry Cyan Emissive (MEP core, active data traces, emblem heart)
  const cyanEmissive = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x7dd3fc),
    emissive: new THREE.Color(0x22d3ee),
    emissiveIntensity: 1.65,
    roughness: 0.2,
    metalness: 0.2,
    toneMapped: false,
  });

  // Warm Inhabited Interior Core Glow (reacts dramatically to Night vs Daylight mode)
  const retailInteriorGlow = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x211910),
    emissive: new THREE.Color(0xdf943c),
    emissiveMap: interiorGlowMap,
    emissiveIntensity: 1.35,
    roughness: 0.38,
    metalness: 0.2,
  });

  // CAD / BIM Architectural Wireframe Contour Lines (subtle in night/day, vivid in wireframe mode)
  const cadEdgeLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(0x475569),
    transparent: true,
    opacity: 0.14,
  });

  // Highlighted BIM X-Ray Wireframe Line (for Wireframe mode & Zone 4 Ambient)
  const bimWireframeLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(0x38bdf8),
    transparent: true,
    opacity: 0.0,
  });

  // Highlight Pulse Material (for active clicked 3D hotspot layer in Zone 2)
  const highlightAmber = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xfad18c),
    emissive: new THREE.Color(0xf59e0b),
    emissiveIntensity: 1.75,
    roughness: 0.2,
    metalness: 0.5,
  });

  // Zone 4 Ambient Wireframe Line
  const ambientWireLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(0x38bdf8),
    transparent: true,
    opacity: 0.26,
  });

  const ambientGoldLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(0xd49b4b),
    transparent: true,
    opacity: 0.34,
  });

  return {
    titaniumDark,
    titaniumGraphite,
    brushedAluminum,
    curtainGlass,
    sapphireGlass,
    concreteBasalt,
    structuralSteel,
    machinedCopper,
    pcbSubstrate,
    amberEmissive,
    cyanEmissive,
    retailInteriorGlow,
    cadEdgeLine,
    bimWireframeLine,
    highlightAmber,
    ambientWireLine,
    ambientGoldLine,
    textures: { brushedMap, interiorGlowMap },
  };
}
