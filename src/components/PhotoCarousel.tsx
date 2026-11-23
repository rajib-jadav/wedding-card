import { useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryPhoto, Language } from '../types/wedding';
import {
  LUXURY_EASE,
  VIEWPORT_ONCE,
  cardReveal,
  staggerContainer,
  staggerItem,
} from '../utils/motionVariants';
import { SafeImage } from './SafeImage';

interface PhotoCarouselProps {
  photos: GalleryPhoto[];
  lang: Language;
  onOpenLightbox: (index: number) => void;
}

export function PhotoCarousel({ photos, lang, onOpenLightbox }: PhotoCarouselProps) {
  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
  const isBn = lang === 'bn';

  const paginate = (newDirection: number) => {
    const nextIndex = (activeIndex + newDirection + photos.length) % photos.length;
    setSlide([nextIndex, newDirection]);
  };

  const goToIndex = (index: number) => {
    if (index === activeIndex) return;
    setSlide([index, index > activeIndex ? 1 : -1]);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -300) {
      paginate(1);
    } else if (info.offset.x > 50 || info.velocity.x > 300) {
      paginate(-1);
    }
  };

  const currentPhoto = photos[activeIndex];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="mt-8 sm:mt-10"
    >
      <motion.div
        variants={cardReveal}
        className="relative rounded-2xl overflow-hidden border border-[#E0D7CB] bg-[#EAE3DA] shadow-[0_14px_38px_rgba(30,25,27,0.08)]"
      >
        <div className="relative h-[400px] sm:h-[500px] lg:h-[550px] w-full overflow-hidden touch-pan-y">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentPhoto.id}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 70 : -70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -70 : 70 }}
              transition={{ duration: 0.78, ease: LUXURY_EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <SafeImage
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                title={isBn ? currentPhoto.titleBn : currentPhoto.title}
                className={`w-full h-full object-cover ${currentPhoto.imagePosition || 'object-center'} select-none pointer-events-none`}
                loading="eager"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#161012]/88 via-[#161012]/42 to-transparent px-5 sm:px-10 pb-6 sm:pb-8 pt-20 text-[#FCFBF8]">
                <p className="text-xs text-[#EBD191] font-medium tabular-nums">
                  {isBn ? currentPhoto.momentTagBn : currentPhoto.momentTag}
                </p>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                      {isBn ? currentPhoto.titleBn : currentPhoto.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#ECE4DC] max-w-xl leading-relaxed">
                      {isBn ? currentPhoto.captionBn : currentPhoto.caption}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenLightbox(activeIndex)}
                    className="self-start sm:self-end inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-md bg-white/15 hover:bg-white/25 backdrop-blur-sm text-xs font-semibold text-[#FCFBF8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isBn ? 'বড় করে দেখুন' : 'View Full Photo'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label={isBn ? 'পূর্ববর্তী ছবি' : 'Previous couple photograph'}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1E191B]/60 hover:bg-[#6B1D34] text-[#FCFBF8] border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label={isBn ? 'পরবর্তী ছবি' : 'Next couple photograph'}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1E191B]/60 hover:bg-[#6B1D34] text-[#FCFBF8] border border-white/20 backdrop-blur-xs transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>

      {/* Thumbnail Strip */}
      <motion.div
        variants={staggerItem}
        className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full sm:w-auto sm:max-w-lg">
          {photos.map((photo, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => goToIndex(index)}
                aria-label={isBn ? photo.titleBn : photo.title}
                aria-current={isActive ? 'true' : undefined}
                className={`relative rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border-[#6B1D34] opacity-100 scale-[1.02]'
                    : 'border-transparent opacity-65 hover:opacity-95'
                }`}
              >
                <SafeImage
                  src={photo.src}
                  alt={isBn ? photo.titleBn : photo.title}
                  className={`w-full h-full object-cover ${photo.imagePosition || 'object-center'}`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-[#4A4044] tabular-nums">
          <span>
            {isBn
              ? `${String(activeIndex + 1).padStart(2, '0').replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])} / ${String(photos.length).padStart(2, '0').replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])}`
              : `${String(activeIndex + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
