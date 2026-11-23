import { motion, useReducedMotion } from 'motion/react';

interface PetalSpec {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  rotateStart: number;
  rotateEnd: number;
  tone: 'gold' | 'crimson' | 'champagne';
}

const PETALS: PetalSpec[] = [
  { id: 1, left: '6%', size: 13, duration: 18, delay: 0.4, sway: 32, rotateStart: -20, rotateEnd: 240, tone: 'gold' },
  { id: 2, left: '15%', size: 11, duration: 22, delay: 4.5, sway: -28, rotateStart: 15, rotateEnd: -210, tone: 'crimson' },
  { id: 3, left: '24%', size: 14, duration: 19, delay: 1.8, sway: 36, rotateStart: -35, rotateEnd: 280, tone: 'champagne' },
  { id: 4, left: '36%', size: 10, duration: 24, delay: 7.2, sway: -24, rotateStart: 10, rotateEnd: 190, tone: 'gold' },
  { id: 5, left: '47%', size: 13, duration: 20, delay: 3.1, sway: 30, rotateStart: 40, rotateEnd: -250, tone: 'crimson' },
  { id: 6, left: '58%', size: 12, duration: 17, delay: 9.0, sway: -34, rotateStart: -15, rotateEnd: 220, tone: 'champagne' },
  { id: 7, left: '69%', size: 14, duration: 23, delay: 2.2, sway: 28, rotateStart: 25, rotateEnd: -230, tone: 'gold' },
  { id: 8, left: '78%', size: 11, duration: 19, delay: 6.4, sway: -30, rotateStart: -25, rotateEnd: 260, tone: 'crimson' },
  { id: 9, left: '87%', size: 13, duration: 21, delay: 0.9, sway: 24, rotateStart: 35, rotateEnd: -200, tone: 'champagne' },
  { id: 10, left: '94%', size: 10, duration: 25, delay: 5.5, sway: -26, rotateStart: -10, rotateEnd: 210, tone: 'gold' },
];

const TONE_FILL: Record<PetalSpec['tone'], { fill: string; stroke: string; opacity: number }> = {
  gold: { fill: '#E8C570', stroke: '#F7E3AC', opacity: 0.58 },
  champagne: { fill: '#F3DFAA', stroke: '#FFF4D4', opacity: 0.5 },
  crimson: { fill: '#B82338', stroke: '#E8C570', opacity: 0.45 },
};

export function FloatingPetals() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none"
    >
      {PETALS.map((petal) => {
        const style = TONE_FILL[petal.tone];
        return (
          <motion.div
            key={petal.id}
            initial={{
              y: '-10vh',
              x: 0,
              opacity: 0,
              rotate: petal.rotateStart,
            }}
            animate={{
              y: ['-10vh', '110vh'],
              x: [0, petal.sway, -petal.sway * 0.65, petal.sway * 0.4, 0],
              opacity: [0, style.opacity, style.opacity, style.opacity * 0.7, 0],
              rotate: [petal.rotateStart, petal.rotateEnd],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.1, 0.55, 0.88, 1],
            }}
            style={{ left: petal.left }}
            className="absolute top-0 will-change-transform"
          >
            <svg
              width={petal.size}
              height={petal.size * 1.45}
              viewBox="0 0 18 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 1C14.2 5.2 16.5 11.4 14.4 17.6C12.8 22 10.6 24.4 9 25C7.4 24.4 5.2 22 3.6 17.6C1.5 11.4 3.8 5.2 9 1Z"
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth="0.6"
                strokeOpacity="0.65"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
