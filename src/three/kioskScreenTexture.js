import * as THREE from 'three';
import { PORTAL_DATA, STUDIO_CONFIG } from '../config/studioConfig.js';

/**
 * Generates and live-updates a high-resolution CanvasTexture rendered directly
 * onto Layer 02 (Micro-OLED Display Matrix) of the Zone 3 3D Smart Hardware Kiosk.
 * Clicking Investor ROI / Tenant Leasing / Site Progress visibly updates the 3D screen!
 */
export function createKioskScreenTexture() {
  const width = 512;
  const height = 800;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  function drawRoundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function render(mode = 'investor', state = {}) {
    // Deep matte obsidian OLED canvas
    ctx.fillStyle = '#07090D';
    ctx.fillRect(0, 0, width, height);

    const accent =
      mode === 'investor' ? '#E5A34B' : mode === 'tenant' ? '#38BDF8' : '#5EEAD4';

    // Top ambient subtle illumination strip
    const grad = ctx.createLinearGradient(0, 0, width, 160);
    grad.addColorStop(0, mode === 'investor' ? 'rgba(229,163,75,0.18)' : 'rgba(56,189,248,0.18)');
    grad.addColorStop(1, 'rgba(7,9,13,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, 160);

    // Architectural top header bar
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(28, 76);
    ctx.lineTo(width - 28, 76);
    ctx.stroke();

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 18px monospace';
    ctx.fillText(STUDIO_CONFIG.brandShort + ' // OS v4.2', 28, 48);

    ctx.fillStyle = accent;
    ctx.font = '600 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('LIVE BMS SYNC ●', width - 28, 48);
    ctx.textAlign = 'left';

    // Mode subtitle
    ctx.fillStyle = accent;
    ctx.font = '700 15px monospace';
    const title = PORTAL_DATA[mode]?.screenTitle || 'PORTAL TELEMETRY';
    ctx.fillText(title, 28, 114);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 14px sans-serif';
    ctx.fillText(STUDIO_CONFIG.referenceAsset.projectName, 28, 138);

    if (mode === 'investor') {
      const scenarioKey = state.scenario || 'base';
      const sc = PORTAL_DATA.investor.scenarios[scenarioKey] || PORTAL_DATA.investor.scenarios.base;

      // Primary KPI Hero Card
      drawRoundedRect(28, 168, width - 56, 152, 14);
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(229,163,75,0.45)';
      ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '600 14px monospace';
      ctx.fillText(`TARGET IRR // ${sc.label.toUpperCase()}`, 48, 204);

      ctx.fillStyle = '#F8FAFC';
      ctx.font = '700 66px sans-serif';
      ctx.fillText(sc.irr, 48, 280);

      ctx.fillStyle = '#E5A34B';
      ctx.font = '600 22px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(sc.equityMultiple + ' EM', width - 48, 248);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '500 16px monospace';
      ctx.fillText('YoC ' + sc.yieldOnCost, width - 48, 280);
      ctx.textAlign = 'left';

      // Secondary metrics row
      const cards = [
        { k: 'STABILIZED NOI', v: sc.stabilizedNoi },
        { k: 'PRE-LEASED', v: sc.preLeased },
      ];
      cards.forEach((c, i) => {
        const cx = 28 + i * 236;
        drawRoundedRect(cx, 342, 220, 96, 12);
        ctx.fillStyle = 'rgba(255,255,255,0.035)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.stroke();
        ctx.fillStyle = '#94A3B8';
        ctx.font = '600 13px monospace';
        ctx.fillText(c.k, cx + 18, 374);
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '700 32px sans-serif';
        ctx.fillText(c.v, cx + 18, 418);
      });

      // Capital Stack Bars
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '600 14px monospace';
      ctx.fillText('CAPITAL STACK ALLOCATION ($168.0M)', 28, 486);

      sc.capitalStack.forEach((item, idx) => {
        const y = 514 + idx * 68;
        ctx.fillStyle = '#CBD5E1';
        ctx.font = '500 15px sans-serif';
        ctx.fillText(item.label, 28, y);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '600 15px monospace';
        ctx.fillText(`${item.amount} (${item.pct}%)`, width - 28, y);
        ctx.textAlign = 'left';

        // Bar track
        drawRoundedRect(28, y + 14, width - 56, 14, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fill();

        const barW = ((width - 56) * item.pct) / 100;
        drawRoundedRect(28, y + 14, barW, 14, 6);
        ctx.fillStyle =
          item.tone === 'amber' ? '#E5A34B' : item.tone === 'cyan' ? '#38BDF8' : '#64748B';
        ctx.fill();
      });
    } else if (mode === 'tenant') {
      const activeSuiteId = state.suiteId || 'L21';
      const suites = PORTAL_DATA.tenant.suites;

      ctx.fillStyle = '#CBD5E1';
      ctx.font = '600 14px monospace';
      ctx.fillText('VERTICAL STACK PLAN // SELECT FLOOR', 28, 178);

      suites.forEach((s, idx) => {
        const y = 202 + idx * 96;
        const isSelected = s.id === activeSuiteId;
        drawRoundedRect(28, y, width - 56, 80, 10);
        ctx.fillStyle = isSelected ? 'rgba(56,189,248,0.16)' : 'rgba(255,255,255,0.035)';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#38BDF8' : 'rgba(255,255,255,0.1)';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#38BDF8' : '#94A3B8';
        ctx.font = '700 15px monospace';
        ctx.fillText(s.floor.toUpperCase(), 46, y + 32);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = '600 19px sans-serif';
        ctx.fillText(s.suite, 46, y + 60);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '600 16px monospace';
        ctx.fillText(s.rsf, width - 46, y + 32);

        ctx.fillStyle = s.statusTone === 'amber' ? '#E5A34B' : s.statusTone === 'green' ? '#4ADE80' : '#38BDF8';
        ctx.font = '600 14px monospace';
        ctx.fillText(s.status.toUpperCase(), width - 46, y + 60);
        ctx.textAlign = 'left';
      });
    } else {
      // Site Progress Tracker
      const summary = PORTAL_DATA.site.summary;
      drawRoundedRect(28, 168, width - 56, 124, 14);
      ctx.fillStyle = 'rgba(94,234,212,0.09)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(94,234,212,0.45)';
      ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '600 14px monospace';
      ctx.fillText('OVERALL GMP COMPLETION', 48, 204);

      ctx.fillStyle = '#F8FAFC';
      ctx.font = '700 56px sans-serif';
      ctx.fillText(`${summary.overallPct}%`, 48, 268);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#5EEAD4';
      ctx.font = '600 16px monospace';
      ctx.fillText(summary.daysAhead.toUpperCase(), width - 48, 232);
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '500 14px monospace';
      ctx.fillText(summary.gmpVariance, width - 48, 262);
      ctx.textAlign = 'left';

      PORTAL_DATA.site.milestones.forEach((m, idx) => {
        const y = 328 + idx * 78;
        ctx.fillStyle = '#E2E8F0';
        ctx.font = '600 15px sans-serif';
        ctx.fillText(m.phase, 28, y);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#5EEAD4';
        ctx.font = '700 16px monospace';
        ctx.fillText(`${m.pct}%`, width - 28, y);
        ctx.textAlign = 'left';

        drawRoundedRect(28, y + 14, width - 56, 12, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fill();

        drawRoundedRect(28, y + 14, ((width - 56) * m.pct) / 100, 12, 6);
        ctx.fillStyle = m.pct === 100 ? '#4ADE80' : '#5EEAD4';
        ctx.fill();

        ctx.fillStyle = '#64748B';
        ctx.font = '500 13px monospace';
        ctx.fillText(m.status, 28, y + 46);
      });
    }

    // Bottom hardware telemetry footer bar
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(28, height - 62);
    ctx.lineTo(width - 28, height - 62);
    ctx.stroke();

    ctx.fillStyle = '#64748B';
    ctx.font = '500 13px monospace';
    ctx.fillText('BACNET-IP · POE++ 60W · UWB READY', 28, height - 30);
    ctx.fillStyle = accent;
    ctx.textAlign = 'right';
    ctx.fillText('60 FPS WEBGL', width - 28, height - 30);
    ctx.textAlign = 'left';

    texture.needsUpdate = true;
  }

  render('investor', { scenario: 'base' });

  return {
    texture,
    render,
  };
}
