/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images:{
        domains:["192.168.100.53"]
    },
    reactStrictMode: true,

}

module.exports = nextConfig
