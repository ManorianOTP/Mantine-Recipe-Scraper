import bundleAnalyzer from '@next/bundle-analyzer';
import ReactComponentName from 'react-scan/react-component-name/webpack';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  images: {
    domains: ['llqeukrsokawuzoblxdp.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  webpack: (config) => {
    config.plugins.push(ReactComponentName({}));
    return config;
  },
});

export default nextConfig;
