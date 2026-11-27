"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import styles from "./site-header.module.css";

export function MobileMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  function closeMenu() {
    setOpen(false);
    button.current?.focus();
  }

  return (
    <div
      className={styles.mobileMenu}
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.preventDefault();
          closeMenu();
        }
      }}
    >
      <button
        ref={button}
        type="button"
        className={styles.menuToggle}
        aria-label="Menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
      >
        <span className={styles.menuIcon} aria-hidden="true" />
      </button>
      <div
        id={panelId}
        className={styles.mobilePanel}
        hidden={!open}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a[href]")) {
            closeMenu();
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
