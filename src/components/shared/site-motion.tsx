"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;

    const active = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches || !entry.target.hasAttribute("data-reveal") || entry.target.matches(":focus-within")) continue;

        const animation = entry.target.animate(
          [
            { opacity: 0.72, translate: "0 16px" },
            { opacity: 1, translate: "0 0" },
          ],
          {
            duration: 550,
            delay: Math.min(stagger++ * 65, 130),
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          },
        );
        active.add(animation);
        const clear = () => active.delete(animation);
        animation.addEventListener("finish", clear, { once: true });
        animation.addEventListener("cancel", clear, { once: true });
      }
    }, { threshold: 0.06 });

    // Only marked elements animate. They remain visible without JavaScript.
    const observe = () => {
      document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    };
    const loader = document.querySelector<HTMLDialogElement>("[data-home-loader][open]");
    const onLoaderClose = () => {
      if (loader?.open) return;
      loader?.removeEventListener("close", onLoaderClose);
      observe();
    };
    if (loader) {
      loader.addEventListener("close", onLoaderClose);
    } else {
      observe();
    }
    const cancelAnimations = () => active.forEach((animation) => animation.cancel());
    preference.addEventListener("change", cancelAnimations);
    return () => {
      loader?.removeEventListener("close", onLoaderClose);
      observer.disconnect();
      cancelAnimations();
      preference.removeEventListener("change", cancelAnimations);
    };
  }, []);

  return null;
}
