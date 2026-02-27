import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // allowedDevOrigins und eslint wurden hier entfernt, da sie ungültig sind
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;