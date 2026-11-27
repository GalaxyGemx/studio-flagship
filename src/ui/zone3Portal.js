import { PORTAL_DATA } from '../config/studioConfig.js';

/**
 * Zone 3 — Interactive Portal Switcher (Investor ROI View, Tenant Leasing View, Site Progress Tracker)
 * Synchronizes every interactive click directly with the 3D Kiosk's Micro-OLED screen texture!
 */
export function initZone3Portal(engine, { onShowToast, onOpenBooking } = {}) {
  const container = document.getElementById('zone3-portal-card');
  if (!container) return;

  const state = {
    activeTab: 'investor',
    scenario: 'base',
    suiteId: 'L21',
  };

  function sync3DScreen() {
    engine.updateKioskPortalScreen(state.activeTab, {
      scenario: state.scenario,
      suiteId: state.suiteId,
    });
  }

  function renderInvestorBody() {
    const sc = PORTAL_DATA.investor.scenarios[state.scenario];
    return `
      <div class="scenario-row" role="radiogroup" aria-label="Financial underwriting scenario">
        ${Object.entries(PORTAL_DATA.investor.scenarios)
          .map(
            ([key, val]) => `
              <button
                type="button"
                class="scenario-btn ${state.scenario === key ? 'is-active' : ''}"
                data-scenario="${key}"
                id="portal-scenario-${key}"
              >
                ${val.label}
              </button>
            `
          )
          .join('')}
      </div>

      <div class="kpi-grid-2">
        <div class="kpi-tile">
          <span class="mono-label">PROJECTED NET IRR</span>
          <div class="kpi-value accent-amber">${sc.irr}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">EQUITY MULTIPLE</span>
          <div class="kpi-value">${sc.equityMultiple}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">YIELD ON COST</span>
          <div class="kpi-value accent-cyan">${sc.yieldOnCost}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">STABILIZED NOI</span>
          <div class="kpi-value">${sc.stabilizedNoi}</div>
        </div>
      </div>

      <div class="stack-bars">
        <span class="mono-label">CAPITAL STACK · $168.0M TOTAL CAPITALIZATION</span>
        ${sc.capitalStack
          .map(
            (bar) => `
              <div class="stack-bar-item">
                <div class="stack-bar-meta">
                  <span>${bar.label}</span>
                  <strong>${bar.amount} · ${bar.pct}%</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill tone-${bar.tone}" style="width:${bar.pct}%"></div>
                </div>
              </div>
            `
          )
          .join('')}
      </div>

      <p class="panel-micro-desc">${sc.note}</p>
    `;
  }

  function renderTenantBody() {
    const suites = PORTAL_DATA.tenant.suites;
    const selected = suites.find((s) => s.id === state.suiteId) || suites[0];

    return `
      <div class="suite-list" role="listbox" aria-label="Available building suites">
        ${suites
          .map(
            (s) => `
              <button
                type="button"
                role="option"
                aria-selected="${s.id === selected.id}"
                class="suite-row ${s.id === selected.id ? 'is-active' : ''}"
                data-suite="${s.id}"
                id="portal-suite-${s.id}"
              >
                <div class="suite-row-main">
                  <strong>${s.floor} · ${s.suite}</strong>
                  <span>${s.rsf} · ${s.rate}</span>
                </div>
                <span class="suite-status-tag tag-${s.statusTone}">${s.status}</span>
              </button>
            `
          )
          .join('')}
      </div>

      <div class="suite-detail-box">
        <div class="panel-header-row" style="margin-bottom:4px">
          <span class="mono-cyan">${selected.suite.toUpperCase()}</span>
          <span class="mono-label">${selected.delivery}</span>
        </div>
        <div class="suite-detail-grid">
          <div><span class="mono-label">TI ALLOWANCE</span><strong>${selected.tiAllowance}</strong></div>
          <div><span class="mono-label">EXPOSURE</span><strong>${selected.exposure}</strong></div>
        </div>
        <button type="button" id="portal-tour-btn" class="btn btn-ghost btn-sm btn-full">
          Request Private 3D Broker Tour for ${selected.suite}
        </button>
      </div>
    `;
  }

  function renderSiteBody() {
    const { summary, milestones } = PORTAL_DATA.site;
    return `
      <div class="site-summary-strip">
        <div>
          <span class="mono-label">OVERALL GMP COMPLETION</span>
          <div class="site-summary-pct">${summary.overallPct}%</div>
        </div>
        <div style="text-align:right">
          <div class="mono-cyan" style="color:var(--emerald)">${summary.daysAhead}</div>
          <div class="mono-label" style="margin-top:4px">${summary.gmpVariance}</div>
        </div>
      </div>

      <div class="kpi-grid-2">
        <div class="kpi-tile">
          <span class="mono-label">OPEN FIELD RFIs</span>
          <div class="kpi-value">${summary.openRfis}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">SAFETY RECORD</span>
          <div class="kpi-value" style="font-size:1.1rem;padding-top:6px">${summary.safetyDays}</div>
        </div>
      </div>

      <div class="milestone-list">
        ${milestones
          .map(
            (m) => `
              <div class="milestone-item">
                <div class="milestone-top">
                  <span>${m.phase}</span>
                  <strong class="mono-accent">${m.pct}%</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill ${m.pct === 100 ? 'tone-emerald' : 'tone-cyan'}" style="width:${m.pct}%"></div>
                </div>
                <div class="milestone-sub">
                  <span>${m.status}</span>
                  <span>${m.date}</span>
                </div>
              </div>
            `
          )
          .join('')}
      </div>
    `;
  }

  function render() {
    const tabs = [
      { id: 'investor', label: PORTAL_DATA.investor.tabLabel },
      { id: 'tenant', label: PORTAL_DATA.tenant.tabLabel },
      { id: 'site', label: PORTAL_DATA.site.tabLabel },
    ];

    const bodyHtml =
      state.activeTab === 'investor'
        ? renderInvestorBody()
        : state.activeTab === 'tenant'
        ? renderTenantBody()
        : renderSiteBody();

    container.innerHTML = `
      <div class="portal-tabs" role="tablist" aria-label="Smart building executive portal views">
        ${tabs
          .map(
            (tab) => `
              <button
                type="button"
                role="tab"
                aria-selected="${state.activeTab === tab.id}"
                class="portal-tab-btn ${state.activeTab === tab.id ? 'is-active' : ''}"
                data-portal-tab="${tab.id}"
                id="portal-tab-${tab.id}"
              >
                ${tab.label}
              </button>
            `
          )
          .join('')}
      </div>

      <div class="portal-sync-bar">
        <span class="mono-cyan">● 3D KIOSK OLED LIVE-SYNCED</span>
        <span class="mono-label">${PORTAL_DATA[state.activeTab].shortLabel.toUpperCase()}</span>
      </div>

      ${bodyHtml}
    `;

    // Bind tab clicks
    container.querySelectorAll('[data-portal-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeTab = btn.dataset.portalTab;
        sync3DScreen();
        render();
      });
    });

    // Bind investor scenario toggles
    container.querySelectorAll('[data-scenario]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.scenario = btn.dataset.scenario;
        sync3DScreen();
        render();
      });
    });

    // Bind tenant suite clicks
    container.querySelectorAll('[data-suite]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.suiteId = btn.dataset.suite;
        sync3DScreen();
        render();
      });
    });

    // Bind broker tour CTA
    const tourBtn = container.querySelector('#portal-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        const selected = PORTAL_DATA.tenant.suites.find((s) => s.id === state.suiteId);
        onShowToast?.(`Tour brief prepared for ${selected?.suite || 'selected suite'}`);
        onOpenBooking?.({
          customNote: `Requesting interactive 3D leasing portal demo modeled after ${selected?.suite} (${selected?.rsf}).`,
        });
      });
    }
  }

  sync3DScreen();
  render();

  return {
    setTab(tabId) {
      if (!PORTAL_DATA[tabId]) return;
      state.activeTab = tabId;
      sync3DScreen();
      render();
    },
  };
}
