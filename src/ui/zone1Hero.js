import gsap from 'gsap';
import { HERO_PREVIEW_VIEWS, STUDIO_CONFIG } from '../config/studioConfig.js';

/**
 * Zone 1 — Executive Hero & Live Client / Operations Preview Switcher
 */
export function initZone1Hero({ onOpenConsultation } = {}) {
  const metricsStrip = document.getElementById('hero-metrics-strip');
  const toggleGroup = document.getElementById('hero-view-toggle');
  const cardEl = document.getElementById('hero-artifact-card');

  const state = {
    view: 'client',
    selectedAssetId: 'roswell',
    approvedIds: new Set(),
  };

  if (metricsStrip) {
    metricsStrip.innerHTML = STUDIO_CONFIG.heroMetrics
      .map(
        (m) => `
          <div class="hero-metric-item">
            <dt>${m.value}</dt>
            <dd>${m.label}</dd>
          </div>
        `
      )
      .join('');
  }

  function renderClientView() {
    const data = HERO_PREVIEW_VIEWS.client;
    const asset = data.assets.find((a) => a.id === state.selectedAssetId) || data.assets[0];

    return `
      <div class="window-top-bar">
        <div class="window-title-group">
          <span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="window-title">${data.windowTitle}</span>
        </div>
        <span class="status-pill">${data.badge}</span>
      </div>

      <div class="exec-kpi-row">
        ${data.summaryKpis
          .map(
            (kpi) => `
              <div class="exec-kpi-cell">
                <span class="exec-kpi-label">${kpi.label}</span>
                <strong class="exec-kpi-val">${kpi.value}</strong>
                <span class="exec-kpi-delta">${kpi.delta}</span>
              </div>
            `
          )
          .join('')}
      </div>

      <div>
        <p class="preview-sub-label" style="margin-bottom:8px">${data.subHeading}</p>
        <div class="asset-selector-list" role="listbox" aria-label="Portfolio assets">
          ${data.assets
            .map(
              (item) => `
                <button
                  type="button"
                  role="option"
                  aria-selected="${item.id === asset.id}"
                  class="asset-row-btn ${item.id === asset.id ? 'is-active' : ''}"
                  data-asset-id="${item.id}"
                  id="hero-asset-${item.id}"
                >
                  <div class="asset-row-primary">
                    <strong>${item.name}</strong>
                    <span>${item.location} &middot; ${item.status}</span>
                  </div>
                  <div class="asset-row-metrics">
                    <strong>${item.irr} IRR</strong>
                    <span>${item.multiple} &middot; ${item.leased} Leased</span>
                  </div>
                </button>
              `
            )
            .join('')}
        </div>
      </div>

      <div class="waterfall-box">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="preview-sub-label">Capital Stack &mdash; ${asset.name}</span>
          <span style="font-size:11.5px;color:var(--accent-champagne-light)">${asset.multiple} Target Multiple</span>
        </div>
        ${asset.allocations
          .map(
            (bar) => `
              <div class="waterfall-bar-row">
                <div class="waterfall-meta">
                  <span>${bar.label}</span>
                  <strong>${bar.amount} (${bar.pct}%)</strong>
                </div>
                <div class="waterfall-track">
                  <div class="waterfall-fill" style="width:${bar.pct}%"></div>
                </div>
              </div>
            `
          )
          .join('')}
      </div>

      <p class="window-footnote">${data.footnote}</p>
    `;
  }

  function renderOperationsView() {
    const data = HERO_PREVIEW_VIEWS.operations;

    return `
      <div class="window-top-bar">
        <div class="window-title-group">
          <span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="window-title">${data.windowTitle}</span>
        </div>
        <span class="status-pill sage">${data.badge}</span>
      </div>

      <div class="exec-kpi-row">
        ${data.summaryKpis
          .map(
            (kpi) => `
              <div class="exec-kpi-cell">
                <span class="exec-kpi-label">${kpi.label}</span>
                <strong class="exec-kpi-val">${kpi.value}</strong>
                <span class="exec-kpi-delta">${kpi.delta}</span>
              </div>
            `
          )
          .join('')}
      </div>

      <div>
        <p class="preview-sub-label" style="margin-bottom:8px">${data.subHeading}</p>
        <div class="asset-selector-list">
          ${data.packages
            .map((pkg) => {
              const isApproved = state.approvedIds.has(pkg.id);
              return `
                <button
                  type="button"
                  class="asset-row-btn ${isApproved ? 'is-active' : ''}"
                  data-approve-id="${pkg.id}"
                  id="hero-pkg-${pkg.id}"
                >
                  <div class="asset-row-primary">
                    <strong>${pkg.code} &middot; ${pkg.title}</strong>
                    <span>${pkg.status} &middot; ${pkg.savings}</span>
                  </div>
                  <div class="asset-row-metrics">
                    <strong style="color:${isApproved ? 'var(--accent-sage)' : 'var(--accent-champagne-light)'}">
                      ${isApproved ? '✓ Approved' : 'Approve Brief'}
                    </strong>
                    <span>${pkg.action}</span>
                  </div>
                </button>
              `;
            })
            .join('')}
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <p class="window-footnote" style="border:none;padding:0;flex:1">${data.footnote}</p>
        <button type="button" id="hero-request-demo-btn" class="btn btn-secondary btn-sm">
          Request Live Walkthrough
        </button>
      </div>
    `;
  }

  function renderCard(animate = false) {
    if (!cardEl) return;

    const updateDom = () => {
      cardEl.innerHTML = state.view === 'client' ? renderClientView() : renderOperationsView();

      cardEl.querySelectorAll('[data-asset-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.selectedAssetId = btn.dataset.assetId;
          renderCard(false);
        });
      });

      cardEl.querySelectorAll('[data-approve-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.approveId;
          if (state.approvedIds.has(id)) {
            state.approvedIds.delete(id);
          } else {
            state.approvedIds.add(id);
          }
          renderCard(false);
        });
      });

      cardEl.querySelector('#hero-request-demo-btn')?.addEventListener('click', () => {
        onOpenConsultation?.({
          customNote: 'Requesting an executive walkthrough of Internal Operations & AI Preconstruction workflows.',
        });
      });
    };

    if (!animate) {
      updateDom();
      return;
    }

    gsap.to(cardEl, {
      opacity: 0,
      y: 8,
      duration: 0.16,
      ease: 'power2.in',
      onComplete: () => {
        updateDom();
        gsap.fromTo(
          cardEl,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
        );
      },
    });
  }

  if (toggleGroup) {
    toggleGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-hero-view]');
      if (!btn || btn.dataset.heroView === state.view) return;
      state.view = btn.dataset.heroView;

      toggleGroup.querySelectorAll('[data-hero-view]').forEach((b) => {
        const active = b.dataset.heroView === state.view;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });

      renderCard(true);
    });
  }

  renderCard(false);
}
