import { STRUCTURAL_HOTSPOTS } from '../config/studioConfig.js';

/**
 * Zone 2 & Zone 3 Real-Time 3D-Projected Hairline Leader Callouts,
 * Clickable 3D Hotspot Pins, and Live Architectural Spec Drawer.
 */
export function initZone2HotspotsAndCallouts(engine) {
  const svg = document.getElementById('callout-svg');
  const hotspotLayer = document.getElementById('hotspot-layer');
  const specCard = document.getElementById('zone2-spec-card');

  let activeHotspotId = 'mepCore';
  let isIsolated = false;

  // Build 6 clickable 3D hotspot pin buttons once for GPU-accelerated transform updates
  const pinElements = new Map();
  if (hotspotLayer) {
    hotspotLayer.innerHTML = '';
    STRUCTURAL_HOTSPOTS.forEach((spot) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hotspot-pin';
      btn.id = `hotspot-pin-${spot.id}`;
      btn.dataset.hotspotId = spot.id;
      btn.setAttribute('aria-label', `Inspect ${spot.title}`);
      btn.textContent = spot.code;
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
      btn.addEventListener('click', () => {
        selectHotspot(spot.id);
      });
      hotspotLayer.appendChild(btn);
      pinElements.set(spot.id, btn);
    });
  }

  function renderSpecCard() {
    if (!specCard) return;
    const spot = STRUCTURAL_HOTSPOTS.find((s) => s.id === activeHotspotId) || STRUCTURAL_HOTSPOTS[0];
    const currentIdx = STRUCTURAL_HOTSPOTS.findIndex((s) => s.id === spot.id);
    const nextSpot = STRUCTURAL_HOTSPOTS[(currentIdx + 1) % STRUCTURAL_HOTSPOTS.length];

    specCard.innerHTML = `
      <div class="spec-layer-selector" role="tablist" aria-label="Structural building layers">
        ${STRUCTURAL_HOTSPOTS.map(
          (item) => `
            <button
              type="button"
              role="tab"
              aria-selected="${item.id === spot.id}"
              class="layer-pill-btn ${item.id === spot.id ? 'is-active' : ''}"
              data-spec-select="${item.id}"
              id="layer-pill-${item.id}"
            >
              ${item.code}
            </button>
          `
        ).join('')}
      </div>

      <div class="spec-drawer-head">
        <span class="mono-accent">${spot.calloutLabel}</span>
        <h3 class="spec-drawer-title">${spot.title}</h3>
        <div class="spec-csi">${spot.csiDivision}</div>
      </div>

      <div class="spec-metrics-grid">
        <div class="spec-metric-box">
          <span class="mono-label">SQUARE FOOTAGE / SCALE</span>
          <strong>${spot.sqft}</strong>
        </div>
        <div class="spec-metric-box">
          <span class="mono-label">LEASE &amp; PROCUREMENT STATUS</span>
          <strong>${spot.leaseStatus}</strong>
        </div>
        <div class="spec-metric-box">
          <span class="mono-label">BUILD COST / SQFT</span>
          <strong>${spot.buildCost}</strong>
          <small>${spot.costContext}</small>
        </div>
      </div>

      <ul class="spec-highlights">
        ${spot.highlights.map((h) => `<li>${h}</li>`).join('')}
      </ul>

      <div class="spec-drawer-actions">
        <button
          type="button"
          id="isolate-layer-btn"
          class="isolate-toggle-btn ${isIsolated ? 'is-active' : ''}"
          aria-pressed="${isIsolated}"
        >
          <span>${isIsolated ? '◉ LAYER ISOLATED' : '◎ ISOLATE 3D LAYER'}</span>
        </button>
        <button type="button" id="next-layer-btn" class="btn btn-ghost btn-sm" data-next="${nextSpot.id}">
          Next (${nextSpot.code}) →
        </button>
      </div>
    `;

    // Bind card interactions
    specCard.querySelectorAll('[data-spec-select]').forEach((btn) => {
      btn.addEventListener('click', () => selectHotspot(btn.dataset.specSelect));
    });

    const isolateBtn = specCard.querySelector('#isolate-layer-btn');
    if (isolateBtn) {
      isolateBtn.addEventListener('click', () => {
        isIsolated = !isIsolated;
        engine.setZone2Hotspot(spot.layerKey, isIsolated);
        renderSpecCard();
      });
    }

    const nextBtn = specCard.querySelector('#next-layer-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => selectHotspot(nextBtn.dataset.next));
    }
  }

  function selectHotspot(id) {
    const spot = STRUCTURAL_HOTSPOTS.find((s) => s.id === id);
    if (!spot) return;
    activeHotspotId = spot.id;
    engine.setZone2Hotspot(spot.layerKey, isIsolated);

    pinElements.forEach((el, pinId) => {
      el.classList.toggle('is-active', pinId === activeHotspotId);
    });
    renderSpecCard();
  }

  /**
   * Resolves vertical collisions among projected SVG callout labels so every
   * hairline leader callout stays cleanly spaced and legible.
   */
  function layoutLabelYs(items, minY, maxY, minGap = 28) {
    const sorted = [...items].sort((a, b) => a.y - b.y);
    const out = new Map();
    let prevY = minY - minGap;

    sorted.forEach((item) => {
      let targetY = Math.max(minY, Math.min(maxY, item.y));
      if (targetY < prevY + minGap) {
        targetY = prevY + minGap;
      }
      prevY = targetY;
      out.set(item.id, targetY);
    });
    return out;
  }

  /**
   * Per-frame projection hook invoked by StudioEngine.
   */
  engine.onProjectAnchors = (payload) => {
    const isMobile = window.innerWidth < 1024;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 1. Update Zone 2 Clickable 3D Hotspot Pins
    const z2PinAlpha =
      payload.z2Weight > 0.25
        ? Math.min(1, (payload.z2Weight - 0.25) / 0.35) * Math.min(1, 0.35 + payload.z2Explode * 1.1)
        : 0;

    if (z2PinAlpha <= 0.02 || payload.z2Pins.length === 0) {
      pinElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
      });
    } else {
      payload.z2Pins.forEach((pin) => {
        const el = pinElements.get(pin.id);
        if (!el) return;
        // Guard against pins drifting under the docked right rail on desktop or bottom tray on mobile
        const maxRight = isMobile ? vw - 22 : vw - 455;
        const maxBottom = isMobile ? vh * 0.49 : vh - 40;
        const inBounds =
          pin.visible && pin.x > 24 && pin.x < maxRight && pin.y > 76 && pin.y < maxBottom;

        if (!inBounds) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          return;
        }
        el.style.transform = `translate3d(${pin.x.toFixed(1)}px, ${pin.y.toFixed(1)}px, 0)`;
        el.style.opacity = z2PinAlpha.toFixed(2);
        el.style.pointerEvents = 'auto';
      });
    }

    // 2. Render SVG Hairline Leader Callouts for Desktop (kept clean & uncrowded on mobile)
    if (!svg) return;
    if (isMobile) {
      if (svg.innerHTML !== '') svg.innerHTML = '';
      return;
    }

    const svgChunks = [];

    // Zone 2 Hairline Leader Callouts
    const z2CalloutAlpha =
      payload.z2Weight > 0.32 && payload.z2Explode > 0.14
        ? Math.min(1, (payload.z2Weight - 0.32) / 0.35) *
          Math.min(1, (payload.z2Explode - 0.14) / 0.3)
        : 0;

    if (z2CalloutAlpha > 0.04 && payload.z2Pins.length > 0) {
      const validPins = payload.z2Pins.filter(
        (p) => p.visible && p.x > 40 && p.x < vw - 460 && p.y > 105 && p.y < vh - 60
      );
      const labelYs = layoutLabelYs(validPins, 315, vh - 95, 34);
      const labelAnchorX = 42;

      validPins.forEach((pin) => {
        const ly = labelYs.get(pin.id) ?? pin.y;
        const isActive = pin.id === activeHotspotId;
        const elbowX = Math.max(labelAnchorX + 205, pin.x - 42);
        const cls = isActive ? 'is-active' : '';

        svgChunks.push(`
          <g opacity="${z2CalloutAlpha.toFixed(2)}">
            <polyline class="callout-polyline ${cls}" points="${pin.x.toFixed(1)},${pin.y.toFixed(1)} ${elbowX.toFixed(1)},${ly.toFixed(1)} ${(labelAnchorX + 188).toFixed(1)},${ly.toFixed(1)}" />
            <circle class="callout-dot ${cls}" cx="${pin.x.toFixed(1)}" cy="${pin.y.toFixed(1)}" r="${isActive ? 3.8 : 2.6}" />
            <text class="callout-text ${cls}" x="${labelAnchorX}" y="${(ly + 3.5).toFixed(1)}">${pin.label}</text>
          </g>
        `);
      });
    }

    // Zone 3 Hardware Hairline Leader Callouts
    const z3CalloutAlpha =
      payload.z3Weight > 0.32 && payload.z3Explode > 0.15
        ? Math.min(1, (payload.z3Weight - 0.32) / 0.35) *
          Math.min(1, (payload.z3Explode - 0.15) / 0.3)
        : 0;

    if (z3CalloutAlpha > 0.04 && payload.z3Callouts.length > 0) {
      const validHW = payload.z3Callouts.filter(
        (c) => c.visible && c.x > 40 && c.x < vw - 520 && c.y > 110 && c.y < vh - 60
      );
      const labelYs = layoutLabelYs(validHW, 305, vh - 95, 34);
      const labelAnchorX = 42;

      validHW.forEach((item) => {
        const ly = labelYs.get(item.id) ?? item.y;
        const elbowX = Math.max(labelAnchorX + 195, item.x - 36);
        svgChunks.push(`
          <g opacity="${z3CalloutAlpha.toFixed(2)}">
            <polyline class="callout-polyline" points="${item.x.toFixed(1)},${item.y.toFixed(1)} ${elbowX.toFixed(1)},${ly.toFixed(1)} ${(labelAnchorX + 182).toFixed(1)},${ly.toFixed(1)}" />
            <circle class="callout-dot" cx="${item.x.toFixed(1)}" cy="${item.y.toFixed(1)}" r="2.8" />
            <text class="callout-text" x="${labelAnchorX}" y="${(ly + 3.5).toFixed(1)}">${item.label}</text>
          </g>
        `);
      });
    }

    svg.innerHTML = svgChunks.join('');
  };

  // Initialize default selection
  selectHotspot(activeHotspotId);

  return { selectHotspot };
}
