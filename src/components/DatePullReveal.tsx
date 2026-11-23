import { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Language, WeddingDetails, getMonogram } from '../types/wedding';
import {
  LUXURY_EASE,
  VIEWPORT_ONCE,
  cardReveal,
  staggerContainer,
  staggerItem,
} from '../utils/motionVariants';
import { BotanicalDivider } from './BotanicalOrnament';
import { CountdownStrip } from './CountdownStrip';

interface DatePullRevealProps {
  details: WeddingDetails;
  lang: Language;
}

const GOLDEN_SPARKLES = [
  { id: 1, x: -210, y: -110, delay: 0.04, size: 11, kind: 'star' },
  { id: 2, x: -165, y: -155, delay: 0.16, size: 8, kind: 'dot' },
  { id: 3, x: -112, y: -132, delay: 0.09, size: 13, kind: 'star' },
  { id: 4, x: -52, y: -168, delay: 0.22, size: 7, kind: 'petal' },
  { id: 5, x: 18, y: -175, delay: 0.12, size: 12, kind: 'star' },
  { id: 6, x: 78, y: -145, delay: 0.26, size: 9, kind: 'dot' },
  { id: 7, x: 138, y: -160, delay: 0.14, size: 13, kind: 'star' },
  { id: 8, x: 196, y: -115, delay: 0.2, size: 8, kind: 'petal' },
  { id: 9, x: -195, y: -32, delay: 0.28, size: 9, kind: 'petal' },
  { id: 10, x: -140, y: -62, delay: 0.34, size: 7, kind: 'dot' },
  { id: 11, x: 145, y: -54, delay: 0.3, size: 10, kind: 'star' },
  { id: 12, x: 208, y: -24, delay: 0.24, size: 8, kind: 'petal' },
  { id: 13, x: -175, y: 45, delay: 0.38, size: 10, kind: 'star' },
  { id: 14, x: -95, y: 80, delay: 0.32, size: 7, kind: 'dot' },
  { id: 15, x: 98, y: 78, delay: 0.36, size: 9, kind: 'petal' },
  { id: 16, x: 182, y: 48, delay: 0.4, size: 11, kind: 'star' },
  { id: 17, x: -38, y: -95, delay: 0.44, size: 8, kind: 'star' },
  { id: 18, x: 44, y: -88, delay: 0.42, size: 7, kind: 'dot' },
];

export function DatePullReveal({ details, lang }: DatePullRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [sparkBurstKey, setSparkBurstKey] = useState(0);
  const isBn = lang === 'bn';

  const pullY = useMotionValue(0);
  const cordScaleY = useTransform(pullY, [0, 95], [1, 1.85]);
  const curtainPeek = useTransform(pullY, [0, 95], [0, 22]);
  const curtainPeekNeg = useTransform(pullY, [0, 95], [0, -22]);

  const triggerReveal = () => {
    setIsRevealed(true);
    setSparkBurstKey((prev) => prev + 1);
  };

  const handleCloseCurtains = () => {
    setIsRevealed(false);
    pullY.set(0);
  };

  const handleTasselDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 40 || info.velocity.y > 200) {
      triggerReveal();
    }
    pullY.set(0);
  };

  const monogram = getMonogram(details.groomName, details.brideName);

  return (
    <section
      id="dates"
      className="relative z-20 -mt-10 sm:-mt-14 w-full text-[#FDF8EE] border-b-2 border-[var(--gold-300)]/55 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #46050F 0%, #5B0816 14%, #7A0F20 50%, #590815 100%)',
      }}
    >
      {/* Unified Royal Gold Jali Pattern with Smooth Top Fade So There Is Zero Cut Seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 royal-gold-pattern opacity-90"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, black 18%, black 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 18%, black 100%)',
        }}
      />

      {/* Soft Upper Gradient Transition Blending Seamlessly From Hero Bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 z-10 bg-gradient-to-b from-[#46050F] via-[#4D0712]/75 to-transparent"
      />

      {/* Pulled-Up Section Title Header with Staggered Framer Motion Reveal */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative z-20 max-w-2xl mx-auto px-[16px] pt-4 sm:pt-6 pb-5 text-center"
      >
        <motion.p
          variants={staggerItem}
          className="text-xs sm:text-sm tracking-[0.2em] text-[var(--gold-200)] font-semibold"
        >
          {isBn ? 'শুভ দিনক্ষণ' : 'SAVE THE DATES'}
        </motion.p>
        <motion.h2
          variants={staggerItem}
          className="mt-1.5 font-serif text-3xl sm:text-4xl font-semibold gold-foil-text [text-wrap:balance]"
        >
          {isBn
            ? 'সোনালী ঝালর টেনে বিবাহের শুভ তারিখ দেখুন'
            : 'Pull the Golden Tassel to Unveil Our Wedding Dates'}
        </motion.h2>
        <motion.p
          variants={staggerItem}
          className="mt-2 text-xs sm:text-sm text-[#F4E2BE]/85"
        >
          {isBn
            ? 'নিচের সোনালী ঝালরটি টেনে ধরুন বা ট্যাপ করে রাজকীয় পর্দা সরিয়ে দিন।'
            : 'Gently drag the golden silk tassel downward—or tap it—to sweep open the royal curtains.'}
        </motion.p>
      </motion.div>

      {/* FULL 100% WIDTH SEAMLESS VELVET RED CURTAIN STAGE (Pulled Up with Smooth Top Gradient Melt) */}
      <motion.div
        variants={cardReveal}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="relative w-full min-h-[430px] sm:min-h-[460px] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Top Gradient Feather Over Curtain Edge so Curtain Never Looks Harshly Cut */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 z-[25] bg-gradient-to-b from-[#5A0816] via-[#5A0816]/60 to-transparent"
        />

        {/* Shimmering Golden Sparkles Burst on Curtain Open */}
        {isRevealed && (
          <div
            key={sparkBurstKey}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 z-30"
          >
            {GOLDEN_SPARKLES.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 0, scale: 0.2, x: 0, y: 12, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0.95, 0],
                  scale: [0.25, 1.2, 0.95, 0.3],
                  x: p.x,
                  y: p.y,
                  rotate: p.kind === 'petal' ? 140 : 90,
                }}
                transition={{
                  duration: 2.5,
                  delay: p.delay,
                  ease: LUXURY_EASE,
                }}
                className="absolute block"
              >
                {p.kind === 'star' ? (
                  <svg width={p.size * 1.9} height={p.size * 1.9} viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 0L9.7 6.3L16 8L9.7 9.7L8 16L6.3 9.7L0 8L6.3 6.3L8 0Z"
                      fill="#F4DE9D"
                    />
                  </svg>
                ) : p.kind === 'petal' ? (
                  <svg width={p.size * 1.8} height={p.size * 1.8} viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1C11.5 3.5 13 7.5 8 15C3 7.5 4.5 3.5 8 1Z"
                      fill="#E6C77E"
                      fillOpacity="0.88"
                    />
                  </svg>
                ) : (
                  <span
                    className="block rounded-full bg-[#F6E2AD]"
                    style={{ width: p.size, height: p.size }}
                  />
                )}
              </motion.span>
            ))}
          </div>
        )}

        {/* UNVEILED FULL-WIDTH SEAMLESS ROYAL CRIMSON & GOLD CONTENT */}
        <motion.div
          animate={{
            scale: isRevealed ? 1 : 0.94,
            opacity: isRevealed ? 1 : 0.25,
          }}
          transition={{ duration: 1.35, ease: LUXURY_EASE }}
          className="relative z-10 w-full max-w-3xl mx-auto px-[16px] sm:px-8 py-10 sm:py-12 text-center"
        >
          <motion.p
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 10 }}
            transition={{ duration: 0.9, delay: isRevealed ? 0.35 : 0 }}
            className="text-xs sm:text-sm tracking-[0.2em] text-[var(--gold-200)] font-semibold"
          >
            {isBn ? 'শুভবিবাহ ও প্রীতিভোজ' : 'শুভবিবাহ · SAVE THE DATES'}
          </motion.p>

          <motion.div
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 18 }}
            transition={{ duration: 1.0, delay: isRevealed ? 0.45 : 0, ease: LUXURY_EASE }}
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            <div className="p-6 rounded-xl bg-[var(--red-950)]/45 border border-[var(--gold-300)]/45 backdrop-blur-[2px]">
              <p className="text-xs sm:text-sm text-[var(--gold-200)] font-semibold">
                {isBn ? 'শুভবিবাহ' : 'Shubho Bibaho (Wedding)'}
              </p>
              <p className="mt-2 font-serif text-3xl sm:text-4xl font-semibold gold-foil-text tabular-nums">
                {isBn ? details.weddingDateDisplayBn : details.weddingDateDisplay}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-[#F4E1BC]">
                {isBn ? details.weddingDayBn : details.weddingDay} · {details.weddingBengaliDate}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[var(--red-950)]/45 border border-[var(--gold-300)]/45 backdrop-blur-[2px]">
              <p className="text-xs sm:text-sm text-[var(--gold-200)] font-semibold">
                {isBn ? 'বধূবরণ ও প্রীতিভোজ' : 'Bodhuboron & Pritibhoj'}
              </p>
              <p className="mt-2 font-serif text-3xl sm:text-4xl font-semibold gold-foil-text tabular-nums">
                {isBn ? details.receptionDateDisplayBn : details.receptionDateDisplay}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-[#F4E1BC]">
                {isBn ? details.receptionDayBn : details.receptionDay} ·{' '}
                {details.receptionBengaliDate}
              </p>
            </div>
          </motion.div>

          <BotanicalDivider light className="my-7 max-w-xs mx-auto" />

          <motion.div
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 12 }}
            transition={{ duration: 0.9, delay: isRevealed ? 0.65 : 0 }}
          >
            <p className="font-serif text-2xl sm:text-3xl font-semibold gold-foil-text">
              {isBn ? (
                <>
                  {details.groomBengali} ও {details.brideBengali}
                </>
              ) : (
                <>
                  {details.groomName} &amp; {details.brideName}
                </>
              )}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-[#F4E1BC]/90">
              {isBn ? details.venueNameBn : `${details.venueName} · ${details.venueCity}`}
            </p>

            {/* Live Royal Red & Gold Countdown ("শুভ লগ্নের বাকি সময়") Embedded Right Here */}
            <CountdownStrip details={details} lang={lang} embedded />

            {isRevealed && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                onClick={handleCloseCurtains}
                className="mt-7 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[var(--gold-200)] hover:text-[#FFF8E2] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isBn ? 'আবার পর্দা বন্ধ করুন' : 'Close Curtains & Pull Again'}</span>
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* FULL 100% WIDTH LEFT ROYAL VELVET RED CURTAIN */}
        <motion.div
          animate={{
            x: isRevealed ? '-102%' : '0%',
          }}
          style={{ x: isRevealed ? undefined : curtainPeekNeg }}
          transition={{ duration: 1.55, ease: LUXURY_EASE }}
          className="absolute inset-y-0 left-0 w-1/2 z-20 pointer-events-none overflow-hidden shadow-[10px_0_30px_rgba(24,2,6,0.45)]"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                'repeating-linear-gradient(90deg, #5A0814 0%, #840F20 14%, #490510 26%, #7B0E1E 40%)',
            }}
          />
        </motion.div>

        {/* FULL 100% WIDTH RIGHT ROYAL VELVET RED CURTAIN */}
        <motion.div
          animate={{
            x: isRevealed ? '102%' : '0%',
          }}
          style={{ x: isRevealed ? undefined : curtainPeek }}
          transition={{ duration: 1.55, ease: LUXURY_EASE }}
          className="absolute inset-y-0 right-0 w-1/2 z-20 pointer-events-none overflow-hidden shadow-[-10px_0_30px_rgba(24,2,6,0.45)]"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                'repeating-linear-gradient(90deg, #7B0E1E 0%, #490510 14%, #840F20 28%, #5A0814 42%)',
            }}
          />
        </motion.div>

        {/* INTERACTIVE HANGING GOLDEN SILK TASSEL OVER FULL-WIDTH RED CURTAIN */}
        <motion.div
          animate={{
            opacity: isRevealed ? 0 : 1,
            y: isRevealed ? -36 : 0,
          }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          style={{ pointerEvents: isRevealed ? 'none' : 'auto' }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-between py-8 px-6 text-center"
        >
          <div>
            <p className="text-xs tracking-[0.22em] text-[#F2D58C] font-medium">
              বধূবরণ · শুভবিবাহ
            </p>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold gold-foil-text">
              {details.groomBengali.split(' ')[0]} ও {details.brideBengali.split(' ')[0]}
            </h3>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              style={{ scaleY: cordScaleY, transformOrigin: 'top center' }}
              className="w-1 h-12 sm:h-14 rounded-full bg-gradient-to-b from-[#F5E0AC] via-[#D8B25D] to-[#B68933] shadow-sm"
            />

            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 95 }}
              dragElastic={0.18}
              style={{ y: pullY }}
              onDragEnd={handleTasselDragEnd}
              onClick={triggerReveal}
              animate={{ rotate: [-2.5, 2.5, -2.5] }}
              transition={{
                rotate: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerReveal();
                }
              }}
              aria-label={
                isBn
                  ? 'বিবাহের তারিখ দেখতে সোনালী ঝালর নিচে টানুন'
                  : 'Pull the golden tassel downward to unveil the wedding dates'
              }
              className="group -mt-1 flex flex-col items-center cursor-grab active:cursor-grabbing select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EED69A] rounded-full"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F4DFAA] via-[#D4AB54] to-[#9E7324] border-2 border-[#FFF5D6] shadow-[0_10px_28px_rgba(0,0,0,0.35)] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <span className="font-serif text-lg font-bold text-[#461020]">{monogram}</span>
              </div>

              <svg
                width="44"
                height="56"
                viewBox="0 0 44 56"
                fill="none"
                aria-hidden="true"
                className="-mt-1 drop-shadow-md"
              >
                <rect x="15" y="0" width="14" height="8" rx="3" fill="#B58932" />
                <path
                  d="M14 8C10 22 7 38 6 52C11 55 15 55 17 53L19 10H14Z"
                  fill="#E5C574"
                />
                <path
                  d="M19 8L18 54C21 56 23 56 26 54L25 8H19Z"
                  fill="#F3DD9E"
                />
                <path
                  d="M30 8C34 22 37 38 38 52C33 55 29 55 27 53L25 10H30Z"
                  fill="#CFA449"
                />
                <line x1="15" y1="6" x2="29" y2="6" stroke="#FFF4D1" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={triggerReveal}
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-md gold-foil-btn text-sm font-semibold hover:brightness-105 transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{isBn ? 'সোনালী ঝালর টানুন' : 'Pull the Golden Tassel'}</span>
            </button>
            <p className="mt-2 text-xs text-[#F2DCAD]">
              {isBn
                ? 'নিচের দিকে টানুন অথবা ট্যাপ করে পর্দা খুলুন'
                : 'Drag the tassel down or tap to sweep open the curtains'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
