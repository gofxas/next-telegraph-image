/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:() => [
        {
            source:"/file/:path*",
            destination: `https://telegra.ph/file/:path*`,
        }
    ]
}

module.exports = nextConfig
