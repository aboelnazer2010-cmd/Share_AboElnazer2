import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { 
    unoptimized: true // ضروري جداً لأن الصور المحسنة تحتاج لسيرفر ديناميكي
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
