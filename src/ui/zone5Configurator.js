import {
  ENGAGEMENT_ADDONS,
  ENGAGEMENT_TIERS,
  STUDIO_CONFIG,
} from '../config/studioConfig.js';

/**
 * Zone 5 — Interactive Studio Engagement Configurator + Accessible 1-Click Booking Modal
 * Dynamically recalculates turnaround & investment based on selected tier & accelerators,
 * carries over briefs from Zone 4 Estimator, and outputs a downloadable .ics calendar invite.
 */
export function initZone5Configurator({ onShowToast } = {}) {
  const root = document.getElementById('zone5-configurator-root');
  const modal = document.getElementById('booking-modal');
  const modalBody = document.getElementById('booking-modal-body');
  const modalCloseBtn = document.getElementById('booking-modal-close');

  const state = {
    selectedTierId: 'flagship',
    selectedAddons: new Set(),
    attachedScopeSummary: '',
    bookingSlot: 'Tomorrow · 10:00 AM ET',
    bookingConfirmed: false,
    lastConfirmation: null,
  };

  const currencyFmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  function computePackageTotals() {
    const tier = ENGAGEMENT_TIERS.find((t) => t.id === state.selectedTierId) || ENGAGEMENT_TIERS[1];
    let addonCost = 0;
    let extraDays = 0;
    const addons = [];

    ENGAGEMENT_ADDONS.forEach((a) => {
      if (state.selectedAddons.has(a.id)) {
        addonCost += a.costAdd;
        extraDays += a.daysAdd;
        addons.push(a);
      }
    });

    const low = tier.priceLow + addonCost;
    const high = tier.priceHigh + addonCost;
    const priceText =
      low === high
        ? `${currencyFmt.format(low)} Fixed`
        : `${currencyFmt.format(low)} – ${currencyFmt.format(high)}`;

    let turnaroundText = tier.turnaroundLabel;
    if (extraDays > 0) {
      if (tier.id === 'prototype') {
        turnaroundText = `${tier.turnaroundDays + extraDays} Days`;
      } else {
        const totalWeeks = Math.round(((tier.turnaroundDays + extraDays) / 7) * 2) / 2;
        turnaroundText = `~${totalWeeks} Weeks`;
      }
    }

    return { tier, addons, low, high, priceText, turnaroundText };
  }

  function renderConfigurator() {
    if (!root) return;
    const pkg = computePackageTotals();

    root.innerHTML = `
      <div class="panel-header-row" style="margin-bottom:0">
        <span class="mono-label">SELECT ENGAGEMENT ARCHITECTURE</span>
        <span class="mono-accent">${pkg.tier.code}</span>
      </div>

      ${
        state.attachedScopeSummary
          ? `<div class="booking-context-pill">
               <span class="mono-accent" style="display:block;margin-bottom:3px">ATTACHED SCOPE BRIEF FROM ESTIMATOR</span>
               ${state.attachedScopeSummary}
             </div>`
          : ''
      }

      <div class="tier-cards-grid" role="radiogroup" aria-label="Studio engagement package">
        ${ENGAGEMENT_TIERS.map(
          (t) => `
            <button
              type="button"
              role="radio"
              aria-checked="${t.id === state.selectedTierId}"
              class="tier-btn-card ${t.id === state.selectedTierId ? 'is-active' : ''}"
              data-tier-id="${t.id}"
              id="engage-tier-${t.id}"
            >
              <span class="tier-code">${t.code}</span>
              <span class="tier-name">${t.name}</span>
              <span class="tier-price">${t.priceDisplay} · ${t.turnaroundLabel}</span>
            </button>
          `
        ).join('')}
      </div>

      <div class="tier-detail-panel">
        <div class="tier-summary-top">
          <div>
            <h3 style="font-family:var(--font-display);font-size:1.25rem;font-weight:600">${pkg.tier.name}</h3>
            <p style="font-size:12.5px;color:var(--ink-secondary);margin-top:3px">${pkg.tier.idealFor}</p>
          </div>
          <div class="tier-turnaround-badge">
            <span class="mono-label">EST. TURNAROUND</span>
            <strong id="engage-turnaround-val">${pkg.turnaroundText}</strong>
          </div>
        </div>

        <ul class="spec-highlights">
          ${pkg.tier.deliverables.map((d) => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      <div>
        <span class="mono-label" style="display:block;margin-bottom:9px">OPTIONAL STUDIO ACCELERATORS</span>
        <div class="addon-chips-row">
          ${ENGAGEMENT_ADDONS.map((a) => {
            const on = state.selectedAddons.has(a.id);
            return `
              <button
                type="button"
                class="addon-chip ${on ? 'is-active' : ''}"
                aria-pressed="${on}"
                data-addon-id="${a.id}"
                id="engage-addon-${a.id}"
              >
                ${on ? '✓ ' : '+ '}${a.label} (${currencyFmt.format(a.costAdd)})
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="config-footer-row">
        <div class="config-total-readout">
          <span class="mono-label">CONFIGURED INVESTMENT</span>
          <strong id="engage-total-price">${pkg.priceText}</strong>
        </div>
        <button type="button" id="engage-open-booking-btn" class="btn btn-amber">
          Book Executive Discovery Call →
        </button>
      </div>
    `;

    root.querySelectorAll('[data-tier-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selectedTierId = btn.dataset.tierId;
        renderConfigurator();
      });
    });

    root.querySelectorAll('[data-addon-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.addonId;
        if (state.selectedAddons.has(id)) {
          state.selectedAddons.delete(id);
        } else {
          state.selectedAddons.add(id);
        }
        renderConfigurator();
      });
    });

    root.querySelector('#engage-open-booking-btn')?.addEventListener('click', () => {
      openBookingModal();
    });
  }

  function downloadICSInvite(details) {
    const now = new Date();
    const start = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    start.setHours(15, 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${STUDIO_CONFIG.brandShort}//Booking//EN`,
      'BEGIN:VEVENT',
      `UID:${details.refId}@northstarinteractive.studio`,
      `DTSTAMP:${fmt(now)}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${STUDIO_CONFIG.brandName} — Executive Architecture Briefing (${details.packageName})`,
      `DESCRIPTION:Attendee: ${details.name} (${details.company})\\nPackage: ${details.packageName} (${details.priceText})\\nSlot: ${details.slot}\\nNotes: ${details.notes.replace(/\n/g, ' ')}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${STUDIO_CONFIG.brandShort.toLowerCase()}-discovery-${details.refId}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowToast?.('Calendar invite (.ics) downloaded.');
  }

  function renderModalContent(customNote = '') {
    if (!modalBody) return;
    const pkg = computePackageTotals();
    const slots = ['Tomorrow · 10:00 AM ET', 'Tomorrow · 2:30 PM ET', 'Thu · 11:00 AM ET'];

    if (state.bookingConfirmed && state.lastConfirmation) {
      const c = state.lastConfirmation;
      modalBody.innerHTML = `
        <div class="booking-confirmed">
          <span class="confirm-badge">✓ BRIEFING RESERVED · REF ${c.refId}</span>
          <p style="font-size:14px;color:var(--ink-primary);line-height:1.6">
            Confirmed for <strong>${c.name}</strong> (${c.company}) — <strong>${c.slot}</strong>.
            Our principal WebGL architect will review your <strong>${c.packageName}</strong> scope
            prior to our call.
          </p>
          <div class="spec-metric-box">
            <span class="mono-label">LOCKED PACKAGE SUMMARY</span>
            <strong>${c.packageName} · ${c.priceText}</strong>
            <small>Turnaround: ${c.turnaroundText} · Dispatch: ${STUDIO_CONFIG.contactEmail}</small>
          </div>
          <div class="output-actions-row">
            <button type="button" id="download-ics-btn" class="btn btn-primary">
              Download Calendar (.ics)
            </button>
            <button type="button" id="booking-done-btn" class="btn btn-ghost">
              Return to Showcase
            </button>
          </div>
        </div>
      `;

      modalBody.querySelector('#download-ics-btn')?.addEventListener('click', () => {
        downloadICSInvite(c);
      });
      modalBody.querySelector('#booking-done-btn')?.addEventListener('click', () => {
        closeBookingModal();
      });
      return;
    }

    const prefillNotes =
      customNote ||
      state.attachedScopeSummary ||
      `Interested in ${pkg.tier.name} (${pkg.priceText}) for upcoming commercial development launch.`;

    modalBody.innerHTML = `
      <form id="studio-booking-form" class="booking-form">
        <div class="booking-context-pill">
          <span class="mono-accent" style="display:block;margin-bottom:2px">SELECTED ARCHITECTURE</span>
          <strong>${pkg.tier.name}</strong> · ${pkg.priceText} · Est. ${pkg.turnaroundText}
          ${pkg.addons.length ? `<div style="font-size:11.5px;color:var(--ink-secondary);margin-top:3px">Add-ons: ${pkg.addons.map((a) => a.label).join(', ')}</div>` : ''}
        </div>

        <div class="field-group">
          <label>PREFERRED BRIEFING WINDOW (30 MIN)</label>
          <div class="slot-pills">
            ${slots
              .map(
                (slot) => `
                  <button
                    type="button"
                    class="slot-btn ${state.bookingSlot === slot ? 'is-active' : ''}"
                    data-slot="${slot}"
                  >
                    ${slot}
                  </button>
                `
              )
              .join('')}
          </div>
        </div>

        <div class="form-grid-2">
          <div class="field-group">
            <label for="book-name">EXECUTIVE NAME</label>
            <input id="book-name" name="name" class="field-input" type="text" required placeholder="Alex Vance" />
          </div>
          <div class="field-group">
            <label for="book-company">FIRM / DEVELOPER</label>
            <input id="book-company" name="company" class="field-input" type="text" required placeholder="Vance Commercial Group" />
          </div>
        </div>

        <div class="field-group">
          <label for="book-email">WORK EMAIL</label>
          <input id="book-email" name="email" class="field-input" type="email" required placeholder="alex@firm.com" />
        </div>

        <div class="field-group">
          <label for="book-notes">ASSET / DEAL CONTEXT</label>
          <textarea id="book-notes" name="notes" class="field-input" rows="3">${prefillNotes}</textarea>
        </div>

        <button type="submit" id="booking-submit-btn" class="btn btn-amber btn-full">
          Confirm 1-Click Executive Briefing
        </button>
      </form>
    `;

    modalBody.querySelectorAll('[data-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.bookingSlot = btn.dataset.slot;
        modalBody.querySelectorAll('[data-slot]').forEach((b) => {
          b.classList.toggle('is-active', b.dataset.slot === state.bookingSlot);
        });
      });
    });

    modalBody.querySelector('#studio-booking-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const refId = `NS-${Math.floor(10000 + Math.random() * 89999)}`;
      state.bookingConfirmed = true;
      state.lastConfirmation = {
        refId,
        name: String(fd.get('name') || '').trim(),
        company: String(fd.get('company') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        notes: String(fd.get('notes') || '').trim(),
        slot: state.bookingSlot,
        packageName: pkg.tier.name,
        priceText: pkg.priceText,
        turnaroundText: pkg.turnaroundText,
      };
      onShowToast?.(`Discovery briefing confirmed (${refId}).`);
      renderModalContent();
    });
  }

  function openBookingModal({ customNote = '' } = {}) {
    if (!modal) return;
    state.bookingConfirmed = false;
    renderModalContent(customNote);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('#book-name')?.focus();
  }

  function closeBookingModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeBookingModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeBookingModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeBookingModal();
    }
  });

  renderConfigurator();

  return {
    openBookingModal,
    closeBookingModal,
    applyEstimatorBrief({ summary, recommendedTierId }) {
      state.attachedScopeSummary = summary;
      if (recommendedTierId) {
        state.selectedTierId = recommendedTierId;
      }
      renderConfigurator();
    },
  };
}
