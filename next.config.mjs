/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/portfolium",
    assetPrefix: "/portfolium/",

    images:
    {
        unoptimized: true
    }
};

export default nextConfig;
