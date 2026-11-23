import { useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { CeremonyEvent, Language } from '../types/wedding';
import {
  LUXURY_EASE,
  VIEWPORT_ONCE,
  cardReveal,
  staggerContainer,
  staggerItem,
} from '../utils/motionVariants';
import { SafeImage } from './SafeImage';

interface OccasionCarouselProps {
  events: CeremonyEvent[];
  lang: Language;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(input: string): string {
  return input.replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export function OccasionCarousel({ events, lang }: OccasionCarouselProps) {
  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
  const isBn = lang === 'bn';

  const paginate = (newDirection: number) => {
    const next = (activeIndex + newDirection + events.length) % events.length;
    setSlide([next, newDirection]);
  };

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    setSlide([index, index > activeIndex ? 1 : -1]);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -45 || info.velocity.x < -250) {
      paginate(1);
    } else if (info.offset.x > 45 || info.velocity.x > 250) {
      paginate(-1);
    }
  };

  const ev = events[activeIndex];
  const counterText = isBn
    ? `${toBnDigits(ev.index)} / ${toBnDigits(`0${events.length}`)} · ${ev.bengaliDate}`
    : `${ev.index} / 0${events.length} · ${ev.bengaliDate}`;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="mt-5 sm:mt-7"
    >
      {/* Compact 5-Column Event Timeline Tabs — All 5 Visible Together on Screen */}
      <motion.div
        variants={staggerItem}
        role="tablist"
        aria-label={isBn ? 'বিবাহের অনুষ্ঠান তালিকা' : 'Wedding events timeline'}
        className="grid grid-cols-5 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-xl bg-[#EFE6D7] border border-[#E0D2BC]"
      >
        {events.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.index}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => goTo(idx)}
              className={`px-1 sm:px-3 py-2 min-h-[40px] rounded-lg text-[10.5px] sm:text-sm font-semibold leading-tight text-center transition-all duration-200 cursor-pointer flex items-center justify-center ${
                isActive
                  ? 'bg-[#7D0F1E] text-[#FDF9F1] shadow-sm'
                  : 'text-[#4D3F43] hover:text-[#1D1517] hover:bg-[#FCF8F0]/75'
              }`}
            >
              <span className="hidden sm:inline tabular-nums opacity-80 mr-1.5">
                {isBn ? toBnDigits(item.index) : item.index}.
              </span>
              <span className="truncate">{isBn ? item.shortLabelBn : item.shortLabel}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Compact Luxury Event Card — Balanced Framing for Portrait & Landscape Wedding Photos */}
      <motion.div
        variants={cardReveal}
        className="mt-4 relative overflow-hidden rounded-2xl border-2 border-[#DFCFAF] bg-[#FDF9F1] shadow-[0_14px_38px_rgba(45,20,18,0.08)] touch-pan-y"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.article
            key={ev.index}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -50 : 50 }}
            transition={{ duration: 0.65, ease: LUXURY_EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch cursor-grab active:cursor-grabbing"
          >
            {/* Left / Top: Well-Proportioned Event Photograph with Smart Focal Framing */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-[#EFE6D8]">
              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.25, ease: LUXURY_EASE }}
                className="w-full h-full"
              >
                <SafeImage
                  src={ev.image}
                  alt={ev.imageAlt}
                  title={isBn ? ev.titleBn : ev.title}
                  className={`w-full h-full object-cover ${ev.imagePosition || 'object-center'} select-none pointer-events-none`}
                  loading="eager"
                />
              </motion.div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                aria-label={isBn ? 'পূর্ববর্তী অনুষ্ঠান' : 'Previous ceremony'}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1D1517]/65 hover:bg-[#7D0F1E] text-[#FDF9F1] border border-[#E6C77E]/45 backdrop-blur-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                aria-label={isBn ? 'পরবর্তী অনুষ্ঠান' : 'Next ceremony'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1D1517]/65 hover:bg-[#7D0F1E] text-[#FDF9F1] border border-[#E6C77E]/45 backdrop-blur-xs transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Right / Bottom: Crisp, Tightly Spaced Ceremony Details */}
            <div className="lg:col-span-6 px-4 py-4 sm:p-7 lg:p-8 flex flex-col justify-between gap-3.5">
              <div>
                <p className="text-[11px] sm:text-xs font-semibold text-[#B08434] tabular-nums">
                  {counterText}
                </p>

                <h3 className="mt-1 font-serif text-xl sm:text-3xl font-semibold text-[#1D1517] leading-snug">
                  {isBn ? ev.titleBn : ev.title}
                </h3>

                <p className="mt-1.5 text-[13.5px] sm:text-[15px] text-[#4D3F43] leading-[1.6]">
                  {isBn ? ev.descriptionBn : ev.description}
                </p>

                {/* Tight Structured Date, Time & Venue Details */}
                <div className="mt-3.5 pt-3 border-t border-[#E6DAC7] space-y-2 text-[13px] sm:text-sm">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                    <div className="inline-flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#7D0F1E] shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-[#7D0F1E] tabular-nums">
                        {isBn ? ev.dateBn : ev.date}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#7D0F1E] shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-[#1D1517] tabular-nums">
                        {isBn ? ev.timeBn : ev.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#7D0F1E] mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-[#4D3F43]">{isBn ? ev.locationBn : ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#E6DAC7] flex items-center gap-2 text-xs sm:text-sm text-[#4D3F43]">
                <Sparkles className="w-3.5 h-3.5 text-[#B08434] shrink-0" aria-hidden="true" />
                <span>
                  {isBn ? 'পোশাক: ' : 'Dress Code: '}
                  <strong className="font-semibold text-[#1D1517]">
                    {isBn ? ev.attireBn : ev.attire}
                  </strong>
                </span>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </motion.div>

      {/* Bottom Progress Dots */}
      <motion.div variants={staggerItem} className="mt-3.5 flex items-center justify-center gap-2">
        {events.map((item, idx) => (
          <button
            key={item.index}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={isBn ? item.titleBn : item.title}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === activeIndex ? 'w-7 bg-[#7D0F1E]' : 'w-2 bg-[#D4C2A3] hover:bg-[#B08434]'
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
