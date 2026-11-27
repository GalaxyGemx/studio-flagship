import {
  ESTIMATOR_CAPABILITIES,
  ESTIMATOR_SECTORS,
  ESTIMATOR_TIMELINES,
  STUDIO_CONFIG,
} from '../config/studioConfig.js';

/**
 * Zone 4 — Institutional B2B Project Scope & Executive ROI Estimator
 */
export function initZone4Estimator({ onShowToast, onApplyToEngagement } = {}) {
  const root = document.getElementById('estimator-app-root');
  if (!root) return;

  const state = {
    sectorId: 'cre',
    scaleMillions: 125, // $25M to $500M
    timelineId: 'standard',
    selectedCaps: new Set(ESTIMATOR_CAPABILITIES.filter((c) => c.defaultOn).map((c) => c.id)),
  };

  const currencyFmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const numFmt = new Intl.NumberFormat('en-US');

  function formatCompact(n) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    return `$${Math.round(n / 1000)}K`;
  }

  function calculateModel() {
    const sector =
      ESTIMATOR_SECTORS.find((s) => s.id === state.sectorId) || ESTIMATOR_SECTORS[0];
    const timeline =
      ESTIMATOR_TIMELINES.find((t) => t.id === state.timelineId) || ESTIMATOR_TIMELINES[1];

    let capCost = 0;
    let capWeeks = 0;
    let capHours = 0;
    let roiMult = 1.0;
    const activeCapItems = [];

    ESTIMATOR_CAPABILITIES.forEach((cap) => {
      if (state.selectedCaps.has(cap.id)) {
        capCost += cap.costAdd;
        capWeeks += cap.weeksAdd;
        capHours += cap.hoursAdd;
        roiMult *= cap.roiBoost;
        activeCapItems.push(cap);
      }
    });

    const rawMid =
      (sector.baseInvestment + state.scaleMillions * sector.scaleCostFactor + capCost) *
      timeline.multiplier;
    const investLow = Math.round((rawMid * 0.88) / 1000) * 1000;
    const investHigh = Math.round((rawMid * 1.12) / 1000) * 1000;

    const annualValue = Math.round(
      (48000 + state.scaleMillions * sector.annualValuePerUnit * 0.55) * roiMult
    );
    const hoursReclaimed = Math.round(
      sector.hoursSavedBase + capHours + state.scaleMillions * 1.4
    );

    const estWeeks = Math.max(
      3.5,
      Number(((sector.baseWeeks + capWeeks) * timeline.weekFactor).toFixed(1))
    );

    const paybackMonths = Math.max(
      1.8,
      Number(((investHigh / Math.max(1, annualValue)) * 12).toFixed(1))
    );

    const pUx = state.selectedCaps.has('flagshipWeb') ? 38 : 24;
    const pAi = state.selectedCaps.has('aiWorkflow') ? 32 : 18;
    const pData = 100 - pUx - pAi;

    return {
      sector,
      timeline,
      activeCapItems,
      investLow,
      investHigh,
      annualValue,
      hoursReclaimed,
      estWeeks,
      paybackMonths,
      phases: { pUx, pData, pAi },
    };
  }

  function buildExecutiveMemo(model) {
    const today = new Date().toISOString().split('T')[0];
    const capLines =
      model.activeCapItems.length > 0
        ? model.activeCapItems.map((c) => `- ${c.label}`).join('\n')
        : '- Core Executive Digital Platform';

    return `# ${STUDIO_CONFIG.brandName} — EXECUTIVE PROJECT SCOPE & ROI MEMORANDUM
Date: ${today}

## 1. Organization & Scope Parameters
- Sector: ${model.sector.label}
- Operational / Portfolio Scale: $${state.scaleMillions}M
- Target Delivery Cadence: ${model.timeline.label} (${model.timeline.note})

## 2. Configured Platform Capabilities
${capLines}

## 3. Investment & Projected Financial Return
- Estimated Studio Investment: ${currencyFmt.format(model.investLow)} – ${currencyFmt.format(model.investHigh)}
- Projected Annual Operational & Velocity Value: +${formatCompact(model.annualValue)} / yr
- Leadership & Team Hours Reclaimed: ${numFmt.format(model.hoursReclaimed)} hrs / yr
- Estimated Payback Horizon: ${model.paybackMonths} Months
- Target Production Launch: ${model.estWeeks} Weeks

## 4. Recommended Architecture
${model.sector.recommendedArchitecture}

---
Prepared via ${STUDIO_CONFIG.brandName} (${STUDIO_CONFIG.contactEmail})
`;
  }

  function refreshOutputs() {
    const m = calculateModel();
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setText('est-scale-label', m.sector.scaleUnitLabel);
    setText('est-scale-val', `$${state.scaleMillions}M`);
    setText(
      'est-investment-range',
      `${currencyFmt.format(m.investLow)} – ${currencyFmt.format(m.investHigh)}`
    );
    setText('est-delivery-caption', `${m.timeline.note} · Target Launch in ${m.estWeeks} Weeks`);
    setText('est-annual-value', `+${formatCompact(m.annualValue)} / yr`);
    setText('est-hours-reclaimed', `${numFmt.format(m.hoursReclaimed)} hrs / yr`);
    setText('est-payback', `${m.paybackMonths} Months`);
    setText('est-launch-wks', `${m.estWeeks} Weeks`);
    setText('est-rec-copy', m.sector.recommendedArchitecture);

    const s1 = document.getElementById('phase-seg-1');
    const s2 = document.getElementById('phase-seg-2');
    const s3 = document.getElementById('phase-seg-3');
    if (s1) s1.style.width = `${m.phases.pUx}%`;
    if (s2) s2.style.width = `${m.phases.pData}%`;
    if (s3) s3.style.width = `${m.phases.pAi}%`;

    setText('phase-leg-1', `Editorial UX ${m.phases.pUx}%`);
    setText('phase-leg-2', `Portal & Data ${m.phases.pData}%`);
    setText('phase-leg-3', `AI & Integrations ${m.phases.pAi}%`);

    root.querySelectorAll('[data-scale-preset]').forEach((btn) => {
      btn.classList.toggle('is-active', Number(btn.dataset.scalePreset) === state.scaleMillions);
    });
  }

  function render() {
    const presets = [50, 125, 250, 500];
    const currentSector =
      ESTIMATOR_SECTORS.find((s) => s.id === state.sectorId) || ESTIMATOR_SECTORS[0];

    root.innerHTML = `
      <!-- Left: Executive Configuration Controls -->
      <div class="estimator-form-card elevation-card">
        <div class="est-block">
          <div class="est-block-header">
            <span class="est-step-label">01 &middot; Business Sector</span>
          </div>
          <div class="sector-grid" role="radiogroup" aria-label="Business sector">
            ${ESTIMATOR_SECTORS.map(
              (sec) => `
                <button
                  type="button"
                  role="radio"
                  aria-checked="${sec.id === state.sectorId}"
                  class="sector-card-btn ${sec.id === state.sectorId ? 'is-active' : ''}"
                  data-sector-id="${sec.id}"
                  id="est-sector-${sec.id}"
                >
                  <strong>${sec.shortLabel}</strong>
                  <span>Base ${formatCompact(sec.baseInvestment)} &middot; ~${sec.baseWeeks} wks</span>
                </button>
              `
            ).join('')}
          </div>
        </div>

        <div class="est-block">
          <div class="est-block-header">
            <label for="est-scale-slider" id="est-scale-label" class="est-step-label">
              02 &middot; ${currentSector.scaleUnitLabel}
            </label>
            <strong id="est-scale-val" class="scale-readout">$${state.scaleMillions}M</strong>
          </div>
          <input
            type="range"
            id="est-scale-slider"
            class="corporate-slider"
            min="25"
            max="500"
            step="25"
            value="${state.scaleMillions}"
          />
          <div class="preset-chips">
            ${presets
              .map(
                (val) => `
                  <button
                    type="button"
                    class="preset-btn ${val === state.scaleMillions ? 'is-active' : ''}"
                    data-scale-preset="${val}"
                  >
                    $${val}M${val === 500 ? '+' : ''}
                  </button>
                `
              )
              .join('')}
          </div>
        </div>

        <div class="est-block">
          <div class="est-block-header">
            <span class="est-step-label">03 &middot; Target Delivery Horizon</span>
          </div>
          <div class="timeline-grid-3" role="radiogroup" aria-label="Target delivery horizon">
            ${ESTIMATOR_TIMELINES.map(
              (tl) => `
                <button
                  type="button"
                  role="radio"
                  aria-checked="${tl.id === state.timelineId}"
                  class="preset-btn ${tl.id === state.timelineId ? 'is-active' : ''}"
                  style="padding:10px 8px;text-align:center"
                  data-timeline-id="${tl.id}"
                  id="est-tl-${tl.id}"
                >
                  ${tl.label}
                </button>
              `
            ).join('')}
          </div>
        </div>

        <div class="est-block">
          <div class="est-block-header">
            <span class="est-step-label">04 &middot; Included Platform Capabilities</span>
            <span style="font-size:11px;color:var(--text-muted)">Select all required</span>
          </div>
          <div class="capability-list">
            ${ESTIMATOR_CAPABILITIES.map((cap) => {
              const on = state.selectedCaps.has(cap.id);
              return `
                <button
                  type="button"
                  class="capability-row ${on ? 'is-active' : ''}"
                  aria-pressed="${on}"
                  data-cap-id="${cap.id}"
                  id="est-cap-${cap.id}"
                >
                  <span class="cap-left">
                    <span class="cap-check">${on ? '✓' : ''}</span>
                    <span>${cap.label}</span>
                  </span>
                  <span class="cap-price">+${formatCompact(cap.costAdd)}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Live Executive Financial & ROI Output -->
      <div class="estimator-summary-card elevation-card" aria-live="polite">
        <div class="est-investment-head">
          <span class="eyebrow" style="margin-bottom:4px;display:block">Estimated Studio Investment</span>
          <div id="est-investment-range" class="est-investment-figure"></div>
          <p id="est-delivery-caption" class="est-delivery-note"></p>
        </div>

        <div class="est-roi-grid">
          <div class="est-roi-cell">
            <span>Projected Annual Value</span>
            <strong id="est-annual-value" class="sage"></strong>
          </div>
          <div class="est-roi-cell">
            <span>Hours Reclaimed / Yr</span>
            <strong id="est-hours-reclaimed"></strong>
          </div>
          <div class="est-roi-cell">
            <span>Estimated Payback</span>
            <strong id="est-payback" class="champagne"></strong>
          </div>
          <div class="est-roi-cell">
            <span>Production Window</span>
            <strong id="est-launch-wks"></strong>
          </div>
        </div>

        <div>
          <span class="preview-sub-label">Engineering Allocation</span>
          <div class="phase-bar">
            <div id="phase-seg-1" class="phase-seg-1"></div>
            <div id="phase-seg-2" class="phase-seg-2"></div>
            <div id="phase-seg-3" class="phase-seg-3"></div>
          </div>
          <div class="phase-legend">
            <span id="phase-leg-1"></span>
            <span id="phase-leg-2"></span>
            <span id="phase-leg-3"></span>
          </div>
        </div>

        <div class="est-architecture-rec">
          <strong style="display:block;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent-champagne);margin-bottom:4px">
            Recommended Blueprint
          </strong>
          <span id="est-rec-copy"></span>
        </div>

        <div class="est-export-actions">
          <div class="est-export-pair">
            <button type="button" id="est-copy-memo-btn" class="btn btn-secondary">
              Copy Executive Summary
            </button>
            <button type="button" id="est-download-memo-btn" class="btn btn-secondary">
              Download Memo (.md)
            </button>
          </div>
          <button type="button" id="est-apply-engage-btn" class="btn btn-champagne btn-full">
            Apply Scope to Engagement Options &rarr;
          </button>
        </div>
      </div>
    `;

    // Sector selection
    root.querySelectorAll('[data-sector-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.sectorId = btn.dataset.sectorId;
        root.querySelectorAll('[data-sector-id]').forEach((b) => {
          const active = b.dataset.sectorId === state.sectorId;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-checked', String(active));
        });
        refreshOutputs();
      });
    });

    // Scale slider & presets
    const slider = root.querySelector('#est-scale-slider');
    slider?.addEventListener('input', (e) => {
      state.scaleMillions = Number(e.target.value);
      refreshOutputs();
    });

    root.querySelectorAll('[data-scale-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.scaleMillions = Number(btn.dataset.scalePreset);
        if (slider) slider.value = String(state.scaleMillions);
        refreshOutputs();
      });
    });

    // Timeline selection
    root.querySelectorAll('[data-timeline-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.timelineId = btn.dataset.timelineId;
        root.querySelectorAll('[data-timeline-id]').forEach((b) => {
          const active = b.dataset.timelineId === state.timelineId;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-checked', String(active));
        });
        refreshOutputs();
      });
    });

    // Capability toggles
    root.querySelectorAll('[data-cap-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.capId;
        if (state.selectedCaps.has(id)) {
          state.selectedCaps.delete(id);
        } else {
          state.selectedCaps.add(id);
        }
        const on = state.selectedCaps.has(id);
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', String(on));
        const check = btn.querySelector('.cap-check');
        if (check) check.textContent = on ? '✓' : '';
        refreshOutputs();
      });
    });

    // Copy Executive Summary
    root.querySelector('#est-copy-memo-btn')?.addEventListener('click', async () => {
      const memo = buildExecutiveMemo(calculateModel());
      try {
        await navigator.clipboard.writeText(memo);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = memo;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      onShowToast?.('Executive Scope Memorandum copied to clipboard.');
    });

    // Download Memo
    root.querySelector('#est-download-memo-btn')?.addEventListener('click', () => {
      const m = calculateModel();
      const memo = buildExecutiveMemo(m);
      const blob = new Blob([memo], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `executive-scope-memo-${m.sector.id}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onShowToast?.('Executive Scope Memorandum downloaded.');
    });

    // Apply Scope to Zone 5 Engagement
    root.querySelector('#est-apply-engage-btn')?.addEventListener('click', () => {
      const m = calculateModel();
      const summary = `${m.sector.shortLabel} ($${state.scaleMillions}M Scale) · Est. ${currencyFmt.format(
        m.investLow
      )}–${currencyFmt.format(m.investHigh)} · ${m.estWeeks} Weeks`;
      const recommendedTierId =
        state.selectedCaps.has('aiWorkflow') && !state.selectedCaps.has('flagshipWeb')
          ? 'ai-suite'
          : 'flagship';
      onApplyToEngagement?.({ summary, recommendedTierId });
    });

    refreshOutputs();
  }

  render();

  return { calculateModel };
}
