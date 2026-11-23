import type { Variants } from 'motion/react';

export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.16,
} as const;

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: LUXURY_EASE,
    },
  },
};

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};
