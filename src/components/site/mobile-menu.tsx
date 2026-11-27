"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./site-header.module.css";

export function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDialogElement>(null);
  const panelId = useId();

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 767px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (!event.matches) sidebar.current?.close();
    }

    mobileViewport.addEventListener("change", closeOnDesktop);
    return () => mobileViewport.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className={styles.mobileMenu}>
      <button
        ref={button}
        type="button"
        className={styles.menuToggle}
        aria-label="Menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          sidebar.current?.showModal();
          setOpen(true);
        }}
      >
        <span className={styles.menuIcon} aria-hidden="true" />
      </button>
      <dialog
        ref={sidebar}
        id={panelId}
        className={styles.sidebar}
        aria-label="Navigation menu"
        onClose={() => {
          setOpen(false);
          button.current?.focus();
        }}
        onClick={(event) => {
          if (
            event.target === event.currentTarget ||
            (event.target instanceof Element && event.target.closest("a[href]"))
          ) {
            event.currentTarget.close();
          }
        }}
      >
        <div className={styles.sidebarContent}>
          <button
            type="button"
            className={styles.closeMenu}
            aria-label="Close menu"
            onClick={() => sidebar.current?.close()}
          >
            <span className={styles.closeIcon} aria-hidden="true" />
          </button>
          {children}
        </div>
      </dialog>
    </div>
  );
}
