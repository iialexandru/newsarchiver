/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 's.iw.ro', 'www.antena3.ro'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2400, 2600, 3840],
  }
}
