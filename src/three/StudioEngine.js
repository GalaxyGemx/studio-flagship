import * as THREE from 'three';
import gsap from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

import { createStudioMaterials } from './materials.js';
import {
  createStudioDatumFloor,
  createStudioEnvironmentMap,
  createStudioLights,
} from './studioEnvironment.js';
import { buildZone1Massing } from './assemblies/zone1Massing.js';
import { buildZone2Structural } from './assemblies/zone2Structural.js';
import { buildZone3Hardware } from './assemblies/zone3Hardware.js';
import { buildZone4Ambient } from './assemblies/zone4Ambient.js';
import { buildZone5Emblem } from './assemblies/zone5Emblem.js';
import { HARDWARE_CALLOUTS, STRUCTURAL_HOTSPOTS } from '../config/studioConfig.js';

export class StudioEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.isMobile = window.innerWidth < 1024;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Reactive choreography state driven by GSAP ScrollTrigger + UI
    this.state = {
      activeZone: 1,
      zoneWeights: { z1: 1, z2: 0, z3: 0, z4: 0, z5: 0 },
      z1Rise: 0,
      z2Explode: 0,
      z3Explode: 0,
      z5Reassemble: 0,
      lightingMode: 'night',
      // Interactive 360 orbit in Zone 1
      orbitYaw: -0.58,
      orbitTargetYaw: -0.58,
      orbitPitch: 0.24,
      orbitTargetPitch: 0.24,
      orbitAutoSpin: true,
      pointerX: 0,
      pointerY: 0,
    };

    // Smoothed camera pose vectors
    this.camPos = new THREE.Vector3(7.8, 3.9, 13.0);
    this.camTarget = new THREE.Vector3(-2.35, 0.68, 0);
    this.desiredCamPos = new THREE.Vector3(7.8, 3.9, 13.0);
    this.desiredCamTarget = new THREE.Vector3(-2.35, 0.68, 0);
    this.tempVec = new THREE.Vector3();

    this.onProjectAnchors = null;
    this.clock = new THREE.Clock();
    this.rafId = null;

    this._initRenderer();
    this._initScene();
    this._initPostProcessing();
    this._initAssemblies();
    this._bindEvents();

    // Opening architectural rise animation on first load
    gsap.to(this.state, {
      z1Rise: 1,
      duration: 1.65,
      ease: 'power3.out',
      delay: 0.15,
    });

    this.start();
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });

    // Detect software rasterizer (e.g. SwiftShader / llvmpipe) to adapt render targets gracefully
    const gl = this.renderer.getContext();
    const dbgExt = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = dbgExt ? String(gl.getParameter(dbgExt.UNMASKED_RENDERER_WEBGL)) : '';
    this.isSoftwareGPU = /swiftshader|llvmpipe|software/i.test(rendererStr);

    this.renderer.setSize(this.width, this.height, false);
    this.renderer.setPixelRatio(
      this.isSoftwareGPU ? 1 : Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2)
    );
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = !this.isSoftwareGPU;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Keep frosted glass transmission crisp AND locked at 60 FPS on mobile
    this.renderer.transmissionResolutionScale = this.isSoftwareGPU
      ? 0.25
      : this.isMobile
      ? 0.45
      : 0.6;
  }

  _initScene() {
    this.scene = new THREE.Scene();
    this.bgColor = new THREE.Color(0x07080a);
    this.scene.background = this.bgColor;
    this.scene.fog = new THREE.FogExp2(0x07080a, 0.022);

    this.camera = new THREE.PerspectiveCamera(
      this.isMobile ? 44 : 35,
      this.width / this.height,
      0.1,
      90
    );
    this.camera.position.copy(this.camPos);

    // Procedural automotive/architectural softbox HDRI environment map
    this.envMap = createStudioEnvironmentMap(this.renderer);
    this.scene.environment = this.envMap;

    // Three-point studio rim lighting rig + datum floor
    this.lights = createStudioLights(this.scene);
    this.datumFloor = createStudioDatumFloor();
    this.scene.add(this.datumFloor.group);
  }

  _initPostProcessing() {
    // HalfFloatType preserves HDR luminance > 1.0 so UnrealBloomPass selectively
    // blooms glowing amber/cyan telemetry accents while keeping titanium razor-sharp.
    const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
      type: THREE.HalfFloatType,
      samples: this.isMobile || this.isSoftwareGPU ? 0 : 4,
    });
    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      0.34, // strength
      0.46, // radius
      1.02  // HDR threshold
    );
    this.composer.addPass(this.bloomPass);

    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
  }

  _initAssemblies() {
    this.materials = createStudioMaterials(this.isMobile);

    // Hardware desktop & mobile GPUs run full 0.85 physical glass transmission.
    // On CPU-emulated software rasterizers (SwiftShader), avoid double-scene transmission pass stalls.
    if (this.isSoftwareGPU) {
      this.materials.curtainGlass.transmission = 0;
      this.materials.curtainGlass.opacity = 0.52;
      this.materials.sapphireGlass.transmission = 0;
      this.materials.sapphireGlass.opacity = 0.45;
    }

    this.zone1 = buildZone1Massing(this.materials);
    this.zone2 = buildZone2Structural(this.materials);
    this.zone3 = buildZone3Hardware(this.materials);
    this.zone4 = buildZone4Ambient(this.materials);
    this.zone5 = buildZone5Emblem(this.materials);

    // Initial spatial staging
    this.zone2.group.visible = false;
    this.zone3.group.visible = false;
    this.zone4.group.visible = false;
    this.zone5.group.visible = false;

    this.scene.add(
      this.zone1.group,
      this.zone2.group,
      this.zone3.group,
      this.zone4.group,
      this.zone5.group
    );
  }

  _bindEvents() {
    window.addEventListener('resize', this._handleResize);
    window.addEventListener('pointermove', this._handlePointerMove, { passive: true });
  }

  _handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 1024;

    this.camera.fov = this.isMobile ? 44 : 36;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? 1.5 : 2));
    this.composer.setSize(this.width, this.height);
    this.bloomPass.resolution.set(this.width, this.height);
  };

  _handlePointerMove = (e) => {
    this.state.pointerX = (e.clientX / this.width - 0.5) * 2;
    this.state.pointerY = (e.clientY / this.height - 0.5) * 2;
  };

  /**
   * Attaches non-blocking 360-degree orbit drag to a designated DOM interactive zone.
   * Horizontal drags orbit the 3D complex smoothly; vertical swipes pass through to Lenis!
   */
  attachOrbitSurface(element) {
    if (!element) return;
    let dragging = false;
    let lockedHorizontal = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;

    element.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, select')) return;
      dragging = true;
      lockedHorizontal = e.pointerType === 'mouse';
      startX = lastX = e.clientX;
      startY = lastY = e.clientY;
      this.state.orbitAutoSpin = false;
      element.classList.add('is-orbiting');
    });

    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      if (!lockedHorizontal) {
        const totalDx = Math.abs(e.clientX - startX);
        const totalDy = Math.abs(e.clientY - startY);
        if (totalDx > 8 && totalDx > totalDy * 1.15) {
          lockedHorizontal = true;
        } else if (totalDy > 12) {
          // User is scrolling vertically on mobile — release orbit cleanly!
          dragging = false;
          element.classList.remove('is-orbiting');
          return;
        }
      }

      if (lockedHorizontal) {
        this.state.orbitTargetYaw += dx * 0.0095;
        this.state.orbitTargetPitch = THREE.MathUtils.clamp(
          this.state.orbitTargetPitch + dy * 0.0045,
          -0.08,
          0.55
        );
      }
      lastX = e.clientX;
      lastY = e.clientY;
    }, { passive: true });

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      lockedHorizontal = false;
      element.classList.remove('is-orbiting');
    };
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  }

  resetOrbit() {
    this.state.orbitTargetYaw = -0.58;
    this.state.orbitTargetPitch = 0.24;
    this.state.orbitAutoSpin = true;
  }

  /**
   * Smoothly transitions between Daylight Render, Night Retail Glow, and Structural Wireframe.
   */
  setLightingMode(mode) {
    this.state.lightingMode = mode;
    const isDay = mode === 'daylight';
    const isWire = mode === 'wireframe';

    const targetBg = isDay
      ? new THREE.Color(0x1b2432)
      : isWire
      ? new THREE.Color(0x04070d)
      : new THREE.Color(0x07080a);

    gsap.to(this.bgColor, {
      r: targetBg.r,
      g: targetBg.g,
      b: targetBg.b,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        this.scene.background.copy(this.bgColor);
        this.scene.fog.color.copy(this.bgColor);
      },
    });

    // Three-point studio lighting rig preset
    gsap.to(this.lights.keyLight, {
      intensity: isDay ? 5.2 : isWire ? 0.85 : 2.35,
      duration: 0.7,
    });
    gsap.to(this.lights.hemiLight, {
      intensity: isDay ? 2.1 : isWire ? 0.35 : 0.45,
      duration: 0.7,
    });
    gsap.to(this.lights.coolRimLight, {
      intensity: isDay ? 2.2 : isWire ? 4.4 : 2.85,
      duration: 0.7,
    });
    gsap.to(this.lights.warmRimLight, {
      intensity: isDay ? 2.1 : isWire ? 0.45 : 2.65,
      duration: 0.7,
    });
    gsap.to(this.lights.retailPointLight, {
      intensity: isDay ? 0.25 : isWire ? 0.35 : 4.2,
      duration: 0.7,
    });

    // Post-processing bloom tuning per mode
    gsap.to(this.bloomPass, {
      strength: isDay ? 0.1 : isWire ? 0.48 : 0.36,
      threshold: isDay ? 1.25 : isWire ? 0.78 : 1.0,
      duration: 0.7,
    });
    gsap.to(this.renderer, {
      toneMappingExposure: isDay ? 1.45 : isWire ? 1.16 : 1.1,
      duration: 0.7,
    });

    // Material color & emissive responses (zero shader recompilation — instant 60 FPS switch!)
    const tDarkColor = isDay
      ? new THREE.Color(0x28303d)
      : isWire
      ? new THREE.Color(0x070d17)
      : new THREE.Color(0x181c24);
    const tGraphColor = isDay
      ? new THREE.Color(0x3a4557)
      : isWire
      ? new THREE.Color(0x0a1322)
      : new THREE.Color(0x252b36);
    const alumColor = isDay
      ? new THREE.Color(0xb6c1d1)
      : isWire
      ? new THREE.Color(0x1b344d)
      : new THREE.Color(0x6e7887);

    gsap.to(this.materials.titaniumDark.color, { r: tDarkColor.r, g: tDarkColor.g, b: tDarkColor.b, duration: 0.6 });
    gsap.to(this.materials.titaniumGraphite.color, { r: tGraphColor.r, g: tGraphColor.g, b: tGraphColor.b, duration: 0.6 });
    gsap.to(this.materials.brushedAluminum.color, { r: alumColor.r, g: alumColor.g, b: alumColor.b, duration: 0.6 });

    gsap.to(this.materials.retailInteriorGlow, {
      emissiveIntensity: isDay ? 0.14 : isWire ? 0.1 : 2.05,
      duration: 0.7,
    });
    gsap.to(this.materials.amberEmissive, {
      emissiveIntensity: isDay ? 0.55 : isWire ? 1.1 : 1.65,
      duration: 0.7,
    });
    gsap.to(this.materials.bimWireframeLine, {
      opacity: isWire ? 0.92 : 0.0,
      duration: 0.55,
    });
    gsap.to(this.materials.cadEdgeLine, {
      opacity: isWire ? 0.0 : isDay ? 0.28 : 0.14,
      duration: 0.55,
    });
    gsap.to(this.materials.curtainGlass, {
      opacity: isWire ? 0.22 : this.isSoftwareGPU ? 0.52 : 0.92,
      duration: 0.55,
    });
  }

  /**
   * Updates Zone 2 active structural hotspot highlight & isolation.
   */
  setZone2Hotspot(layerKey, isolate = false) {
    this.zone2.setActiveLayer(layerKey, isolate);
  }

  /**
   * Syncs Zone 3's 3D Kiosk OLED screen texture with the live Portal Switcher UI!
   */
  updateKioskPortalScreen(tabId, subState = {}) {
    this.zone3.updatePortalDisplay(tabId, subState);
  }

  /**
   * Computes smoothly interpolated camera & assembly staging from active zone weights.
   */
  _updateChoreography(elapsed, dt) {
    const { zoneWeights: w } = this.state;
    const mob = this.isMobile;

    // 1. Update each assembly's visibility, scale, and scroll-scrubbed animation
    const applyGroupWeight = (group, weight, yDrop = -3.0) => {
      const visible = weight > 0.015;
      group.visible = visible;
      if (!visible) return;
      const eased = weight * weight * (3 - 2 * weight);
      const scale = 0.86 + eased * 0.14;
      group.scale.setScalar(scale);
      group.position.y = (1 - eased) * yDrop;
    };

    // Zone 1 — Hero Massing
    applyGroupWeight(this.zone1.group, w.z1, -2.4);
    if (this.zone1.group.visible) {
      this.zone1.setRiseProgress(this.state.z1Rise);
      if (this.state.orbitAutoSpin) {
        this.state.orbitTargetYaw += dt * 0.11;
      }
      this.state.orbitYaw = THREE.MathUtils.lerp(this.state.orbitYaw, this.state.orbitTargetYaw, Math.min(1, dt * 6));
      this.state.orbitPitch = THREE.MathUtils.lerp(this.state.orbitPitch, this.state.orbitTargetPitch, Math.min(1, dt * 6));
      this.zone1.group.rotation.y = this.state.orbitYaw;
      this.zone1.group.rotation.x = (this.state.orbitPitch - 0.24) * 0.45;
    }

    // Zone 2 — 15-piece Vertical Exploded Structural Teardown
    applyGroupWeight(this.zone2.group, w.z2, -2.2);
    if (this.zone2.group.visible) {
      this.zone2.setExplosionProgress(this.state.z2Explode);
      // Gentle cinematic turntable drift synced to explosion + subtle pointer parallax
      this.zone2.group.rotation.y =
        -0.55 + this.state.z2Explode * 0.42 + this.state.pointerX * 0.08;
    }

    // Zone 3 — 15-piece Z-Axis Exploded Smart Hardware Kiosk
    applyGroupWeight(this.zone3.group, w.z3, -1.8);
    if (this.zone3.group.visible) {
      this.zone3.setExplosionProgress(this.state.z3Explode);
      this.zone3.group.position.y += Math.sin(elapsed * 1.15) * 0.05;
      this.zone3.group.rotation.y += this.state.pointerX * 0.08;
    }

    // Zone 4 — Ambient Low-Poly Architectural Wireframe
    this.zone4.group.visible = w.z4 > 0.02;
    if (this.zone4.group.visible) {
      this.zone4.update(elapsed);
      this.materials.ambientWireLine.opacity = 0.24 * w.z4;
      this.materials.ambientGoldLine.opacity = 0.3 * w.z4;
    }

    // Zone 5 — Magnetic Reassembly Studio Emblem
    applyGroupWeight(this.zone5.group, w.z5, -1.2);
    if (this.zone5.group.visible) {
      this.zone5.setReassemblyProgress(this.state.z5Reassemble);
      this.zone5.update(elapsed, this.state.z5Reassemble);
    }

    // Datum floor visible smoothly in Zones 1 & 2
    const floorWeight = Math.min(1, w.z1 + w.z2 * 0.65);
    this.datumFloor.group.visible = floorWeight > 0.02;
    if (this.datumFloor.group.visible) {
      this.datumFloor.gridMat.opacity = 0.78 * floorWeight;
      this.datumFloor.ringMatInner.opacity = 0.42 * floorWeight;
      this.datumFloor.ringMatOuter.opacity = 0.35 * floorWeight;
      this.datumFloor.group.position.y = -2.45 - this.state.z2Explode * w.z2 * 2.15;
    }

    // 2. Blended Per-Zone Camera Director (asymmetric staging on desktop, clean top stage on mobile)
    const poses = {
      z1: {
        pos: mob ? [0.4, 3.2, 16.5] : [7.8, 3.9, 13.0],
        target: mob ? [0.0, -1.65, 0] : [-2.35, 0.68, 0],
      },
      z2: {
        pos: mob
          ? [0.4, 2.3 + this.state.z2Explode * 0.5, 16.8 + this.state.z2Explode * 3.0]
          : [5.4, 2.1 + this.state.z2Explode * 0.4, 12.2 + this.state.z2Explode * 3.6],
        target: mob ? [0.0, -1.55, 0] : [0.85, 0.15, 0],
      },
      z3: {
        pos: mob
          ? [2.6, 0.8, 11.4 + this.state.z3Explode * 2.2]
          : [4.2, 0.85, 8.8 + this.state.z3Explode * 2.6],
        target: mob ? [0.0, -1.35, 0] : [0.95, 0.0, 0],
      },
      z4: {
        pos: [0, 1.4, mob ? 14.5 : 12.6],
        target: [0, 0.1, -2.2],
      },
      z5: {
        pos: mob ? [0.0, 1.1, 10.6] : [3.2, 1.0, 8.8],
        target: mob ? [0.0, -1.25, 0] : [1.75, 0.05, 0],
      },
    };

    const totalW = Math.max(0.001, w.z1 + w.z2 + w.z3 + w.z4 + w.z5);
    this.desiredCamPos.set(0, 0, 0);
    this.desiredCamTarget.set(0, 0, 0);

    for (const key of ['z1', 'z2', 'z3', 'z4', 'z5']) {
      const weight = w[key] / totalW;
      if (weight <= 0.001) continue;
      this.desiredCamPos.x += poses[key].pos[0] * weight;
      this.desiredCamPos.y += poses[key].pos[1] * weight;
      this.desiredCamPos.z += poses[key].pos[2] * weight;

      this.desiredCamTarget.x += poses[key].target[0] * weight;
      this.desiredCamTarget.y += poses[key].target[1] * weight;
      this.desiredCamTarget.z += poses[key].target[2] * weight;
    }

    // Subtle pointer parallax micro-depth on desktop
    if (!mob) {
      this.desiredCamPos.x += this.state.pointerX * 0.24;
      this.desiredCamPos.y -= this.state.pointerY * 0.14;
    }

    const smoothFactor = Math.min(1, dt * 5.2);
    this.camPos.lerp(this.desiredCamPos, smoothFactor);
    this.camTarget.lerp(this.desiredCamTarget, smoothFactor);

    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camTarget);
  }

  /**
   * Projects 3D world anchors from Zone 2 & Zone 3 into exact viewport pixel coordinates
   * for razor-sharp hairline SVG leader callouts and clickable 3D hotspot pins.
   */
  _project3DAnchors() {
    if (!this.onProjectAnchors) return;

    const projectToScreen = (worldPos) => {
      this.tempVec.copy(worldPos).project(this.camera);
      const visible = this.tempVec.z < 1.0 && this.tempVec.z > -1.0;
      return {
        x: (this.tempVec.x * 0.5 + 0.5) * this.width,
        y: (-this.tempVec.y * 0.5 + 0.5) * this.height,
        visible,
      };
    };

    const payload = {
      z2Weight: this.state.zoneWeights.z2,
      z2Explode: this.state.z2Explode,
      z3Weight: this.state.zoneWeights.z3,
      z3Explode: this.state.z3Explode,
      z2Pins: [],
      z3Callouts: [],
    };

    if (this.state.zoneWeights.z2 > 0.15) {
      STRUCTURAL_HOTSPOTS.forEach((spot) => {
        const wp = this.zone2.getAnchorWorldPosition(spot.layerKey, new THREE.Vector3());
        if (wp) {
          const screen = projectToScreen(wp);
          payload.z2Pins.push({
            id: spot.id,
            code: spot.code,
            label: spot.calloutLabel,
            layerKey: spot.layerKey,
            ...screen,
          });
        }
      });
    }

    if (this.state.zoneWeights.z3 > 0.15) {
      HARDWARE_CALLOUTS.forEach((item) => {
        const wp = this.zone3.getAnchorWorldPosition(item.layerKey, new THREE.Vector3());
        if (wp) {
          const screen = projectToScreen(wp);
          payload.z3Callouts.push({
            id: item.id,
            label: item.label,
            ...screen,
          });
        }
      });
    }

    this.onProjectAnchors(payload);
  }

  start() {
    if (this.rafId !== null) return;
    let lastSoftTime = 0;
    const tick = (now) => {
      this.rafId = requestAnimationFrame(tick);
      if (this.isSoftwareGPU && now - lastSoftTime < 85) {
        return;
      }
      lastSoftTime = now;

      const dt = Math.min(this.clock.getDelta(), 0.05);
      const elapsed = this.clock.elapsedTime;

      this._updateChoreography(elapsed, dt);
      this.composer.render();
      this._project3DAnchors();
    };
    tick(0);
  }

  destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('pointermove', this._handlePointerMove);
    this.renderer.dispose();
  }
}
