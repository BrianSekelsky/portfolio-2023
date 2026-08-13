// Shared responsive-image strategy for the gallery cards.
//
// Astro caps each requested width at the source image's intrinsic size and
// never upscales, so listing generous candidates here is safe: each card gets
// everything up to its own ceiling and nothing beyond it.
//
// `100vw` deliberately overstates the card on desktop, where it actually
// renders at ~1021px inside the 1085px content column. That bias makes the
// browser reach for the largest available candidate instead of a mid-size one.
// On phones 100vw is accurate, so the overstatement costs no mobile bandwidth.

export const CARD_WIDTHS = [320, 480, 640, 960, 1280, 1600, 2000, 2400];

export const CARD_SIZES = "100vw";
