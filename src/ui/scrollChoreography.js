import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Corporate Luxury Motion Choreography Engine (Lenis + GSAP ScrollTrigger scrub: 1.2)
 * Drives weighted scroll inertia, 2.5D layered card deconstruction, workflow progress,
 * and magnetic system card reassembly at 60 FPS.
 */
export function initScrollChoreography({
  zone2Controller,
  zone5Controller,
  onZoneChange,
  onScrollProgress,
} = {}) {
  const lenis = new Lenis({
    duration: 1.18,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.35,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const z2Fill = document.getElementById('z2-scrub-fill');
  const z2Pct = document.getElementById('z2-scrub-pct');
  const z3Bar = document.getElementById('z3-workflow-bar');
  const heroStage = document.getElementById('hero-parallax-stage');

  const zones = [
    { id: 1, el: document.getElementById('zone-hero') },
    { id: 2, el: document.getElementById('zone-architecture') },
    { id: 3, el: document.getElementById('zone-workflows') },
    { id: 4, el: document.getElementById('zone-estimator') },
    { id: 5, el: document.getElementById('zone-engage') },
  ];

  let activeZoneId = 1;

  function syncGlobalScroll() {
    const midY = window.innerHeight * 0.45;
    let foundZone = activeZoneId;

    for (const z of zones) {
      if (!z.el) continue;
      const rect = z.el.getBoundingClientRect();
      if (rect.top <= midY && rect.bottom >= midY) {
        foundZone = z.id;
        break;
      }
    }

    if (foundZone !== activeZoneId) {
      activeZoneId = foundZone;
      onZoneChange?.(activeZoneId);
    }

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.max(0, Math.min(100, (window.scrollY / maxScroll) * 100));
    onScrollProgress?.(pct);
  }

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: syncGlobalScroll,
  });

  // Zone 1 — Subtle editorial elevation parallax on desktop
  if (heroStage && window.innerWidth > 1080) {
    gsap.to(heroStage, {
      y: -34,
      ease: 'none',
      scrollTrigger: {
        trigger: '#zone-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  // Zone 2 — Scroll-Scrubbed 2.5D Layer Teardown (scrub: 1.2)
  const z2State = { progress: 0 };
  gsap.to(z2State, {
    progress: 1,
    ease: 'none',
    onUpdate: () => {
      zone2Controller?.setDeconstructProgress(z2State.progress);
      const pct = Math.round(z2State.progress * 100);
      if (z2Fill) z2Fill.style.width = `${pct}%`;
      if (z2Pct) z2Pct.textContent = `${pct}%`;
    },
    scrollTrigger: {
      trigger: '#zone-architecture',
      start: 'top 60%',
      end: 'bottom 90%',
      scrub: 1.2,
    },
  });

  // Zone 3 — Scroll-Synced Workflow Progress Rail (scrub: 1.0)
  const z3State = { progress: 0.33 };
  gsap.to(z3State, {
    progress: 1,
    ease: 'none',
    onUpdate: () => {
      if (z3Bar) {
        z3Bar.style.width = `${Math.round(z3State.progress * 100)}%`;
      }
    },
    scrollTrigger: {
      trigger: '#zone-workflows',
      start: 'top 75%',
      end: 'bottom 65%',
      scrub: 1.0,
    },
  });

  // Zone 5 — Scroll-Scrubbed Magnetic System Card Assembly (scrub: 1.2)
  const z5State = { progress: 0 };
  gsap.to(z5State, {
    progress: 1,
    ease: 'none',
    onUpdate: () => {
      zone5Controller?.setAssemblyProgress(z5State.progress);
    },
    scrollTrigger: {
      trigger: '#zone-engage',
      start: 'top 80%',
      end: 'bottom 118%',
      scrub: 1.2,
    },
  });

  // Subtle entrance reveal on editorial headers
  gsap.utils.toArray('.section-header-split, .section-header-centered').forEach((header) => {
    gsap.fromTo(
      header,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 86%',
          once: true,
        },
      }
    );
  });

  syncGlobalScroll();

  return {
    lenis,
    state: { z2State, z3State, z5State },
    scrollToTarget(selector) {
      const target = document.querySelector(selector);
      if (!target) return;
      lenis.scrollTo(target, {
        offset: selector === '#zone-hero' ? 0 : -16,
        duration: 1.25,
      });
    },
  };
}
