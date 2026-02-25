"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Prüfen, ob wir auf der Code-Page sind (oder Unterseiten davon)
    const isCodePage = pathname?.startsWith('/code');

    return (
        <>
            <Header />
            {children}
            {!isCodePage && <Footer />}
        </>
    );
}