import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard', '/admin'], // Dashboard & Admin nicht indexieren
        },
        sitemap: 'https://pytja.com/sitemap.xml', // Deine Domain anpassen!
    };
}