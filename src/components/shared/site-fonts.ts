import localFont from "next/font/local";

export const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-bold.ttf",
  variable: "--font-bricolage",
  weight: "700",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const myriadPro = localFont({
  src: "./fonts/myriad-pro-regular.otf",
  variable: "--font-myriad-pro",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
