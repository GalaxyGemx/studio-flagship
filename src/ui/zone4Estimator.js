import {
  ESTIMATOR_MODULES,
  ESTIMATOR_PROJECT_TYPES,
  ESTIMATOR_TIMELINES,
  STUDIO_CONFIG,
} from '../config/studioConfig.js';

/**
 * Zone 4 — Universal B2B App Centerpiece:
 * "Instant Project Scope & Preconstruction ROI Estimator"
 * Generates real-time budget bands, carry-cost savings, hours saved, timeline,
 * clipboard executive brief, downloadable Markdown brief, and 1-click handoff to Zone 5.
 */
export function initZone4Estimator({ onShowToast, onSendBriefToEngage } = {}) {
  const root = document.getElementById('estimator-app-root');
  if (!root) return;

  const state = {
    projectTypeId: 'mixed-use',
    sqft: 185000,
    timelineId: 'standard',
    activeModules: new Set(ESTIMATOR_MODULES.filter((m) => m.defaultOn).map((m) => m.id)),
  };

  const currencyFmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const numberFmt = new Intl.NumberFormat('en-US');

  function formatCompactMoney(val) {
    if (val >= 1_000_000) {
      return `$${(val / 1_000_000).toFixed(2)}M`;
    }
    return `$${Math.round(val / 1000)}K`;
  }

  function calculateEstimate() {
    const project = ESTIMATOR_PROJECT_TYPES.find((p) => p.id === state.projectTypeId) || ESTIMATOR_PROJECT_TYPES[0];
    const timeline = ESTIMATOR_TIMELINES.find((t) => t.id === state.timelineId) || ESTIMATOR_TIMELINES[1];

    let moduleCost = 0;
    let moduleWeeks = 0;
    let moduleHours = 0;
    let valueMultiplier = 1.0;

    const selectedModules = [];
    ESTIMATOR_MODULES.forEach((m) => {
      if (state.activeModules.has(m.id)) {
        moduleCost += m.costAdd;
        moduleWeeks += m.weeksAdd;
        moduleHours += m.hoursAdd;
        valueMultiplier *= m.valueBoost;
        selectedModules.push(m);
      }
    });

    const scaleCost = state.sqft * project.sqftFactor;
    const midInvestment = (project.baseCost + scaleCost + moduleCost) * timeline.multiplier;
    const investLow = Math.round((midInvestment * 0.88) / 1000) * 1000;
    const investHigh = Math.round((midInvestment * 1.14) / 1000) * 1000;

    // Projected deal velocity / pre-leasing carry savings
    const carryFactor = state.sqft / 100000;
    const acceleratedCarrySavings = Math.round(
      carryFactor * project.carryMonthlyPer100k * project.leaseAccelerationMonths * 0.42 * valueMultiplier
    );

    const hoursSavedAnnual = Math.round(
      (project.hoursSavedBase + moduleHours + (state.sqft / 50000) * 32)
    );

    const targetWeeks = Math.max(
      3.5,
      Number(((project.baseWeeks + moduleWeeks + (state.sqft > 350000 ? 1.2 : 0)) * timeline.weekFactor).toFixed(1))
    );

    // Allocation split across 3 engineering disciplines
    const pct3D = state.activeModules.has('twin3d') ? 46 : 28;
    const pctAI = state.activeModules.has('aiIntake') ? 26 : 16;
    const pctInteractive = 100 - pct3D - pctAI;

    return {
      project,
      timeline,
      selectedModules,
      investLow,
      investHigh,
      acceleratedCarrySavings,
      hoursSavedAnnual,
      targetWeeks,
      alloc: { pct3D, pctInteractive, pctAI },
    };
  }

  function buildExecutiveBriefText(est) {
    const dateStr = new Date().toISOString().split('T')[0];
    const modList =
      est.selectedModules.length > 0
        ? est.selectedModules.map((m) => `- ${m.label}`).join('\n')
        : '- Core Executive Digital Platform';

    return `# ${STUDIO_CONFIG.brandName} — EXECUTIVE PROJECT SCOPE & ROI BRIEF
Generated: ${dateStr}

## 1. Asset & Project Parameters
- Project Category: ${est.project.label}
- Gross Building Scale: ${numberFmt.format(state.sqft)} GSF
- Delivery Cadence: ${est.timeline.label} (${est.timeline.badge})

## 2. Selected Interactive & Automation Modules
${modList}

## 3. Projected Investment & Preconstruction ROI
- Estimated Studio Investment: ${currencyFmt.format(est.investLow)} – ${currencyFmt.format(est.investHigh)}
- Projected Carry / Pre-Leasing Acceleration Value: +${formatCompactMoney(est.acceleratedCarrySavings)}
- Executive & Preconstruction Hours Saved / Yr: ${numberFmt.format(est.hoursSavedAnnual)} hrs
- Target Production Launch Window: ${est.targetWeeks} Weeks

## 4. Recommended Architectural Focus
${est.project.deliverableFocus}

---
Prepared via ${STUDIO_CONFIG.brandName} Interactive Scope Engine (${STUDIO_CONFIG.contactEmail})
`;
  }

  function updateOutputsOnly() {
    const est = calculateEstimate();
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    set('est-sqft-readout', `${numberFmt.format(state.sqft)} GSF`);
    set('est-price-range', `${currencyFmt.format(est.investLow)} – ${currencyFmt.format(est.investHigh)}`);
    set('est-timeline-badge', `${est.timeline.badge} · Target Launch: ${est.targetWeeks} Weeks`);
    set('est-carry-savings', `+${formatCompactMoney(est.acceleratedCarrySavings)}`);
    set('est-hours-saved', `${numberFmt.format(est.hoursSavedAnnual)} hrs/yr`);
    set('est-weeks-out', `${est.targetWeeks} Wks`);
    set('est-roi-multiple', `${(est.acceleratedCarrySavings / Math.max(1, est.investHigh)).toFixed(1)}x Value Ratio`);
    set('est-focus-text', est.project.deliverableFocus);

    const seg1 = document.getElementById('est-alloc-1');
    const seg2 = document.getElementById('est-alloc-2');
    const seg3 = document.getElementById('est-alloc-3');
    if (seg1) seg1.style.width = `${est.alloc.pct3D}%`;
    if (seg2) seg2.style.width = `${est.alloc.pctInteractive}%`;
    if (seg3) seg3.style.width = `${est.alloc.pctAI}%`;

    set('est-legend-1', `3D WebGL ${est.alloc.pct3D}%`);
    set('est-legend-2', `Portal & UX ${est.alloc.pctInteractive}%`);
    set('est-legend-3', `AI & QA ${est.alloc.pctAI}%`);

    // Update preset chips active highlight
    root.querySelectorAll('[data-sqft-preset]').forEach((chip) => {
      chip.classList.toggle('is-active', Number(chip.dataset.sqftPreset) === state.sqft);
    });
  }

  function renderFull() {
    const sqftPresets = [35000, 120000, 185000, 350000, 600000];

    root.innerHTML = `
      <!-- Left: Interactive Configuration Inputs -->
      <div class="estimator-inputs-card surface-glass">
        <div class="est-section">
          <div class="est-section-head">
            <span class="mono-label">01 // SELECT PROJECT TYPE</span>
            <span class="mono-accent">COMMERCIAL BENCHMARK</span>
          </div>
          <div class="project-type-grid" role="radiogroup" aria-label="Project type">
            ${ESTIMATOR_PROJECT_TYPES.map(
              (pt) => `
                <button
                  type="button"
                  role="radio"
                  aria-checked="${state.projectTypeId === pt.id}"
                  class="type-option-card ${state.projectTypeId === pt.id ? 'is-active' : ''}"
                  data-project-type="${pt.id}"
                  id="est-type-${pt.id}"
                >
                  <strong>${pt.label}</strong>
                  <span>Base ${formatCompactMoney(pt.baseCost)} · ${pt.baseWeeks} wks</span>
                </button>
              `
            ).join('')}
          </div>
        </div>

        <div class="est-section">
          <div class="est-section-head">
            <label for="est-sqft-slider" class="mono-label">02 // GROSS SQUARE FOOTAGE / ASSET SCALE</label>
            <span id="est-sqft-readout" class="sqft-display-value">${numberFmt.format(state.sqft)} GSF</span>
          </div>
          <input
            type="range"
            id="est-sqft-slider"
            class="range-slider"
            min="25000"
            max="750000"
            step="5000"
            value="${state.sqft}"
          />
          <div class="preset-row">
            ${sqftPresets
              .map(
                (val) => `
                  <button
                    type="button"
                    class="preset-chip ${state.sqft === val ? 'is-active' : ''}"
                    data-sqft-preset="${val}"
                  >
                    ${val / 1000}K SF
                  </button>
                `
              )
              .join('')}
          </div>
        </div>

        <div class="est-section">
          <div class="est-section-head">
            <span class="mono-label">03 // TARGET LAUNCH TIMELINE</span>
          </div>
          <div class="segmented-control" role="radiogroup" aria-label="Target timeline">
            ${ESTIMATOR_TIMELINES.map(
              (tl) => `
                <button
                  type="button"
                  role="radio"
                  aria-checked="${state.timelineId === tl.id}"
                  class="seg-btn ${state.timelineId === tl.id ? 'is-active' : ''}"
                  data-timeline="${tl.id}"
                  id="est-timeline-${tl.id}"
                >
                  ${tl.label}
                </button>
              `
            ).join('')}
          </div>
        </div>

        <div class="est-section">
          <div class="est-section-head">
            <span class="mono-label">04 // INTERACTIVE CAPABILITY MODULES</span>
            <span class="mono-label">MULTI-SELECT</span>
          </div>
          <div class="module-check-grid">
            ${ESTIMATOR_MODULES.map((m) => {
              const active = state.activeModules.has(m.id);
              return `
                <button
                  type="button"
                  class="module-toggle-row ${active ? 'is-active' : ''}"
                  aria-pressed="${active}"
                  data-module-id="${m.id}"
                  id="est-mod-${m.id}"
                >
                  <span class="module-toggle-left">
                    <span class="check-box">${active ? '✓' : ''}</span>
                    <span>${m.label}</span>
                  </span>
                  <span class="module-cost-tag">+${formatCompactMoney(m.costAdd)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Live Executive Output & Brief Export Card -->
      <div class="estimator-output-card surface-glass" aria-live="polite">
        <div class="output-hero-metric">
          <span class="mono-accent">LIVE STUDIO INVESTMENT ESTIMATE</span>
          <div id="est-price-range" class="output-price-range"></div>
          <div id="est-timeline-badge" class="mono-label"></div>
        </div>

        <div class="output-roi-grid">
          <div class="roi-box">
            <span class="mono-label">PROJECTED CARRY / LEASE VALUE</span>
            <div id="est-carry-savings" class="roi-box-value positive"></div>
          </div>
          <div class="roi-box">
            <span class="mono-label">PRECON HOURS SAVED</span>
            <div id="est-hours-saved" class="roi-box-value cyan"></div>
          </div>
          <div class="roi-box">
            <span class="mono-label">ESTIMATED DELIVERY</span>
            <div id="est-weeks-out" class="roi-box-value"></div>
          </div>
          <div class="roi-box">
            <span class="mono-label">PROJECTED IMPACT RATIO</span>
            <div id="est-roi-multiple" class="roi-box-value" style="color:var(--amber-bright)"></div>
          </div>
        </div>

        <div>
          <span class="mono-label">ENGINEERING EFFORT ALLOCATION</span>
          <div class="allocation-bar">
            <div id="est-alloc-1" class="alloc-seg-1"></div>
            <div id="est-alloc-2" class="alloc-seg-2"></div>
            <div id="est-alloc-3" class="alloc-seg-3"></div>
          </div>
          <div class="allocation-legend">
            <span id="est-legend-1"></span>
            <span id="est-legend-2"></span>
            <span id="est-legend-3"></span>
          </div>
        </div>

        <div class="brief-focus-box">
          <span class="mono-label" style="display:block;margin-bottom:5px">RECOMMENDED ARCHITECTURE</span>
          <span id="est-focus-text"></span>
        </div>

        <div class="output-actions">
          <div class="output-actions-row">
            <button type="button" id="est-copy-brief-btn" class="btn btn-ghost">
              Copy Executive Brief
            </button>
            <button type="button" id="est-download-brief-btn" class="btn btn-ghost">
              Download Brief (.md)
            </button>
          </div>
          <button type="button" id="est-send-engage-btn" class="btn btn-amber btn-full">
            Lock Scope &amp; Configure Studio Engagement →
          </button>
        </div>
      </div>
    `;

    // Bind project type buttons
    root.querySelectorAll('[data-project-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.projectTypeId = btn.dataset.projectType;
        root.querySelectorAll('[data-project-type]').forEach((b) => {
          const on = b.dataset.projectType === state.projectTypeId;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-checked', String(on));
        });
        updateOutputsOnly();
      });
    });

    // Bind range slider
    const slider = root.querySelector('#est-sqft-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        state.sqft = Number(e.target.value);
        updateOutputsOnly();
      });
    }

    // Bind quick square-footage presets
    root.querySelectorAll('[data-sqft-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.sqft = Number(btn.dataset.sqftPreset);
        if (slider) slider.value = String(state.sqft);
        updateOutputsOnly();
      });
    });

    // Bind timeline selector
    root.querySelectorAll('[data-timeline]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.timelineId = btn.dataset.timeline;
        root.querySelectorAll('[data-timeline]').forEach((b) => {
          const on = b.dataset.timeline === state.timelineId;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-checked', String(on));
        });
        updateOutputsOnly();
      });
    });

    // Bind capability module toggles
    root.querySelectorAll('[data-module-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.moduleId;
        if (state.activeModules.has(id)) {
          state.activeModules.delete(id);
        } else {
          state.activeModules.add(id);
        }
        const active = state.activeModules.has(id);
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
        const box = btn.querySelector('.check-box');
        if (box) box.textContent = active ? '✓' : '';
        updateOutputsOnly();
      });
    });

    // Copy Executive Brief
    root.querySelector('#est-copy-brief-btn')?.addEventListener('click', async () => {
      const est = calculateEstimate();
      const text = buildExecutiveBriefText(est);
      try {
        await navigator.clipboard.writeText(text);
        onShowToast?.('Executive Project Scope Brief copied to clipboard.');
      } catch {
        // Fallback textarea copy
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        onShowToast?.('Executive Project Scope Brief copied to clipboard.');
      }
    });

    // Download Brief (.md)
    root.querySelector('#est-download-brief-btn')?.addEventListener('click', () => {
      const est = calculateEstimate();
      const text = buildExecutiveBriefText(est);
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${STUDIO_CONFIG.brandShort.toLowerCase()}-scope-brief-${est.project.id}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onShowToast?.('Downloaded Executive Scope Brief (.md).');
    });

    // Send Brief to Zone 5 Engagement Configurator
    root.querySelector('#est-send-engage-btn')?.addEventListener('click', () => {
      const est = calculateEstimate();
      const summary = `${est.project.label} · ${numberFmt.format(state.sqft)} GSF · Est. ${currencyFmt.format(
        est.investLow
      )}–${currencyFmt.format(est.investHigh)} (${est.targetWeeks} wks)`;
      onSendBriefToEngage?.({
        summary,
        recommendedTierId: state.activeModules.has('aiIntake') && !state.activeModules.has('twin3d')
          ? 'workflow'
          : 'flagship',
      });
    });

    updateOutputsOnly();
  }

  renderFull();

  return {
    getCurrentEstimate: calculateEstimate,
  };
}
