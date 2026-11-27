"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import styles from "./admin.module.css";

export function AdminLogin({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const password = new FormData(event.currentTarget).get("password");
      const response = await fetch("/admin/api?action=login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }),
      });
      if (response.ok) router.refresh();
      else setError((await response.json()).error);
    } catch {
      setError("تعذّر الاتصال. جرّب مرة أخرى.");
    } finally {
      setBusy(false);
    }
  }

  if (!enabled) return <p>اضبط <code dir="ltr">AMAC_ADMIN_PASSWORD</code> في إعدادات السيرفر لتفعيل تسجيل الدخول.</p>;
  return (
    <form className={styles.loginForm} onSubmit={signIn}>
      <label className={styles.field}>كلمة مرور الإدارة
        <input name="password" type="password" autoComplete="current-password" required autoFocus dir="ltr" />
      </label>
      <button className={styles.primary} disabled={busy} type="submit">{busy ? "جاري تسجيل الدخول…" : "دخول"}</button>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  );
}
