import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { isAdminConfigured, sessionCookie, validSession } from "../../../components/admin/admin-auth";
import { AdminDashboard } from "../../../components/admin/admin-dashboard";
import { AdminLogin } from "../../../components/admin/admin-login";
import { getCmsDefaults } from "../../../content/cms-defaults";
import { getCms } from "../../../content/cms-store";
import styles from "../../../components/admin/admin.module.css";
import "@fontsource-variable/readex-pro/wght.css";

export const metadata: Metadata = {
  title: "AMAC | Content Studio",
  robots: { index: false, follow: false },
  alternates: {},
};

export default async function Page() {
  const session = (await cookies()).get(sessionCookie)?.value;
  if (validSession(session)) return <AdminDashboard initial={getCms() ?? getCmsDefaults()} />;
  return (
    <main className={styles.login} lang="ar" dir="rtl">
      <div className={styles.loginArt} aria-hidden="true"><Image src="/images/farm.png" alt="" fill sizes="50vw" priority /></div>
      <section className={styles.loginPanel}>
        <Image src="/images/amac-logo.svg" alt="AMAC Group" width={145} height={64} unoptimized />
        <h1>إدارة محتوى AMAC</h1>
        <AdminLogin enabled={isAdminConfigured()} />
      </section>
    </main>
  );
}
