import {
  ASSEMBLY_MODULES,
  ENGAGEMENT_ADDONS,
  ENGAGEMENT_TIERS,
  STUDIO_CONFIG,
} from '../config/studioConfig.js';

/**
 * Zone 5 — Scroll-Triggered Magnetic System Assembly + Engagement Configurator
 * & Zero-Friction Executive Consultation Modal
 */
export function initZone5Configurator({ onShowToast } = {}) {
  const modulesGrid = document.getElementById('magnetic-modules-grid');
  const assemblyBadge = document.getElementById('z5-assembly-badge');
  const configRoot = document.getElementById('zone5-configurator-root');
  const modal = document.getElementById('booking-modal');
  const modalBody = document.getElementById('booking-modal-body');
  const modalCloseBtn = document.getElementById('booking-modal-close');

  const state = {
    tierId: 'flagship',
    addons: new Set(),
    attachedScope: '',
    selectedSlot: 'Tomorrow · 10:00 AM ET',
    confirmed: false,
    confirmationRecord: null,
  };

  const currencyFmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  // 1. Render 4 Magnetic System Assembly Cards inside #magnetic-modules-grid
  const moduleCardEls = [];
  if (modulesGrid) {
    modulesGrid.innerHTML = ASSEMBLY_MODULES.map(
      (mod) => `
        <div class="magnetic-module-card" data-assembly-id="${mod.id}">
          <div class="magnetic-module-top">
            <span>MODULE ${mod.code}</span>
            <span>${mod.metric}</span>
          </div>
          <strong>${mod.title}</strong>
          <p>${mod.detail}</p>
        </div>
      `
    ).join('');

    modulesGrid.querySelectorAll('.magnetic-module-card').forEach((el) => {
      moduleCardEls.push(el);
    });
  }

  /**
   * Scrubs the 4 dispersed system cards from 2.5D offset positions (0)
   * into a crisp, locked 2x2 Executive Delivery Charter grid (1).
   */
  function setAssemblyProgress(progress) {
    const p = Math.max(0, Math.min(1, progress));
    const eased = 1 - Math.pow(1 - p, 3);
    const inv = 1 - eased;

    if (window.innerWidth > 720) {
      moduleCardEls.forEach((el, idx) => {
        const s = ASSEMBLY_MODULES[idx].scatter;
        const tx = s.x * inv;
        const ty = s.y * inv;
        const tz = s.z * inv;
        const rx = s.rx * inv;
        const ry = s.ry * inv;
        const rz = s.rz * inv;

        el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${tz.toFixed(
          1
        )}px) rotateX(${rx.toFixed(1)}deg) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg)`;
        el.style.opacity = (0.45 + 0.55 * eased).toFixed(2);
      });
    }

    if (assemblyBadge) {
      const pct = Math.round(eased * 100);
      if (pct >= 96) {
        assemblyBadge.textContent = 'System Aligned · Ready';
        assemblyBadge.classList.add('sage');
      } else {
        assemblyBadge.textContent = `Blueprint Alignment ${pct}%`;
        assemblyBadge.classList.remove('sage');
      }
    }
  }

  function computeEngagementTotals() {
    const tier = ENGAGEMENT_TIERS.find((t) => t.id === state.tierId) || ENGAGEMENT_TIERS[1];
    let addonSum = 0;
    let addonDays = 0;
    const activeAddons = [];

    ENGAGEMENT_ADDONS.forEach((a) => {
      if (state.addons.has(a.id)) {
        addonSum += a.costAdd;
        addonDays += a.daysAdd;
        activeAddons.push(a);
      }
    });

    const low = tier.priceLow + addonSum;
    const high = tier.priceHigh + addonSum;
    const priceLabel =
      low === high
        ? `${currencyFmt.format(low)} Fixed`
        : `${currencyFmt.format(low)} – ${currencyFmt.format(high)}`;

    let turnaroundLabel = tier.turnaroundLabel;
    if (addonDays > 0) {
      if (tier.id === 'prototype') {
        turnaroundLabel = `${tier.turnaroundDays + addonDays} Business Days`;
      } else {
        const wks = Math.round(((tier.turnaroundDays + addonDays) / 7) * 2) / 2;
        turnaroundLabel = `~${wks} Weeks`;
      }
    }

    return { tier, activeAddons, priceLabel, turnaroundLabel };
  }

  function renderConfigurator() {
    if (!configRoot) return;
    const pkg = computeEngagementTotals();

    configRoot.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <span class="preview-sub-label">Select Engagement Structure</span>
        <span style="font-size:11px;color:var(--accent-champagne)">${pkg.tier.code}</span>
      </div>

      ${
        state.attachedScope
          ? `<div class="attached-scope-banner">
               <strong style="display:block;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent-champagne-light);margin-bottom:2px">
                 Attached Estimator Scope
               </strong>
               ${state.attachedScope}
             </div>`
          : ''
      }

      <div class="tier-selector-grid" role="radiogroup" aria-label="Engagement tier">
        ${ENGAGEMENT_TIERS.map(
          (t) => `
            <button
              type="button"
              role="radio"
              aria-checked="${t.id === state.tierId}"
              class="tier-option-btn ${t.id === state.tierId ? 'is-active' : ''}"
              data-tier-id="${t.id}"
              id="engage-tier-${t.id}"
            >
              <span class="tier-opt-code">${t.code}</span>
              <strong class="tier-opt-name">${t.name}</strong>
              <span class="tier-opt-meta">${t.priceDisplay} &middot; ${t.turnaroundLabel}</span>
            </button>
          `
        ).join('')}
      </div>

      <div class="tier-scope-box">
        <div class="tier-scope-head">
          <div>
            <h3>${pkg.tier.name}</h3>
            <p>${pkg.tier.idealFor}</p>
          </div>
          <div class="turnaround-stat">
            <span>Target Delivery</span>
            <strong id="engage-turnaround">${pkg.turnaroundLabel}</strong>
          </div>
        </div>

        <ul class="editorial-checklist">
          ${pkg.tier.deliverables.map((d) => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      <div>
        <span class="preview-sub-label" style="display:block;margin-bottom:8px">Optional Advisory &amp; Integration Add-Ons</span>
        <div class="addon-row">
          ${ENGAGEMENT_ADDONS.map((addon) => {
            const on = state.addons.has(addon.id);
            return `
              <button
                type="button"
                class="addon-pill-btn ${on ? 'is-active' : ''}"
                aria-pressed="${on}"
                data-addon-id="${addon.id}"
                id="engage-addon-${addon.id}"
              >
                ${on ? '✓ ' : '+ '}${addon.label} (${currencyFmt.format(addon.costAdd)})
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="engage-bottom-bar">
        <div class="engage-price-readout">
          <span>Configured Engagement</span>
          <strong id="engage-total-price">${pkg.priceLabel}</strong>
        </div>
        <button type="button" id="engage-book-btn" class="btn btn-champagne">
          Schedule Partner Consultation &rarr;
        </button>
      </div>
    `;

    configRoot.querySelectorAll('[data-tier-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.tierId = btn.dataset.tierId;
        renderConfigurator();
      });
    });

    configRoot.querySelectorAll('[data-addon-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.addonId;
        if (state.addons.has(id)) {
          state.addons.delete(id);
        } else {
          state.addons.add(id);
        }
        renderConfigurator();
      });
    });

    configRoot.querySelector('#engage-book-btn')?.addEventListener('click', () => {
      openConsultationModal();
    });
  }

  function exportCalendarInvite(record) {
    const now = new Date();
    const start = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    start.setHours(15, 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${STUDIO_CONFIG.brandName}//Executive Briefing//EN`,
      'BEGIN:VEVENT',
      `UID:${record.refId}@northstardigital.co`,
      `DTSTAMP:${fmt(now)}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${STUDIO_CONFIG.brandName} — Executive Consultation (${record.tierName})`,
      `DESCRIPTION:Executive: ${record.name} (${record.company})\\nEngagement: ${record.tierName} (${record.priceLabel})\\nPreferred Window: ${record.slot}\\nBrief: ${record.notes.replace(/\n/g, ' ')}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `executive-consultation-${record.refId.toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast?.('Calendar invitation (.ics) downloaded.');
  }

  function renderModal(customNote = '') {
    if (!modalBody) return;
    const pkg = computeEngagementTotals();
    const slots = ['Tomorrow · 10:00 AM ET', 'Tomorrow · 2:00 PM ET', 'Thu · 11:30 AM ET'];

    if (state.confirmed && state.confirmationRecord) {
      const r = state.confirmationRecord;
      modalBody.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:16px">
          <span class="status-pill sage" style="align-self:flex-start">
            ✓ Consultation Confirmed &middot; Ref ${r.refId}
          </span>
          <p style="font-size:14px;color:var(--text-primary);line-height:1.65">
            Thank you, <strong>${r.name}</strong>. A managing partner has reserved
            <strong>${r.slot}</strong> for <strong>${r.company}</strong> to review your
            <strong>${r.tierName}</strong> scope.
          </p>
          <div class="est-roi-cell">
            <span>Engagement Summary</span>
            <strong style="font-size:1.15rem">${r.tierName} &middot; ${r.priceLabel}</strong>
            <span style="margin-top:4px">Target Delivery: ${r.turnaroundLabel} &middot; ${STUDIO_CONFIG.contactEmail}</span>
          </div>
          <div class="est-export-pair">
            <button type="button" id="modal-ics-btn" class="btn btn-primary">
              Download Calendar (.ics)
            </button>
            <button type="button" id="modal-done-btn" class="btn btn-secondary">
              Return to Overview
            </button>
          </div>
        </div>
      `;

      modalBody.querySelector('#modal-ics-btn')?.addEventListener('click', () => {
        exportCalendarInvite(r);
      });
      modalBody.querySelector('#modal-done-btn')?.addEventListener('click', closeConsultationModal);
      return;
    }

    const defaultNotes =
      customNote ||
      state.attachedScope ||
      `Exploring ${pkg.tier.name} (${pkg.priceLabel}) for upcoming corporate digital initiative.`;

    modalBody.innerHTML = `
      <form id="executive-consult-form" class="consult-form">
        <div class="attached-scope-banner">
          <strong style="display:block;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent-champagne-light)">
            Selected Engagement
          </strong>
          <span>${pkg.tier.name} &middot; ${pkg.priceLabel} (${pkg.turnaroundLabel})</span>
        </div>

        <div class="form-field">
          <label>Preferred 30-Minute Briefing Window</label>
          <div class="slot-grid">
            ${slots
              .map(
                (slot) => `
                  <button
                    type="button"
                    class="slot-choice ${state.selectedSlot === slot ? 'is-active' : ''}"
                    data-slot="${slot}"
                  >
                    ${slot}
                  </button>
                `
              )
              .join('')}
          </div>
        </div>

        <div class="form-row-2">
          <div class="form-field">
            <label for="consult-name">Full Name</label>
            <input id="consult-name" name="name" type="text" class="form-input" required placeholder="Claire Bennett" />
          </div>
          <div class="form-field">
            <label for="consult-company">Organization / Firm</label>
            <input id="consult-company" name="company" type="text" class="form-input" required placeholder="True North Capital" />
          </div>
        </div>

        <div class="form-field">
          <label for="consult-email">Executive Email</label>
          <input id="consult-email" name="email" type="email" class="form-input" required placeholder="cbennett@firm.com" />
        </div>

        <div class="form-field">
          <label for="consult-notes">Initiative Context &amp; Objectives</label>
          <textarea id="consult-notes" name="notes" rows="3" class="form-input">${defaultNotes}</textarea>
        </div>

        <button type="submit" id="consult-submit-btn" class="btn btn-champagne btn-full">
          Confirm Executive Briefing
        </button>
      </form>
    `;

    modalBody.querySelectorAll('[data-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selectedSlot = btn.dataset.slot;
        modalBody.querySelectorAll('[data-slot]').forEach((b) => {
          b.classList.toggle('is-active', b.dataset.slot === state.selectedSlot);
        });
      });
    });

    modalBody.querySelector('#executive-consult-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const refId = `ND-${Math.floor(1000 + Math.random() * 9000)}`;
      state.confirmed = true;
      state.confirmationRecord = {
        refId,
        name: String(fd.get('name') || '').trim(),
        company: String(fd.get('company') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        notes: String(fd.get('notes') || '').trim(),
        slot: state.selectedSlot,
        tierName: pkg.tier.name,
        priceLabel: pkg.priceLabel,
        turnaroundLabel: pkg.turnaroundLabel,
      };
      onShowToast?.(`Consultation confirmed (${refId}).`);
      renderModal();
    });
  }

  function openConsultationModal({ customNote = '' } = {}) {
    if (!modal) return;
    state.confirmed = false;
    renderModal(customNote);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('#consult-name')?.focus();
  }

  function closeConsultationModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeConsultationModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeConsultationModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeConsultationModal();
    }
  });

  renderConfigurator();
  setAssemblyProgress(0);

  return {
    setAssemblyProgress,
    openConsultationModal,
    closeConsultationModal,
    attachEstimatorScope({ summary, recommendedTierId }) {
      state.attachedScope = summary;
      if (recommendedTierId) {
        state.tierId = recommendedTierId;
      }
      renderConfigurator();
    },
  };
}
