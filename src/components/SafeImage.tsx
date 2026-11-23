import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  title,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4EFE8] via-[#FAF7F2] to-[#EDE4D8] text-[#5B4F53]"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#9A7438]"
        >
          <path
            d="M18 5C15.5 10.5 11.5 14.5 6 18C11.5 21.5 15.5 25.5 18 31C20.5 25.5 24.5 21.5 30 18C24.5 14.5 20.5 10.5 18 5Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="18" cy="18" r="2.5" fill="currentColor" fillOpacity="0.35" />
        </svg>
        <p className="font-serif text-lg text-[#1E191B]">{title || 'Wedding Keepsake'}</p>
        <p className="mt-1 text-xs text-[#5B4F53] max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
