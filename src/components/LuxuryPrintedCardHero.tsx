import { motion } from 'motion/react';
import { ArrowUpRight, Calendar, MapPin } from 'lucide-react';
import {
  IMAGES,
  Language,
  WeddingDetails,
  buildGoogleCalendarUrl,
  buildGoogleMapsUrl,
  getFirstName,
} from '../types/wedding';
import {
  LUXURY_EASE,
  cardReveal,
  staggerContainer,
  staggerItem,
} from '../utils/motionVariants';
import { ShubhoBibahoMedallion } from './BengaliWeddingMotifs';
import { AuspiciousGaneshCrest, BotanicalCorner, BotanicalDivider } from './BotanicalOrnament';
import { GoldDustParticles } from './GoldDustParticles';
import { SafeImage } from './SafeImage';

interface LuxuryPrintedCardHeroProps {
  details: WeddingDetails;
  lang: Language;
}

export function LuxuryPrintedCardHero({ details, lang }: LuxuryPrintedCardHeroProps) {
  const isBn = lang === 'bn';
  const mapsUrl = buildGoogleMapsUrl(details);
  const googleCalendarUrl = buildGoogleCalendarUrl(details);

  const groomFirst = getFirstName(details.groomName) || 'Surojit';
  const brideFirst = getFirstName(details.brideName) || 'Ritwika';
  const groomFirstBn = details.groomBengali.split(' ')[0] || 'সুরজিৎ';
  const brideFirstBn = details.brideBengali.split(' ')[0] || 'ঋত্বিকা';

  return (
    <motion.section
      id="invitation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: LUXURY_EASE }}
      className="relative w-full royal-crimson-surface text-[#FDF8EE] overflow-hidden"
    >
      {/* Pure CSS Geometric Royal Gold Lattice Pattern (100% edge-to-edge) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 royal-gold-pattern" />

      {/* Subtle Shimmering Framer Motion Gold-Dust Particles */}
      <GoldDustParticles density="hero" />

      {/* Top Ornamental Corner Accents (Bottom corners removed for seamless gradient melt into Curtain Reveal) */}
      <BotanicalCorner light position="top-left" className="absolute top-3 left-3 sm:top-5 sm:left-6 z-10 opacity-85" />
      <BotanicalCorner light position="top-right" className="absolute top-3 right-3 sm:top-5 sm:right-6 z-10 opacity-85" />

      <div className="relative z-10 max-w-[1160px] mx-auto px-[16px] sm:px-8 lg:px-10 pt-9 pb-16 sm:pt-14 sm:pb-22 lg:pt-16 lg:pb-24">
        {/* Top Auspicious Ganesh Crest & Elders' Blessing Header (Staggered Entrance) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-xl mx-auto"
        >
          <motion.div variants={staggerItem}>
            <AuspiciousGaneshCrest light className="mx-auto mb-2" />
          </motion.div>
          <motion.p
            variants={staggerItem}
            className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-[var(--gold-200)]"
          >
            {isBn ? '|| শ্রী গণেশায় নমঃ ||' : '|| Shree Ganeshay Namah ||'}
          </motion.p>
          <motion.p
            variants={staggerItem}
            className="mt-2 font-serif text-base sm:text-lg text-[#F7E9CF] leading-relaxed"
          >
            {isBn
              ? 'গুরুজনদের আশীর্বাদ ও স্নেহাশিস মাথায় লইয়া আমরা সাদর আমন্ত্রণ জানাইতেছি'
              : 'With the blessings of elders, we joyfully invite you to the wedding of'}
          </motion.p>
          <motion.div variants={staggerItem}>
            <BotanicalDivider light className="mt-4 max-w-[220px] mx-auto" />
          </motion.div>
        </motion.div>

        {/* Clean Hero Composition: Golden "শুভ বিবাহ" Mandala Medallion + Real Couple Portrait */}
        <div className="mt-7 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
          {/* Left Column: Large "আমাদের" -> Circular Gold "শুভ বিবাহ" Mandala -> Couple Names */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="flex flex-col items-center">
              <motion.p
                variants={staggerItem}
                className="font-serif text-4xl sm:text-5xl font-semibold gold-foil-text tracking-wide leading-tight mb-3 text-center"
              >
                {isBn ? 'আমাদের' : 'Our'}
              </motion.p>

              <motion.div variants={staggerItem}>
                <ShubhoBibahoMedallion isBn={isBn} />
              </motion.div>
            </div>

            <motion.h1 variants={staggerItem} className="mt-4 leading-tight">
              <span className="block font-serif text-4xl sm:text-5xl xl:text-[3.5rem] font-semibold gold-foil-text tracking-tight py-1">
                {isBn ? `${groomFirstBn} ও ${brideFirstBn}` : `${groomFirst} & ${brideFirst}`}
              </span>
            </motion.h1>

            <motion.div variants={staggerItem} className="w-full max-w-xs">
              <BotanicalDivider light className="my-4 w-full lg:justify-start" />
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="text-sm sm:text-base font-serif italic text-[#F7E8C9]/92 leading-relaxed max-w-[46ch]"
            >
              {isBn ? details.blessingQuoteBn : details.blessingQuote}
            </motion.p>

            {/* Quick Actions */}
            <motion.div
              variants={staggerItem}
              className="mt-6 w-full sm:w-auto grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
            >
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-[16px] py-[14px] rounded-lg gold-foil-btn text-xs sm:text-sm font-semibold shadow-md hover:brightness-105 transition-all whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{isBn ? 'গুগল ম্যাপ' : 'Get Directions'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-[16px] py-[14px] rounded-lg border border-[var(--gold-300)]/70 bg-[var(--red-900)]/70 text-[#FDF8EE] text-xs sm:text-sm font-semibold hover:bg-[var(--red-800)] transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-[var(--gold-200)] shrink-0" aria-hidden="true" />
                <span>{isBn ? 'তারিখ সেভ করুন' : 'Save the Date'}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Couple Portrait Framed in Luminous Double Champagne Gold Arch */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center">
            <motion.div
              variants={cardReveal}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-[375px] sm:max-w-[415px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 sm:-inset-3 rounded-t-[215px] rounded-b-2xl border-2 border-[var(--gold-200)]/85 shadow-[0_0_32px_rgba(244,222,157,0.28)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 sm:-inset-5 rounded-t-[230px] rounded-b-3xl border border-[var(--gold-300)]/45"
              />

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[205px] rounded-b-xl bg-[var(--red-950)] shadow-[0_24px_54px_rgba(20,2,6,0.55)]">
                <SafeImage
                  src={IMAGES.heroPortrait}
                  alt={`${details.groomName} and ${details.brideName} traditional Bengali wedding portrait`}
                  title={`${groomFirst} & ${brideFirst}`}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3F060F]/45 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Seamless Bottom Crimson Gradient Blend Melting Directly Into Curtain Reveal Section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 z-10 bg-gradient-to-b from-transparent via-[#4D0712]/75 to-[#46050F]"
      />
    </motion.section>
  );
}
