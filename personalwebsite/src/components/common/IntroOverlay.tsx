import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroOverlayProps {
  visible: boolean;
  onComplete: () => void;
}

interface VortexStreak {
  angle: number;
  radius: number;
  length: number;
  speed: number;
  width: number;
  color: string;
}

interface CityTower {
  x: number;
  width: number;
  height: number;
  stacks: number;
}

interface ClockGear {
  x: number;
  y: number;
  radius: number;
  teeth: number;
  speed: number;
  phase: number;
  color: string;
  path?: Path2D;
}

interface TimeGlyph {
  angle: number;
  radius: number;
  label: string;
  speed: number;
  size: number;
}

const INTRO_DURATION = 12;

const palette = {
  cerulean: 'rgba(36, 196, 255,',
  gold: 'rgba(255, 183, 55,',
  indigo: 'rgba(20, 18, 72,',
  smoke: 'rgba(7, 8, 13,',
  brick: 'rgba(42, 30, 25,',
};

const IntroOverlay: React.FC<IntroOverlayProps> = ({ visible, onComplete }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!visible) {
      return undefined;
    }

    if (import.meta.env.MODE === 'test') {
      onComplete();
      return undefined;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const overlay = overlayRef.current;
    const copy = copyRef.current;

    if (!canvas || !ctx || !overlay) {
      onComplete();
      return undefined;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let animationFrame = 0;
    let copyTimeline: gsap.core.Timeline | null = null;
    const startTime = performance.now();

    const colors = ['36, 196, 255', '255, 183, 55', '61, 57, 168', '232, 244, 255'];
    const streaks: VortexStreak[] = Array.from({ length: 104 }, (_, index) => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random(),
      length: 0.22 + Math.random() * 0.62,
      speed: 0.38 + Math.random() * 1.35,
      width: 0.7 + Math.random() * 3.2,
      color: colors[index % colors.length],
    }));

    const towers: CityTower[] = Array.from({ length: 17 }, (_, index) => ({
      x: index / 16,
      width: 0.035 + Math.random() * 0.055,
      height: 0.16 + Math.random() * 0.42,
      stacks: 1 + Math.floor(Math.random() * 3),
    }));

    const gears: ClockGear[] = Array.from({ length: 9 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.05 + Math.random() * 0.15,
      teeth: 12 + Math.floor(Math.random() * 28),
      speed: (index % 2 === 0 ? 1 : -1) * (0.35 + Math.random() * 1.4),
      phase: Math.random() * Math.PI * 2,
      color: index % 3 === 0 ? 'rgba(188, 121, 36,' : index % 3 === 1 ? 'rgba(111, 91, 64,' : 'rgba(149, 154, 151,',
    }));

    const romanNumerals = ['XII', 'III', 'VI', 'IX', '1889', '1901', '2026', 'A.D.'];
    const timeGlyphs: TimeGlyph[] = Array.from({ length: 28 }, (_, index) => ({
      angle: (index / 28) * Math.PI * 2,
      radius: 0.18 + (index % 5) * 0.11 + Math.random() * 0.05,
      label: romanNumerals[index % romanNumerals.length],
      speed: (index % 2 === 0 ? 1 : -1) * (0.18 + Math.random() * 0.24),
      size: 10 + Math.random() * 14,
    }));

    const grainPoints = Array.from({ length: 36 }, (_, index) => ({
      xSeed: index * 54.23,
      ySeed: index * 31.11,
      speedX: 0.45 + Math.random() * 0.25,
      speedY: 0.28 + Math.random() * 0.22,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const easeIn = (value: number) => value * value * value;
    const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const phase = (time: number, start: number, end: number) => clamp((time - start) / (end - start));

    const drawTemporalDials = (time: number, cx: number, cy: number, tunnelRadius: number, alpha: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';

      for (let ring = 0; ring < 5; ring += 1) {
        const radius = tunnelRadius * (0.28 + ring * 0.22);
        const spin = time * (0.18 + ring * 0.04) * (ring % 2 ? -1 : 1);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(spin);
        ctx.scale(1, 0.58);
        ctx.strokeStyle = `rgba(${ring % 2 ? '255, 183, 55' : '36, 196, 255'}, ${alpha * (0.2 - ring * 0.022)})`;
        ctx.lineWidth = 1.2 + ring * 0.25;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        for (let tick = 0; tick < 48; tick += 1) {
          const angle = (tick / 48) * Math.PI * 2;
          const tickLength = tick % 4 === 0 ? 16 : 7;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * (radius - tickLength), Math.sin(angle) * (radius - tickLength));
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.font = '700 14px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      timeGlyphs.forEach((glyph) => {
        const angle = glyph.angle + time * glyph.speed;
        const radius = tunnelRadius * glyph.radius;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.58;
        const glyphAlpha = alpha * (0.18 + glyph.radius * 0.22);
        ctx.fillStyle = `rgba(235, 219, 176, ${glyphAlpha})`;
        ctx.font = `700 ${glyph.size}px Georgia, serif`;
        ctx.fillText(glyph.label, x, y);
      });

      const handAlpha = alpha * 0.42;
      ctx.strokeStyle = `rgba(255, 224, 164, ${handAlpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(time * 1.9) * tunnelRadius * 0.32, cy + Math.sin(time * 1.9) * tunnelRadius * 0.18);
      ctx.stroke();
      ctx.strokeStyle = `rgba(36, 196, 255, ${handAlpha})`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(-time * 3.4) * tunnelRadius * 0.22, cy + Math.sin(-time * 3.4) * tunnelRadius * 0.13);
      ctx.stroke();

      ctx.restore();
    };

    const drawVortex = (time: number) => {
      const cx = width * (0.5 + Math.sin(time * 3.5) * 0.035);
      const cy = height * (0.46 + Math.cos(time * 2.6) * 0.03);
      const acceleration = 1 + easeIn(phase(time, 0, 2.35)) * 4.4;
      const tunnelRadius = Math.max(width, height) * (0.22 + acceleration * 0.055);

      const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.78);
      radial.addColorStop(0, `${palette.gold} ${0.18 + acceleration * 0.035})`);
      radial.addColorStop(0.22, `${palette.cerulean} ${0.17 + acceleration * 0.025})`);
      radial.addColorStop(0.55, `${palette.indigo} 0.72)`);
      radial.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      streaks.forEach((streak) => {
        const travel = (streak.radius + time * streak.speed * 0.34 * acceleration) % 1;
        const spiral = streak.angle + travel * Math.PI * 4.8 + Math.sin(time * 2 + streak.angle) * 0.2;
        const near = easeIn(travel);
        const r1 = tunnelRadius * (0.05 + near * 1.55);
        const r2 = r1 + tunnelRadius * streak.length * (0.2 + near * 0.85);
        const x1 = cx + Math.cos(spiral) * r1;
        const y1 = cy + Math.sin(spiral) * r1 * 0.58;
        const x2 = cx + Math.cos(spiral + 0.12) * r2;
        const y2 = cy + Math.sin(spiral + 0.12) * r2 * 0.58;
        const alpha = (0.1 + near * 0.85) * clamp(1 - phase(time, 2.55, 3.2));

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, `rgba(${streak.color}, 0)`);
        gradient.addColorStop(0.45, `rgba(${streak.color}, ${alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.92)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = streak.width * (0.6 + near * 2.8);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
      ctx.restore();

      drawTemporalDials(time, cx, cy, tunnelRadius, clamp(1 - phase(time, 2.75, 3.35)));

      for (let ring = 0; ring < 7; ring += 1) {
        const ringProgress = (time * (0.55 + ring * 0.03) + ring * 0.18) % 1;
        ctx.strokeStyle = `rgba(${ring % 2 ? '255, 183, 55' : '36, 196, 255'}, ${0.2 * (1 - ringProgress)})`;
        ctx.lineWidth = 1 + ringProgress * 12;
        ctx.beginPath();
        ctx.ellipse(cx, cy, tunnelRadius * ringProgress * 1.65, tunnelRadius * ringProgress * 0.78, time * 0.12, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const drawIndustrialSilhouette = (time: number, alpha: number, portalScale: number) => {
      const horizon = height * (0.66 + portalScale * 0.08);
      const zoom = 1 + portalScale * 1.85;

      ctx.save();
      ctx.translate(width * 0.5, horizon);
      ctx.scale(zoom, zoom);
      ctx.translate(-width * 0.5, -horizon);

      towers.forEach((tower, index) => {
        const x = (tower.x - 0.5) * width * 1.22 + width * 0.5 + Math.sin(index) * 18;
        const buildingWidth = tower.width * width;
        const buildingHeight = tower.height * height * 0.9;
        const baseY = horizon + Math.sin(index * 1.8) * 11;

        ctx.fillStyle = `rgba(5, 6, 8, ${0.68 * alpha})`;
        ctx.fillRect(x - buildingWidth * 0.5, baseY - buildingHeight, buildingWidth, buildingHeight);

        for (let stack = 0; stack < tower.stacks; stack += 1) {
          const stackX = x - buildingWidth * 0.28 + stack * buildingWidth * 0.28;
          const stackHeight = buildingHeight * (0.35 + stack * 0.08);
          ctx.fillRect(stackX, baseY - buildingHeight - stackHeight, buildingWidth * 0.12, stackHeight);

          ctx.fillStyle = `rgba(0, 0, 0, ${0.16 * alpha})`;
          ctx.beginPath();
          ctx.ellipse(stackX + time * 5, baseY - buildingHeight - stackHeight - 20, 34, 13, -0.18, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(5, 6, 8, ${0.68 * alpha})`;
        }

        ctx.fillStyle = `rgba(255, 184, 86, ${0.2 * alpha})`;
        ctx.fillRect(x - buildingWidth * 0.28, baseY - 28, buildingWidth * 0.08, 4);
      });

      ctx.restore();
    };

    const drawLightHole = (time: number) => {
      const portalIn = easeOut(phase(time, 2.25, 3.15));
      const plunge = easeIn(phase(time, 3.2, 5.05));
      const dissolve = phase(time, 4.75, 5.55);
      const cx = width * (0.5 + Math.sin(time * 1.4) * 0.018);
      const cy = height * (0.48 + Math.cos(time * 1.1) * 0.018);
      const maxDimension = Math.max(width, height);
      const coreRadius = maxDimension * (0.08 + portalIn * 0.13 + plunge * 0.55);
      const outerRadius = maxDimension * (0.25 + portalIn * 0.28 + plunge * 0.72);
      const sky = ctx.createLinearGradient(0, 0, 0, height);

      sky.addColorStop(0, `rgba(4, 5, 10, ${0.72 * portalIn})`);
      sky.addColorStop(0.5, `rgba(14, 13, 30, ${0.58 * portalIn})`);
      sky.addColorStop(1, `rgba(0, 0, 0, ${0.95 * portalIn})`);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      drawIndustrialSilhouette(time, portalIn * (1 - dissolve * 0.45), plunge);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerRadius);
      glow.addColorStop(0, `rgba(255, 248, 218, ${0.95 * portalIn})`);
      glow.addColorStop(0.14, `rgba(255, 190, 66, ${0.72 * portalIn})`);
      glow.addColorStop(0.34, `rgba(36, 196, 255, ${0.36 * portalIn})`);
      glow.addColorStop(0.62, `rgba(52, 45, 168, ${0.2 * portalIn})`);
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let ring = 0; ring < 8; ring += 1) {
        const ringProgress = (time * (0.4 + ring * 0.06) + ring * 0.13) % 1;
        const radius = coreRadius + outerRadius * ringProgress * (0.5 + plunge * 0.55);
        const alpha = portalIn * (1 - ringProgress) * (0.38 + plunge * 0.25);

        ctx.strokeStyle = `rgba(${ring % 2 ? '255, 205, 91' : '36, 196, 255'}, ${alpha})`;
        ctx.lineWidth = 1.5 + ringProgress * 9;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * (0.46 + plunge * 0.18), time * 0.45 + ring * 0.24, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.lineCap = 'round';
      streaks.slice(0, 42).forEach((streak) => {
        const travel = (streak.radius + time * streak.speed * (0.5 + plunge * 1.4)) % 1;
        const angle = streak.angle + time * (0.8 + plunge * 1.4);
        const startRadius = outerRadius * (1.2 - travel * 0.9);
        const endRadius = coreRadius * (0.4 + travel * 0.8);
        const x1 = cx + Math.cos(angle) * startRadius;
        const y1 = cy + Math.sin(angle) * startRadius * 0.62;
        const x2 = cx + Math.cos(angle + 0.08) * endRadius;
        const y2 = cy + Math.sin(angle + 0.08) * endRadius * 0.62;
        const alpha = portalIn * (0.18 + plunge * 0.36) * (1 - dissolve * 0.4);

        ctx.strokeStyle = `rgba(${streak.color}, ${alpha})`;
        ctx.lineWidth = streak.width * (0.8 + plunge * 2.2);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      ctx.fillStyle = `rgba(255, 249, 220, ${portalIn * (0.78 + plunge * 0.18)})`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, coreRadius * (0.55 + plunge * 0.3), coreRadius * (0.32 + plunge * 0.12), time * 0.65, 0, Math.PI * 2);
      ctx.fill();

      if (plunge > 0.62) {
        ctx.fillStyle = `rgba(255, 245, 210, ${(plunge - 0.62) * 1.8})`;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();
    };

    const drawGear = (gear: ClockGear, time: number, alpha: number) => {
      const cx = gear.x * width;
      const cy = gear.y * height;
      const radius = gear.radius * Math.min(width, height) * (1 + phase(time, 5.15, 6.15) * 0.7);
      const rotation = gear.phase + time * gear.speed;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `${gear.color} 0.72)`;
      ctx.lineWidth = Math.max(2, radius * 0.055);

      if (!gear.path) {
        const path = new Path2D();
        for (let i = 0; i <= gear.teeth * 2; i += 1) {
          const toothAngle = (i / (gear.teeth * 2)) * Math.PI * 2;
          const toothRadius = i % 2 === 0 ? 1.12 : 0.94;
          const x = Math.cos(toothAngle) * toothRadius;
          const y = Math.sin(toothAngle) * toothRadius;
          if (i === 0) {
            path.moveTo(x, y);
          } else {
            path.lineTo(x, y);
          }
        }
        path.closePath();
        gear.path = path;
      }

      ctx.save();
      ctx.scale(radius, radius);
      ctx.stroke(gear.path);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.46, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 8; i += 1) {
        const spokeAngle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(spokeAngle) * radius * 0.24, Math.sin(spokeAngle) * radius * 0.24);
        ctx.lineTo(Math.cos(spokeAngle) * radius * 0.86, Math.sin(spokeAngle) * radius * 0.86);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawClockwork = (time: number) => {
      const gearIn = easeOut(phase(time, 5.32, 6.25));
      const stabilize = phase(time, 6.0, INTRO_DURATION);
      const glow = ctx.createRadialGradient(width * 0.52, height * 0.5, 0, width * 0.52, height * 0.5, Math.max(width, height) * 0.7);

      glow.addColorStop(0, `rgba(255, 163, 53, ${0.22 * gearIn})`);
      glow.addColorStop(0.34, `rgba(36, 196, 255, ${0.13 * gearIn})`);
      glow.addColorStop(1, `rgba(0, 0, 0, ${0.82 * gearIn})`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      gears.forEach((gear, index) => {
        drawGear(gear, time, gearIn * (0.36 + (index % 4) * 0.12));
      });

      ctx.strokeStyle = `rgba(255, 183, 55, ${0.24 * gearIn})`;
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 10; i += 1) {
        const y = ((i / 18) * height + time * 26) % height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.sin(i) * 80);
        ctx.stroke();
      }

      ctx.fillStyle = `rgba(0, 0, 0, ${0.12 + stabilize * 0.35})`;
      ctx.fillRect(0, 0, width, height);
    };

    const drawFlashBridge = (time: number) => {
      const flash = phase(time, 4.9, 5.35) * (1 - phase(time, 5.35, 5.78));
      if (flash <= 0) {
        return;
      }

      ctx.fillStyle = `rgba(255, 244, 214, ${flash * 0.82})`;
      ctx.fillRect(0, 0, width, height);
    };

    const drawVignetteAndGrain = (time: number) => {
      const vignette = ctx.createRadialGradient(width * 0.5, height * 0.46, 0, width * 0.5, height * 0.46, Math.max(width, height) * 0.72);
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.62, 'rgba(0, 0, 0, 0.16)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.86)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      grainPoints.forEach((point) => {
        const x = (Math.sin(point.xSeed + frame * point.speedX) * 0.5 + 0.5) * width;
        const y = (Math.cos(point.ySeed + frame * point.speedY) * 0.5 + 0.5) * height;
        ctx.fillRect(x, y, 1, 1);
      });

      if (time > 11.28) {
        ctx.fillStyle = `rgba(0, 0, 0, ${phase(time, 11.28, INTRO_DURATION) * 0.9})`;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      frame += 1;

      ctx.clearRect(0, 0, width, height);
      if (elapsed < 3.15) {
        drawVortex(elapsed);
      }
      if (elapsed > 2.15) {
        drawLightHole(elapsed);
      }
      drawFlashBridge(elapsed);
      if (elapsed > 5.28) {
        drawClockwork(elapsed);
      }
      drawVignetteAndGrain(elapsed);

      if (elapsed >= INTRO_DURATION) {
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.45,
          ease: 'power2.inOut',
          onComplete,
        });
        return;
      }

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    gsap.set(overlay, { autoAlpha: 1 });
    if (copy) {
      gsap.set(copy, { autoAlpha: 0, y: 18, scale: 0.98, filter: 'blur(8px)' });
      copyTimeline = gsap
        .timeline()
        .to(copy, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }, 5.55)
        .to(copy, { autoAlpha: 0, y: -10, filter: 'blur(6px)', duration: 0.65, ease: 'power2.in' }, 11.45);
    }
    window.addEventListener('resize', resize);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      gsap.killTweensOf(overlay);
      copyTimeline?.kill();
    };
  }, [onComplete, visible]);

  return (
    <div ref={overlayRef} className={`intro-overlay ${visible ? 'intro-visible' : 'intro-hidden'}`}>
      <canvas ref={canvasRef} className="intro-cinematic-canvas" aria-hidden="true" />
      <div className="intro-cinematic-scanline" aria-hidden="true" />
      <div ref={copyRef} className="intro-cinematic-copy">
        <h1>Alexander Chen&apos;s Digital Portfolio</h1>
        <p>
          A guided journey through software engineering, graduate study, cloud systems, and product-focused technical work.
        </p>
      </div>
    </div>
  );
};

export default IntroOverlay;
