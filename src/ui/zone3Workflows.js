import gsap from 'gsap';
import { EXECUTIVE_WORKFLOWS } from '../config/studioConfig.js';

/**
 * Zone 3 — Interactive Executive Workflow & Portfolio Explorer
 * Lets decision-makers switch across real corporate case studies AND toggle live
 * between "Before (Legacy Process)" and "After (Northstar Platform)" states.
 */
export function initZone3Workflows({ onOpenConsultation } = {}) {
  const root = document.getElementById('workflow-explorer-root');
  if (!root) return;

  const state = {
    activeWorkflowId: EXECUTIVE_WORKFLOWS[0].id,
    mode: 'after', // 'before' | 'after'
  };

  function render() {
    const wf =
      EXECUTIVE_WORKFLOWS.find((w) => w.id === state.activeWorkflowId) || EXECUTIVE_WORKFLOWS[0];
    const modeData = state.mode === 'after' ? wf.after : wf.before;
    const isAfter = state.mode === 'after';

    root.innerHTML = `
      <div class="workflow-tabs-row" role="tablist" aria-label="Executive workflow case studies">
        ${EXECUTIVE_WORKFLOWS.map(
          (item) => `
            <button
              type="button"
              role="tab"
              aria-selected="${item.id === wf.id}"
              class="workflow-case-tab ${item.id === wf.id ? 'is-active' : ''}"
              data-wf-tab="${item.id}"
              id="wf-tab-${item.id}"
            >
              <div class="workflow-tab-top">
                <span>CASE STUDY ${item.number}</span>
                <span>${item.id === wf.id ? 'Active' : 'Inspect &rarr;'}</span>
              </div>
              <strong>${item.tabTitle}</strong>
              <span class="sector-tag">${item.sector}</span>
            </button>
          `
        ).join('')}
      </div>

      <div id="workflow-stage-panel" class="workflow-stage-card elevation-card">
        <!-- Left Column: Narrative + Before/After Switcher + 3-Step Pipeline -->
        <div class="workflow-narrative-col">
          <div>
            <span class="eyebrow" style="display:block;margin-bottom:8px">${wf.sector}</span>
            <h3 class="workflow-headline">${wf.headline}</h3>
          </div>

          <p class="workflow-desc">${wf.description}</p>

          <div class="before-after-bar">
            <span class="preview-sub-label">Workflow Comparison</span>
            <div class="segmented-switch" role="radiogroup" aria-label="Before vs After comparison">
              <button
                type="button"
                role="radio"
                aria-checked="${!isAfter}"
                class="switch-btn ${!isAfter ? 'is-active' : ''}"
                data-wf-mode="before"
                id="wf-mode-before"
              >
                Before: Legacy Process
              </button>
              <button
                type="button"
                role="radio"
                aria-checked="${isAfter}"
                class="switch-btn ${isAfter ? 'is-active' : ''}"
                data-wf-mode="after"
                id="wf-mode-after"
              >
                After: Studio Platform
              </button>
            </div>
          </div>

          <div class="workflow-steps-list">
            ${modeData.steps
              .map(
                (s) => `
                  <div class="workflow-step-card">
                    <span class="workflow-step-num">${s.step}</span>
                    <div>
                      <strong>${s.title}</strong>
                      <p>${s.detail}</p>
                    </div>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>

        <!-- Right Column: Quantified Executive Telemetry & Impact Ledger -->
        <div class="workflow-telemetry-col" aria-live="polite">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
            <span class="preview-sub-label">${modeData.label}</span>
            <span class="status-pill ${isAfter ? 'sage' : ''}">
              ${isAfter ? 'Automated & Audited' : 'Manual Bottleneck'}
            </span>
          </div>

          <div class="wf-kpi-trio">
            <div class="wf-kpi-item ${isAfter ? 'is-after' : ''}">
              <span>Cycle Time</span>
              <strong>${modeData.cycleTime}</strong>
            </div>
            <div class="wf-kpi-item ${isAfter ? 'is-after' : ''}">
              <span>Data Integrity</span>
              <strong>${modeData.errorRisk}</strong>
            </div>
            <div class="wf-kpi-item ${isAfter ? 'is-after' : ''}">
              <span>Stakeholder UX</span>
              <strong>${modeData.adoption}</strong>
            </div>
          </div>

          <div class="wf-impact-table">
            <span class="preview-sub-label" style="margin-bottom:4px">${modeData.tableTitle}</span>
            ${modeData.rows
              .map(
                (r) => `
                  <div class="wf-impact-row">
                    <span>${r.item}</span>
                    <strong class="${r.tone === 'positive' ? 'positive' : ''}">${r.metric}</strong>
                  </div>
                `
              )
              .join('')}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding-top:8px;border-top:1px solid var(--border-hairline)">
            <span style="font-size:12px;color:var(--text-muted)">
              Tailored to your existing software stack
            </span>
            <button type="button" id="wf-consult-btn" class="btn btn-secondary btn-sm">
              Request Architecture Brief
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind case-study tab buttons
    root.querySelectorAll('[data-wf-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.wfTab === state.activeWorkflowId) return;
        state.activeWorkflowId = btn.dataset.wfTab;
        state.mode = 'after';
        render();
        const panel = root.querySelector('#workflow-stage-panel');
        if (panel) {
          gsap.fromTo(panel, { opacity: 0.4, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        }
      });
    });

    // Bind Before / After comparison buttons
    root.querySelectorAll('[data-wf-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.wfMode === state.mode) return;
        state.mode = btn.dataset.wfMode;
        render();
        const telemetry = root.querySelector('.workflow-telemetry-col');
        if (telemetry) {
          gsap.fromTo(telemetry, { opacity: 0.35, y: 6 }, { opacity: 1, y: 0, duration: 0.26, ease: 'power2.out' });
        }
      });
    });

    // Bind consultation CTA
    root.querySelector('#wf-consult-btn')?.addEventListener('click', () => {
      onOpenConsultation?.({
        customNote: `Requesting an executive architecture brief modeled after Case Study ${wf.number}: ${wf.tabTitle}.`,
      });
    });
  }

  render();
}
