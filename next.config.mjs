/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  ...(process.env.AMAC_E2E === "1" && {
    distDir: ".next-e2e",
    typescript: { tsconfigPath: "tsconfig.e2e.json" },
  }),
};

export default nextConfig;
