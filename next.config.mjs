/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\/_unused\//,
            loader: 'ignore-loader'
        });
        return config;
    }
};

export default nextConfig;
