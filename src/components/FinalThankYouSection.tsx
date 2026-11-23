import { motion } from 'motion/react';
import { Language, WeddingDetails, getFirstName } from '../types/wedding';
import {
  VIEWPORT_ONCE,
  cardReveal,
  staggerContainer,
  staggerItem,
} from '../utils/motionVariants';
import { AuspiciousGaneshCrest, BotanicalCorner, BotanicalDivider } from './BotanicalOrnament';
import { GoldDustParticles } from './GoldDustParticles';

interface FinalThankYouSectionProps {
  details: WeddingDetails;
  lang: Language;
}

export function FinalThankYouSection({ details, lang }: FinalThankYouSectionProps) {
  const isBn = lang === 'bn';
  const groomFirst = getFirstName(details.groomName) || 'Surojit';
  const brideFirst = getFirstName(details.brideName) || 'Ritwika';
  const groomFirstBn = details.groomBengali.split(' ')[0] || 'সুরজিৎ';
  const brideFirstBn = details.brideBengali.split(' ')[0] || 'ঋত্বিকা';

  return (
    <section
      id="thank-you"
      className="relative overflow-hidden royal-velvet-band text-[#FDF8EE] py-20 sm:py-28 border-t border-[var(--gold-300)]/30"
    >
      {/* Pure CSS Geometric Royal Gold Lattice Pattern (no decorative background image) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 royal-gold-pattern" />

      {/* Subtle Shimmering Framer Motion Gold-Dust Particles */}
      <GoldDustParticles density="closing" />

      {/* Ornate Framed Red & Gold Closing Blessing Card */}
      <div className="relative z-10 max-w-[820px] mx-auto px-[16px] sm:px-8">
        <motion.div
          variants={cardReveal}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative rounded-2xl border border-[var(--gold-300)]/55 bg-[var(--red-900)]/70 backdrop-blur-[2px] px-6 py-12 sm:px-14 sm:py-16 text-center shadow-[0_24px_60px_rgba(20,2,5,0.45)]"
        >
          <BotanicalCorner light position="top-left" className="absolute top-3 left-3 sm:top-5 sm:left-5" />
          <BotanicalCorner light position="top-right" className="absolute top-3 right-3 sm:top-5 sm:right-5" />
          <BotanicalCorner light position="bottom-left" className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5" />
          <BotanicalCorner light position="bottom-right" className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={staggerItem}>
              <AuspiciousGaneshCrest light className="mx-auto mb-3" />
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="text-xs sm:text-sm tracking-[0.22em] text-[var(--gold-200)] font-medium"
            >
              {isBn ? 'আন্তরিক কৃতজ্ঞতা ও শুভেচ্ছা' : 'WITH WARMEST GRATITUDE'}
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="mt-5 font-serif text-xl sm:text-3xl text-[#FDF8EE] leading-relaxed [text-wrap:balance]"
            >
              {isBn
                ? 'আপনার সপরিবারে উপস্থিতি আমাদের এই শুভ উৎসবকে আরও আনন্দময় ও স্মরণীয় করিয়া তুলিবে।'
                : 'Your presence will make our celebration even more special.'}
            </motion.p>

            <motion.div variants={staggerItem}>
              <BotanicalDivider light className="my-7 max-w-xs mx-auto" />
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="text-xs sm:text-sm tracking-[0.18em] text-[var(--gold-300)]"
            >
              {isBn ? 'ভালোবাসা ও প্রণাম সহ,' : 'With Love,'}
            </motion.p>

            <motion.h2
              variants={staggerItem}
              className="mt-3 font-script text-5xl sm:text-7xl gold-foil-text leading-tight"
            >
              {isBn ? `${groomFirstBn} ও ${brideFirstBn}` : `${groomFirst} & ${brideFirst}`}
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mt-4 font-serif text-2xl sm:text-3xl italic text-[var(--gold-100)]"
            >
              {isBn ? 'ধন্যবাদ!' : 'Thank You!'}
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="mt-3 text-xs sm:text-sm text-[var(--gold-200)]/85 tabular-nums"
            >
              {isBn
                ? `${details.weddingDateDisplayBn} · ${details.receptionDateDisplayBn}`
                : `${details.weddingDateDisplay} · ${details.receptionDateDisplay}`}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
