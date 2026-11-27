import { LIGHTING_MODES } from '../config/studioConfig.js';

/**
 * Zone 1 Interactive Controls:
 * - Clickable Studio Lighting & Material Preset Switcher (Night Retail Glow, Daylight Render, Structural Wireframe)
 * - 360-degree non-blocking orbit interaction + Reset View trigger
 */
export function initZone1Controls(engine) {
  const toggleGroup = document.getElementById('lighting-toggle-group');
  const codeEl = document.getElementById('lighting-mode-code');
  const descEl = document.getElementById('lighting-mode-desc');
  const navBadge = document.getElementById('nav-lighting-badge');
  const orbitSurface = document.getElementById('hero-orbit-surface');
  const orbitResetBtn = document.getElementById('orbit-reset-btn');

  let activeModeId = 'night';

  function selectMode(modeId, animate = true) {
    const preset = LIGHTING_MODES.find((m) => m.id === modeId) || LIGHTING_MODES[0];
    activeModeId = preset.id;

    if (animate) {
      engine.setLightingMode(preset.id);
    }

    if (codeEl) codeEl.textContent = preset.code;
    if (descEl) descEl.textContent = preset.description;
    if (navBadge) navBadge.textContent = preset.shortLabel.toUpperCase();

    if (toggleGroup) {
      toggleGroup.querySelectorAll('.seg-btn').forEach((btn) => {
        const isCurrent = btn.dataset.mode === preset.id;
        btn.classList.toggle('is-active', isCurrent);
        btn.setAttribute('aria-checked', String(isCurrent));
      });
    }
  }

  if (toggleGroup) {
    toggleGroup.innerHTML = LIGHTING_MODES.map(
      (mode) => `
        <button
          type="button"
          class="seg-btn ${mode.id === activeModeId ? 'is-active' : ''}"
          role="radio"
          aria-checked="${mode.id === activeModeId}"
          data-mode="${mode.id}"
          id="lighting-btn-${mode.id}"
        >
          ${mode.label}
        </button>
      `
    ).join('');

    toggleGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.seg-btn');
      if (!btn) return;
      selectMode(btn.dataset.mode, true);
    });
  }

  // Attach non-blocking 360 orbit surface
  if (orbitSurface) {
    engine.attachOrbitSurface(orbitSurface);
  }

  if (orbitResetBtn) {
    orbitResetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      engine.resetOrbit();
    });
  }

  selectMode('night', false);

  return { selectMode };
}
