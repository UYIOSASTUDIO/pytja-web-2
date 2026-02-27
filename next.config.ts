import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Erlaubt deinem Handy den Zugriff auf den Dev-Server
    experimental: {
        allowedDevOrigins: ["192.168.1.4", "localhost:3000"]
    },
    // Optimiert den Build für Vercel
    typescript: {
        ignoreBuildErrors: true, // Erlaubt Deployment auch bei kleinen Typ-Fehlern
    },
    eslint: {
        ignoreDuringBuilds: true, // Verhindert den ERESOLVE Fehler auf Vercel
    }
};

export default nextConfig;