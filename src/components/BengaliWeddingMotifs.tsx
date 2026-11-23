import { motion } from 'motion/react';

/**
 * Traditional Bengali Wedding Sanai (Shehnai) & Dhol / Naqqara Instrument Emblem
 * Inspired by classic Biye Bari musical motifs, rendered in royal champagne gold & crimson.
 */
export function BengaliSanaiDholEmblem({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <svg
        width="176"
        height="136"
        viewBox="0 0 176 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.38)]"
      >
        <defs>
          <linearGradient id="sanaiGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2C6" />
            <stop offset="48%" stopColor="#E6C26B" />
            <stop offset="100%" stopColor="#A97926" />
          </linearGradient>
          <linearGradient id="dholBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D69C43" />
            <stop offset="55%" stopColor="#9A531E" />
            <stop offset="100%" stopColor="#5C2311" />
          </linearGradient>
          <linearGradient id="drumSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7DE" />
            <stop offset="100%" stopColor="#E6CC94" />
          </linearGradient>
        </defs>

        {/* Soft Ambient Golden Musical Halo */}
        <circle cx="88" cy="68" r="56" stroke="#F0D48C" strokeOpacity="0.24" strokeWidth="1" strokeDasharray="3 4" />

        {/* Left Curved Brass Surna / Shehnai Horn */}
        <path
          d="M52 24C36 30 28 52 38 72C46 88 64 90 78 82"
          stroke="url(#sanaiGold)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M44 18L64 31L54 44L36 30Z"
          fill="url(#sanaiGold)"
          stroke="#FFF3CA"
          strokeWidth="1"
        />
        <ellipse cx="49" cy="25" rx="13" ry="6" transform="rotate(34 49 25)" fill="#5C131C" stroke="#FFF2C6" strokeWidth="1.2" />

        {/* Center Crossed Twin Bengali Sanai (Shehnai) Pipes */}
        <g transform="rotate(-18 82 64)">
          <path d="M74 26L86 26L82 108L78 108Z" fill="url(#sanaiGold)" stroke="#FFF2C6" strokeWidth="0.9" />
          <path d="M68 20C74 23 86 23 92 20L87 30H73L68 20Z" fill="url(#sanaiGold)" stroke="#FFF4CE" strokeWidth="1" />
          <circle cx="80" cy="48" r="1.8" fill="#520813" />
          <circle cx="80" cy="56" r="1.8" fill="#520813" />
          <circle cx="80" cy="64" r="1.8" fill="#520813" />
          <circle cx="80" cy="72" r="1.8" fill="#520813" />
          <circle cx="80" cy="80" r="1.8" fill="#520813" />
        </g>

        <g transform="rotate(14 96 64)">
          <path d="M90 22L102 22L98 112L94 112Z" fill="url(#sanaiGold)" stroke="#FFF2C6" strokeWidth="0.9" />
          <path d="M84 15C90 19 102 19 108 15L103 26H89L84 15Z" fill="url(#sanaiGold)" stroke="#FFF4CE" strokeWidth="1" />
          <circle cx="96" cy="44" r="1.8" fill="#520813" />
          <circle cx="96" cy="52" r="1.8" fill="#520813" />
          <circle cx="96" cy="60" r="1.8" fill="#520813" />
          <circle cx="96" cy="68" r="1.8" fill="#520813" />
          <circle cx="96" cy="76" r="1.8" fill="#520813" />
        </g>

        {/* Left Wedding Naqqara / Dhol Kettle Drum */}
        <g transform="rotate(20 56 96)">
          <path
            d="M28 84C28 110 42 122 56 122C70 122 84 110 84 84Z"
            fill="url(#dholBody)"
            stroke="#F4DC9B"
            strokeWidth="1.2"
          />
          <path
            d="M32 96L40 106L48 96L56 106L64 96L72 106L80 96"
            stroke="#F4DC9B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="56" cy="84" rx="28" ry="9" fill="url(#drumSkin)" stroke="#F4DC9B" strokeWidth="1.4" />
          <ellipse cx="56" cy="84" rx="12" ry="4" fill="#520813" fillOpacity="0.82" />
        </g>

        {/* Right Wedding Naqqara / Dhol Kettle Drum */}
        <g transform="rotate(-22 122 92)">
          <path
            d="M96 80C96 105 109 116 122 116C135 116 148 105 148 80Z"
            fill="url(#dholBody)"
            stroke="#F4DC9B"
            strokeWidth="1.2"
          />
          <path
            d="M100 92L108 101L115 92L122 101L129 92L136 101L144 92"
            stroke="#F4DC9B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="122" cy="80" rx="26" ry="8.5" fill="url(#drumSkin)" stroke="#F4DC9B" strokeWidth="1.4" />
          <ellipse cx="122" cy="80" rx="11" ry="3.6" fill="#520813" fillOpacity="0.82" />
        </g>

        {/* Subtle Floating Musical Sparkles */}
        <circle cx="24" cy="40" r="2.2" fill="#FFF1C2" />
        <circle cx="150" cy="36" r="2.5" fill="#F4DE9D" />
        <path d="M138 22L140 27L145 29L140 31L138 36L136 31L131 29L136 27L138 22Z" fill="#FFF1C2" />
      </svg>
    </motion.div>
  );
}

/**
 * Traditional Bengali Marriage Heritage Emblem:
 * Groom's Shola Topor (টোপর) + Bride's Shola Mukut (মুকুট) + Sindoor Gachhkouto (গাছকৌটো)
 */
export function BengaliToporMukutEmblem({
  className = '',
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const goldStroke = light ? '#F4DE9D' : '#B08434';
  const ivoryFill = light ? '#FFF9ED' : '#FAF3E6';
  const crimsonAccent = light ? '#F2D58C' : '#7D0F1E';

  return (
    <svg
      width="186"
      height="104"
      viewBox="0 0 186 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Left: Groom's Traditional Tiered Shola Topor (টোপর) */}
      <g transform="translate(8, 4) rotate(-8 38 48)">
        {/* Top curved shola plume */}
        <path
          d="M38 4C43 2 47 6 44 12C41 16 38 18 38 20"
          stroke={goldStroke}
          strokeWidth="1.5"
          fill={ivoryFill}
        />
        {/* Tiered shola dome */}
        <path d="M32 22C32 18 44 18 44 22L47 32H29L32 22Z" fill={ivoryFill} stroke={goldStroke} strokeWidth="1.2" />
        <path d="M25 32H51L55 44H21L25 32Z" fill={ivoryFill} stroke={goldStroke} strokeWidth="1.2" />
        <path d="M18 44H58L63 58H13L18 44Z" fill={ivoryFill} stroke={goldStroke} strokeWidth="1.2" />
        <path d="M11 58H65L70 74H6L11 58Z" fill={ivoryFill} stroke={goldStroke} strokeWidth="1.3" />
        {/* Gold & Crimson decorative band on Topor */}
        <line x1="21" y1="44" x2="55" y2="44" stroke={crimsonAccent} strokeWidth="1.6" />
        <line x1="13" y1="58" x2="63" y2="58" stroke={crimsonAccent} strokeWidth="1.8" />
        <circle cx="38" cy="51" r="2.8" fill={crimsonAccent} />
        <circle cx="26" cy="66" r="2.4" fill={goldStroke} />
        <circle cx="38" cy="66" r="3" fill={crimsonAccent} />
        <circle cx="50" cy="66" r="2.4" fill={goldStroke} />
        {/* Hanging Shola Pom-Poms (Jhumko) */}
        <line x1="12" y1="74" x2="8" y2="85" stroke={goldStroke} strokeWidth="1" />
        <circle cx="8" cy="87" r="4.5" fill={ivoryFill} stroke={goldStroke} strokeWidth="1" />
        <line x1="64" y1="74" x2="68" y2="85" stroke={goldStroke} strokeWidth="1" />
        <circle cx="68" cy="87" r="4.5" fill={ivoryFill} stroke={goldStroke} strokeWidth="1" />
      </g>

      {/* Center: Auspicious Sindoor Gachhkouto (গাছকৌটো) */}
      <g transform="translate(76, 36)">
        <ellipse cx="17" cy="54" rx="12" ry="3.5" fill={crimsonAccent} fillOpacity="0.25" />
        <path
          d="M17 4C20 4 21 8 19 12L23 18C25 22 25 28 28 36C30 43 26 52 17 52C8 52 4 43 6 36C9 28 9 22 11 18L15 12C13 8 14 4 17 4Z"
          fill="#8A1021"
          stroke={goldStroke}
          strokeWidth="1.3"
        />
        <line x1="8" y1="36" x2="26" y2="36" stroke="#F4DE9D" strokeWidth="1.4" />
        <line x1="7" y1="44" x2="27" y2="44" stroke="#F4DE9D" strokeWidth="1.2" />
        <circle cx="17" cy="40" r="2" fill="#FFF2C6" />
        <circle cx="12" cy="40" r="1.3" fill="#FFF2C6" />
        <circle cx="22" cy="40" r="1.3" fill="#FFF2C6" />
      </g>

      {/* Right: Bride's Traditional Scalloped Shola Mukut (মুকুট) */}
      <g transform="translate(106, 16) rotate(8 36 42)">
        {/* Peacock / Kalka Crest at Top of Mukut */}
        <path
          d="M36 10C41 4 48 8 46 16C44 22 39 24 36 28C33 24 28 22 26 16C24 8 31 4 36 10Z"
          fill={ivoryFill}
          stroke={goldStroke}
          strokeWidth="1.3"
        />
        <circle cx="36" cy="16" r="2.6" fill={crimsonAccent} />
        {/* Scalloped Arched Bridal Crown Band */}
        <path
          d="M10 64C10 38 22 24 36 24C50 24 62 38 62 64C54 50 46 42 36 42C26 42 18 50 10 64Z"
          fill={ivoryFill}
          stroke={goldStroke}
          strokeWidth="1.4"
        />
        {/* Decorative Gold & Pearl Dots along the Mukut Arch */}
        <circle cx="18" cy="45" r="2.2" fill={goldStroke} />
        <circle cx="25" cy="34" r="2.4" fill={crimsonAccent} />
        <circle cx="36" cy="31" r="2.8" fill={goldStroke} />
        <circle cx="47" cy="34" r="2.4" fill={crimsonAccent} />
        <circle cx="54" cy="45" r="2.2" fill={goldStroke} />
        {/* Delicate Side Ribbon Ties */}
        <path d="M12 64C9 72 13 78 10 84" stroke={goldStroke} strokeWidth="1" strokeLinecap="round" />
        <path d="M60 64C63 72 59 78 62 84" stroke={goldStroke} strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Iconic Bengali "শুভ বিবাহ" Ornate Golden Circular Mandala Medallion
 * Inspired by Reference Image 3: intricate circular golden filigree mandala
 * framing bold gold-embossed stacked "শুভ / বিবাহ" typography.
 */
export function ShubhoBibahoMedallion({
  isBn,
  className = '',
}: {
  isBn: boolean;
  className?: string;
}) {
  const petalAngles = Array.from({ length: 24 }, (_, idx) => idx * 15);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-flex items-center justify-center w-[210px] h-[210px] sm:w-[248px] sm:h-[248px] ${className}`}
    >
      {/* Ornate Rotating Subtle Golden Mandala Ring */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full drop-shadow-[0_12px_30px_rgba(24,2,6,0.5)]"
      >
        <defs>
          <linearGradient id="mandalaRingGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF4CE" />
            <stop offset="45%" stopColor="#E7C46E" />
            <stop offset="100%" stopColor="#B2822C" />
          </linearGradient>
          <radialGradient id="medallionCrimson" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#A9162B" />
            <stop offset="68%" stopColor="#7A0B1B" />
            <stop offset="100%" stopColor="#4C0610" />
          </radialGradient>
        </defs>

        {/* Outer Scalloped Lotus-Sun Crown Petals */}
        <g>
          {petalAngles.map((deg) => (
            <g key={deg} transform={`rotate(${deg} 120 120)`}>
              <path
                d="M120 8C124 18 128 24 126 32H114C112 24 116 18 120 8Z"
                fill="url(#mandalaRingGold)"
                fillOpacity="0.92"
              />
              <circle cx="120" cy="23" r="2.2" fill="#5D0814" />
            </g>
          ))}
        </g>

        {/* Secondary Ornamental Gold Filigree Ring */}
        <circle cx="120" cy="120" r="90" fill="url(#mandalaRingGold)" />
        <circle cx="120" cy="120" r="84" fill="url(#medallionCrimson)" stroke="#FFF0BE" strokeWidth="1.5" />
        <circle
          cx="120"
          cy="120"
          r="76"
          stroke="#F4DE9D"
          strokeOpacity="0.65"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Stacked Bold Gold-Embossed "শুভ বিবাহ" Calligraphy */}
      <div className="relative z-10 text-center leading-none select-none px-4">
        {isBn ? (
          <div className="flex flex-col items-center">
            <span className="font-serif text-[2.35rem] sm:text-[2.8rem] font-bold gold-foil-text drop-shadow-[0_4px_10px_rgba(32,2,8,0.65)] tracking-tight leading-[1.08]">
              শুভ
            </span>
            <span className="font-serif text-[2.55rem] sm:text-[3.1rem] font-bold gold-foil-text drop-shadow-[0_4px_10px_rgba(32,2,8,0.65)] tracking-tight leading-[1.05] -mt-1">
              বিবাহ
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-4xl font-bold gold-foil-text drop-shadow-[0_4px_10px_rgba(32,2,8,0.65)] tracking-wide leading-tight">
              Shubho
            </span>
            <span className="font-serif text-3xl sm:text-4xl font-bold gold-foil-text drop-shadow-[0_4px_10px_rgba(32,2,8,0.65)] tracking-wide leading-tight -mt-0.5">
              Bibaho
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
