/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:() => [
        {
            source:"/file/:path*",
            destination: `https://telegra.ph/file/:path*`,
        },
        {
            source:"/javdb/:path*",
            destination:"https://javdb.com/:path*"
        }
    ]
}

module.exports = nextConfig
