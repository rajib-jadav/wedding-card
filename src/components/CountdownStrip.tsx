import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Language, WeddingDetails } from '../types/wedding';
import {
  VIEWPORT_ONCE,
  cardReveal,
  staggerContainerFast,
  staggerItem,
} from '../utils/motionVariants';
import { BotanicalDivider } from './BotanicalOrnament';

interface CountdownStripProps {
  details: WeddingDetails;
  lang: Language;
  embedded?: boolean;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateRemaining(targetISO: string): TimeRemaining {
  const target = new Date(`${targetISO}T19:00:00`).getTime();
  const now = Date.now();
  const diff = target - now;

  if (Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

export function CountdownStrip({ details, lang, embedded = false }: CountdownStripProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    calculateRemaining(details.weddingDateISO)
  );
  const isBn = lang === 'bn';

  useEffect(() => {
    setRemaining(calculateRemaining(details.weddingDateISO));
    const timer = window.setInterval(() => {
      setRemaining(calculateRemaining(details.weddingDateISO));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [details.weddingDateISO]);

  const pad = (n: number) => {
    const str = String(n).padStart(2, '0');
    return isBn ? str.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : str;
  };

  const units = [
    { value: pad(remaining.days), label: isBn ? 'দিন' : 'Days' },
    { value: pad(remaining.hours), label: isBn ? 'ঘণ্টা' : 'Hours' },
    { value: pad(remaining.minutes), label: isBn ? 'মিনিট' : 'Minutes' },
    { value: pad(remaining.seconds), label: isBn ? 'সেকেন্ড' : 'Seconds' },
  ];

  if (embedded) {
    return (
      <div className="mt-6 pt-6 border-t border-[var(--gold-300)]/35 max-w-xl mx-auto">
        <p className="text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-[var(--gold-200)]">
          {isBn ? 'শুভ লগ্নের বাকি সময়' : 'Countdown to Shubho Bibaho'}
        </p>

        {remaining.isPast ? (
          <p className="mt-3 font-serif text-2xl sm:text-3xl font-semibold gold-foil-text">
            {isBn ? 'আজ শুভবিবাহের পবিত্র দিন!' : 'Celebrating Our Wedding Day!'}
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="rounded-xl border border-[var(--gold-300)]/50 bg-[var(--red-950)]/60 py-3 px-1.5 sm:py-4 sm:px-3 shadow-inner"
              >
                <p className="font-serif text-2xl sm:text-4xl font-semibold gold-foil-text tabular-nums leading-none">
                  {unit.value}
                </p>
                <p className="mt-1.5 text-[10.5px] sm:text-xs font-medium tracking-wider uppercase text-[var(--gold-100)]/90">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="mt-10 sm:mt-12 relative overflow-hidden rounded-2xl border-2 border-[var(--gold-300)]/65 royal-velvet-band text-[#FDF8EE] px-[16px] py-8 sm:px-10 sm:py-10 shadow-[0_20px_52px_rgba(44,4,10,0.22)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 royal-gold-pattern" />

      <motion.div
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <motion.p
          variants={staggerItem}
          className="text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-[var(--gold-200)]"
        >
          {isBn ? 'শুভ লগ্নের বাকি সময়' : 'Countdown to Shubho Bibaho'}
        </motion.p>

        {remaining.isPast ? (
          <motion.p
            variants={staggerItem}
            className="mt-4 font-serif text-3xl sm:text-4xl font-semibold gold-foil-text"
          >
            {isBn ? 'আজ শুভবিবাহের পবিত্র দিন!' : 'Celebrating Our Wedding Day!'}
          </motion.p>
        ) : (
          <motion.div
            variants={staggerContainerFast}
            className="mt-6 grid grid-cols-4 gap-2.5 sm:gap-5 max-w-xl mx-auto"
          >
            {units.map((unit) => (
              <motion.div
                key={unit.label}
                variants={staggerItem}
                className="rounded-xl border border-[var(--gold-300)]/50 bg-[var(--red-950)]/65 py-4 px-2 sm:py-5 sm:px-4 shadow-inner"
              >
                <p className="font-serif text-3xl sm:text-5xl font-semibold gold-foil-text tabular-nums leading-none">
                  {unit.value}
                </p>
                <p className="mt-2 text-[11px] sm:text-xs font-medium tracking-wider uppercase text-[var(--gold-100)]/85">
                  {unit.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div variants={staggerItem}>
          <BotanicalDivider light className="my-6 max-w-xs mx-auto" />
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="text-xs sm:text-sm text-[#F2DFBE] tabular-nums"
        >
          {isBn
            ? `শুভবিবাহ: ${details.weddingDayBn}, ${details.weddingDateDisplayBn} (${details.weddingBengaliDate}) · প্রীতিভোজ: ${details.receptionDayBn}, ${details.receptionDateDisplayBn}`
            : `Shubho Bibaho: ${details.weddingDay}, ${details.weddingDateDisplay} · Reception: ${details.receptionDay}, ${details.receptionDateDisplay}`}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
