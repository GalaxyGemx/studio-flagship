import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis weighted smooth scroll synchronized with GSAP ScrollTrigger (scrub: 1.2)
 * to drive all 5 zones, camera staging, exploded teardowns, and magnetic reassembly.
 */
export function initScrollChoreography(engine, { onZoneChange, onScrollPercent } = {}) {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.45,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const z2Fill = document.getElementById('z2-scrub-fill');
  const z2Readout = document.getElementById('z2-scrub-readout');
  const z3Fill = document.getElementById('z3-scrub-fill');
  const z3Readout = document.getElementById('z3-scrub-readout');
  const z5Fill = document.getElementById('z5-scrub-fill');
  const z5Readout = document.getElementById('z5-scrub-readout');

  const zones = [
    { id: 1, key: 'z1', el: document.getElementById('zone-hero') },
    { id: 2, key: 'z2', el: document.getElementById('zone-structural') },
    { id: 3, key: 'z3', el: document.getElementById('zone-hardware') },
    { id: 4, key: 'z4', el: document.getElementById('zone-estimator') },
    { id: 5, key: 'z5', el: document.getElementById('zone-engage') },
  ];

  // Smooth target weights that update every scroll frame based on viewport intersection
  function updateZoneWeights() {
    const vh = window.innerHeight;
    const viewportMid = vh * 0.5;
    let bestZone = 1;
    let bestScore = -1;

    zones.forEach((z) => {
      if (!z.el) return;
      const rect = z.el.getBoundingClientRect();
      // Compute smooth overlap weight (0 outside, 1 when occupying center of viewport)
      let weight = 0;
      if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
        weight = 1;
      } else if (rect.top > viewportMid && rect.top < vh * 1.15) {
        weight = 1 - (rect.top - viewportMid) / (vh * 0.65);
      } else if (rect.bottom < viewportMid && rect.bottom > -vh * 0.15) {
        weight = 1 - (viewportMid - rect.bottom) / (vh * 0.65);
      }
      weight = Math.max(0, Math.min(1, weight));
      engine.state.zoneWeights[z.key] = weight;

      if (weight > bestScore) {
        bestScore = weight;
        bestZone = z.id;
      }
    });

    if (engine.state.activeZone !== bestZone) {
      engine.state.activeZone = bestZone;
      onZoneChange?.(bestZone);
    }

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / maxScroll) * 100)));
    onScrollPercent?.(pct);
  }

  // Global scroll progress listener
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: updateZoneWeights,
  });

  // Zone 2 — Mini-Teardown #1 (15-piece vertical structural explosion, scrub: 1.2)
  const z2Proxy = { val: 0 };
  gsap.to(z2Proxy, {
    val: 1,
    ease: 'none',
    onUpdate: () => {
      engine.state.z2Explode = z2Proxy.val;
      const pct = Math.round(z2Proxy.val * 100);
      if (z2Fill) z2Fill.style.width = `${pct}%`;
      if (z2Readout) z2Readout.textContent = `${String(pct).padStart(2, '0')}%`;
    },
    scrollTrigger: {
      trigger: '#zone-structural',
      start: 'top 65%',
      end: 'bottom 85%',
      scrub: 1.2,
    },
  });

  // Zone 3 — Mini-Teardown #2 (15-piece Z-axis hardware explosion, scrub: 1.2)
  const z3Proxy = { val: 0 };
  gsap.to(z3Proxy, {
    val: 1,
    ease: 'none',
    onUpdate: () => {
      engine.state.z3Explode = z3Proxy.val;
      const pct = Math.round(z3Proxy.val * 100);
      if (z3Fill) z3Fill.style.width = `${pct}%`;
      if (z3Readout) z3Readout.textContent = `${String(pct).padStart(2, '0')}%`;
    },
    scrollTrigger: {
      trigger: '#zone-hardware',
      start: 'top 65%',
      end: 'bottom 85%',
      scrub: 1.2,
    },
  });

  // Zone 5 — Magnetic Reassembly into Unified Studio Emblem (scrub: 1.2)
  const z5Proxy = { val: 0 };
  gsap.to(z5Proxy, {
    val: 1,
    ease: 'none',
    onUpdate: () => {
      engine.state.z5Reassemble = z5Proxy.val;
      const pct = Math.round(z5Proxy.val * 100);
      if (z5Fill) z5Fill.style.width = `${pct}%`;
      if (z5Readout) z5Readout.textContent = `${String(pct).padStart(2, '0')}%`;
    },
    scrollTrigger: {
      trigger: '#zone-engage',
      start: 'top 80%',
      end: 'bottom 115%',
      scrub: 1.2,
    },
  });

  // Initial sync
  updateZoneWeights();

  return {
    lenis,
    scrollToTarget(selector) {
      const target = document.querySelector(selector);
      if (!target) return;
      lenis.scrollTo(target, {
        offset: selector === '#zone-hero' ? 0 : -12,
        duration: 1.35,
      });
    },
    refresh() {
      ScrollTrigger.refresh();
      updateZoneWeights();
    },
  };
}
