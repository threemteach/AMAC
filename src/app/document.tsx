import type { ReactNode } from "react";
import type { Locale } from "../content/locale";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/dm-sans/wght.css";
import "./globals.css";

export function Document({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
