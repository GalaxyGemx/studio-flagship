import { STUDIO_CONFIG } from '../config/studioConfig.js';

/**
 * Institutional Header Navigation, Brand Hydration & Toast Utility
 */
export function initNavigation({ scrollController, onOpenConsultation } = {}) {
  document.querySelectorAll('[data-brand-name]').forEach((el) => {
    el.textContent = STUDIO_CONFIG.brandName;
  });
  document.querySelectorAll('[data-brand-offices]').forEach((el) => {
    el.textContent = STUDIO_CONFIG.offices;
  });
  document.querySelectorAll('[data-brand-email]').forEach((el) => {
    el.textContent = STUDIO_CONFIG.contactEmail;
  });

  const navItems = document.querySelectorAll('[data-zone-link]');
  const progressBar = document.getElementById('header-scroll-bar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const consultBtn = document.getElementById('nav-consult-btn');
  const mobileConsultBtn = document.getElementById('mobile-consult-btn');

  function closeDrawer() {
    if (!mobileDrawer || !mobileBtn) return;
    mobileDrawer.hidden = true;
    mobileBtn.setAttribute('aria-expanded', 'false');
  }

  mobileBtn?.addEventListener('click', () => {
    if (!mobileDrawer) return;
    const willOpen = mobileDrawer.hidden;
    mobileDrawer.hidden = !willOpen;
    mobileBtn.setAttribute('aria-expanded', String(willOpen));
  });

  document.querySelectorAll('a[href^="#zone-"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      closeDrawer();
      scrollController?.scrollToTarget(href);
    });
  });

  consultBtn?.addEventListener('click', () => onOpenConsultation?.());
  mobileConsultBtn?.addEventListener('click', () => {
    closeDrawer();
    onOpenConsultation?.();
  });

  return {
    setActiveZone(zoneId) {
      navItems.forEach((item) => {
        item.classList.toggle('is-active', Number(item.dataset.zoneLink) === zoneId);
      });
    },
    setScrollProgress(pct) {
      if (progressBar) {
        progressBar.style.width = `${pct.toFixed(1)}%`;
      }
    },
  };
}

let toastTimeout = null;
export function showToast(message) {
  const toast = document.getElementById('studio-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}
