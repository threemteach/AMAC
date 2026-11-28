"use client";

import { useId, useState, type ChangeEvent, type ReactNode } from "react";
import { maxUploadBytes, mediaPresets, type MediaPreset } from "../../content/cms-options";
import type { LocalizedText } from "../../server/cms/schema";
import type { Locale } from "../../content/locale";
import styles from "./admin.module.css";

export function Field({ label, value, onChange, multiline, dir, type = "text", hint }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean;
  dir?: "ltr" | "rtl" | "auto"; type?: "text" | "email" | "url"; hint?: string;
}) {
  const id = useId();
  const labels = { "aria-labelledby": id, "aria-describedby": hint ? id + "-hint" : undefined };
  return (
    <label className={styles.field}><span id={id}>{label}</span>
      {multiline ? <textarea {...labels} rows={3} dir={dir ?? "auto"} value={value} onChange={(event) => onChange(event.target.value)} />
        : <input {...labels} type={type} dir={dir ?? "auto"} value={value} onChange={(event) => onChange(event.target.value)} />}
      {hint && <small id={id + "-hint"}>{hint}</small>}
    </label>
  );
}

export function LocalizedField({ locale, value, onChange, ...props }: Omit<Parameters<typeof Field>[0], "value" | "onChange"> & {
  locale: Locale; value?: LocalizedText; onChange: (next: LocalizedText) => void;
}) {
  return <Field {...props} dir={locale === "ar" ? "rtl" : "ltr"} value={value?.[locale] ?? ""}
    onChange={(next) => onChange({ ...value, [locale]: next })} />;
}

export function SelectField({ label, value, onChange, children }: {
  label: string; value: string; onChange: (value: string) => void; children: ReactNode;
}) {
  const id = useId();
  return <label className={styles.field}><span id={id}>{label}</span>
    <select aria-labelledby={id} value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>
  </label>;
}

export function CheckField({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  return <label className={styles.check}><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />{label}</label>;
}

export function ImageField({ label, value, preset, onChange, onBusy, optional }: {
  label: string; value: string; preset: MediaPreset; onChange: (value: string) => void;
  onBusy: (change: number) => void; optional?: boolean;
}) {
  const [state, setState] = useState({ busy: false, error: "", info: "" });
  const size = mediaPresets[preset];
  async function choose(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > maxUploadBytes) {
      setState({ busy: false, error: "حد الرفع 8 MB.", info: "" });
      return;
    }
    setState({ busy: true, error: "", info: "" });
    onBusy(1);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("preset", preset);
      const response = await fetch("/admin/api", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      onChange(data.src);
      setState({ busy: false, error: "", info: `${data.width} × ${data.height} px · ${Math.ceil(data.bytes / 1024)} KB · WebP` });
    } catch (error) {
      setState({ busy: false, error: error instanceof Error ? error.message : "الرفع فشل.", info: "" });
    } finally {
      onBusy(-1);
    }
  }
  return (
    <div className={styles.mediaField}>
      <div className={styles.mediaPreview}>
        {value ? <img src={value} alt={label} /> : <span>لم تُضَف صورة</span>}
      </div>
      <div className={styles.mediaInfo}>
        <strong>{label}</strong>
        <small>المقاس الموصى به <bdi>{size.width} × {size.height} px</bdi></small>
        <small>الحد الأدنى <bdi>{size.minWidth} × {size.minHeight} px</bdi> · PNG / JPEG / WebP · حتى 8 MB</small>
        {size.transparent && <small>استخدم خلفية شفافة لو الصورة محتاجة دمج مع لون البطاقة.</small>}
        <div className={styles.fieldActions}>
          <label className={styles.outline}>{state.busy ? "جاري الرفع…" : "اختيار صورة"}
            <input className={styles.visuallyHidden} type="file" accept="image/png,image/jpeg,image/webp" disabled={state.busy}
              aria-label={label} onChange={choose} />
          </label>
          {optional && value && <button type="button" className={styles.textButton} disabled={state.busy} onClick={() => {
            onChange("");
            setState({ busy: false, error: "", info: "" });
          }}>إزالة</button>}
        </div>
        {state.info && <small dir="ltr" role="status">{state.info}</small>}
        {state.error && <small role="alert" className={styles.error}>{state.error}</small>}
      </div>
    </div>
  );
}
