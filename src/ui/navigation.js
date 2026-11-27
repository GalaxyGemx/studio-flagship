import { STUDIO_CONFIG } from '../config/studioConfig.js';

/**
 * Wires top architectural navbar, mobile menu drawer, smooth anchor scroll via Lenis,
 * brand name hydration from STUDIO_CONFIG, and global toast helper.
 */
export function initNavigation({ scrollController, onOpenBooking } = {}) {
  // Hydrate single-source brand strings
  document.querySelectorAll('[data-studio-brand]').forEach((el) => {
    el.textContent = STUDIO_CONFIG.brandName;
  });
  document.querySelectorAll('[data-studio-regions]').forEach((el) => {
    el.textContent = STUDIO_CONFIG.regions;
  });
  document.querySelectorAll('[data-ref-project]').forEach((el) => {
    el.textContent = STUDIO_CONFIG.referenceAsset.projectName;
  });

  const navLinks = document.querySelectorAll('[data-zone-link]');
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const navBookBtn = document.getElementById('nav-book-btn');
  const mobileBookBtn = document.getElementById('mobile-drawer-book');
  const pctEl = document.getElementById('nav-scroll-pct');

  const zoneIdToSelector = {
    1: '#zone-hero',
    2: '#zone-structural',
    3: '#zone-hardware',
    4: '#zone-estimator',
    5: '#zone-engage',
  };

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileBtn) return;
    mobileDrawer.hidden = true;
    mobileBtn.setAttribute('aria-expanded', 'false');
  }

  mobileBtn?.addEventListener('click', () => {
    if (!mobileDrawer) return;
    const isOpen = !mobileDrawer.hidden;
    mobileDrawer.hidden = isOpen;
    mobileBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  // Smooth scroll for every zone link & hero anchor CTA
  document.querySelectorAll('a[href^="#zone-"], button[data-zone-link]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const href = el.getAttribute('href');
      const zoneNum = el.dataset.zoneLink;
      const targetSelector = href && href.startsWith('#') ? href : zoneIdToSelector[zoneNum];
      if (!targetSelector) return;
      e.preventDefault();
      closeMobileDrawer();
      scrollController?.scrollToTarget(targetSelector);
    });
  });

  navBookBtn?.addEventListener('click', () => onOpenBooking?.());
  mobileBookBtn?.addEventListener('click', () => {
    closeMobileDrawer();
    onOpenBooking?.();
  });

  return {
    setActiveZone(zoneNum) {
      navLinks.forEach((link) => {
        const isCurrent = Number(link.dataset.zoneLink) === zoneNum;
        link.classList.toggle('is-active', isCurrent);
      });
    },
    setScrollPercent(pct) {
      if (pctEl) pctEl.textContent = `${String(pct).padStart(2, '0')}%`;
    },
  };
}

let toastTimer = null;
export function showToast(message) {
  const el = document.getElementById('studio-toast');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 3400);
}
