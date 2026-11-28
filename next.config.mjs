import { securityHeaders } from "./src/server/security-headers.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  ...(process.env.AMAC_E2E === "1" && {
    distDir: ".next-e2e",
    typescript: { tsconfigPath: "tsconfig.e2e.json" },
  }),
};

export default nextConfig;
