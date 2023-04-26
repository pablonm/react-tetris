/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    CSRF_SECRET: process.env.CSRF_SECRET,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://react-tetris-alpha.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
