/**
 * ============================================================================
 * WEDDING PHOTO TAGGING FILE (আপনার বিয়ের ফটো এখানে ট্যাগ করুন)
 * ============================================================================
 * All real wedding photos are tagged here in one central file.
 * You can replace any path below with another photo inside /public/my-wedding-photos/
 * ============================================================================
 */

export const WEDDING_PHOTOS = {
  // 01. Opening Cover Screen (Bengali Shakha-Pola Wedding Hands Ritual)
  openingHands: '/assets/aistudio/file_000000003ba48208934e0533e8201171_e2dee59a.png',

  // 02. Main Hero & Couple Portrait (Bride in Crimson Banarasi & Groom in Cream Punjabi)
  heroPortrait: '/assets/aistudio/file_00000000734c8208acfc5fc04565dbf0_40fc54aa.png',

  // 03. Pre-Wedding & Celebration Gallery Photos (4 Slides)
  preWedding1: '/assets/aistudio/file_00000000734c8208acfc5fc04565dbf0_40fc54aa.png',
  preWedding2: '/assets/aistudio/file_000000005d888208a1b58f9b9f506e13_b2780c41.png',
  preWedding3: '/assets/aistudio/file_0000000057dc8208808f2fa4ebf72760_19016c12.png',
  preWedding4: '/assets/aistudio/file_000000003ba48208934e0533e8201171_e2dee59a.png',

  // 04. Wedding Events Timeline Photos (5 Occasions)
  occasionHaldi: '/assets/aistudio/file_0000000057dc8208808f2fa4ebf72760_19016c12.png',
  occasionMehendi: '/assets/aistudio/file_00000000b21c8208879521fa0c6d9d70_87a44efd.png',
  occasionSangeet: '/assets/aistudio/file_000000005d888208a1b58f9b9f506e13_b2780c41.png',
  occasionWedding: '/assets/aistudio/file_000000003ba48208934e0533e8201171_e2dee59a.png',
  occasionReception: '/my-wedding-photos/08-reception.jpg',

  // 05. Venue Showcase Photo
  venueShowcase: '/my-wedding-photos/07-wedding-mandap.jpg',

  // Alias kept for compatibility
  eveningCouple: '/assets/aistudio/file_000000005d888208a1b58f9b9f506e13_b2780c41.png',
} as const;
