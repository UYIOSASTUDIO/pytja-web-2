"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReset() {
    const pathname = usePathname();

    useEffect(() => {
        // Zwingt den Browser bei JEDEM Seitenwechsel kompromisslos ganz nach oben.
        // 'instant' verhindert, dass man die Scroll-Bewegung sieht.
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return null;
}