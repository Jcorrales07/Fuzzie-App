/** @type {import('next').NextConfig} */
const nextConfig = {
    // Esto es una config para poder mostrar imagenes que vienen de apis como Clerk y Uploadcare
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: 'ucarecdn.com'
            }
        ]
    }
};

export default nextConfig;
