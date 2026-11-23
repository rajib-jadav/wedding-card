/**
 * Pure Royal Golden Geometric & Architectural Wedding Ornaments (zero floral images or flower graphics)
 */

export function BotanicalDivider({
  className = '',
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const lineColor = light ? 'bg-[#E6C77E]/50' : 'bg-[#D6C3A3]';
  const iconColor = light ? 'text-[#F1D58F]' : 'text-[#B08434]';

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className={`h-px flex-1 max-w-[110px] ${lineColor}`} />
      <svg
        width="48"
        height="18"
        viewBox="0 0 48 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconColor} shrink-0`}
      >
        <path
          d="M24 2L31 9L24 16L17 9L24 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <rect
          x="22.4"
          y="7.4"
          width="3.2"
          height="3.2"
          transform="rotate(45 24 9)"
          fill="currentColor"
        />
        <path
          d="M2 9H14M34 9H46"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="8" cy="9" r="1.5" fill="currentColor" />
        <circle cx="40" cy="9" r="1.5" fill="currentColor" />
      </svg>
      <span className={`h-px flex-1 max-w-[110px] ${lineColor}`} />
    </div>
  );
}

/**
 * Architectural Royal Golden Geometric Corner Filigree (no flowers/leaves)
 */
export function BotanicalCorner({
  position,
  className = '',
  light = false,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  light?: boolean;
}) {
  const rotation: Record<typeof position, string> = {
    'top-left': 'rotate-0',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  };

  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none ${
        light ? 'text-[#F0D48C]/75' : 'text-[#B08434]/70'
      } ${rotation[position]} ${className}`}
    >
      {/* Crisp double royal architectural corner border */}
      <path d="M2 62V12C2 6.47715 6.47715 2 12 2H62" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 48V14C8 10.6863 10.6863 8 14 8H48"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.7"
      />
      {/* Geometric royal diamond jewel stud */}
      <path
        d="M17 11L23 17L17 23L11 17L17 11Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.22"
      />
      <circle cx="17" cy="17" r="1.8" fill="currentColor" />
      <path d="M26 17H38M17 26V38" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
      <circle cx="42" cy="17" r="1.3" fill="currentColor" />
      <circle cx="17" cy="42" r="1.3" fill="currentColor" />
    </svg>
  );
}

/**
 * Auspicious Minimal Gold Ganesh Calligraphic Crest
 */
export function AuspiciousGaneshCrest({
  className = '',
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${light ? 'text-[#F2D58C]' : 'text-[#9F7226]'} ${className}`}
    >
      <path
        d="M27 11C29.5 7 34.5 7 37 11M29 14.5H35"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 22C24 18 39 17 44 22C47 25 46 31 40 32C35 33 31 32 31 37C31 42 36 45 41 44C44.2 43.3 46 41 45 38.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 24C16 25 14 31 18 35C21 38 25 36 25 32"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M17 48C22 52 27 54 32 54C37 54 42 52 47 48"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="24" r="1.6" fill="currentColor" />
      <circle cx="24" cy="49" r="1.4" fill="currentColor" />
      <circle cx="40" cy="49" r="1.4" fill="currentColor" />
    </svg>
  );
}

/**
 * Royal Geometric Gold Mandala-Arc Corner Accent (replaces floral spray with pure gold pattern)
 */
export function GoldFloralLineSpray({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      width="210"
      height="150"
      viewBox="0 0 210 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none text-[#E8C56E]/55 ${flip ? 'scale-[-1]' : ''} ${className}`}
    >
      {/* Concentric Royal Gold Arch Curves */}
      <path
        d="M210 0C160 8 118 34 86 72"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M210 18C170 26 138 50 116 86"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeDasharray="4 4"
      />
      <path
        d="M210 40C180 48 158 72 146 112"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Royal Diamond Medallions along the arc */}
      <path
        d="M172 20L180 28L172 36L164 28L172 20Z"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <path
        d="M142 44L148 50L142 56L136 50L142 44Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <path
        d="M178 66L184 72L178 78L172 72L178 66Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <circle cx="116" cy="64" r="2.2" fill="currentColor" />
      <circle cx="94" cy="78" r="1.7" fill="currentColor" />
      <circle cx="154" cy="96" r="1.9" fill="currentColor" />
      <circle cx="192" cy="108" r="1.6" fill="currentColor" />
    </svg>
  );
}
