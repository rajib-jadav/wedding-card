import { motion, useReducedMotion } from 'motion/react';

interface DustParticle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  kind: 'speck' | 'glint';
}

const HERO_PARTICLES: DustParticle[] = [
  { id: 1, left: '8%', top: '18%', size: 3.5, duration: 6.2, delay: 0.1, driftX: 10, driftY: -26, kind: 'speck' },
  { id: 2, left: '16%', top: '64%', size: 8, duration: 7.4, delay: 0.8, driftX: -8, driftY: -32, kind: 'glint' },
  { id: 3, left: '24%', top: '34%', size: 3, duration: 5.8, delay: 1.5, driftX: 12, driftY: -22, kind: 'speck' },
  { id: 4, left: '34%', top: '78%', size: 4, duration: 6.8, delay: 0.4, driftX: -10, driftY: -28, kind: 'speck' },
  { id: 5, left: '44%', top: '22%', size: 9, duration: 8.1, delay: 1.1, driftX: 8, driftY: -24, kind: 'glint' },
  { id: 6, left: '53%', top: '52%', size: 3.5, duration: 6.4, delay: 2.0, driftX: -12, driftY: -30, kind: 'speck' },
  { id: 7, left: '62%', top: '84%', size: 8, duration: 7.2, delay: 0.6, driftX: 10, driftY: -28, kind: 'glint' },
  { id: 8, left: '72%', top: '28%', size: 4, duration: 6.0, delay: 1.7, driftX: -9, driftY: -24, kind: 'speck' },
  { id: 9, left: '81%', top: '62%', size: 9, duration: 7.6, delay: 0.3, driftX: 11, driftY: -30, kind: 'glint' },
  { id: 10, left: '89%', top: '24%', size: 3.5, duration: 6.6, delay: 1.3, driftX: -8, driftY: -22, kind: 'speck' },
  { id: 11, left: '92%', top: '74%', size: 3, duration: 5.9, delay: 2.3, driftX: 7, driftY: -26, kind: 'speck' },
  { id: 12, left: '48%', top: '88%', size: 3.5, duration: 7.0, delay: 1.9, driftX: -7, driftY: -28, kind: 'speck' },
];

const CLOSING_PARTICLES: DustParticle[] = [
  { id: 1, left: '10%', top: '24%', size: 4, duration: 6.8, delay: 0.2, driftX: 10, driftY: -28, kind: 'speck' },
  { id: 2, left: '18%', top: '72%', size: 9, duration: 7.8, delay: 1.1, driftX: -9, driftY: -32, kind: 'glint' },
  { id: 3, left: '29%', top: '38%', size: 3.5, duration: 6.2, delay: 0.6, driftX: 8, driftY: -24, kind: 'speck' },
  { id: 4, left: '41%', top: '82%', size: 8, duration: 7.4, delay: 1.6, driftX: -10, driftY: -30, kind: 'glint' },
  { id: 5, left: '54%', top: '18%', size: 4, duration: 6.5, delay: 0.4, driftX: 11, driftY: -24, kind: 'speck' },
  { id: 6, left: '66%', top: '68%', size: 9, duration: 8.0, delay: 1.3, driftX: -8, driftY: -32, kind: 'glint' },
  { id: 7, left: '76%', top: '30%', size: 3.5, duration: 6.1, delay: 2.1, driftX: 9, driftY: -26, kind: 'speck' },
  { id: 8, left: '85%', top: '76%', size: 4, duration: 7.1, delay: 0.9, driftX: -9, driftY: -28, kind: 'speck' },
  { id: 9, left: '91%', top: '44%', size: 8, duration: 7.5, delay: 1.8, driftX: 7, driftY: -24, kind: 'glint' },
  { id: 10, left: '36%', top: '16%', size: 3, duration: 6.4, delay: 2.4, driftX: -6, driftY: -22, kind: 'speck' },
];

export function GoldDustParticles({ density = 'hero' }: { density?: 'hero' | 'closing' }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  const particles = density === 'closing' ? CLOSING_PARTICLES : HERO_PARTICLES;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-[5]"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, x: 0, y: 12, scale: 0.7 }}
          animate={{
            opacity: [0, 0.78, 0.92, 0.35, 0],
            x: [0, p.driftX, -p.driftX * 0.5, p.driftX * 0.4],
            y: [12, p.driftY * 0.5, p.driftY, p.driftY * 1.35],
            scale: [0.65, 1.1, 0.9, 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: p.left, top: p.top }}
          className="absolute block will-change-transform"
        >
          {p.kind === 'glint' ? (
            <svg width={p.size} height={p.size} viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0L7.2 4.8L12 6L7.2 7.2L6 12L4.8 7.2L0 6L4.8 4.8L6 0Z"
                fill="#FFF1C2"
              />
            </svg>
          ) : (
            <span
              style={{ width: p.size, height: p.size }}
              className="block rounded-full bg-[#F4DE9D] shadow-[0_0_10px_rgba(244,222,157,0.9)]"
            />
          )}
        </motion.span>
      ))}
    </div>
  );
}
