import { useEffect, useRef } from 'react';

export default function Constellation({ dark = false, count = 65 }) {
  const ref   = useRef(null);
  const raf   = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const cv  = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');

    const resize = () => {
      cv.width  = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const stars = Array.from({ length: count }, () => ({
      x:  Math.random() * cv.width,
      y:  Math.random() * cv.height,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      r:  Math.random() * 1.1 + 0.3,
    }));

    const sColor = dark ? 'rgba(244,234,216,' : 'rgba(13,11,9,';
    const lColor = 'rgba(196,135,64,';

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const mx = mouse.current.x, my = mouse.current.y;

      stars.forEach((s) => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0 || s.x > cv.width)  s.vx *= -1;
        if (s.y < 0 || s.y > cv.height) s.vy *= -1;
        const dx = mx - s.x, dy = my - s.y;
        const d = Math.hypot(dx, dy);
        if (d < 110) { s.x -= dx * 0.012; s.y -= dy * 0.012; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = sColor + (dark ? '0.35' : '0.22') + ')';
        ctx.fill();
      });

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const d = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = lColor + ((1 - d / 115) * (dark ? 0.11 : 0.07)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };

    const onMouse = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMouse);
      ro.disconnect();
    };
  }, [dark, count]);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}
