import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle particle creation
      if (now - lastTime < 50) return;
      lastTime = now;

      const newParticle = {
        id: nextIdRef.current,
        x: e.clientX,
        y: e.clientY,
      };

      nextIdRef.current += 1;
      setParticles((prev) => [...prev, newParticle].slice(-20)); // Keep last 20
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute size-2 rounded-full bg-[#FF7A00]"
            style={{
              left: particle.x - 4,
              top: particle.y - 4,
              boxShadow: '0 0 10px #FF7A00',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}