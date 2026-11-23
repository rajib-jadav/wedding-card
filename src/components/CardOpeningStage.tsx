import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Music } from 'lucide-react';
import { IMAGES, Language, WeddingDetails, getFirstName } from '../types/wedding';
import { BengaliSanaiDholEmblem } from './BengaliWeddingMotifs';
import { BotanicalDivider, GoldFloralLineSpray } from './BotanicalOrnament';
import { GoldDustParticles } from './GoldDustParticles';
import { SafeImage } from './SafeImage';

interface CardOpeningStageProps {
  details: WeddingDetails;
  lang: Language;
  onStartMusic: () => void;
  onComplete: () => void;
}

export function CardOpeningStage({
  details,
  lang,
  onStartMusic,
  onComplete,
}: CardOpeningStageProps) {
  const [phase, setPhase] = useState<'cover' | 'revealing' | 'fading'>('cover');
  const timersRef = useRef<number[]>([]);
  const isBn = lang === 'bn';

  const groomFirst = getFirstName(details.groomName) || 'Surojit';
  const brideFirst = getFirstName(details.brideName) || 'Ritwika';
  const groomFirstBn = details.groomBengali.split(' ')[0] || 'সুরোজিৎ';
  const brideFirstBn = details.brideBengali.split(' ')[0] || 'ঋত্বিকা';

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleOpen = () => {
    if (phase !== 'cover') return;
    onStartMusic();
    setPhase('revealing');

    // Linger 4.5 - 5 seconds on the full-screen Sanai & couple celebration before smoothly entering Hero
    const fadeTimer = window.setTimeout(() => {
      setPhase('fading');
    }, 4500);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 5250);

    timersRef.current.push(fadeTimer, completeTimer);
  };

  const handleEnterNow = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    onComplete();
  };

  const isRevealing = phase === 'revealing' || phase === 'fading';

  return (
    <motion.div
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full royal-crimson-surface text-[#FDF8EE] relative overflow-hidden flex items-center justify-center"
    >
      {/* Pure CSS Geometric Royal Gold Lattice Pattern Full-Screen */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 royal-gold-pattern" />

      {/* Ornate Gold Geometric Corner Accents */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: -16 }}
        animate={{ opacity: isRevealing ? 0.45 : 0.85, x: 0, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-2 -right-4 sm:top-0 sm:right-0"
      >
        <GoldFloralLineSpray />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -24, y: 16 }}
        animate={{ opacity: isRevealing ? 0.45 : 0.85, x: 0, y: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-2 -left-4 sm:bottom-0 sm:left-0"
      >
        <GoldFloralLineSpray flip />
      </motion.div>

      {/* Subtle Shimmering Framer Motion Gold-Dust Particles */}
      <GoldDustParticles density="hero" />

      {/* PHASE 1: ROYAL CRIMSON & GOLD FOIL COVER */}
      {!isRevealing ? (
        <div className="relative z-10 w-full max-w-[1040px] mx-auto px-4 py-12 sm:px-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          {/* Left / Top: Realistic Indian Wedding Hands Photograph inside Intersecting Gold Foil Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[370px] sm:h-[370px] lg:w-[410px] lg:h-[410px] flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full bg-[#E6C77E]/20 blur-2xl"
              />

              <div className="relative w-[84%] h-[84%] rounded-full overflow-hidden shadow-[0_24px_60px_rgba(28,3,8,0.65)] border border-[#E6C77E]/50">
                <SafeImage
                  src={IMAGES.openingHands}
                  alt="Indian bride and groom hands held together with traditional henna, gold and red bangles, and fresh white jasmine"
                  title={`${groomFirst} & ${brideFirst}`}
                  className="w-full h-full object-cover object-center scale-[1.06]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0711]/35 via-transparent to-[#4A0711]/15 pointer-events-none" />
              </div>

              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, rotate: -14, scale: 0.9 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-[3%] rounded-full border-[2.5px] border-[#F0D388] shadow-[0_0_24px_rgba(240,211,136,0.45)]"
              />
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, rotate: 16, scale: 0.94 }}
                animate={{ opacity: 0.9, rotate: 7, scale: 1 }}
                transition={{ duration: 1.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute inset-[5%] -translate-x-2 translate-y-1.5 rounded-full border-[1.5px] border-[#FFF0C4]/85"
              />
            </div>
          </motion.div>

          {/* Right / Bottom: Luxury Editorial Wedding Invitation Typography */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-sm tracking-[0.26em] text-[#F1D58F] font-medium"
            >
              {isBn ? 'শুভবিবাহ ও বধূবরণ' : 'SHUBHO BIBAHO · BODHUBORON'}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 leading-none"
            >
              <span className="block font-serif text-4xl sm:text-6xl font-semibold tracking-[0.14em] text-[#FDF8EE]">
                {isBn ? 'বিবাহ' : 'WEDDING'}
              </span>
              <span className="block font-script text-5xl sm:text-7xl gold-foil-text -mt-1 sm:-mt-2 py-1 pr-2">
                {isBn ? 'আমন্ত্রণপত্র' : 'Invitations'}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-sm sm:text-base text-[#F7E8CC]/90 max-w-md"
            >
              {isBn
                ? 'ভালোবাসা ও মিলনের এক পবিত্র উৎসব'
                : 'A Celebration of Love & Togetherness'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xs my-6"
            >
              <BotanicalDivider light className="lg:justify-start" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.08em] text-[#FFF7E6]">
                {isBn
                  ? `${groomFirstBn} ও ${brideFirstBn}`
                  : `${groomFirst.toUpperCase()} & ${brideFirst.toUpperCase()}`}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-[#F0D594] tabular-nums">
                {isBn
                  ? `${details.weddingDayBn} · ${details.weddingDateDisplayBn}`
                  : `${details.weddingDay} · ${details.weddingDateDisplay}`}
              </p>
            </motion.div>

            {/* Primary Opening Action */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-center lg:items-start"
            >
              <button
                type="button"
                onClick={handleOpen}
                aria-label={
                  isBn
                    ? 'বিবাহের আমন্ত্রণপত্র খুলুন ও সানাই সঙ্গীত শুনুন'
                    : 'Open wedding invitation card with Bengali Shehnai music'
                }
                className="group inline-flex items-center gap-3 px-7 py-3.5 min-h-[48px] rounded-lg bg-gradient-to-r from-[#E6C574] via-[#F4DE9D] to-[#D4A84D] text-[#3F0812] text-sm sm:text-base font-semibold shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4DE9D] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Music className="w-4 h-4 text-[#6B1322]" aria-hidden="true" />
                <span>{isBn ? 'আমন্ত্রণপত্র খুলুন' : 'Open Invitation'}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
              <p className="mt-3 text-xs text-[#EED7A8]/80">
                {isBn
                  ? 'ট্যাপ করে সানাইয়ের সুরে আমন্ত্রণপত্র উপভোগ করুন'
                  : 'Tap to unfold the invitation with Bengali Shehnai music'}
              </p>
            </motion.div>
          </div>
        </div>
      ) : (
        /* PHASE 2: FULL-SCREEN SANAI & DHOL COUPLE CELEBRATION (4.5s - 5s lingering pause, ZERO square box) */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-14 text-center"
        >
          {/* Traditional Bengali Sanai & Dhol Musical Emblem */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <BengaliSanaiDholEmblem />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.35 }}
            className="mt-4 text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#F1D58F]"
          >
            {isBn
              ? `${details.groomFatherBn}-এর সাদর আমন্ত্রণ`
              : `With the Blessings of ${details.groomFather}`}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-serif text-4xl sm:text-6xl font-semibold gold-foil-text leading-[1.22] py-1"
          >
            {isBn ? details.groomBengali : details.groomName}
            <span className="block font-serif italic font-normal text-xl sm:text-2xl text-[#F2D58C] my-2.5">
              {isBn ? 'ও' : 'Weds'}
            </span>
            {isBn ? details.brideBengali : details.brideName}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.0, delay: 1.3 }}
            className="w-full max-w-xs"
          >
            <BotanicalDivider light className="my-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.55 }}
          >
            <p className="font-serif text-lg sm:text-2xl font-semibold text-[#FFFBF2] tabular-nums">
              {isBn
                ? `${details.weddingDayBn}, ${details.weddingDateDisplayBn}`
                : `${details.weddingDay}, ${details.weddingDateDisplay}`}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-[#F2DFBE]/90">
              {isBn ? details.venueNameBn : `${details.venueName} · ${details.venueCity}`}
            </p>

            <button
              type="button"
              onClick={handleEnterNow}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E6C77E]/50 bg-[#520813]/60 text-xs sm:text-sm font-semibold text-[#F4DE9D] hover:bg-[#6A0D1C] transition-colors cursor-pointer"
            >
              <span>{isBn ? 'আমন্ত্রণপত্রে প্রবেশ করুন' : 'Enter Invitation'}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
