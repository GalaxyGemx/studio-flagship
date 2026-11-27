import './styles/main.css';
import { initZone1Hero } from './ui/zone1Hero.js';
import { initZone2LayerStack } from './ui/zone2LayerStack.js';
import { initZone3Workflows } from './ui/zone3Workflows.js';
import { initZone4Estimator } from './ui/zone4Estimator.js';
import { initZone5Configurator } from './ui/zone5Configurator.js';
import { initScrollChoreography } from './ui/scrollChoreography.js';
import { initNavigation, showToast } from './ui/navigation.js';

function bootstrapCorporateShowcase() {
  // 1. Initialize Zone 5 Magnetic Assembly & Consultation Modal first so any CTA can open it
  const zone5 = initZone5Configurator({
    onShowToast: showToast,
  });

  // 2. Initialize Zone 1 Executive Hero & Live Client/Operations Switcher
  initZone1Hero({
    onOpenConsultation: (opts) => zone5.openConsultationModal(opts),
  });

  // 3. Initialize Zone 2 2.5D Layered Card Stack & Spec Tabs
  const zone2 = initZone2LayerStack({
    onOpenConsultation: (opts) => zone5.openConsultationModal(opts),
  });

  // 4. Initialize Zone 3 Interactive Corporate Workflows & Before/After Explorer
  initZone3Workflows({
    onOpenConsultation: (opts) => zone5.openConsultationModal(opts),
  });

  // 5. Initialize Lenis + GSAP ScrollTrigger (scrub: 1.2) Motion Choreography
  let navApi = null;
  const scrollController = initScrollChoreography({
    zone2Controller: zone2,
    zone5Controller: zone5,
    onZoneChange: (zoneId) => navApi?.setActiveZone(zoneId),
    onScrollProgress: (pct) => navApi?.setScrollProgress(pct),
  });

  // 6. Initialize Header Navigation & Brand Hydration
  navApi = initNavigation({
    scrollController,
    onOpenConsultation: (opts) => zone5.openConsultationModal(opts),
  });

  // 7. Initialize Zone 4 Universal B2B Project Scope & Executive ROI Estimator
  initZone4Estimator({
    onShowToast: showToast,
    onApplyToEngagement: (payload) => {
      zone5.attachEstimatorScope(payload);
      showToast('Scope summary applied to Engagement Options.');
      scrollController.scrollToTarget('#zone-engage');
    },
  });

  // Expose lightweight state handle for verification
  window.__CORPORATE_STUDIO__ = {
    zone2,
    zone5,
    scroll: scrollController,
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapCorporateShowcase);
} else {
  bootstrapCorporateShowcase();
}
