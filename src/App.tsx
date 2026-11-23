import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Languages,
  MapPin,
  Phone,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  CEREMONY_EVENTS,
  GALLERY_PHOTOS,
  IMAGES,
  Language,
  WeddingDetails,
  buildGoogleMapsUrl,
  buildShareableCardUrl,
  getFirstName,
  loadDetailsFromUrl,
} from './types/wedding';
import { BengaliToporMukutEmblem } from './components/BengaliWeddingMotifs';
import {
  BotanicalCorner,
  BotanicalDivider,
} from './components/BotanicalOrnament';
import { CardOpeningStage } from './components/CardOpeningStage';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { DatePullReveal } from './components/DatePullReveal';
import { FinalThankYouSection } from './components/FinalThankYouSection';
import { FloatingPetals } from './components/FloatingPetals';
import { GalleryLightbox } from './components/GalleryLightbox';
import { LuxuryPrintedCardHero } from './components/LuxuryPrintedCardHero';
import { OccasionCarousel } from './components/OccasionCarousel';
import { PhotoCarousel } from './components/PhotoCarousel';
import { SafeImage } from './components/SafeImage';
import { VenueMapCard } from './components/VenueMapCard';
import {
  BackgroundMusicHandle,
  WEDDING_YOUTUBE_MUSIC,
  YouTubeBackgroundMusic,
} from './components/YouTubeBackgroundMusic';
import {
  VIEWPORT_ONCE,
  cardReveal,
  staggerContainer,
  staggerItem,
} from './utils/motionVariants';

export default function App() {
  const [cardOpened, setCardOpened] = useState(false);
  const [lang, setLang] = useState<Language>('bn');
  const [details, setDetails] = useState<WeddingDetails>(() => loadDetailsFromUrl());
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const isBn = lang === 'bn';

  // Smooth cinematic champagne-gold scroll progress indicator
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  // Hidden YouTube Background Wedding Music Player (starts at 8s, loops from 8s)
  const musicPlayerRef = useRef<BackgroundMusicHandle | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const startWeddingMusic = useCallback(() => {
    musicPlayerRef.current?.start();
  }, []);

  const toggleMusic = useCallback(() => {
    musicPlayerRef.current?.toggle();
  }, []);

  // Keep page title & URL query parameters synchronized
  useEffect(() => {
    const groomFirst = getFirstName(details.groomName) || 'Surojit';
    const brideFirst = getFirstName(details.brideName) || 'Ritwika';
    document.title = isBn
      ? `${details.groomBengali.split(' ')[0]} ও ${details.brideBengali.split(' ')[0]} — শুভবিবাহ | ${details.weddingDateDisplayBn}`
      : `${groomFirst} & ${brideFirst} — Wedding Invitation | ${details.weddingDateDisplay}`;

    try {
      const shareUrl = buildShareableCardUrl(details);
      if (shareUrl && shareUrl !== window.location.href) {
        window.history.replaceState(null, '', shareUrl);
      }
    } catch {
      // Ignore history API restrictions if any
    }
  }, [details, isBn]);

  const mapsUrl = useMemo(() => buildGoogleMapsUrl(details), [details]);

  const groomFirst = getFirstName(details.groomName) || 'Surojit';
  const brideFirst = getFirstName(details.brideName) || 'Ritwika';
  const groomFirstBn = details.groomBengali.split(' ')[0] || 'সুরজিৎ';
  const brideFirstBn = details.brideBengali.split(' ')[0] || 'ঋত্বিকা';

  const handleCopyAddress = async () => {
    const text = isBn
      ? `${details.venueNameBn}, ${details.venueAddressBn}`
      : `${details.venueName}, ${details.venueAddress}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedAddress(true);
    window.setTimeout(() => setCopiedAddress(false), 2400);
  };

  return (
    <>
      {/* Subtle Luxury Framer Motion Floating Petals Gently Drifting Down */}
      <FloatingPetals />

      {/* Hidden YouTube Wedding Music Player (skips first 8 seconds & loops from 0:08) */}
      <YouTubeBackgroundMusic
        ref={musicPlayerRef}
        videoId={WEDDING_YOUTUBE_MUSIC.videoId}
        startSeconds={WEDDING_YOUTUBE_MUSIC.startSeconds}
        onPlayingChange={setIsMusicPlaying}
      />

      {/* Top-Right Floating Bengali <-> English Language Toggle */}
      <button
        type="button"
        onClick={() => setLang((prev) => (prev === 'en' ? 'bn' : 'en'))}
        aria-label={isBn ? 'Switch language to English' : 'ভাষা বাংলায় পরিবর্তন করুন'}
        className={`fixed ${
          cardOpened ? 'top-[72px]' : 'top-4'
        } right-4 z-40 inline-flex items-center gap-1.5 px-3.5 h-10 rounded-lg bg-[#FDF9F1]/95 border border-[#D8BE8B] text-[#1D1517] shadow-[0_8px_22px_rgba(32,14,16,0.14)] backdrop-blur-sm hover:border-[#7D0F1E] hover:text-[#7D0F1E] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D0F1E]`}
      >
        <Languages className="w-4 h-4 text-[#7D0F1E]" aria-hidden="true" />
        <span className="text-xs font-semibold whitespace-nowrap">
          {isBn ? 'English' : 'বাংলা'}
        </span>
      </button>

      {/* Compact Circular Floating Wedding Music Mute / Play Toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? 'Mute wedding music' : 'Play wedding music'}
        aria-pressed={isMusicPlaying}
        title={isMusicPlaying ? 'Mute music' : 'Play music'}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FDF9F1]/95 border border-[#D8BE8B] text-[#1D1517] shadow-[0_10px_24px_rgba(32,14,16,0.18)] backdrop-blur-sm hover:border-[#7D0F1E] hover:text-[#7D0F1E] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D0F1E]"
      >
        {isMusicPlaying ? (
          <Volume2 className="w-5 h-5 text-[#7D0F1E]" aria-hidden="true" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#5A474C]" aria-hidden="true" />
        )}
      </button>

      {!cardOpened ? (
        <CardOpeningStage
          details={details}
          lang={lang}
          onStartMusic={startWeddingMusic}
          onComplete={() => {
            setCardOpened(true);
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }}
        />
      ) : (
        <div className="min-h-screen bg-[#FBF8F3] text-[#1D1517]">
          {/* Strict 3-Zone Top Bar Contract + 2px Champagne Gold Scroll Indicator */}
          <header className="sticky top-0 z-30 h-16 bg-[#FBF8F3]/95 backdrop-blur-sm border-b border-[#E5D7BE]">
            <div className="max-w-[1160px] h-full mx-auto px-[16px] sm:px-8 lg:px-10 flex items-center justify-between gap-4">
              {/* Zone 1: Single-line Brand Wordmark */}
              <a
                href="#invitation"
                className="font-serif text-lg sm:text-2xl font-semibold tracking-tight text-[#6B1325] whitespace-nowrap shrink-0"
              >
                {isBn
                  ? `${groomFirstBn} ও ${brideFirstBn} · শুভ বিবাহ`
                  : `${groomFirst} & ${brideFirst} Wedding`}
              </a>

              {/* Zone 2: 4 Concise Single-Line Navigation Links */}
              <nav
                aria-label="Primary invitation navigation"
                className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4D3F43]"
              >
                <a
                  href="#family"
                  className="hover:text-[#7D0F1E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  {isBn ? 'পরিবার' : 'Couple & Family'}
                </a>
                <a
                  href="#occasions"
                  className="hover:text-[#7D0F1E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  {isBn ? 'অনুষ্ঠান সূচী' : 'Events'}
                </a>
                <a
                  href="#moments"
                  className="hover:text-[#7D0F1E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  {isBn ? 'গ্যালারি' : 'Gallery'}
                </a>
                <a
                  href="#venue"
                  className="hover:text-[#7D0F1E] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  {isBn ? 'স্থান ও ম্যাপ' : 'Venue'}
                </a>
              </nav>

              {/* Zone 3: Direct Google Maps Icon Action (Replaces Share Button) */}
              <div className="shrink-0">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isBn ? 'গুগল ম্যাপ লোকেশন খুলুন' : 'Open Wedding Venue in Google Maps'}
                  title={isBn ? 'গুগল ম্যাপ' : 'Google Maps'}
                  className="inline-flex items-center gap-2 px-3 sm:px-3.5 h-10 rounded-lg border border-[#DFCFAF] bg-[#FFFBF4] text-[#6B1325] text-xs sm:text-sm font-semibold shadow-xs hover:border-[#7D0F1E] hover:bg-[#F7EDE0] transition-colors whitespace-nowrap shrink-0"
                >
                  {/* Classic Multi-Color Google Maps Pin Icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M12 2C9.5 2 7.31 3.31 6.07 5.29L12 11.22V2Z"
                      fill="#1A73E8"
                    />
                    <path
                      d="M12 11.22L6.07 5.29C5.39 6.37 5 7.64 5 9C5 11.35 6.45 14.12 8.21 16.71L12 11.22Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M12 11.22L8.21 16.71C9.55 18.69 10.72 20.48 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C13.79 19.88 16.19 16.82 17.63 13.72L12 11.22Z"
                      fill="#34A853"
                    />
                    <circle cx="12" cy="9" r="3" fill="#FFFFFF" />
                  </svg>
                  <span>{isBn ? 'ম্যাপ' : 'Map'}</span>
                </a>
              </div>
            </div>

            {/* Thin 2px Champagne Gold Scroll Progress Bar */}
            <motion.div
              aria-hidden="true"
              style={{ scaleX: smoothScrollProgress }}
              className="h-[2px] w-full origin-left bg-gradient-to-r from-[#A57A30] via-[#E3C170] to-[#7D0F1E]"
            />
          </header>

          <main>
            {/* SECTION 1: Luxury Printed Wedding Invitation Card Hero + Live Countdown */}
            <LuxuryPrintedCardHero details={details} lang={lang} />

            {/* SECTION 2: Interactive Golden Silk Tassel & Royal Curtain Date Reveal */}
            <DatePullReveal details={details} lang={lang} />

            {/* SECTION 3: Groom & Bride Introduction + Family Heritage & Official Letter */}
            <section id="family" className="max-w-[1160px] mx-auto px-[14px] sm:px-8 lg:px-10 py-14 sm:py-22">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="text-center max-w-2xl mx-auto"
              >
                <motion.div variants={staggerItem}>
                  <BengaliToporMukutEmblem className="mx-auto mb-2" />
                </motion.div>
                <motion.p
                  variants={staggerItem}
                  className="text-xs sm:text-sm tracking-[0.14em] text-[#7D0F1E] font-semibold"
                >
                  {isBn ? '|| শ্রী গণেশায় নমঃ ||' : '|| Shree Ganeshay Namah ||'}
                </motion.p>
                <motion.h2
                  variants={staggerItem}
                  className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-[#1D1517] [text-wrap:balance]"
                >
                  {isBn
                    ? 'উভয় পরিবারের আশীর্বাদে শুভ পরিণয়'
                    : 'Please join us for the wedding of'}
                </motion.h2>
                <motion.p
                  variants={staggerItem}
                  className="mt-2.5 text-sm sm:text-base text-[#4D3F43]"
                >
                  {isBn
                    ? 'পাত্র ও পাত্রীর পরিবার পরিচিতি এবং সাদর আমন্ত্রণপত্র'
                    : 'With the love and blessings of our parents, elders, and cherished families'}
                </motion.p>
                <motion.div variants={staggerItem}>
                  <BotanicalDivider className="mt-5 max-w-[240px] mx-auto" />
                </motion.div>
              </motion.div>

              {/* Balanced Side-by-Side Groom & Bride Arched Luxury Cards (Staggered Entrance) */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9"
              >
                {/* Groom Card */}
                <motion.article
                  variants={cardReveal}
                  className="relative rounded-2xl border-2 border-[#DFCFAF] parchment-surface px-[16px] py-8 sm:p-9 shadow-[0_14px_38px_rgba(45,20,18,0.06)] overflow-hidden"
                >
                  <BotanicalCorner position="top-left" className="absolute top-3 left-3 opacity-80" />
                  <BotanicalCorner position="top-right" className="absolute top-3 right-3 opacity-80" />

                  <div className="relative z-10 text-center">
                    {/* Arched Gold-Framed Groom Portrait (Pinned strictly to TOP edge so head never clips) */}
                    <div className="mx-auto w-36 h-44 sm:w-40 sm:h-48 p-1.5 rounded-t-[100px] rounded-b-xl border border-[#D5B77B] bg-[#FDF9F1] shadow-xs">
                      <div className="w-full h-full overflow-hidden rounded-t-[94px] rounded-b-lg bg-[#EFE6D8]">
                        <SafeImage
                          src={IMAGES.heroPortrait}
                          alt={`Groom ${details.groomName}`}
                          className="w-full h-full object-cover object-top origin-[64%_0%] scale-[1.24]"
                        />
                      </div>
                    </div>

                    <p className="mt-5 text-xs tracking-[0.2em] uppercase font-semibold text-[#B08434]">
                      {isBn ? 'পাত্র · বরপক্ষ' : 'The Groom · পাত্রপক্ষ'}
                    </p>
                    <h3 className="mt-1.5 font-script text-4xl sm:text-5xl text-[#6B1325] leading-tight">
                      {isBn ? groomFirstBn : groomFirst}
                    </h3>
                    <p className="font-serif text-lg sm:text-xl font-semibold text-[#1D1517]">
                      {isBn ? details.groomBengali : details.groomName}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#5A474C]">
                      {isBn
                        ? `পুত্র: ${details.groomFatherBn} ও ${details.groomMotherBn}`
                        : `S/o ${details.groomFather} & ${details.groomMother}`}
                    </p>
                  </div>

                  <dl className="relative z-10 mt-6 pt-5 border-t border-[#E3D5BF] space-y-3 text-sm sm:text-[15px]">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'পিতা' : 'Father (পিতা)'}
                      </dt>
                      <dd className="font-serif text-base sm:text-lg font-semibold text-[#1D1517] sm:text-right">
                        {isBn ? details.groomFatherBn : details.groomFather}
                      </dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'মাতা' : 'Mother (মাতা)'}
                      </dt>
                      <dd className="font-serif text-base sm:text-lg font-semibold text-[#1D1517] sm:text-right">
                        {isBn ? details.groomMotherBn : details.groomMother}
                      </dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'দাদা ও বৌদি' : 'Brother & Sister-in-Law'}
                      </dt>
                      <dd className="text-sm font-medium text-[#1D1517] sm:text-right">
                        {isBn
                          ? `${details.groomBrotherBn} ও ${details.groomSisterInLawBn}`
                          : `${details.groomBrother} & ${details.groomSisterInLaw}`}
                      </dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'ভ্রাতুষ্পুত্রী' : 'Niece (ভ্রাতুষ্পুত্রী)'}
                      </dt>
                      <dd className="text-sm font-medium text-[#1D1517] sm:text-right">
                        {isBn ? details.groomNieceBn : details.groomNiece}
                      </dd>
                    </div>
                    <div className="pt-3 border-t border-[#ECE1CE] flex flex-col sm:flex-row sm:justify-between gap-1">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'নিবাস' : 'Residence (নিবাস)'}
                      </dt>
                      <dd className="text-sm text-[#4D3F43] sm:text-right">
                        {isBn ? details.groomResidenceBn : details.groomResidence}
                      </dd>
                    </div>
                  </dl>
                </motion.article>

                {/* Bride Card */}
                <motion.article
                  variants={cardReveal}
                  className="relative rounded-2xl border-2 border-[#DFCFAF] parchment-surface px-[16px] py-8 sm:p-9 shadow-[0_14px_38px_rgba(45,20,18,0.06)] overflow-hidden"
                >
                  <BotanicalCorner position="top-left" className="absolute top-3 left-3 opacity-80" />
                  <BotanicalCorner position="top-right" className="absolute top-3 right-3 opacity-80" />

                  <div className="relative z-10 text-center">
                    {/* Arched Gold-Framed Bride Portrait (Pinned strictly to TOP edge so mukut never clips) */}
                    <div className="mx-auto w-36 h-44 sm:w-40 sm:h-48 p-1.5 rounded-t-[100px] rounded-b-xl border border-[#D5B77B] bg-[#FDF9F1] shadow-xs">
                      <div className="w-full h-full overflow-hidden rounded-t-[94px] rounded-b-lg bg-[#EFE6D8]">
                        <SafeImage
                          src={IMAGES.heroPortrait}
                          alt={`Bride ${details.brideName}`}
                          className="w-full h-full object-cover object-top origin-[40%_0%] scale-[1.24]"
                        />
                      </div>
                    </div>

                    <p className="mt-5 text-xs tracking-[0.2em] uppercase font-semibold text-[#B08434]">
                      {isBn ? 'পাত্রী · কনেপক্ষ' : 'The Bride · পাত্রীপক্ষ'}
                    </p>
                    <h3 className="mt-1.5 font-script text-4xl sm:text-5xl text-[#6B1325] leading-tight">
                      {isBn ? brideFirstBn : brideFirst}
                    </h3>
                    <p className="font-serif text-lg sm:text-xl font-semibold text-[#1D1517]">
                      {isBn ? details.brideBengali : details.brideName}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#5A474C]">
                      {isBn
                        ? `কন্যা: ${details.brideFatherBn} ও ${details.brideMotherBn}`
                        : `D/o ${details.brideFather} & ${details.brideMother}`}
                    </p>
                  </div>

                  <dl className="relative z-10 mt-6 pt-5 border-t border-[#E3D5BF] space-y-3 text-sm sm:text-[15px]">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'পিতা' : 'Father (পিতা)'}
                      </dt>
                      <dd className="font-serif text-base sm:text-lg font-semibold text-[#1D1517] sm:text-right">
                        {isBn ? details.brideFatherBn : details.brideFather}
                      </dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'মাতা' : 'Mother (মাতা)'}
                      </dt>
                      <dd className="font-serif text-base sm:text-lg font-semibold text-[#1D1517] sm:text-right">
                        {isBn ? details.brideMotherBn : details.brideMother}
                      </dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'ভাই' : 'Brother (ভাই)'}
                      </dt>
                      <dd className="text-sm font-medium text-[#1D1517] sm:text-right">
                        {isBn ? details.brideBrotherBn : details.brideBrother}
                      </dd>
                    </div>
                    <div className="pt-3 border-t border-[#ECE1CE] flex flex-col sm:flex-row sm:justify-between gap-1">
                      <dt className="text-xs font-medium text-[#5A474C]">
                        {isBn ? 'নিবাস' : 'Residence (নিবাস)'}
                      </dt>
                      <dd className="text-sm text-[#4D3F43] sm:text-right">
                        {isBn ? details.brideResidenceBn : details.brideResidence}
                      </dd>
                    </div>
                  </dl>
                </motion.article>
              </motion.div>

              {/* Official Heirloom Invitation Letter Note (সবিনয় নিবেদন) */}
              <motion.div
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="mt-9 sm:mt-11 rounded-2xl border-2 border-[#DFCFAF] parchment-surface px-[16px] py-9 sm:p-12 relative overflow-hidden shadow-[0_14px_38px_rgba(45,20,18,0.06)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2.5 sm:inset-3.5 rounded-xl border border-[#E6D3AF]/75"
                />
                <BotanicalCorner position="top-left" className="absolute top-3.5 left-3.5" />
                <BotanicalCorner position="bottom-right" className="absolute bottom-3.5 right-3.5" />

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  className="relative z-10 max-w-3xl mx-auto text-center"
                >
                  <motion.p
                    variants={staggerItem}
                    className="text-xs sm:text-sm tracking-[0.16em] text-[#7D0F1E] font-semibold"
                  >
                    {isBn ? 'সবিনয় নিবেদন' : 'সবিনয় নিবেদন · A Humble Invitation'}
                  </motion.p>
                  <motion.p
                    variants={staggerItem}
                    className="mt-5 font-serif text-lg sm:text-2xl text-[#1D1517] leading-[1.82]"
                  >
                    &ldquo;{isBn ? details.formalNoteBn : details.formalNote}&rdquo;
                  </motion.p>
                  <motion.div variants={staggerItem}>
                    <BotanicalDivider className="my-6 max-w-xs mx-auto" />
                  </motion.div>

                  <motion.div
                    variants={staggerItem}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#4D3F43]"
                  >
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-[#5A474C]">
                        {isBn ? 'বিনীত' : 'With Warm Regards (বিনীত)'}
                      </p>
                      <p className="font-serif text-xl font-semibold text-[#1D1517]">
                        {isBn
                          ? `${details.groomFatherBn} ও পরিবারবর্গ`
                          : `${details.groomFather} & Family`}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 tabular-nums text-[15px]">
                      <a
                        href={`tel:${details.contactPhone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-[#7D0F1E] font-semibold hover:underline"
                      >
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        <span>{details.contactPhone}</span>
                      </a>
                      <span aria-hidden="true" className="text-[#D2B98B]">
                        ·
                      </span>
                      <a
                        href={`tel:${details.secondaryPhone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-[#7D0F1E] font-semibold hover:underline"
                      >
                        <Phone className="w-4 h-4" aria-hidden="true" />
                        <span>{details.secondaryPhone}</span>
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </section>

            {/* SECTION 4: Compact 5-Event Wedding Timeline & Swipeable Carousel */}
            <section
              id="occasions"
              className="border-y border-[#E6D9C2] bg-[#F5EEE2]/70 py-10 sm:py-16"
            >
              <div className="max-w-[1160px] mx-auto px-[14px] sm:px-8 lg:px-10">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5"
                >
                  <motion.div variants={staggerItem} className="max-w-2xl">
                    <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1D1517] [text-wrap:balance]">
                      {isBn ? 'অনুষ্ঠান সূচী' : 'Wedding Events Timeline'}
                    </h2>
                  </motion.div>
                  <motion.p
                    variants={staggerItem}
                    className="text-xs sm:text-sm text-[#4D3F43] font-medium tabular-nums"
                  >
                    {isBn
                      ? '১২ – ১৫ই ডিসেম্বর ২০২৬ · অগ্রহায়ণ ১৪৩৩'
                      : '12 – 15 December 2026 · Agrahayan 1433'}
                  </motion.p>
                </motion.div>

                <OccasionCarousel events={CEREMONY_EVENTS} lang={lang} />
              </div>
            </section>

            {/* SECTION 5: Pre-Wedding Couple Moments */}
            <section id="moments" className="max-w-[1160px] mx-auto px-[14px] sm:px-8 lg:px-10 py-12 sm:py-20">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="max-w-xl"
              >
                <motion.p
                  variants={staggerItem}
                  className="text-xs sm:text-sm tracking-[0.14em] text-[#7D0F1E] font-semibold"
                >
                  {isBn ? 'প্রাক-বিবাহ স্মৃতি' : 'PRE-WEDDING MOMENTS'}
                </motion.p>
                <motion.h2
                  variants={staggerItem}
                  className="mt-1.5 font-serif text-3xl sm:text-4xl font-semibold text-[#1D1517] [text-wrap:balance]"
                >
                  {isBn ? 'আমাদের প্রাক-বিবাহ মুহূর্তসমূহ' : 'Timeless Portraits & Captured Vows'}
                </motion.h2>
              </motion.div>

              <PhotoCarousel
                photos={GALLERY_PHOTOS}
                lang={lang}
                onOpenLightbox={(index) => setLightboxIndex(index)}
              />
            </section>

            {/* SECTION 6: Cinematic Venue Showcase with Scroll-Triggered Staggered Framer Motion Reveal */}
            <motion.section
              id="venue"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#E6D9C2] bg-[#F5EEE2]/80 py-14 sm:py-22"
            >
              <div className="max-w-[1160px] mx-auto px-[14px] sm:px-8 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  {/* Left Column: Staggered Venue Heading, Photograph, Dates & Route Guide */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="lg:col-span-5"
                  >
                    <motion.p
                      variants={staggerItem}
                      className="text-xs sm:text-sm tracking-[0.14em] text-[#7D0F1E] font-semibold"
                    >
                      {isBn
                        ? 'সাদর আমন্ত্রণ · অনুষ্ঠান স্থল ও দিকনির্দেশ'
                        : 'LOCATION & VENUE · সাদর আমন্ত্রণ'}
                    </motion.p>
                    <motion.h2
                      variants={staggerItem}
                      className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1D1517] [text-wrap:balance]"
                    >
                      {isBn ? details.venueNameBn : details.venueName}
                    </motion.h2>
                    <motion.p
                      variants={staggerItem}
                      className="mt-2.5 text-[15px] sm:text-base text-[#3E3235] leading-relaxed"
                    >
                      {isBn ? details.venueAddressBn : details.venueAddress}
                    </motion.p>

                    {/* Framed Luxury Venue Photograph */}
                    <motion.div
                      variants={cardReveal}
                      className="mt-5 overflow-hidden rounded-2xl border-2 border-[#DFCFAF] bg-[#EFE6D8] shadow-xs"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <SafeImage
                          src={IMAGES.venueShowcase}
                          alt={`${details.venueName} illuminated floral wedding courtyard`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={staggerItem}
                      className="mt-6 pt-5 border-t border-[#DECBA8] space-y-3 text-sm sm:text-[15px] text-[#4D3F43]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span>{isBn ? 'শুভবিবাহ' : 'Shubho Bibaho'}</span>
                        <span className="text-[#1D1517] font-semibold tabular-nums">
                          {isBn
                            ? `${details.weddingDayBn}, ${details.weddingDateDisplayBn}`
                            : `${details.weddingDay}, ${details.weddingDateDisplay}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{isBn ? 'বধূবরণ ও প্রীতিভোজ' : 'Bodhuboron & Pritibhoj'}</span>
                        <span className="text-[#1D1517] font-semibold tabular-nums">
                          {isBn
                            ? `${details.receptionDayBn}, ${details.receptionDateDisplayBn}`
                            : `${details.receptionDay}, ${details.receptionDateDisplay}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span>{isBn ? 'যোগাযোগ' : 'Family Contact'}</span>
                        <a
                          href={`tel:${details.contactPhone.replace(/\s+/g, '')}`}
                          className="text-[#7D0F1E] font-semibold tabular-nums hover:underline"
                        >
                          {details.contactPhone}
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={staggerItem}
                      className="mt-6 pt-5 border-t border-[#DECBA8]"
                    >
                      <p className="text-xs sm:text-sm font-semibold text-[#7D0F1E]">
                        {isBn ? 'পথনির্দেশ (কীভাবে আসবেন)' : 'পথনির্দেশ · How to Reach'}
                      </p>
                      <p className="mt-1.5 text-sm text-[#4D3F43] leading-[1.75]">
                        {isBn ? details.routeGuideBn : details.routeGuide}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Right / Below on Mobile: Clickable Map FIRST, then 2 CTAs aligned on ONE single horizontal line AFTER the map */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="lg:col-span-7 flex flex-col"
                  >
                    <motion.div variants={cardReveal}>
                      <VenueMapCard details={details} lang={lang} />
                    </motion.div>

                    {/* Two CTAs aligned on ONE single horizontal line AFTER the map with 16px / 14px padding */}
                    <motion.div variants={staggerItem} className="mt-4 grid grid-cols-2 gap-3">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-[16px] py-[14px] min-h-[48px] rounded-lg bg-[#7D0F1E] text-[#FDF9F1] text-sm font-semibold hover:bg-[#5E0B16] transition-colors whitespace-nowrap"
                      >
                        <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{isBn ? 'গুগল ম্যাপ' : 'Open Map'}</span>
                        <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="inline-flex items-center justify-center gap-2 px-[16px] py-[14px] min-h-[48px] rounded-lg border border-[#CFAF74] bg-white text-[#1D1517] text-sm font-semibold hover:bg-[#F5ECD9] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {copiedAddress ? (
                          <>
                            <Check className="w-4 h-4 text-[#3F5243] shrink-0" aria-hidden="true" />
                            <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-[#4D3F43] shrink-0" aria-hidden="true" />
                            <span>{isBn ? 'ঠিকানা কপি' : 'Copy Address'}</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* SECTION 7: Emotional Final Thank You Closing Section */}
            <FinalThankYouSection details={details} lang={lang} />
          </main>

          {/* Clean Quiet Footer with Extra Bottom Space for Floating Music Toggle */}
          <footer className="border-t border-[#E6D9C2] bg-[#FDF9F1] pt-10 pb-24 sm:py-10">
            <div className="max-w-[1160px] mx-auto px-[16px] sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <p className="font-serif text-2xl font-semibold text-[#1D1517]">
                  {isBn
                    ? `${details.groomBengali} ও ${details.brideBengali}`
                    : `${details.groomName} & ${details.brideName}`}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#4D3F43] tabular-nums">
                  {isBn
                    ? `শুভবিবাহ: ${details.weddingDateDisplayBn} · প্রীতিভোজ: ${details.receptionDateDisplayBn}`
                    : `Shubho Bibaho: ${details.weddingDateDisplay} · Pritibhoj: ${details.receptionDateDisplay}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-[#4D3F43]">
                <button
                  type="button"
                  onClick={() => {
                    setCardOpened(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 hover:text-[#7D0F1E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isBn ? 'কার্ড পুনরায় দেখুন' : 'Replay Opening'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomizeOpen(true)}
                  className="hover:text-[#7D0F1E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isBn ? 'তথ্য সম্পাদনা' : 'Edit Details'}
                </button>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7D0F1E] transition-colors whitespace-nowrap shrink-0"
                >
                  {isBn ? 'গুগল ম্যাপ' : 'Google Maps'}
                </a>
              </div>
            </div>
          </footer>

          {/* Fullscreen Photo Lightbox Modal */}
          <GalleryLightbox
            photos={GALLERY_PHOTOS}
            lang={lang}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onChangeIndex={setLightboxIndex}
          />

          {/* Slide-Over Personalization Drawer */}
          <CustomizeDrawer
            isOpen={isCustomizeOpen}
            details={details}
            onChange={setDetails}
            onClose={() => setIsCustomizeOpen(false)}
          />
        </div>
      )}
    </>
  );
}
