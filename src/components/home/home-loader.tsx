"use client";

import { useEffect, useRef, useState } from "react";
import { localeLabels, type Locale } from "../../content/locale";
import { loadingCopy } from "../../content/translations/home";
import styles from "./home-loader.module.css";

type Phase = "loading" | "slow" | "offline" | "failed";

export function HomeLoader({ locale }: { locale: Locale }) {
  const messages = loadingCopy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const panel = dialog.current;
    const farm = document.getElementById("home-farm-image");
    if (!panel || !(farm instanceof HTMLImageElement)) return;
    const loader = panel;

    const controller = new AbortController();
    const options = { signal: controller.signal };
    let slow = false;
    let failed = false;

    function showStatus() {
      if (controller.signal.aborted) return;
      setPhase(!navigator.onLine ? "offline" : failed ? "failed" : slow ? "slow" : "loading");
      if (!loader.open) loader.showModal();
    }

    showStatus();
    const earliestClose = performance.now() + 520;
    let closeTimer: number | undefined;
    const slowTimer = window.setTimeout(() => {
      slow = true;
      showStatus();
    }, 6000);

    function finish() {
      controller.abort();
      window.clearTimeout(closeTimer);
      window.clearTimeout(slowTimer);
      loader.close();
    }

    loader.addEventListener("close", () => {
      if (!loader.open) finish();
    }, options);
    window.addEventListener("online", showStatus, options);
    window.addEventListener("offline", showStatus, options);
    farm.decode().then(() => {
      if (controller.signal.aborted) return;
      // Leave enough time for the brand to register on a fast connection.
      closeTimer = window.setTimeout(finish, Math.max(0, earliestClose - performance.now()));
    }, () => {
      failed = true;
      showStatus();
    });

    return finish;
  }, []);

  return (
    <dialog data-home-loader ref={dialog} className={styles.panel} aria-label={messages.title}>
      <div className={styles.content}>
        <img src="/images/amac-logo.svg" width="177" height="78" alt={localeLabels[locale].brand} />
        <span className={styles.track} data-moving={phase === "loading" || phase === "slow"} aria-hidden="true" />
        <p role="status">{messages[phase]}</p>
        {phase !== "loading" && (
          <div className={styles.actions}>
            <button onClick={() => dialog.current?.close()}>{messages.continue}</button>
            {phase === "failed" && <button onClick={() => window.location.reload()}>{messages.retry}</button>}
          </div>
        )}
      </div>
    </dialog>
  );
}
