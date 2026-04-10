/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "192.168.43.148",
    "127.0.0.1",
    "localhost",
    "aim-dhian-invitation.vercel.app",
    "dhian-aim-wi-api.aiimmm.net",
    "wedding.aiimmm.net",
    "dhiiann.aiimmm.net",
    "aiimmm.net",
  ],
};

export default nextConfig;
