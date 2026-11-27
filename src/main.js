import './styles/main.css';
import { StudioEngine } from './three/StudioEngine.js';
import { initScrollChoreography } from './ui/scrollChoreography.js';
import { initZone1Controls } from './ui/zone1Controls.js';
import { initZone2HotspotsAndCallouts } from './ui/zone2Hotspots.js';
import { initZone3Portal } from './ui/zone3Portal.js';
import { initZone4Estimator } from './ui/zone4Estimator.js';
import { initZone5Configurator } from './ui/zone5Configurator.js';
import { initNavigation, showToast } from './ui/navigation.js';

function bootstrapStudioFlagship() {
  const canvas = document.getElementById('studio-canvas');
  if (!canvas) {
    throw new Error('Studio WebGL canvas element (#studio-canvas) not found.');
  }

  // 1. Initialize unified 60 FPS PBR 3D WebGL Engine
  const engine = new StudioEngine(canvas);

  // 2. Initialize Zone 5 Configurator & 1-Click Booking Modal first so other zones can trigger it
  const zone5 = initZone5Configurator({
    onShowToast: showToast,
  });

  // 3. Initialize Lenis + GSAP ScrollTrigger (scrub: 1.2) Choreography
  let navApi = null;
  const scrollController = initScrollChoreography(engine, {
    onZoneChange: (zoneId) => navApi?.setActiveZone(zoneId),
    onScrollPercent: (pct) => navApi?.setScrollPercent(pct),
  });

  // 4. Initialize Navigation & Brand Hydration
  navApi = initNavigation({
    scrollController,
    onOpenBooking: (opts) => zone5.openBookingModal(opts),
  });

  // 5. Mount Zone 1 Lighting/Material Rig Switcher & 360° Orbit Controls
  initZone1Controls(engine);

  // 6. Mount Zone 2 Clickable 3D Hotspot Pins, SVG Hairline Leader Callouts & Live Spec Card
  initZone2HotspotsAndCallouts(engine);

  // 7. Mount Zone 3 Interactive Portal Switcher (Live-synced to 3D Kiosk OLED Display)
  initZone3Portal(engine, {
    onShowToast: showToast,
    onOpenBooking: (opts) => zone5.openBookingModal(opts),
  });

  // 8. Mount Zone 4 Universal B2B Project Scope & Preconstruction ROI Estimator
  initZone4Estimator({
    onShowToast: showToast,
    onSendBriefToEngage: (briefPayload) => {
      zone5.applyEstimatorBrief(briefPayload);
      showToast('Scope brief synced to Engagement Configurator.');
      scrollController.scrollToTarget('#zone-engage');
    },
  });

  // Expose debug handle cleanly on window for automated verification & telemetry inspection
  window.__STUDIO_ENGINE__ = engine;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapStudioFlagship);
} else {
  bootstrapStudioFlagship();
}
