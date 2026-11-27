import { ARCHITECTURE_LAYERS } from '../config/studioConfig.js';

/**
 * Zone 2 — Scroll-Scrubbed 2.5D Layer Teardown ("Anatomy of a Modern Digital Asset")
 * Smoothly separates 4 executive platform layers in CSS3D depth on scroll (scrub: 1.2)
 * while letting visitors click any layer card or spec tab to inspect deliverables.
 */
export function initZone2LayerStack({ onOpenConsultation } = {}) {
  const stack3d = document.getElementById('layer-stack-3d');
  const tabsEl = document.getElementById('layer-spec-tabs');
  const detailEl = document.getElementById('layer-spec-detail');

  let activeIndex = 0;
  let userLockedSelection = false;
  let currentProgress = 0;

  const cardElements = [];

  if (stack3d) {
    stack3d.innerHTML = ARCHITECTURE_LAYERS.map(
      (layer, idx) => `
        <button
          type="button"
          class="stack-layer-card ${idx === 0 ? 'is-focused' : ''}"
          data-layer-idx="${idx}"
          id="stack-card-${layer.id}"
          aria-label="Inspect ${layer.name}"
          style="z-index:${ARCHITECTURE_LAYERS.length - idx}"
        >
          <div class="layer-card-top">
            <span class="layer-card-eyebrow">${layer.cardPreview.eyebrow}</span>
            <span class="layer-card-index">${layer.index}</span>
          </div>

          <div class="layer-card-mid">
            <h3 class="layer-card-headline">${layer.cardPreview.headline}</h3>
            <div class="layer-card-stat">
              <span>${layer.cardPreview.statLabel}</span>
              <strong>${layer.cardPreview.statValue}</strong>
            </div>
          </div>

          <div class="layer-card-pills">
            ${layer.cardPreview.pills.map((p) => `<span class="layer-mini-pill">${p}</span>`).join('')}
          </div>
        </button>
      `
    ).join('');

    stack3d.querySelectorAll('.stack-layer-card').forEach((el) => {
      cardElements.push(el);
      el.addEventListener('click', () => {
        userLockedSelection = true;
        setActiveLayer(Number(el.dataset.layerIdx));
      });
    });
  }

  if (tabsEl) {
    tabsEl.innerHTML = ARCHITECTURE_LAYERS.map(
      (layer, idx) => `
        <button
          type="button"
          role="tab"
          aria-selected="${idx === 0}"
          class="layer-tab-btn ${idx === 0 ? 'is-active' : ''}"
          data-tab-idx="${idx}"
          id="layer-tab-${layer.id}"
        >
          <span class="layer-tab-num">Layer ${layer.index}</span>
          <span class="layer-tab-name">${layer.shortName}</span>
        </button>
      `
    ).join('');

    tabsEl.querySelectorAll('.layer-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        userLockedSelection = true;
        setActiveLayer(Number(btn.dataset.tabIdx));
      });
    });
  }

  function renderSpecDetail() {
    if (!detailEl) return;
    const layer = ARCHITECTURE_LAYERS[activeIndex] || ARCHITECTURE_LAYERS[0];
    const nextIdx = (activeIndex + 1) % ARCHITECTURE_LAYERS.length;
    const nextLayer = ARCHITECTURE_LAYERS[nextIdx];

    detailEl.innerHTML = `
      <div>
        <span class="eyebrow" style="margin-bottom:6px;display:block">Layer ${layer.index} Specification</span>
        <h3 class="layer-detail-title">${layer.name}</h3>
        <p class="layer-detail-role">${layer.role}</p>
      </div>

      <p class="layer-detail-summary">${layer.summary}</p>

      <div class="layer-metrics-pair">
        ${layer.metrics
          .map(
            (m) => `
              <div class="layer-metric-box">
                <span>${m.label}</span>
                <strong>${m.value}</strong>
              </div>
            `
          )
          .join('')}
      </div>

      <div>
        <span class="preview-sub-label" style="display:block;margin-bottom:10px">Core Architectural Deliverables</span>
        <ul class="editorial-checklist">
          ${layer.deliverables.map((d) => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      <div class="layer-detail-footer">
        <button
          type="button"
          id="layer-inquire-btn"
          class="btn btn-secondary btn-sm"
        >
          Discuss ${layer.shortName}
        </button>
        <button
          type="button"
          id="layer-next-btn"
          class="switch-btn"
          style="color:var(--accent-champagne-light)"
        >
          Next: Layer ${nextLayer.index} &rarr;
        </button>
      </div>
    `;

    detailEl.querySelector('#layer-inquire-btn')?.addEventListener('click', () => {
      onOpenConsultation?.({
        customNote: `Interested in Layer ${layer.index} (${layer.name}) architecture for our organization.`,
      });
    });

    detailEl.querySelector('#layer-next-btn')?.addEventListener('click', () => {
      userLockedSelection = true;
      setActiveLayer(nextIdx);
    });
  }

  function applyCardTransforms(progress) {
    if (!stack3d || window.innerWidth <= 720) return;

    // Smooth S-curve easing
    const p = Math.max(0, Math.min(1, progress));
    const eased = p * p * (3 - 2 * p);

    // Subtle McLaren / Apple 2.5D architectural tilt as the stack separates
    const rotX = eased * 14;
    const rotY = eased * -12;
    const rotZ = eased * 1.5;
    stack3d.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;

    // Clean non-overlapping vertical & Z-depth separation across the 4 plates
    const ySpread = [-156, -52, 52, 156];
    const zSpread = [96, 32, -32, -96];
    const xSpread = [-14, -5, 5, 14];

    cardElements.forEach((el, idx) => {
      const isFocused = idx === activeIndex;
      // Crisp physical card deck offset at rest (0%)
      const baseOffset = (idx - 1.5) * 14;
      const baseZ = -idx * 14;

      const tx = xSpread[idx] * eased + (isFocused ? -8 * eased : 0);
      const ty = baseOffset * (1 - eased) + ySpread[idx] * eased;
      const tz = baseZ * (1 - eased) + zSpread[idx] * eased + (isFocused ? 28 * eased : 0);
      const scale = isFocused ? 1 + 0.03 * eased : 1 - 0.015 * eased;

      el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      el.classList.toggle('is-focused', isFocused);
      el.classList.toggle('is-recessed', !isFocused && eased > 0.2);
    });
  }

  function setActiveLayer(idx) {
    activeIndex = Math.max(0, Math.min(ARCHITECTURE_LAYERS.length - 1, idx));

    tabsEl?.querySelectorAll('.layer-tab-btn').forEach((btn, bIdx) => {
      const active = bIdx === activeIndex;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    cardElements.forEach((el, cIdx) => {
      el.classList.toggle('is-focused', cIdx === activeIndex);
    });

    renderSpecDetail();
    applyCardTransforms(currentProgress);
  }

  function setDeconstructProgress(progress) {
    currentProgress = Math.max(0, Math.min(1, progress));

    // Automatically step active layer tab along scroll unless visitor clicked a specific layer
    if (!userLockedSelection && window.innerWidth > 1080) {
      const autoIdx = Math.min(
        ARCHITECTURE_LAYERS.length - 1,
        Math.floor(currentProgress * ARCHITECTURE_LAYERS.length)
      );
      if (autoIdx !== activeIndex) {
        setActiveLayer(autoIdx);
        return;
      }
    }

    applyCardTransforms(currentProgress);
  }

  renderSpecDetail();
  applyCardTransforms(0);

  return {
    setDeconstructProgress,
    setActiveLayer,
  };
}
