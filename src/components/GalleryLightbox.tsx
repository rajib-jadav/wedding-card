import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryPhoto, Language } from '../types/wedding';
import { SafeImage } from './SafeImage';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  lang: Language;
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function GalleryLightbox({
  photos,
  lang,
  activeIndex,
  onClose,
  onChangeIndex,
}: GalleryLightboxProps) {
  const isBn = lang === 'bn';

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % photos.length);
      } else if (event.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, photos.length, onClose, onChangeIndex]);

  if (activeIndex === null) return null;
  const activePhoto = photos[activeIndex];
  if (!activePhoto) return null;

  const title = isBn ? activePhoto.titleBn : activePhoto.title;
  const caption = isBn ? activePhoto.captionBn : activePhoto.caption;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 bg-[#141012]/94 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto text-[#FCFBF8]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs sm:text-sm text-[#DDD3C5] tabular-nums">
          {activeIndex + 1} / {photos.length} · {title}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={isBn ? 'বন্ধ করুন' : 'Close photo viewer'}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-[#FCFBF8] hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex-1 flex items-center justify-center my-4 max-w-5xl w-full mx-auto min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onChangeIndex((activeIndex - 1 + photos.length) % photos.length)}
          aria-label={isBn ? 'পূর্ববর্তী ছবি' : 'Previous photograph'}
          className="absolute left-0 sm:-left-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1E191B]/80 border border-white/15 text-[#FCFBF8] hover:bg-[#6B1D34] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="max-h-[72vh] max-w-full overflow-hidden rounded-lg border border-white/10 bg-[#1E191B]">
          <SafeImage
            src={activePhoto.src}
            alt={activePhoto.alt}
            title={title}
            className="max-h-[72vh] w-auto object-contain"
            loading="eager"
          />
        </div>

        <button
          type="button"
          onClick={() => onChangeIndex((activeIndex + 1) % photos.length)}
          aria-label={isBn ? 'পরবর্তী ছবি' : 'Next photograph'}
          className="absolute right-0 sm:-right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1E191B]/80 border border-white/15 text-[#FCFBF8] hover:bg-[#6B1D34] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="max-w-2xl w-full mx-auto text-center text-[#FCFBF8]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-2xl font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-[#D6CEC5]">{caption}</p>
      </div>
    </div>
  );
}
