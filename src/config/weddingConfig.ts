/**
 * ============================================================================
 * CENTRAL WEDDING CARD CONFIGURATION
 * ============================================================================
 * Replace any photograph, couple name, parent name, ceremony date/time, or
 * Google Maps URL here in ONE place and export immediately!
 * ============================================================================
 */

import { WEDDING_PHOTOS } from './weddingPhotos';

export { WEDDING_PHOTOS };

export type Language = 'en' | 'bn';

export interface WeddingDetails {
  groomName: string;
  groomBengali: string;
  brideName: string;
  brideBengali: string;
  groomFather: string;
  groomFatherBn: string;
  groomMother: string;
  groomMotherBn: string;
  groomBrother: string;
  groomBrotherBn: string;
  groomSisterInLaw: string;
  groomSisterInLawBn: string;
  groomNiece: string;
  groomNieceBn: string;
  groomResidence: string;
  groomResidenceBn: string;
  brideFather: string;
  brideFatherBn: string;
  brideMother: string;
  brideMotherBn: string;
  brideBrother: string;
  brideBrotherBn: string;
  brideResidence: string;
  brideResidenceBn: string;
  weddingDateISO: string;
  weddingDateDisplay: string;
  weddingDateDisplayBn: string;
  weddingBengaliDate: string;
  weddingDay: string;
  weddingDayBn: string;
  receptionDateDisplay: string;
  receptionDateDisplayBn: string;
  receptionBengaliDate: string;
  receptionDay: string;
  receptionDayBn: string;
  ceremonyTime: string;
  ceremonyTimeBn: string;
  dinnerTime: string;
  dinnerTimeBn: string;
  muhuratTime: string;
  muhuratTimeBn: string;
  venueName: string;
  venueNameBn: string;
  venueAddress: string;
  venueAddressBn: string;
  venueCity: string;
  venueCityBn: string;
  mapsUrl: string;
  coordinates: string;
  contactPhone: string;
  secondaryPhone: string;
  routeGuide: string;
  routeGuideBn: string;
  blessingQuote: string;
  blessingQuoteBn: string;
  formalNote: string;
  formalNoteBn: string;
}

export const DEFAULT_WEDDING_DETAILS: WeddingDetails = {
  groomName: 'Surojit Roy Chowdhury',
  groomBengali: 'সুরজিৎ রায় চৌধুরী',
  brideName: 'Ritwika Mondal',
  brideBengali: 'ঋত্বিকা মণ্ডল',

  groomFather: 'Shri Ranjit Roy Chowdhury',
  groomFatherBn: 'শ্রীযুক্ত রঞ্জিত রায় চৌধুরী',
  groomMother: 'Late Rita Roy Chowdhury',
  groomMotherBn: 'স্বর্গীয়া রীতা রায় চৌধুরী',
  groomBrother: 'Shri Subhajit Roy Chowdhury',
  groomBrotherBn: 'শ্রী শুভজিৎ রায় চৌধুরী',
  groomSisterInLaw: 'Smt. Puja Roy Chowdhury',
  groomSisterInLawBn: 'শ্রীমতী পূজা রায় চৌধুরী',
  groomNiece: 'Aradhya Roy Chowdhury',
  groomNieceBn: 'আরাধ্যা রায় চৌধুরী',
  groomResidence: 'Village – Baropol, Madhyamgram, North 24 Parganas',
  groomResidenceBn: 'গ্রাম – বড়পোল, মধ্যমগ্রাম, উত্তর ২৪ পরগণা',

  brideFather: 'Shri Biswajit Mondal',
  brideFatherBn: 'শ্রীযুক্ত বিশ্বজিৎ মণ্ডল',
  brideMother: 'Smt. Sarika Mondal',
  brideMotherBn: 'শ্রীমতী সারিকা মণ্ডল',
  brideBrother: 'Shri Aritra Mondal',
  brideBrotherBn: 'শ্রী অরিত্র মণ্ডল',
  brideResidence: 'Jyotirnagar, Kolkata – 700149',
  brideResidenceBn: 'জ্যোতির্নগর, কলকাতা – ৭০০১৪৯',

  weddingDateISO: '2026-12-13',
  weddingDateDisplay: '13 December 2026',
  weddingDateDisplayBn: '১৩ই ডিসেম্বর ২০২৬',
  weddingBengaliDate: '২৬শে অগ্রহায়ণ ১৪৩৩',
  weddingDay: 'Sunday',
  weddingDayBn: 'রবিবার',

  receptionDateDisplay: '15 December 2026',
  receptionDateDisplayBn: '১৫ই ডিসেম্বর ২০২৬',
  receptionBengaliDate: '২৮শে অগ্রহায়ণ ১৪৩৩',
  receptionDay: 'Tuesday',
  receptionDayBn: 'মঙ্গলবার',

  ceremonyTime: '7:00 PM onwards',
  ceremonyTimeBn: 'সন্ধ্যা ৭:০০ টা হইতে',
  dinnerTime: '8:00 PM onwards',
  dinnerTimeBn: 'রাত ৮:০০ টা হইতে',
  muhuratTime: 'Shubho Bibaho · Auspicious Evening',
  muhuratTimeBn: 'শুভবিবাহ · শুভ সন্ধ্যা লগ্ন',

  venueName: 'Roy Chowdhury Residence, Baropol',
  venueNameBn: 'নিজ বাসভবন, বড়পোল, মধ্যমগ্রাম',
  venueAddress: 'Baropol (Near Baropol Shiv Mandir), Madhyamgram, North 24 Parganas, West Bengal',
  venueAddressBn: 'বড়পোল (বড়পোল শিব মন্দির সংলগ্ন), মধ্যমগ্রাম, উত্তর ২৪ পরগণা, পশ্চিমবঙ্গ',
  venueCity: 'Madhyamgram, North 24 Parganas',
  venueCityBn: 'মধ্যমগ্রাম, উত্তর ২৪ পরগণা',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Baropol+Shiv+Mandir+Madhyamgram+North+24+Parganas+West+Bengal',
  coordinates: '22.6952° N, 88.4586° E',

  contactPhone: '+91 82769 83455',
  secondaryPhone: '+91 82760 54971',

  routeGuide:
    'By Bus: Take 211 / 211A / 211B from Ultadanga, or 81 / 81A / 45 from Shyambazar towards Rajarhat / Barasat. By Train: Board a Sealdah Main Line local to Hridaypur or Madhyamgram Station, then take an auto directly to Baropol Shiv Mandir.',
  routeGuideBn:
    'বাসপথে: উল্টোডাঙ্গা হইতে ২১১ / ২১১এ / ২১১বি অথবা শ্যামবাজার হইতে ৮১ / ৮১এ / ৪৫ বাসে রাজারহাট / বারাসাত। রেলপথে: শিয়ালদহ মেইন লাইনে হৃদয়পুর অথবা মধ্যমগ্রাম স্টেশনে নামিয়া অটোতে বড়পোল শিব মন্দির।',

  blessingQuote:
    'We request your gracious presence to bless the couple on their special day.',
  blessingQuoteBn:
    'নবদম্পতিকে আশীর্বাদ প্রদান করিয়া আমাদের এই শুভ উৎসবকে সার্থক করিয়া তুলিতে আপনার সপরিবারে উপস্থিতি একান্ত কাম্য।',

  formalNote:
    'Respected Sir / Madam, by the grace of the Almighty and the warm blessings of our elders, the auspicious marriage of my youngest son, Surojit Roy Chowdhury, with Ritwika Mondal—beloved daughter of Shri Biswajit Mondal of Kolkata—will be solemnized on Sunday, 13 December 2026 (26th Agrahayan 1433). On this joyous occasion, we cordially request the honour of your presence with family at the Bodhuboron & Pritibhoj Reception on Tuesday, 15 December 2026 (28th Agrahayan 1433), evening onwards at our residence in Baropol, Madhyamgram. Your gracious presence and heartfelt blessings will make our celebration truly memorable.',
  formalNoteBn:
    'মহাশয় / মহাশয়া, প্রজাপতি ঋষির আশীর্বাদে আগামী ২৬শে অগ্রহায়ণ ১৪৩৩ (ইং ১৩ই ডিসেম্বর ২০২৬) রবিবার আমার কনিষ্ঠ পুত্র কল্যাণীয় সুরজিৎ রায় চৌধুরীর সহিত কলকাতা নিবাসী শ্রীযুক্ত বিশ্বজিৎ মণ্ডলের কন্যা কল্যাণীয়া ঋত্বিকা মণ্ডলের শুভবিবাহ সুসম্পন্ন হইবে। এতদুপলক্ষে আগামী ২৮শে অগ্রহায়ণ ১৪৩৩ (ইং ১৫ই ডিসেম্বর ২০২৬) মঙ্গলবার সন্ধ্যার পর আমাদের বড়পোল, মধ্যমগ্রামস্থ নিজ বাসভবনে অনুষ্ঠিত প্রীতিভোজ ও বধূবরণ অনুষ্ঠানে আপনি সপরিবারে উপস্থিত থাকিয়া নবদম্পতিকে আশীর্বাদ প্রদান করিলে বাধিত থাকিব। পত্রদ্বারা নিমন্ত্রণের ত্রুটি মার্জনীয়।',
};

export interface CeremonyEvent {
  index: string;
  shortLabel: string;
  shortLabelBn: string;
  title: string;
  titleBn: string;
  date: string;
  dateBn: string;
  bengaliDate: string;
  time: string;
  timeBn: string;
  location: string;
  locationBn: string;
  attire: string;
  attireBn: string;
  description: string;
  descriptionBn: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

/**
 * 5 Signature Wedding Ceremonies (Haldi, Mehendi, Sangeet, Wedding, Reception)
 */
export const CEREMONY_EVENTS: CeremonyEvent[] = [
  {
    index: '01',
    shortLabel: 'Haldi',
    shortLabelBn: 'গায়ে হলুদ',
    title: 'Haldi Ceremony (Gaye Holud)',
    titleBn: 'গায়ে হলুদ অনুষ্ঠান',
    date: 'Saturday, 12 December 2026',
    dateBn: 'শনিবার, ১২ই ডিসেম্বর ২০২৬',
    bengaliDate: '২৫শে অগ্রহায়ণ ১৪৩৩',
    time: '10:30 AM onwards',
    timeBn: 'সকাল ১০:৩০ হইতে',
    location: 'Courtyard, Baropol Residence',
    locationBn: 'নিজ বাসভবন প্রাঙ্গণ, বড়পোল',
    attire: 'Marigold Yellow & Ivory',
    attireBn: 'হলুদ ও বাসন্তী পোশাক',
    description:
      'A sunlit morning of sacred turmeric blessings, fresh marigold garlands, joyful conch shells, and heartfelt family laughter.',
    descriptionBn:
      'সোনালী রোদে গাঁদা ফুলের মালা, শঙ্খধ্বনি, উলুধ্বনি ও পবিত্র হলুদ ছোঁয়ার এক আনন্দমুখর প্রভাতী অনুষ্ঠান।',
    image: WEDDING_PHOTOS.occasionHaldi,
    imageAlt: 'Surojit and Ritwika celebrating their joyful Haldi ceremony adorned in yellow with marigold garlands',
    imagePosition: 'object-[50%_18%]',
  },
  {
    index: '02',
    shortLabel: 'Mehendi',
    shortLabelBn: 'মেহেন্দি',
    title: 'Mehendi Ceremony',
    titleBn: 'মেহেন্দি অনুষ্ঠান',
    date: 'Saturday, 12 December 2026',
    dateBn: 'শনিবার, ১২ই ডিসেম্বর ২০২৬',
    bengaliDate: '২৫শে অগ্রহায়ণ ১৪৩৩',
    time: '3:30 PM onwards',
    timeBn: 'বিকাল ৩:৩০ হইতে',
    location: 'Floral Courtyard, Madhyamgram',
    locationBn: 'পুষ্পসজ্জিত প্রাঙ্গণ, মধ্যমগ্রাম',
    attire: 'Emerald Green & Festive Pastels',
    attireBn: 'সবুজ ও উৎসবমুখর পোশাক',
    description:
      'Intricate bridal henna artistry, floral swings, folk melodies, and sweet winter afternoon warmth with family and friends.',
    descriptionBn:
      'মেহেন্দির আলপনা, মধুর গান, আড্ডা আর ফুলের দোলনায় সাজানো শীতের মিষ্টি বিকাল।',
    image: WEDDING_PHOTOS.occasionMehendi,
    imageAlt: 'Bride Ritwika smiling as intricate bridal mehendi is applied on her hands',
    imagePosition: 'object-[50%_20%]',
  },
  {
    index: '03',
    shortLabel: 'Sangeet',
    shortLabelBn: 'সঙ্গীত',
    title: 'Sangeet Evening',
    titleBn: 'সঙ্গীত ও আনন্দ সন্ধ্যা',
    date: 'Saturday, 12 December 2026',
    dateBn: 'শনিবার, ১২ই ডিসেম্বর ২০২৬',
    bengaliDate: '২৫শে অগ্রহায়ণ ১৪৩৩',
    time: '7:00 PM onwards',
    timeBn: 'সন্ধ্যা ৭:০০ টা হইতে',
    location: 'Lantern Garden Lawn, Baropol',
    locationBn: 'আলোকসজ্জিত প্রাঙ্গণ, বড়পোল',
    attire: 'Festive Indo-Western & Jewel Tones',
    attireBn: 'উৎসবের জমকালো পোশাক',
    description:
      'An enchanting twilight evening under glowing fairy lights filled with music, family dances, and joyful celebration.',
    descriptionBn:
      'আলোকমালার নিচে গান, নাচ আর প্রিয়জনদের মিলনমেলায় মুখরিত এক অবিস্মরণীয় সান্ধ্য আসর।',
    image: WEDDING_PHOTOS.occasionSangeet,
    imageAlt: 'Surojit and Ritwika dancing joyfully with family and friends during Sangeet evening',
    imagePosition: 'object-[50%_22%]',
  },
  {
    index: '04',
    shortLabel: 'Wedding',
    shortLabelBn: 'শুভবিবাহ',
    title: 'Wedding Ceremony (Shubho Bibaho)',
    titleBn: 'শুভবিবাহ অনুষ্ঠান',
    date: 'Sunday, 13 December 2026',
    dateBn: 'রবিবার, ১৩ই ডিসেম্বর ২০২৬',
    bengaliDate: '২৬শে অগ্রহায়ণ ১৪৩৩',
    time: '7:00 PM onwards',
    timeBn: 'সন্ধ্যা ৭:০০ টা হইতে',
    location: 'Wedding Mandap, Kolkata',
    locationBn: 'বিবাহ মণ্ডপ, কলকাতা',
    attire: 'Traditional Bengali Silk & Ethnic',
    attireBn: 'ঐতিহ্যবাহী বাঙালি পোশাক',
    description:
      'The auspicious sacred union with Shubho Drishti, Mala Badal, Saat Paak, and Sindoor Daan beneath illuminated floral canopies.',
    descriptionBn:
      'সানাইয়ের সুর, শুভদৃষ্টি, মালাবদল, সাতপাক ও সিঁদুরদানের পবিত্র লগ্নে দুই জীবনের শুভ মিলন।',
    image: WEDDING_PHOTOS.occasionWedding,
    imageAlt: 'Traditional Bengali wedding hands ritual with shakha-pola, gold bangles, henna, and flower petals',
    imagePosition: 'object-center',
  },
  {
    index: '05',
    shortLabel: 'Reception',
    shortLabelBn: 'প্রীতিভোজ',
    title: 'Reception (Bodhuboron & Pritibhoj)',
    titleBn: 'বধূবরণ ও প্রীতিভোজ',
    date: 'Tuesday, 15 December 2026',
    dateBn: 'মঙ্গলবার, ১৫ই ডিসেম্বর ২০২৬',
    bengaliDate: '২৮শে অগ্রহায়ণ ১৪৩৩',
    time: '7:00 PM onwards',
    timeBn: 'সন্ধ্যার পর হইতে',
    location: 'Roy Chowdhury Residence, Baropol',
    locationBn: 'নিজ বাসভবন, বড়পোল, মধ্যমগ্রাম',
    attire: 'Formal Ethnic & Evening Wear',
    attireBn: 'উৎসবের সান্ধ্য পোশাক',
    description:
      'Welcoming the bride home with warm hospitality, heartfelt elders’ blessings, and a royal Bengali celebratory feast.',
    descriptionBn:
      'নববধূকে সাদরে বরণ, প্রিয়জনদের আশীর্বাদ ও আন্তরিক প্রীতিভোজে এক স্মরণীয় সান্ধ্য আসর।',
    image: WEDDING_PHOTOS.occasionReception,
    imageAlt: 'Candlelit wedding reception courtyard banquet decorated with white tuberoses and fairy lights',
  },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  titleBn: string;
  caption: string;
  captionBn: string;
  momentTag: string;
  momentTagBn: string;
  imagePosition?: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'couple-1',
    src: WEDDING_PHOTOS.preWedding1,
    alt: 'Wedding portrait of Surojit and Ritwika in crimson Banarasi silk and traditional Bengali dhoti-punjabi',
    title: 'Royal Bengali Wedding Portrait',
    titleBn: 'শুভ পরিণয়ের রাজকীয় মুহূর্ত',
    caption: 'Dressed in crimson Banarasi silk, bridal mukut, and timeless garlands celebrating forever together.',
    captionBn: 'লাল বেনারসি, মুকুট আর বরমাল্যে সাজানো ভালোবাসা ও শুভ পরিণয়ের অম্লান মুহূর্ত।',
    momentTag: 'Moments · 01',
    momentTagBn: 'স্মৃতি · ০১',
    imagePosition: 'object-[50%_15%]',
  },
  {
    id: 'couple-2',
    src: WEDDING_PHOTOS.preWedding2,
    alt: 'Surojit and Ritwika dancing joyfully with family and friends during Sangeet evening',
    title: 'Joyful Sangeet Celebration',
    titleBn: 'সঙ্গীত সন্ধ্যার আনন্দমুখর নাচ',
    caption: 'Music, laughter, and celebratory dance surrounded by beloved family and close friends.',
    captionBn: 'সুরের ছন্দে, নাচ-গান আর প্রিয়জনদের উচ্ছ্বাসে ভরা অবিস্মরণীয় সঙ্গীত সন্ধ্যা।',
    momentTag: 'Moments · 02',
    momentTagBn: 'স্মৃতি · ০২',
    imagePosition: 'object-[50%_22%]',
  },
  {
    id: 'couple-3',
    src: WEDDING_PHOTOS.preWedding3,
    alt: 'Surojit and Ritwika smiling in bright yellow attire during their Gaye Holud Haldi ceremony',
    title: 'Golden Glow of Gaye Holud',
    titleBn: 'গায়ে হলুদের সোনালী আভা',
    caption: 'Warm turmeric blessings, cascading marigolds, and radiant smiles on a festive morning.',
    captionBn: 'গাঁদা ফুলের সাজ আর হলুদের পবিত্র ছোঁয়ায় উজ্জ্বল এক আনন্দঘন সকাল।',
    momentTag: 'Moments · 03',
    momentTagBn: 'স্মৃতি · ০৩',
    imagePosition: 'object-[50%_16%]',
  },
  {
    id: 'couple-4',
    src: WEDDING_PHOTOS.preWedding4,
    alt: 'Close-up of bride and groom holding hands with bridal henna, shakha-pola, gold bangles, and petals',
    title: 'Sacred Bengali Wedding Vows',
    titleBn: 'শাঁখা-পলা ও চিরন্তন অঙ্গীকার',
    caption: 'Shakha-pola, intricate bridal henna, and rose petals sealing a lifelong promise.',
    captionBn: 'শাঁখা-পলা, মেহেন্দির আলপনা আর ফুলের পাপড়িতে গাঁথা সারাজীবনের প্রতিশ্রুতি।',
    momentTag: 'Moments · 04',
    momentTagBn: 'স্মৃতি · ০৪',
    imagePosition: 'object-center',
  },
];
