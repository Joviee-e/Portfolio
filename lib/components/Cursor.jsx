import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const lag  = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current)
        dot.current.style.transform = `translate(${e.clientX - 3.5}px, ${e.clientY - 3.5}px)`;
    };
    const loop = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.11;
      lag.current.y += (pos.current.y - lag.current.y) * 0.11;
      if (ring.current)
        ring.current.style.transform = `translate(${lag.current.x - 18}px, ${lag.current.y - 18}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    const over = (e) => {
      if (e.target.closest('a,button,[data-h]')) {
        ring.current?.classList.add('big');
        ring.current?.classList.remove('base');
        dot.current?.classList.add('hide');
      }
    };
    const out = (e) => {
      if (e.target.closest('a,button,[data-h]')) {
        ring.current?.classList.remove('big');
        ring.current?.classList.add('base');
        dot.current?.classList.remove('hide');
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    if (ring.current) ring.current.classList.add('base');
    loop();
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dot}  className="c-dot" />
      <div ref={ring} className="c-ring" />
    </>
  );
}
