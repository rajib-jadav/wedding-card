import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';
import { Language, WeddingDetails, buildGoogleMapsUrl } from '../types/wedding';

interface VenueMapCardProps {
  details: WeddingDetails;
  lang: Language;
}

export function VenueMapCard({ details, lang }: VenueMapCardProps) {
  const mapsUrl = buildGoogleMapsUrl(details);
  const isBn = lang === 'bn';

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        isBn
          ? `${details.venueNameBn}-এর গুগল ম্যাপ লোকেশন খুলুন`
          : `Open directions to ${details.venueName} in Google Maps`
      }
      className="group block rounded-2xl overflow-hidden border border-[#E0D7CB] bg-[#F7F3EC] transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(30,25,27,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B1D34]"
    >
      {/* Bespoke Interactive Architectural Map Surface */}
      <div className="relative h-[300px] sm:h-[360px] w-full overflow-hidden bg-[#EFE9DF]">
        <svg
          viewBox="0 0 640 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        >
          <rect width="640" height="380" fill="#F2ECE2" />

          <path d="M24 30H188V132H48L24 104V30Z" fill="#DFEAE0" />
          <path d="M446 220H618V354H468L446 312V220Z" fill="#DFEAE0" />
          <rect
            x="234"
            y="138"
            width="172"
            height="104"
            rx="10"
            fill="#E7DFD3"
            stroke="#D7CBB9"
            strokeWidth="1.5"
          />
          <rect
            x="260"
            y="160"
            width="120"
            height="60"
            rx="6"
            fill="#F9F6F0"
            stroke="#CBBBA4"
            strokeWidth="1"
          />

          <path d="M0 78H640" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M0 292H640" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M126 0V380" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M518 0V380" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M214 0V380" stroke="#FAF8F4" strokeWidth="5" />
          <path d="M426 0V380" stroke="#FAF8F4" strokeWidth="5" />

          <path
            d="M-10 198C128 190 218 124 320 124C422 124 510 176 650 164"
            stroke="#FFFFFF"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M-10 198C128 190 218 124 320 124C422 124 510 176 650 164"
            stroke="#DFD5C7"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          <path
            d="M72 292L126 292L126 196C188 188 232 146 320 146L320 184"
            stroke="#6B1D34"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 5"
          />

          <g transform="translate(576 52)" opacity="0.7">
            <circle
              cx="0"
              cy="0"
              r="20"
              stroke="#9A7438"
              strokeWidth="1"
              fill="#FAF8F4"
              fillOpacity="0.88"
            />
            <path d="M0 -13L3.2 0L0 13L-3.2 0L0 -13Z" fill="#6B1D34" />
            <path d="M-13 0L0 -3.2L13 0L0 3.2L-13 0Z" fill="#9A7438" fillOpacity="0.45" />
          </g>

          <text x="40" y="68" fill="#5D5256" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Madhyamgram Station
          </text>
          <text x="456" y="256" fill="#5D5256" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Baropol Shiv Mandir
          </text>
          <text x="32" y="186" fill="#6B6064" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
            Rajarhat · Barasat Rd
          </text>
        </svg>

        {/* Centered Interactive Venue Pin */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="flex flex-col items-center transition-transform duration-300 ease-out group-hover:-translate-y-1.5">
            <div className="bg-[#FCFBF8] border border-[#DDD3C5] rounded-lg px-4 py-2.5 shadow-[0_8px_24px_rgba(30,25,27,0.12)] text-center max-w-[280px]">
              <p className="font-serif text-base font-semibold text-[#1B1618] leading-snug truncate">
                {isBn ? details.venueNameBn : details.venueName}
              </p>
              <p className="text-xs text-[#4A4044] tabular-nums mt-0.5">{details.coordinates}</p>
            </div>
            <div className="mt-2 w-11 h-11 rounded-full bg-[#6B1D34] text-[#FCFBF8] flex items-center justify-center shadow-[0_8px_20px_rgba(107,29,52,0.38)] border-2 border-[#FCFBF8]">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="w-4 h-1.5 rounded-full bg-[#1B1618]/20 mt-1" />
          </div>
        </div>
      </div>

      {/* Bottom Interactive Google Maps Footer Strip */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 bg-[#FCFBF8] border-t border-[#E4DDD4]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 rounded-full bg-[#6B1D34]/10 text-[#6B1D34] flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1B1618] truncate">
              {isBn ? 'গুগল ম্যাপে দিকনির্দেশ দেখতে ট্যাপ করুন' : 'Tap map for Google Maps directions'}
            </p>
            <p className="text-xs text-[#4A4044] truncate">
              {isBn ? 'বড়পোল শিব মন্দির, মধ্যমগ্রাম' : 'Baropol Shiv Mandir, Madhyamgram'}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B1D34] whitespace-nowrap shrink-0 group-hover:underline">
          <span>{isBn ? 'ম্যাপ' : 'Open'}</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
