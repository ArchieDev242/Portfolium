/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
    output: "export",
    trailingSlash: true,
    basePath: basePath || undefined,
    images:
    {
        unoptimized: true
    }
};

export default nextConfig;
