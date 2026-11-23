import {
  DEFAULT_WEDDING_DETAILS,
  WEDDING_PHOTOS,
  WeddingDetails,
} from '../config/weddingConfig';

export {
  CEREMONY_EVENTS,
  DEFAULT_WEDDING_DETAILS,
  GALLERY_PHOTOS,
  WEDDING_PHOTOS as IMAGES,
} from '../config/weddingConfig';

export type {
  CeremonyEvent,
  GalleryPhoto,
  Language,
  WeddingDetails,
} from '../config/weddingConfig';

export function getFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return '';
  return trimmed.split(/\s+/)[0];
}

export function getMonogram(groomName: string, brideName: string): string {
  const g = getFirstName(groomName).charAt(0).toUpperCase() || 'S';
  const b = getFirstName(brideName).charAt(0).toUpperCase() || 'R';
  return `${g} & ${b}`;
}

export function buildGoogleMapsUrl(details: WeddingDetails): string {
  if (details.mapsUrl && details.mapsUrl.trim().startsWith('http')) {
    return details.mapsUrl.trim();
  }
  const query = encodeURIComponent(`${details.venueName}, ${details.venueAddress}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function buildGoogleCalendarUrl(details: WeddingDetails): string {
  const title = encodeURIComponent(
    `${getFirstName(details.groomName)} & ${getFirstName(details.brideName)} — Shubho Bibaho & Pritibhoj`
  );
  const location = encodeURIComponent(`${details.venueName}, ${details.venueAddress}`);
  const desc = encodeURIComponent(
    `Shubho Bibaho: ${details.weddingDay}, ${details.weddingDateDisplay}\nBodhuboron & Pritibhoj: ${details.receptionDay}, ${details.receptionDateDisplay} (Evening onwards)\nVenue: ${details.venueName}, ${details.venueAddress}\nGoogle Maps: ${buildGoogleMapsUrl(details)}`
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261213T133000Z/20261213T173000Z&details=${desc}&location=${location}`;
}

export function downloadCalendarIcs(details: WeddingDetails): void {
  const maps = buildGoogleMapsUrl(details);
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    'DTSTART:20261213T133000Z',
    'DTEND:20261213T173000Z',
    `SUMMARY:${details.groomName} & ${details.brideName} - Shubho Bibaho`,
    `DESCRIPTION:Wedding of ${details.groomName} and ${details.brideName}. Reception (Pritibhoj) on ${details.receptionDay}, ${details.receptionDateDisplay}. Directions: ${maps}`,
    `LOCATION:${details.venueName}, ${details.venueAddress}`,
    'END:VEVENT',
    'BEGIN:VEVENT',
    'DTSTART:20261215T133000Z',
    'DTEND:20261215T173000Z',
    `SUMMARY:${details.groomName} & ${details.brideName} - Bodhuboron & Pritibhoj`,
    `DESCRIPTION:Hosted by ${details.groomFather} & family. Directions: ${maps}`,
    `LOCATION:${details.venueName}, ${details.venueAddress}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${getFirstName(details.groomName)}-${getFirstName(details.brideName)}-Wedding.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function loadDetailsFromUrl(): WeddingDetails {
  if (typeof window === 'undefined') return DEFAULT_WEDDING_DETAILS;
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string, fallback: string) => {
    const val = params.get(key);
    return val && val.trim().length > 0 ? val.trim() : fallback;
  };

  return {
    ...DEFAULT_WEDDING_DETAILS,
    groomName: pick('g', DEFAULT_WEDDING_DETAILS.groomName),
    brideName: pick('b', DEFAULT_WEDDING_DETAILS.brideName),
    groomFather: pick('gf', DEFAULT_WEDDING_DETAILS.groomFather),
    groomMother: pick('gm', DEFAULT_WEDDING_DETAILS.groomMother),
    brideFather: pick('bf', DEFAULT_WEDDING_DETAILS.brideFather),
    brideMother: pick('bm', DEFAULT_WEDDING_DETAILS.brideMother),
    weddingDateDisplay: pick('d', DEFAULT_WEDDING_DETAILS.weddingDateDisplay),
    receptionDateDisplay: pick('rd', DEFAULT_WEDDING_DETAILS.receptionDateDisplay),
    ceremonyTime: pick('t', DEFAULT_WEDDING_DETAILS.ceremonyTime),
    venueName: pick('vn', DEFAULT_WEDDING_DETAILS.venueName),
    venueAddress: pick('va', DEFAULT_WEDDING_DETAILS.venueAddress),
    mapsUrl: pick('m', DEFAULT_WEDDING_DETAILS.mapsUrl),
    contactPhone: pick('p', DEFAULT_WEDDING_DETAILS.contactPhone),
  };
}

export function buildShareableCardUrl(details: WeddingDetails): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  const entries: Array<[string, string, string]> = [
    ['g', details.groomName, DEFAULT_WEDDING_DETAILS.groomName],
    ['b', details.brideName, DEFAULT_WEDDING_DETAILS.brideName],
    ['gf', details.groomFather, DEFAULT_WEDDING_DETAILS.groomFather],
    ['gm', details.groomMother, DEFAULT_WEDDING_DETAILS.groomMother],
    ['bf', details.brideFather, DEFAULT_WEDDING_DETAILS.brideFather],
    ['bm', details.brideMother, DEFAULT_WEDDING_DETAILS.brideMother],
    ['d', details.weddingDateDisplay, DEFAULT_WEDDING_DETAILS.weddingDateDisplay],
    ['rd', details.receptionDateDisplay, DEFAULT_WEDDING_DETAILS.receptionDateDisplay],
    ['t', details.ceremonyTime, DEFAULT_WEDDING_DETAILS.ceremonyTime],
    ['vn', details.venueName, DEFAULT_WEDDING_DETAILS.venueName],
    ['va', details.venueAddress, DEFAULT_WEDDING_DETAILS.venueAddress],
    ['m', details.mapsUrl, DEFAULT_WEDDING_DETAILS.mapsUrl],
    ['p', details.contactPhone, DEFAULT_WEDDING_DETAILS.contactPhone],
  ];

  url.search = '';
  for (const [key, current, fallback] of entries) {
    if (current.trim() !== fallback.trim() && current.trim().length > 0) {
      url.searchParams.set(key, current.trim());
    }
  }
  return url.toString();
}

export function buildWhatsAppMessage(details: WeddingDetails, cardUrl: string): string {
  const mapsLink = buildGoogleMapsUrl(details);
  return [
    `শুভবিবাহ ও বধূবরণ · Wedding Invitation`,
    ``,
    `With the blessings of our families, ${details.groomFather} warmly invites you to celebrate the wedding of`,
    `${details.groomName} (${details.groomBengali})`,
    `&`,
    `${details.brideName} (${details.brideBengali})`,
    ``,
    `Gaye Holud & Mehendi: Saturday, 12 December 2026`,
    `Shubho Bibaho (Wedding): ${details.weddingDay}, ${details.weddingDateDisplay}`,
    `Bodhuboron & Pritibhoj: ${details.receptionDay}, ${details.receptionDateDisplay} (Evening onwards)`,
    `Venue: ${details.venueName}, ${details.venueAddress}`,
    `Contact: ${details.contactPhone} / ${details.secondaryPhone}`,
    ``,
    `Google Maps Directions:`,
    mapsLink,
    ``,
    `Open our animated Bengali wedding invitation card:`,
    cardUrl,
  ].join('\n');
}

export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export const PHOTO_ASSETS_INFO = WEDDING_PHOTOS;
