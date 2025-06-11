/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    basePath: "/portfolio",
    assetPrefix: "/portfolio/",

    images:
    {
        unoptimized: true
    }
};

export default nextConfig;
